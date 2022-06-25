require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('@nomiclabs/hardhat-solhint');
require('@nomiclabs/hardhat-truffle5');
require('hardhat-watcher');
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('hardhat-contract-sizer')
require('@openzeppelin/hardhat-upgrades');

task("random-seed", "Creates a random seed", async (taskArgs, hre) => {
  const wallet = hre.ethers.Wallet.createRandom()

  console.log(`Address: ${wallet.address}`)
  console.log(`Seed: ${wallet.mnemonic.phrase}`)
});

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const ONE_GWEI = 1000000000

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {

    },
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC,
        initialIndex: 0
      },
      network_id: 5777,
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC,
        initialIndex: 0
      },
      network_id: 80001
    },
    polygon: {
      url: process.env.POLYGON_URL,
      accounts: {
        mnemonic: process.env.PROD_MNEMONIC,
        initialIndex: 0,
      },
      gasPrice: 100 * ONE_GWEI,
      network_id: 137,
      timeout: 750000
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 500,
          }
        }
      },
    ]
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true
    },
    test: {
      tasks: ['test'],
      files: ['./test/*.js', './test/**/*.js', './contracts', './contracts/**']
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  contractSizer: {
    runOnCompile: true,
    strict: true,
  },
  etherscan: {
    apiKey: {
      polygon: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.ETHERSCAN_API_KEY
    }
  },
};
