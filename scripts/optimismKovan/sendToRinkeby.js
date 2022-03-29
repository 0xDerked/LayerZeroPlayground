//Send a call from an address on Optimism-Kovan to Rinkeby
//call the optimism kovan endpoint with send with proper amount of fees and desired payload
const { ethers } = require("hardhat");
const { chainInfo } = require("../data/chainInfo.js");
const execute = async () => {
  const accounts = await ethers.getSigners();
  const endpointAbi = [
    "function send(uint16 _dstChainId, bytes calldata _destination, bytes calldata _payload, address payable _refundAddress, address _zroPaymentAddress, bytes calldata _adapterParams) payable",
    "function estimateFees(uint16 _dstChainId, address _userApplication, bytes calldata _payload, bool _payInZRO, bytes calldata _adapterParam) view returns (uint256, uint256)",
  ];
  //Launch the MultiReceiver on Rinkeby and get the address back
  const destinationAddress = "0x24EDcBd6a75D3A7D9d9051B9a91823fcb9c58b97";
  const endpoint = new ethers.Contract(chainInfo.optimismKovan.endpoint, endpointAbi, accounts[1]);
  const payload1 = ethers.utils.defaultAbiCoder.encode(["uint8", "uint256"], [1, 8]);
  const payload2 = ethers.utils.defaultAbiCoder.encode(["uint8", "address"], [2, accounts[1].address]);
  const payload3 = ethers.utils.defaultAbiCoder.encode(["uint8", "string"], [3, "Hello, Layer Zero!"]);

  //Switch the payload for whatever function you want to call
  const nativeFees = await endpoint.estimateFees(chainInfo.rinkeby.chainId, destinationAddress, payload3, false, []);
  await endpoint.send(chainInfo.rinkeby.chainId, destinationAddress, payload3, accounts[1].address, ethers.constants.AddressZero, [], {
    value: nativeFees[0],
  });
};

execute();
