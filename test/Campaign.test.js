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
    accounts = await web3.eth.getAccounts(); //Ganache generate by default 10 accounts

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'});

    await factory.methods.createCampaign('100').send({ // To deploy a campaign we need to use the method createCampaign which take as argument the minimum contribution
        from: accounts[0], // for each send transaction we need also to specify the account 
        gas: '1000000' // and the gas
    });

    const addresses = await factory.methods.getDeployedCampaigns().call(); // this will return an array of addressess of all the campaigns deployed through the facrtory
    campaignAddress = addresses[0];
    campaign = await new web3.eth.Contract( // Instance of our campaign with 2 arguments, the interface and the address
        JSON.parse(compiledCampaign.interface), //we have already deployed the campaign before through the factory, so we just need to make it readable
        campaignAddress // and we save the address
    );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call(); //we did not create a get function for manager in our contract but that is not necessary because whenevere we mark as public a variable a get function is automatically created
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call()
        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '99', //minimum contribution is 100
                from: accounts[2]
            });
            assert(false); // if the transaction is exacuted the test will fail
        } catch (err) {
            assert(err);
        }
    });
});