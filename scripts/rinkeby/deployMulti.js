const { ethers } = require("hardhat");
const { chainInfo } = require("../data/chainInfo.js");

/*
  Deploys the MultiReceiver on Rinkeby
*/

const deploy = async () => {
  const factory = await ethers.getContractFactory("MultiReceiver");
  const contract = await factory.deploy(chainInfo.rinkeby.endpoint);
  await contract.deployed();
  console.log("MultiReceiver Address:", contract.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
