import Web3 from "web3";
 
let web3;

// since we are rendering our app through Next.js and Next.js render before serving to the DOM we need to make sure we are already in the browser and Metamask has injected Web3
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    process.env.ALCHEMY_URL //This is the node I already set up to deploy the contract (look into .env)
  );
  web3 = new Web3(provider);
}
 
export default web3;