const { ethers } = require("hardhat");
const receiver = require("../../artifacts/contracts/local/Receiver.sol/Receiver.json");
const main = async () => {
  const accounts = await ethers.getSigners();
  const receiverAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const receiverContract = new ethers.Contract(receiverAddress, receiver.abi, accounts[0]);
  const payload = receiverContract.interface.encodeFunctionData("setOne", [8]);
  const payload2 = receiverContract.interface.encodeFunctionData("setTwo", [accounts[3].address]);
  console.log(payload2);
  const tx = await receiverContract.lzReceive(1, accounts[0].address, 0, payload);
  await tx.wait();
};

main();
