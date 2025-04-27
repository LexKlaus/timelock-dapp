// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TimeLock {
    IERC20 public token;
    uint256 public costPerSecond = 1e14; // 0.0001 token per second

    struct LockedMessage {
        bytes32 encryptedHash;
        uint256 unlockTime;
        address owner;
        uint256 cost;
    }

    mapping(uint256 => LockedMessage) public messages;
    uint256 public messageCount;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function lockMessage(bytes32 _encryptedHash, uint256 _lockDuration) external {
        uint256 requiredToken = _lockDuration * costPerSecond;
        require(token.transferFrom(msg.sender, address(this), requiredToken), "Token payment failed");

        messages[messageCount] = LockedMessage({
            encryptedHash: _encryptedHash,
            unlockTime: block.timestamp + _lockDuration,
            owner: msg.sender,
            cost: requiredToken
        });

        messageCount++;
    }

    function unlockMessage(uint256 _id) external view returns (bytes32) {
        LockedMessage storage msgData = messages[_id];
        require(msg.sender == msgData.owner, "Not owner");
        require(block.timestamp >= msgData.unlockTime, "Still locked");
        return msgData.encryptedHash;
    }
}
