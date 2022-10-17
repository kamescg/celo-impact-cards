import 'dotenv/config'
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-dependency-compiler';
import 'hardhat-abi-exporter';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { HardhatUserConfig } from 'hardhat/config';
import networks from './hardhat.network';
import { constants } from 'ethers';

const optimizerEnabled = !process.env.OPTIMIZER_DISABLED;

const config: HardhatUserConfig = {
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    flat: false,
    except: ['./abis/ERC20.sol', './abis/ERC721.sol'],
  },
  // @ts-ignore
  anvil: {
    url: 'http://127.0.0.1:8545/',
    launch: false, // if set to `true`, it will spawn a new instance if the plugin is initialized, if set to `false` it expects an already running anvil instance
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  external: {
    contracts: [
      {
        artifacts: [
          '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol:IERC721Enumerable',
          "@erc721k/core-sol/contracts/ERC721K.sol:ERC721K",
        ]
      },
    ],
  },
  dependencyCompiler: {
    paths: [],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  mocha: {
    timeout: 30000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    administrator: {
      default: '0xA82922D5eA8b79c6363Dd71bC168Ad993A85413E', // Kames Admin
    },
    ethicHub: {
      default: '0xad2f9f4cd2ae4f2dd2841eb1ea7e162fb4767d4d', // 20CELO/80ETHIX ERC20.sol
      1: constants.AddressZero,
    },
    impactMarket: {
      // default: '0xBB04D738e013D5336B64352BFb428306b333530b', // OLD
      default: '0x1C51657af2ceBA3D5492bA0c5A17E562F7ba6593', // DonationMinerImplementation.sol
      1: constants.AddressZero,
    }
  },
  networks,
  solidity: {
    version: '0.8.15',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'istanbul',
    },
  },
};

export default config;
