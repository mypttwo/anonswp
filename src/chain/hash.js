import Web3 from "web3";
import { address, abi } from "./gdai";

export const hash = async () => {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(abi, address);
  const addressArray = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  let encAdd = await contract.methods.hash(addressArray[0]).call();
  return encAdd;
};
