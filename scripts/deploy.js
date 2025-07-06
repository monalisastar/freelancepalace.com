const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);

  // 1. Deploy TokenManager
  const TokenManager = await ethers.getContractFactory("TokenManager");
  const tokenManager = await TokenManager.deploy();
  await tokenManager.deployed();
  console.log("✅ TokenManager deployed to:", tokenManager.address);

  // Save address for use in next deployment (e.g., EscrowBase)
  // Optional: write to a .json file if you want to persist it
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

