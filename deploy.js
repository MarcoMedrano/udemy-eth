// deploy code will go here
const  HDWalletProvider =  require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'mnemonic 12',
    'https://rinkeby.infura.io/v3/7dcec5d64d2e47aaae0a6e55daadf608'
);

const web3 = new Web3(provider);

const deploy = async() =>{
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from account ', accounts[0]);

    const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:['Hello nena!']})
    .send({from: accounts[0], gas:'1000000'});

    console.log('Contract address ', inbox.options.address); // 0x38117d1CfE395Ea5233Ba62fA8c934F476781E5F
    // https://rinkeby.etherscan.io/address/0x38117d1cfe395ea5233ba62fa8c934f476781e5f
    
    //prevent hanging
    provider.engine.stop();
};

deploy();