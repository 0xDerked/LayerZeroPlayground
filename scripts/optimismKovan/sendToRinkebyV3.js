const { stargateInfo } = require("../data/stargateInfo.js");
const sgRouter = require("../data/sgRouter.json");
const { ethers } = require("hardhat");

const main = async () => {
  const accounts = await ethers.getSigners();
  const rinkebyReceiverAddress = "0x78406477bc8bB7150d12A1Fa20BAF1982E46d84d";
  const sgRouterContract = new ethers.Contract(stargateInfo.optimismKovan.router, sgRouter.abi, accounts[0]);
  const payload1 = ethers.utils.defaultAbiCoder.encode(["uint8", "address", "uint256"], [1, accounts[1].address, 8]);
  const dstChainId = stargateInfo.rinkeby.chainId;
  const lzTxParams = { dstGasForCall: 200000, dstNativeAmount: 0, dstNativeAddr: "0x" };
  let feeEstimate;
  try {
    feeEstimate = await sgRouterContract.quoteLayerZeroFee(dstChainId, 1, rinkebyReceiverAddress, payload1, lzTxParams);
    console.log(feeEstimate);
  } catch (e) {
    console.log(e);
  }

  //   const approveAbi = ["function approve(address spender, uint256 amount)"];
  //   const USDCMock = new ethers.Contract(stargateInfo.optimismKovan.USDC, approveAbi, accounts[0]);
  //   const approve = await USDCMock.approve(stargateInfo.optimismKovan.router, ethers.constants.MaxUint256);
  //   await approve.wait();

  //   const amountToSend = ethers.utils.parseUnits("50", 6);
  //   const minAmount = amountToSend.mul(98).div(100);
  //   const swapTx = await sgRouterContract.swap(dstChainId, 1, 1, accounts[0].address, amountToSend, minAmount, lzTxParams, rinkebyReceiverAddress, payload1, {
  //     value: feeEstimate[0],
  //   });
  //   await swapTx.wait();
};

main();
