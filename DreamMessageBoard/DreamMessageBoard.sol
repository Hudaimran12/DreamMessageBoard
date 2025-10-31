// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DreamMessageBoard {
    string private message;
    uint256 private updateCount;
    address private owner;
    uint256 private lastUpdate;
    
    event MessageUpdated(string newMessage, address updatedBy, uint256 timestamp);
    
    constructor() {
        owner = msg.sender;
        message = "Welcome to Dream Message Board!";
        updateCount = 0;
        lastUpdate = block.timestamp;
    }
    
    // Write function - set message (REQUIRED)
    function setMessage(string memory _message) public {
        require(bytes(_message).length > 0, "Message cannot be empty");
        message = _message;
        updateCount++;
        lastUpdate = block.timestamp;
        emit MessageUpdated(_message, msg.sender, block.timestamp);
    }
    
    // Read function - get message (REQUIRED)
    function getMessage() public view returns (string memory) {
        return message;
    }
    
    // Read function - get update count
    function getUpdateCount() public view returns (uint256) {
        return updateCount;
    }
    
    // Additional function - get contract info
    function getContractInfo() public view returns (address, uint256, uint256) {
        return (owner, updateCount, lastUpdate);
    }
    
    // Additional function - get owner
    function getOwner() public view returns (address) {
        return owner;
    }
}