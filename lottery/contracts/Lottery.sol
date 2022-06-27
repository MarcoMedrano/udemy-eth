
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 1 wei, "Need send some ether");
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(sha3(block.difficulty, now, players));
    }

    function pickWinner() public restricted{

        uint index = random() % players.length;
        players[index].transfer(this.balance);// this.balance is all the money the contract has
        players = new address[](0);// reseting the dynamic array with initial size of 0
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager, "Just the manager can use this funciton");
        _; // here comes the code that wrapps the modifier
    }
}