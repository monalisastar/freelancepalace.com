// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./EscrowBase.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface ITokenManagerLite {
    function transferOut(address to, uint256 amount, address token) external;
    function transferIn(address from, uint256 amount, address token) external payable;
}

contract EscrowDeal is EscrowBase {
    constructor(
        address _platformFeeAddress,
        address _treasuryAddress,
        address _rewardManager,
        address _tokenManager
    ) 
        EscrowBase(_platformFeeAddress, _treasuryAddress, _rewardManager, _tokenManager) 
    {}


    address public client;
    address public counterparty;
    address public token;

    uint256 public totalAmount;
    uint256 public createdAt;
    bool public initialized;
    bool public workStarted;
    bool public frozen;

    uint256 public constant COOLDOWN = 3 days;



    struct Milestone {
        string metadata;
        uint256 amount;
        uint256 deliveredAt;
        bool approved;
        bool released;
    }
    Milestone[] public milestones;
    event DealInitialized(address client, address counterparty, uint256 amount);
    event WorkStarted();
    event MilestoneSubmitted(uint256 index, string metadata);
    event MilestoneApproved(uint256 index);
    event MilestoneReleased(uint256 index, uint256 amount);
    event DealCancelled(address to);
    event DealDisputed(address by);




    function initialize(
        address _client,
        address _counterparty,
        address _token,
        uint256 _totalAmount,
        Milestone[] memory _milestones
    ) external {
        require(!initialized, "Already initialized");
        client = _client;
        counterparty = _counterparty;
        token = _token;
        totalAmount = _totalAmount;
        createdAt = block.timestamp;
        initialized = true;

        for (uint256 i = 0; i < _milestones.length; i++) {
            milestones.push(
                Milestone({
                    metadata: _milestones[i].metadata,
                    amount: _milestones[i].amount,
                    deliveredAt: 0,
                    approved: false,
                    released: false
                })
            );
        }

        emit DealInitialized(_client, _counterparty, _totalAmount);
    }


    function submitMilestone(uint256 dealId, uint256 index, string calldata metadata) external onlyFreelancer(dealId) notFrozen(dealId) {
        require(index < milestones.length, "Invalid milestone");
        Milestone storage m = milestones[index];
        require(m.deliveredAt == 0, "Already submitted");

        m.metadata = metadata;
        m.deliveredAt = block.timestamp;

        emit MilestoneSubmitted(index, metadata);
    }

    function approveMilestone(uint256 dealId, uint256 index) external onlyClient(dealId) notFrozen(dealId) nonReentrant {
        Milestone storage m = milestones[index];
        require(m.deliveredAt > 0, "Not submitted");
        require(!m.approved, "Already approved");
        m.approved = true;

        ITokenManager(tokenManager).transferOut(counterparty, m.amount, token);
        m.released = true;

        emit MilestoneApproved(index);
        emit MilestoneReleased(index, m.amount);
    }

    function autoRelease(uint256 dealId, uint256 index) external onlyFreelancer(dealId) notFrozen(dealId) nonReentrant {
        Milestone storage m = milestones[index];
        require(m.deliveredAt > 0, "Not submitted");
        require(!m.released, "Already released");
        require(block.timestamp >= m.deliveredAt + COOLDOWN, "Cooldown not met");

        ITokenManager(tokenManager).transferOut(counterparty, m.amount, token);
        m.released = true;

        emit MilestoneReleased(index, m.amount);
    }



    function getMilestone(uint256 index) external view returns (Milestone memory) {
        require(index < milestones.length, "Invalid index");
        return milestones[index];
    }

    function milestoneCount() external view returns (uint256) {
        return milestones.length;
    }

    function createEscrowDeal(
        address _token,
        address _client,
        address _counterparty,
        uint256 _amount,
        uint256[] memory _milestoneAmounts
    ) external returns (uint256) {
        uint256 dealId = nextDealId++;

        deals[dealId].token = _token;
        deals[dealId].client = _client;
        delete milestones;
        for (uint256 i = 0; i < _milestoneAmounts.length; i++) {
            milestones.push(Milestone({
                amount: _milestoneAmounts[i],
                approved: false,
                released: false,
                deliveredAt: 0,
                metadata: ""
            }));
        }
      deals[dealId].status = DealStatus.Created;



        emit EscrowCreated(dealId, _client, _counterparty, _amount);

        return dealId;
    }
}




























































