import web3 from './web3'; //import the indtsnce of web3 from web3.js
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x05D2035e858D30b272edAC0a276C757715Fa31A1'
);

export default instance;