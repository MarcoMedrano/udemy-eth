const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object})
    .send({from: accounts[0], gas:'1000000'});
});

describe('Lottery Contract', () =>{

    it('deploys', () => {
        assert.ok(lottery.options.address)
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from:accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple account to enter', async () => {
        const eth = web3.utils.toWei('0.02', 'ether');
        await lottery.methods.enter().send({from: accounts[0], value: eth });
        await lottery.methods.enter().send({from: accounts[1], value: eth });
        await lottery.methods.enter().send({from: accounts[2], value: eth });

        const players = await lottery.methods.getPlayers().call({
            from:accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('require a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({from: accounts[0], value: 0 });
            assert(false, 'Should fail but did not');
        }catch(err) {
            assert(err);
        }
    });

    it('only creator can call pickWinner', async () => {
        try {
            await lottery.methods.pickWinner().send({from: accounts[1] });
            assert(false, 'Should fail but did not');
        }catch(err) {
            assert(err);
        }
    });

    it('winner receives the ether', async () => {
        // Using 2 accounts as creator will spent gas for pickupWinner transaction
        const winner = accounts[1];
        const ethBet = web3.utils.toWei('1', 'ether');
        await lottery.methods.enter().send({from: winner, value: ethBet });

        const initialBalance = await web3.eth.getBalance(winner);
        console.log('initial ', initialBalance);
        await lottery.methods.pickWinner().send({from:accounts[0]});
        const finalBalance = await web3.eth.getBalance(winner);
        console.log('final ', finalBalance);
        const calculatedFinalBalance = BigInt(initialBalance) + BigInt(ethBet)
        console.log('Calculated final balance ', calculatedFinalBalance);
        
        assert.equal(calculatedFinalBalance, BigInt(finalBalance)); 
    });
});