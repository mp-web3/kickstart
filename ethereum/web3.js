import Web3 from 'web3';

const getWeb3 = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    return new Web3(window.ethereum);
  }
  // Handle the case where the user doesn't have MetaMask installed
  // Perhaps show them a message prompting them to install MetaMask
  return null;
};

export default getWeb3;