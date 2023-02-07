// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TodoList{

    struct TaskItem {
        string task;
        bool isCompleted;
    }

    mapping(uint256 => TaskItem) public tasks;
    uint256 public count = 0;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(owner == msg.sender, "You can't call this function");
        _;
    }

    function addTask(string calldata task) public onlyOwner{
        
        TaskItem memory item = TaskItem({
            task : task,
            isCompleted : false
        });

        tasks[count] = item;
        count++;
    }

    function completeTask(uint256 id) public onlyOwner{
        
        require(!tasks[id].isCompleted, "Task already completed");
        tasks[id].isCompleted = true;
    }


}