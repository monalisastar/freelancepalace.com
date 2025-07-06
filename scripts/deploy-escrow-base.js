const hre = require("hardhat");
const { getAddress } = hre.ethers;

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying EscrowBase from:", deployer.address);

  // ✅ Replace or update these later via setX() functions
  const platformFeeAddress = getAddress("0x000000000000000000000000000000000000dEaD");
  const treasuryAddress = getAddress("0x000000000000000000000000000000000000dEaD");
  const rewardManager = getAddress("0x000000000000000000000000000000000000dEaD");

  // ✅ Your real deployed TokenManager address (from earlier deployment)
  const tokenManager = getAddress("0x3994bf8Dd903097F81F4d666e8d8E744728586f0");

  // Deploy EscrowBase
  const EscrowBase = await hre.ethers.getContractFactory("EscrowBase");
  const escrow = await EscrowBase.deploy(
    platformFeeAddress,
    treasuryAddress,
    rewardManager,
    tokenManager
  );

  await escrow.waitForDeployment();
  console.log("✅ EscrowBase deployed to:", escrow.target);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
  });

