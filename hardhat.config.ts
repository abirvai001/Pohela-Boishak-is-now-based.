import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

const ALCHEMY_URL = process.env.BASE_RPC || "https://base-sepolia.g.alchemy.com/v2/JT59Wk4K3PNugfTNSXiVMkNbV9KmGc1t";
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x02d8ada905713748535090eb84a0cb4dc4dc9982e2e582534cc0e75f487b9cbc";

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
