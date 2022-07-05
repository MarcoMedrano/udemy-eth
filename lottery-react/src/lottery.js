
import web3 from './web3';
import abi from './lottery-abi.json';

const address = '0x9012c41a215050fA286d2aCF22F66fBA9e0dc0a0'

export default new web3.eth.Contract(abi, address);