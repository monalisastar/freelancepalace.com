const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`📦 Wallet Address: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} MATIC`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

