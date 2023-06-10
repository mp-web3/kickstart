const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); /* Create an instance of Web3 */

const compiledFactory = require('../ethereum/build/Factory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');


