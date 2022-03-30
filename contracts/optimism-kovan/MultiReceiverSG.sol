
/*The idea here is to use sgReceive() and execute arbitrary logic upon receipt of tokens
  1.) Get the function type
  2.) Decode the payload for the "to" address and the state change
  3.) Send the tokens to the "to" address and update the state
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../interfaces/IStargateReceiver.sol";

interface IERC20 {
	 function transfer(address to, uint256 amount) external returns (bool);
}

error NotFromRouter();
contract MultiReceiverSG is IStargateReceiver {

	address public constant SG_ROUTER = 0xCC68641528B948642bDE1729805d6cf1DECB0B00;
	uint8 internal constant TYPE_FUNCTION_ONE = 1;
	uint8 internal constant TYPE_FUNCTION_TWO = 2;
	uint8 internal constant TYPE_FUNCTION_THREE = 3;
	uint16 public lastChainId;
	bytes public lastSrcAddress;
	uint256 public one;
	address public two;
	string  public three;

	function sgReceive(uint16 _chainId, bytes memory _srcAddress, uint256 _nonce, address _token, uint256 amountLD, bytes memory payload) external override {
		if (msg.sender != SG_ROUTER) revert NotFromRouter();
		uint8 functionType;
		lastChainId = _chainId;
		lastSrcAddress = _srcAddress;
		assembly {
			functionType := mload(add(payload, 32))
		}
		if(functionType==TYPE_FUNCTION_ONE) {
			(,address to, uint256 _one) = abi.decode(payload, (uint8, address, uint256));
			IERC20(_token).transfer(to, amountLD);
			_setOne(_one);
		} else if (functionType==TYPE_FUNCTION_TWO) {
			(,address to, address _two) = abi.decode(payload, (uint8, address, address));
			IERC20(_token).transfer(to, amountLD);
			_setTwo(_two);
		} else if (functionType==TYPE_FUNCTION_THREE) {
			(,address to, string memory _three) = abi.decode(payload, (uint8, address, string));
			IERC20(_token).transfer(to, amountLD);
			_setThree(_three);
		}
	}

	function _setOne(uint256 _one) internal {
		one = _one;
	}

	function _setTwo(address _two) internal {
		two = _two;
	}

	function _setThree(string memory _three) internal {
		three = _three;
	}
}