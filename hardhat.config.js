require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

const RINKEBY_INFURA_ENDPOINT = process.env.RINKEBY;
const MUMBAI_ENDPOINT = process.env.MUMBAI;
const OPTIMISM_ENDPOINT = process.env.OPTIMISM_KOVAN;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    rinkeby: {
      url: RINKEBY_INFURA_ENDPOINT,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2],
      gas: "auto",
    },
    mumbai: {
      url: MUMBAI_ENDPOINT,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2],
      gas: "auto",
    },
    optimism_kovan: {
      url: OPTIMISM_ENDPOINT,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2],
      gas: "auto",
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 2000000,
  },
};
