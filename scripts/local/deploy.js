const { ethers } = require("hardhat");

const deploy = async () => {
  const factory = await ethers.getContractFactory("Receiver");
  const receiver = await factory.deploy();
  await receiver.deployed();
  console.log("Receiver Address: ", receiver.address);
};

deploy();
