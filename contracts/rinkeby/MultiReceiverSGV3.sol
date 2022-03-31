
/*The idea here is to use sgReceive() OR lzReceiver() and execute arbitrary logic upon receipt of a message or a message with payment!
  1.) Get the function type
  2.) Decode the payload for the "to" address and the state change
  3.) Send the tokens to the "to" address and update the state
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../interfaces/IStargateReceiver.sol";
import "../interfaces/ILayerZeroReceiver.sol";

interface IERC20 {
	 function transfer(address to, uint256 amount) external returns (bool);
}

error NotFromRouter();
error NotFromEndpoint();
contract MultiReceiverSGV3 is IStargateReceiver, ILayerZeroReceiver {

	address public constant SG_ROUTER = 0x82A0F5F531F9ce0df1DF5619f74a0d3fA31FF561;
	address public constant LZ_ENDPOINT	= 0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA;
	uint8 internal constant TYPE_FUNCTION_ONE = 1;
	uint8 internal constant TYPE_FUNCTION_TWO = 2;
	uint8 internal constant TYPE_FUNCTION_THREE = 3;
	uint16 public lastChainId;
	bytes public lastSrcAddress;
	uint256 lastNonce;
	uint256 public one;
	address public two;
	string  public three;
	string public lzOrSg;

	constructor(){}

	function sgReceive(uint16 _chainId, bytes memory _srcAddress, uint256 _nonce, address _token, uint256 amountLD, bytes memory payload) external override {
		if (msg.sender != SG_ROUTER) revert NotFromRouter();
		uint8 functionType;
		lastChainId = _chainId;
		lastSrcAddress = _srcAddress;
		lzOrSg = "sg";
		lastNonce = _nonce;
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

	function lzReceive(uint16 _srcChainId, bytes calldata _srcAddress, uint64 _nonce, bytes memory _payload) external override {
		if (msg.sender != LZ_ENDPOINT) revert NotFromEndpoint();
		lzOrSg = "lz";
		uint8 functionType;
		lastChainId = _srcChainId;
		lastSrcAddress = _srcAddress;
		lastNonce = _nonce;
			assembly {
			functionType := mload(add(_payload, 32))
		}
		if(functionType==TYPE_FUNCTION_ONE) {
			(,uint256 _one) = abi.decode(_payload, (uint8,uint256));
			_setOne(_one);
		} else if (functionType==TYPE_FUNCTION_TWO) {
			(,address _two) = abi.decode(_payload, (uint8,address));
			_setTwo(_two);
		} else if (functionType==TYPE_FUNCTION_THREE) {
			(,string memory _three) = abi.decode(_payload, (uint8, string));
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