const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); /* Create an instance of Web3 */

const compiledFactory = require('../ethereum/build/Factory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');


let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'});

    await factory.methods.createCampaign('100').send({ // To deploy a campaign we need to use the method createCampaign which take as argument the minimum contribution
        from: accounts[0], // for each send transaction we need also to specify the account 
        gas: '1000000' // and the gas
    });

    await factory.methods.getDeployedCampaigns().call(); // this will return an array of addressess of all the campaigns deployed through the facrtory
});