import { ethers } from "hardhat";

async function main() {
  const PohelaBoishak = await ethers.getContractFactory("PohelaBoishak");
  const pb = await PohelaBoishak.deploy();
  await pb.deployed();
  console.log("PohelaBoishak deployed to:", pb.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
