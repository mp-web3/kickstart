import web3 from "./web3";
import Campaign from './build/Campaign.json';

// Function to create an instance of a campaign at a certain address

const campaignInstance = (address) => {
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    );
};

export default campaignInstance;