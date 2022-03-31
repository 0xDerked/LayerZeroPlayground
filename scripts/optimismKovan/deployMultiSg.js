const { ethers } = require("hardhat");

/*
  Deploys the MultiReceiverSg on Optimism-Kovan
*/

const deploy = async () => {
  const factory = await ethers.getContractFactory("MultiReceiverSGV2");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log("MultiReceiverSG Address:", contract.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
