import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-docgen";
import dotenv from "dotenv"
dotenv.config()
const config: HardhatUserConfig = {
	solidity:{
    version:"0.8.20",
    settings:{
      optimizer:{
        enabled:true,
        runs:200
      }
    }
  },
  networks:{
    fantomTestnet:{
      url:`${process.env.FANTOM_TESTNET_RPC_URL || "https://rpc.ankr.com/fantom_testnet"}`,
      chainId:4002,
      accounts:{
        mnemonic:`${process.env.MNEMONIC}`
      }
    },
    hardhatNode:{
      url:"http://localhost:8545"
    }
  },
  etherscan:{
    apiKey:`${process.env.ETHERSCAN_API_KEY}`
  }
};

export default config;