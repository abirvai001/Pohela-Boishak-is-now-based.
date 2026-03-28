import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

const ALCHEMY_URL = process.env.BASE_RPC || "https://base-mainnet.g.alchemy.com/v2/JT59Wk4K3PNugfTNSXiVMkNbV9KmGc1t";
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "JT59Wk4K3PNugfTNSXiVMkNbV9KmGc1t";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    base: {
      url: ALCHEMY_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
