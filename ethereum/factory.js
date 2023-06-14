import web3 from './web3'; //import the indtsnce of web3 from web3.js
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0x0E3Df6C58DCFAd39d4857BdC84952F32e7ec2F05'
);

export default instance;