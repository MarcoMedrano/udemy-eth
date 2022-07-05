// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address payable[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 1 wei, "Need send some ether");
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted{

        uint index = random() % players.length;
        // players[index].transfer(this.balance);// this.balance is all the money the contract has
        players[index].transfer(address(this).balance);// this.balance is all the money the contract has
        players = new address payable[](0);// reseting the dynamic array with initial size of 0
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager, "Just the manager can use this funciton");
        _; // here comes the code that wrapps the modifier
    }
}