import Web3 from "web3";
import { address, abi } from "./gdai";

const withdraw = async (recieptHandler) => {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(abi, address);
  const addressArray = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  await contract.methods
    .withdraw()
    .send({ from: addressArray[0] })
    .on("transactionHash", function (hash) {
      console.log("transactionHash", hash);
    })
    .on("receipt", function (receipt) {
      if (recieptHandler) {
        recieptHandler(null, receipt);
      } else {
        console.log("receipt", receipt);
      }
    })
    .on("error", function (error, receipt) {
      if (recieptHandler) {
        recieptHandler(error, receipt);
      } else {
        console.log("error :" + error);
        console.log("receipt :" + JSON.stringify(receipt));
      }
    });
};

export { withdraw };
