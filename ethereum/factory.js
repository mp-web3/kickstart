import getWeb3 from './web3';
import Factory from './build/Factory.json';

let instance;

const getInstance = async () => {
  if (!instance) {
    const web3 = getWeb3();
    instance = new web3.eth.Contract(
      JSON.parse(Factory.interface),
      '0x0E3Df6C58DCFAd39d4857BdC84952F32e7ec2F05'
    );
  }

  return instance;
};

export default getInstance;