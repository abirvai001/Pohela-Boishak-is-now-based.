// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PohelaBoishak {
    event BoishakGreeting(address indexed from, address indexed to, string message, uint256 timestamp);

    // Send a greeting (emit an event so it appears on explorers)
    function sendGreeting(address to, string calldata message) external {
        emit BoishakGreeting(msg.sender, to, message, block.timestamp);
    }
}

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

const ALCHEMY_URL = process.env.BASE_RPC || "";
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";

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
