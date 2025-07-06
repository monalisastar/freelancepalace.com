// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ITokenManager {
    function transferIn(address from, uint256 amount, address token) external payable;
    function transferOut(address to, uint256 amount, address token) external;
}

contract EscrowBase is ReentrancyGuard, Ownable {
    uint256 internal nextDealId;

    struct EscrowDealData {

        address token;

        address client;

        address counterparty;

        uint256 totalAmount;

        uint256[] milestones;

        DealStatus status;

    }

    event EscrowCreated(uint256 indexed dealId, address client, address counterparty, uint256 amount);

    enum DealStatus { Created, Funded, InProgress, Delivered, Released, Disputed, Cancelled }

    struct Deal {
        address client;
        address freelancer;
        uint256 amount;
        DealStatus status;
        string description;
        string deliveryMetadata;
        uint256 createdAt;
        uint256 startedAt;
        uint256 deliveredAt;
        uint256 deadline;
        address token;
        bool frozen;
    }

    uint256 public dealCounter;
    mapping(uint256 => Deal) public deals;
    mapping(address => uint256) public platformBalances;
    mapping(address => address) public externalWallets;
    mapping(address => bool) public rewardFrozen; // ✅ Correct type


    address public platformFeeAddress;
    address public treasuryAddress;
    address public rewardManager;
    address public tokenManager;

    uint256 public constant PLATFORM_FEE = 5;
    uint256 public constant TREASURY_FEE = 1;
    uint256 public constant REWARD_FEE = 2;

    event DealCreated(uint256 dealId);
    event DealFunded(uint256 dealId);
    event WorkStarted(uint256 dealId);
    event DeliverySubmitted(uint256 dealId, string metadata);
    event PaymentReleased(uint256 dealId);
    event DisputeRaised(uint256 dealId);
    event AdminOverride(uint256 dealId, address winner);
    event RefundIssued(uint256 dealId, address client);
    event RewardEligible(uint256 dealId, address freelancer, address client, uint256 amount);
    event Withdrawal(address freelancer, address to, uint256 amount);

    modifier onlyClient(uint256 _dealId) {
        require(msg.sender == deals[_dealId].client, "Not client");
        _;
    }

    modifier onlyFreelancer(uint256 _dealId) {
        require(msg.sender == deals[_dealId].freelancer, "Not freelancer");
        _;
    }

    modifier notFrozen(uint256 _dealId) {
        require(!deals[_dealId].frozen, "Deal is frozen");
        _;
    }

    constructor(address _platformFeeAddress, address _treasuryAddress, address _rewardManager, address _tokenManager) {
        platformFeeAddress = _platformFeeAddress;
        treasuryAddress = _treasuryAddress;
        rewardManager = _rewardManager;
        tokenManager = _tokenManager;
    }

    function setExternalWallet(address _wallet) external {
        externalWallets[msg.sender] = _wallet;
    }

    function createDeal(address _freelancer, uint256 _amount, string memory _desc, uint256 _deadline, address _token) external returns (uint256) {
        dealCounter++;
        deals[dealCounter] = Deal({
            client: msg.sender,
            freelancer: _freelancer,
            amount: _amount,
            status: DealStatus.Created,
            description: _desc,
            deliveryMetadata: "",
            createdAt: block.timestamp,
            startedAt: 0,
            deliveredAt: 0,
            deadline: _deadline,
            token: _token,
            frozen: false
        });

        emit DealCreated(dealCounter);
        return dealCounter;
    }

    function fundDeal(uint256 _dealId) external payable onlyClient(_dealId) {
        Deal storage d = deals[_dealId];
        require(d.status == DealStatus.Created, "Invalid status");
        ITokenManager(tokenManager).transferIn{value: msg.value}(msg.sender, d.amount, d.token);
        d.status = DealStatus.Funded;

        emit DealFunded(_dealId);
    }

    function startWork(uint256 _dealId) external onlyFreelancer(_dealId) {
        Deal storage d = deals[_dealId];
        require(d.status == DealStatus.Funded, "Invalid status");
        d.status = DealStatus.InProgress;
        d.startedAt = block.timestamp;

        emit WorkStarted(_dealId);
    }

    function submitDelivery(uint256 _dealId, string calldata _metadata) external onlyFreelancer(_dealId) notFrozen(_dealId) {
        Deal storage d = deals[_dealId];
        require(d.status == DealStatus.InProgress, "Invalid status");
        d.status = DealStatus.Delivered;
        d.deliveredAt = block.timestamp;
        d.deliveryMetadata = _metadata;

        emit DeliverySubmitted(_dealId, _metadata);
    }

    function approveRelease(uint256 _dealId) external onlyClient(_dealId) notFrozen(_dealId) {
        _releaseFunds(_dealId);
    }

    function requestAutoRelease(uint256 _dealId) external onlyFreelancer(_dealId) notFrozen(_dealId) {
        Deal storage d = deals[_dealId];
        require(d.status == DealStatus.Delivered, "Not delivered");
        require(block.timestamp >= d.deliveredAt + 7 days, "Cooldown active");

        _releaseFunds(_dealId);
    }

    function _releaseFunds(uint256 _dealId) internal {
        Deal storage d = deals[_dealId];
        require(d.status == DealStatus.Delivered, "Cannot release");

        uint256 amount = d.amount;
        uint256 platformCut = (amount * PLATFORM_FEE) / 100;
        uint256 treasuryCut = (amount * TREASURY_FEE) / 100;
        uint256 rewardCut = (amount * REWARD_FEE) / 100;
        uint256 freelancerAmount = amount - platformCut - treasuryCut - rewardCut;

        ITokenManager(tokenManager).transferOut(platformFeeAddress, platformCut, d.token);
        ITokenManager(tokenManager).transferOut(treasuryAddress, treasuryCut, d.token);
        platformBalances[d.freelancer] += freelancerAmount;

        emit RewardEligible(_dealId, d.freelancer, d.client, rewardCut);

        d.status = DealStatus.Released;
        emit PaymentReleased(_dealId);
    }

    function withdrawFunds() external nonReentrant {
        uint256 balance = platformBalances[msg.sender];
        require(balance > 0, "No funds");

        address to = externalWallets[msg.sender];
        require(to != address(0), "No withdrawal address");

        platformBalances[msg.sender] = 0;
        ITokenManager(tokenManager).transferOut(to, balance, address(0)); // Native ETH assumed, can be token-aware

        emit Withdrawal(msg.sender, to, balance);
    }

    function raiseDispute(uint256 _dealId) external {
        Deal storage d = deals[_dealId];
        require(msg.sender == d.client || msg.sender == d.freelancer, "Not involved");
        require(d.status == DealStatus.Delivered, "Not deliverable");
        d.status = DealStatus.Disputed;

        emit DisputeRaised(_dealId);
    }

    function overrideDispute(uint256 _dealId, address winner) external onlyOwner {
        Deal storage d = deals[_dealId];
        require(d.status == DealStatus.Disputed, "Not in dispute");
        d.frozen = false;

        if (winner == d.freelancer) {
            _releaseFunds(_dealId);
        } else {
            ITokenManager(tokenManager).transferOut(d.client, d.amount, d.token);
            d.status = DealStatus.Cancelled;
            emit RefundIssued(_dealId, d.client);
        }

        emit AdminOverride(_dealId, winner);
    }

    function cancelDeal(uint256 _dealId) external onlyClient(_dealId) {
        Deal storage d = deals[_dealId];
        require(d.status == DealStatus.Created || d.status == DealStatus.Funded, "Too late");
        require(d.startedAt == 0, "Work already started");

        d.status = DealStatus.Cancelled;
        ITokenManager(tokenManager).transferOut(d.client, d.amount, d.token);
        emit RefundIssued(_dealId, d.client);
    }

    function freezeDeal(uint256 _dealId) external onlyOwner {
        deals[_dealId].frozen = true;
    }

    function freezeReward(address user) external onlyOwner {
        rewardFrozen[user] = true;
    }

    function setPlatformFeeAddress(address _addr) external onlyOwner {
        platformFeeAddress = _addr;
    }

    function setTreasuryAddress(address _addr) external onlyOwner {
        treasuryAddress = _addr;
    }

    function setTokenManager(address _addr) external onlyOwner {
        tokenManager = _addr;
    }

    function setRewardManager(address _addr) external onlyOwner {
        rewardManager = _addr;
    }
}



