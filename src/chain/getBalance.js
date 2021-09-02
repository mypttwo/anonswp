import Web3 from "web3";
import { address, abi } from "./gdai";

const getBalance = async () => {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(abi, address);
  const addressArray = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  let balance = await contract.methods
    .getBalance()
    .call({ from: addressArray[0] });
  return web3.utils.fromWei(`${balance}`);
};

export { getBalance };
