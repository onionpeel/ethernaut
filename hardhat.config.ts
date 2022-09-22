import '@nomiclabs/hardhat-ethers';
import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import '@typechain/hardhat';
// import "hardhat-gas-reporter";
// import "@nomiclabs/hardhat-etherscan";
// import "hardhat-contract-sizer";
import 'solidity-coverage'; // npx hardhat coverage [command-options]
import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
         version: '0.8.15',
      },
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0,
      // "rinkeby": process.env.<ENTER_DEPLOYER>!
    },
    user1: 1,
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local']
    },
    hardhat: {
      live: false,
      saveDeployments: true,
      tags: ['local', 'test'],
    },
    // hardhat: {
    //   live: false,
    //   saveDeployments: true,
    //   tags: ['local', 'test'],
    //   forking: {
    //     url: process.env.ALCHEMY_MAINNET_RPC_URL!,
    //     blockNumber: 13910565
    //   }
    // },
    // rinkeby: {
    //   url: process.env.RINKEBY_URL || "",
    //   accounts:
    //     process.env.<ENTER_PRIVATE_KEY> !== undefined ?
    //       [process.env.<ENTER_PRIVATE_KEY>] : [],
    //   tags: ['rinkeby']
    // },
    // goerli: {
    //   url: process.env.GOERLI_URL || "",
    //   accounts:
    //     process.env.<ENTER_PRIVATE_KEY> !== undefined ?
    //       [process.env.<ENTER_PRIVATE_KEY>] : [],
    //   tags: ['goerli']
    // },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY
  // },
  typechain: {
    outDir: "./typechain-types",
    target: 'ethers-v5',
    alwaysGenerateOverloads: true
  },
  // contractSizer: {    // npx hardhat size-contracts
  //   alphaSort: true,
  //   disambiguatePaths: false,
  //   runOnCompile: true,
  // },
};
export default config;
