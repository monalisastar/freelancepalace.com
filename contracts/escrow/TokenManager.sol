// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenManager is ReentrancyGuard, Ownable {
    mapping(address => bool) public allowedTokens;

    event TokenDeposit(address indexed user, uint256 amount, address token);
    event TokenWithdraw(address indexed to, uint256 amount, address token);
    event AllowedTokenUpdated(address token, bool allowed);

    // Native ETH is represented by address(0)
    address public constant NATIVE = address(0);

    constructor() {
        allowedTokens[NATIVE] = true; // Accept ETH by default
    }

    // -------------------------
    // Admin Functions
    // -------------------------

    function setAllowedToken(address _token, bool _allowed) external onlyOwner {
        allowedTokens[_token] = _allowed;
        emit AllowedTokenUpdated(_token, _allowed);
    }

    // -------------------------
    // Core Escrow Usage
    // -------------------------

    function transferIn(address from, uint256 amount, address token) external payable nonReentrant {
        require(allowedTokens[token], "Token not supported");

        if (token == NATIVE) {
            require(msg.value == amount, "ETH amount mismatch");
        } else {
            require(msg.value == 0, "Do not send ETH for ERC20");
            require(IERC20(token).transferFrom(from, address(this), amount), "Token transfer failed");
        }

        emit TokenDeposit(from, amount, token);
    }

    function transferOut(address to, uint256 amount, address token) external onlyOwner nonReentrant {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");

        if (token == NATIVE) {
            (bool sent, ) = to.call{value: amount}("");
            require(sent, "ETH transfer failed");
        } else {
            require(IERC20(token).transfer(to, amount), "ERC20 transfer failed");
        }

        emit TokenWithdraw(to, amount, token);
    }

    // Allow contract to receive ETH
    receive() external payable {}
}

