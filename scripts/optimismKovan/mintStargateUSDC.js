const { ethers } = require("hardhat");
const { stargateInfo } = require("../data/chainInfo.js");

const main = async () => {
  const [account] = await ethers.getSigners();
  const abi = ["function mint(address _who, uint256 _value)"];
  const contract = new ethers.Contract(stargateInfo.optimismKovan.USDC, abi, account);
  const mintTx = await contract.mint(account.address, ethers.utils.parseUnits("10000", 6));
  console.log(mintTx);
  await mintTx.wait();
};

main();
