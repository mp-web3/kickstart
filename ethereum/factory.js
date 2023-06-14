import web3 from './web3'; //import the indtsnce of web3 from web3.js
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0xd3C93AE0598AB8292d690304469dA225C998107C'
);

export default instance;