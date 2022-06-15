// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {interface, bytecode } = require('../compile');
let accounts;
let inbox;

const InitialMessage = 'Helllo nena';
beforeEach(async () =>{
    // Get a list of all accounts
    accounts =  await web3.eth.getAccounts();
    
    // Use an account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [InitialMessage]})
    .send({from: accounts[0], gas:'1000000'});
    
    // console.log('Accounts ', accounts);
    // console.log('Inbox ', inbox);
});

describe("Inbox", () => {
    it('Deploys a contract', ()=>{
        assert.ok(inbox.options.address);
    });
    
    it('Has default message', async ()=>{
        const message = await inbox.methods.message().call(/*transaction options like gas*/);
        assert.equal(message, InitialMessage);
    });

    it('Can change the message', async ()=>{
        const res = await inbox.methods.setMessage('bye').send({from:accounts[0]});
        console.log('Address ', res);
        const message = await inbox.methods.message().call(/*transaction options like gas*/);
        assert.equal(message, 'bye');
    });
});