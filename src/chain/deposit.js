import Web3 from "web3";
import { address, abi } from "./gdai";
import { daiAddress, daiAbi } from "./dai";

const approveTransfer = async (value, recieptHandler) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (accounts.length) {
    let web3 = new Web3(window.web3.currentProvider);
    let dai = new web3.eth.Contract(daiAbi, daiAddress);

    let allowance = await dai.methods.allowance(accounts[0], address).call();
    console.log("allowance", allowance);
    if (allowance > value) {
      return;
    }
    try {
      await dai.methods
        // .approve(accounts[0], web3.utils.toWei(`${value}`))
        .approve(address, value)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log("hash :" + hash);
        })
        .on("receipt", async function (receipt) {
          if (recieptHandler) {
            recieptHandler(null, receipt);
          } else console.log("receipt :" + JSON.stringify(receipt));
        })
        .on("error", function (error, receipt) {
          if (recieptHandler) {
            recieptHandler(error, receipt);
          } else {
            console.log("error :" + error);
            console.log("receipt :" + JSON.stringify(receipt));
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const deposit = async (destinationAddress, amount, recieptHandler) => {
  let web3 = new Web3(window.web3.currentProvider);
  await approveTransfer(web3.utils.toWei(`${amount + 100}`));
  let contract = new web3.eth.Contract(abi, address);
  const addressArray = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  let encAdd = await contract.methods.hash(destinationAddress).call();
  await contract.methods
    .depositDai(encAdd, web3.utils.toWei(`${amount}`))
    // .depositDai(encAdd, amount)
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

export { deposit };
