const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying TokenManager with:", deployer.address);

  const TokenManager = await ethers.getContractFactory("TokenManager");
  const tokenManager = await TokenManager.deploy(); // deploy without args

  await tokenManager.waitForDeployment(); // this replaces .deployed()

  console.log("✅ TokenManager deployed to:", await tokenManager.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});


