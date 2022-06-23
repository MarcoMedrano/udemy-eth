// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.9;

contract Inbox{
    string public message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    // Solidity automatically creates a function on public variables, so no need of this funciton
    // function getMessage() public view returns (string) {
    //     return message;
    // }
}