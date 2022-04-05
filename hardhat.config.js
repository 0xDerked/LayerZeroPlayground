require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

const RINKEBY_INFURA_ENDPOINT = process.env.RINKEBY;
const MUMBAI_ENDPOINT = process.env.MUMBAI;
const OPTIMISM_ENDPOINT = process.env.OPTIMISM_KOVAN;
const OPTIMISM = process.env.OPTIMISM;
const AVAX = process.env.AVAX;
const POLYGON_ENDPOINT = process.env.POLYGON;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const OPTIMISTIC_API_KEY = process.env.OPTIMISTIC_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;
const PRIVATE_KEY3 = process.env.PRIVATE_KEY3;
const PRIVATE_KEY4 = process.env.PRIVATE_KEY4;

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      loggingEnabled: true,
    },
    hardhat: {
      loggingEnabled: true,
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
    optimisticKovan: {
      url: OPTIMISM_ENDPOINT,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2],
      gas: "auto",
    },
    optimism: {
      url: OPTIMISM,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2],
      gas: "auto",
    },
    polygon: {
      url: POLYGON_ENDPOINT,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3],
      gas: "auto",
      chainId: 137,
    },
    avax: {
      url: AVAX,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2, PRIVATE_KEY3, PRIVATE_KEY4],
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
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      optimisticKovan: OPTIMISTIC_API_KEY,
      optimisticEthereum: OPTIMISTIC_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      avalanche: SNOWTRACE_API_KEY,
    },
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
