const { ethers } = require("hardhat");
const receiver = require("../../artifacts/contracts/local/Receiver.sol/Receiver.json");
const main = async () => {
  const accounts = await ethers.getSigners();
  const receiverAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const receiverContract = new ethers.Contract(receiverAddress, receiver.abi, accounts[0]);
  const lastFunc = await receiverContract.lastFunc();
  const one = await receiverContract.one();
  const two = await receiverContract.two();
  const three = await receiverContract.three();
  const succeeded = await receiverContract.callSucceeded();
  console.log("lastFunc: ", lastFunc);
  console.log("one: ", one);
  console.log("two: ", two);
  console.log("three: ", three);
  console.log("succeeded: ", succeeded);
};

main();
