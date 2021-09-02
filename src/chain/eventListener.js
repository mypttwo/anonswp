import Web3 from "web3";
import { address, abi } from "./gdai";

export const contractEventHandler = (handleBalanceUpdate) => {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(abi, address);

  //setup events here
  contract.events.BalanceUpdate(async (error, event) => {
    if (handleBalanceUpdate) {
      handleBalanceUpdate(error, event);
    }
  });

  return contract;
};
