import web3 from './web3'; //import the indtsnce of web3 from web3.js
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(Factory.interface),
    '0xfee0e104E6e01dB59DC8DD91F41Fb1Fc6FfF7c36'
);

export default instance;