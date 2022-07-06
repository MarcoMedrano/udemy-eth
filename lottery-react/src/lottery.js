
import web3 from './web3';
import abi from './lottery-abi.json';

const address = '0x52BE8C808fb40bE1c2A32D3392B5c7BE6d670c12'

export default new web3.eth.Contract(abi, address);