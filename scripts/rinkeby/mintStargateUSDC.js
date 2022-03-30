const { ethers } = require("hardhat");
const { stargateInfo } = require("../data/stargateInfo.js");

const main = async () => {
  const [account] = await ethers.getSigners();
  const abi = ["function mint(address _who, uint256 _value)"];
  const contract = new ethers.Contract(stargateInfo.rinkeby.USDC, abi, account);
  const mintTx = await contract.mint(account.address, ethers.utils.parseUnits("10000", 6));
  await mintTx.wait();
};

main();
