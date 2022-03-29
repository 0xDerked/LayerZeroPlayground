### LAYER ZERO PLAYGROUND

- This is a public playground where I'm experimenting with Layer Zero contracts and infra
- None of this has any security guarantees and should not be used in production without thorough investigation

## MultiReceiver

- Based on the Stargate contracts
- Contract takes in a payload in lzReceive, decodes params, and executes a function based on upon the specified input
- The MultiReceiver is live and verified on Rinkeby here: https://rinkeby.etherscan.io/address/0x24edcbd6a75d3a7d9d9051b9a91823fcb9c58b97
- You should be able to send a message to any Layer Zero endpoint on any chain and have it received on Rinkeby. Example is in the sendToRinkeby script in the Optimism Kovan folder.
- The example sends 1 of 3 different types of payloads from Optimism Kovan and is received by the contract on Rinkeby and updates the state accordingly.
