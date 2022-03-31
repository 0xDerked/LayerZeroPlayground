const { ethers } = require("hardhat");
const { chainInfo } = require("../data/chainInfo.js");

/*
  Deploys the MultiReceiver on Rinkeby
*/

const deploy = async () => {
  const factory = await ethers.getContractFactory("contracts/rinkeby/MultiReceiverSGV3.sol:MultiReceiverSGV3");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log("MultiReceiverSGV3 Address:", contract.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
