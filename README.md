### LAYER ZERO PLAYGROUND

- This is a public playground where I'm experimenting with Layer Zero contracts and infra
- None of this has any security guarantees and should not be used in production without thorough investigation

## MultiReceiver

- Based on the Stargate contracts
- Contract takes in a payload in lzReceive, decodes params, and executes a function based on upon the specified input
- The MultiReceiver is live and verified on Rinkeby here: https://rinkeby.etherscan.io/address/0x24edcbd6a75d3a7d9d9051b9a91823fcb9c58b97
- You should be able to send a message to any Layer Zero endpoint on any chain and have it received on Rinkeby. Example is in the sendToRinkeby script in the Optimism Kovan folder.
- The example sends 1 of 3 different types of payloads from Optimism Kovan and is received by the contract on Rinkeby and updates the state accordingly.

## MultiReceiverSGV3

- Implements sgReceive as well as lzReceive
- Contracts takes in a payload for both lzReceive and sgReceive, as well as tokens for sgReceive
- Executes logic based on which payload is sent and if it's from sg or lz
- Updates state accordingly for testing purposes
- Live and verified on Rinkeby at https://rinkeby.etherscan.io/address/0x78406477bc8bB7150d12A1Fa20BAF1982E46d84d#code

## Local Receiver

- Example of using a low level call to execute arbitrary payloads received by the contract
