require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  sourcify: {
    enabled: false
  },
  etherscan: {
    apiKey: {
      testnet: "x",
      mainnet: "x"
    },
    customChains: [
      {
        network: "testnet",
        chainId: 14333,
        ensAddress: null,
        urls: {
          apiURL: "https://test-explorer.vitruveo.xyz/api",
          browserURL: "https://www.vitruveo.xyz",
        }
      },
      {
        network: "mainnet",
        chainId: 1490,
        urls: {
          apiURL: "https://explorer.vitruveo.xyz/api",
          browserURL: "https://www.vitruveo.xyz",
        }
      }

    ]

  },
  networks: {
    local: {
      url: "http://localhost:8545",
      accounts: [
                  process.env.CORE_PRIVATE_KEY              
                ]  
    },
    testnet: {
      url: "https://test-rpc.vitruveo.xyz",
      accounts: [
                  process.env.CORE_PRIVATE_KEY
                ]  
    },
    mainnet: {
      url: "https://rpc.vitruveo.xyz",
      accounts: [
                  process.env.CORE_PRIVATE_KEY
                ]  
    }
  }
};
