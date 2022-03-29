const { ethers } = require("hardhat");
const multiReceiver = require("../../artifacts/contracts/rinkeby/MultiReceiver.sol/MultiReceiver.json");

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  const multiReceiverAddress = "0x24edcbd6a75d3a7d9d9051b9a91823fcb9c58b97";
  const contract = new ethers.Contract(multiReceiverAddress, multiReceiver.abi, deployer);
  const lastFunctionCalled = await contract.lastFunctionCalled();
  console.log("Last Function Called: ", ethers.utils.formatUnits(lastFunctionCalled, "wei"));
  const setOne = await contract.setOne();
  console.log("Set One: ", ethers.utils.formatUnits(setOne, "wei"));
  const setTwo = await contract.setTwo();
  console.log("Set Two: ", setTwo);
  const setThree = await contract.setThree();
  console.log("Set Three: ", setThree);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
