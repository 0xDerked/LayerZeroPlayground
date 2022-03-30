const { stargateInfo } = require("../data/stargateInfo.js");
const sgRouter = require("../data/sgRouter.json");
const { ethers } = require("hardhat");

const main = async () => {
  const accounts = await ethers.getSigners();
  const multiReceiverSgAddress = "0x6F575a5dbe220F65e18523d870d66D33FF4F6e1e";
  const encodedAddress = ethers.utils.defaultAbiCoder.encode(["address"], [multiReceiverSgAddress]);
  console.log(encodedAddress);
  const sgRouterContract = new ethers.Contract(stargateInfo.rinkeby.router, sgRouter.abi, accounts[0]);
  const payload1 = ethers.utils.defaultAbiCoder.encode(["uint8", "address", "uint256"], [1, accounts[1].address, 8]);
  const dstChainId = stargateInfo.optimismKovan.chainId;
  const lzTxParams = { dstGasForCall: 200000, dstNativeAmount: 0, dstNativeAddr: "0x" };
  try {
    const feeEstimate = await sgRouterContract.quoteLayerZeroFee(dstChainId, 1, encodedAddress, "0x", lzTxParams);
    console.log(feeEstimate);
  } catch (e) {
    console.log(e);
  }
};

main();
