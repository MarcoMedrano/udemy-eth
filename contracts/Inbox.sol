pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    // Solidity automatically creates a function on public variables, so no need of this funciton
    // function getMessage() public view returns (string) {
    //     return message;
    // }
}