// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PohelaBoishak {
    event BoishakGreeting(address indexed from, address indexed to, string message, uint256 timestamp);

    // Send a greeting (emit an event so it appears on explorers)
    function sendGreeting(address to, string calldata message) external {
        emit BoishakGreeting(msg.sender, to, message, block.timestamp);
    }
}
