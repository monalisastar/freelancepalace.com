
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";

interface IEscrowDeal {
    struct Milestone {
        string metadata;
        uint256 amount;
    }

    function initialize(
        address _client,
        address _counterparty,
        address _token,
        address _tokenManager,
        uint256 _totalAmount,
        Milestone[] calldata _milestones
    ) external;
}

contract EscrowFactory {
    using Clones for address;

    address public immutable escrowDealLogic;
    address[] public allDeals;

    event DealCreated(address deal, address client, address counterparty, uint256 amount);

    constructor(address _escrowDealLogic) {
        escrowDealLogic = _escrowDealLogic;
    }

    function createDeal(
        address client,
        address counterparty,
        address token,
        address tokenManager,
        uint256 totalAmount,
        IEscrowDeal.Milestone[] calldata milestones
    ) external returns (address deal) {
        deal = escrowDealLogic.clone();
        IEscrowDeal(deal).initialize(client, counterparty, token, tokenManager, totalAmount, milestones);
        allDeals.push(deal);
        emit DealCreated(deal, client, counterparty, totalAmount);
    }

    function getDeal(uint256 index) external view returns (address) {
        return allDeals[index];
    }

    function dealCount() external view returns (uint256) {
        return allDeals.length;
    }
}
