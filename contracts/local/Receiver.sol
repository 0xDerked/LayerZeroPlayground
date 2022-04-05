//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "../interfaces/ILayerZeroReceiver.sol";

contract Receiver is ILayerZeroReceiver {

	uint256 public lastFunc;
	bool public callSucceeded;
	uint256 public one;
	address public two;
	string public three;

	constructor (){}

	modifier onlyContract {
		require(msg.sender == address(this));
		_;
	}

	function lzReceive(uint16 _srcChainId, bytes calldata _srcAddress, uint64 _nonce, bytes calldata _payload) external override {

		(bool success, ) = address(this).call(_payload);
		callSucceeded = success;

	}

	function setOne(uint256 _one) external onlyContract {
		one = _one;
		lastFunc=1;
	}

	function setTwo(address _two) external onlyContract {
		two = _two;
		lastFunc=2;
	}

	function setThree(string calldata _three) external onlyContract {
		three = _three;
		lastFunc=3;
	}

	fallback() external {
		lastFunc=4;
	}

}