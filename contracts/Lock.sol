// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TodoList{
    // we’ll need to create a function to add a task, 
    // for this we’ll accept a string as an argument and push it on a mapping,
    
    mapping(uint256 => string) public tasks;
    uint256 public count = 0;

    function addTask(string calldata task) public{
        tasks[count] = task;
        count++;
    }
}