const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔐 Connected as:", deployer.address);

  const escrowAddress = "0x311f80603A105FC88a122271F349BD768bF9DD46";
  const EscrowBase = await hre.ethers.getContractFactory("EscrowBase");
  const escrow = await EscrowBase.attach(escrowAddress);

  // ✅ Use lowercase addresses directly if checksum error persists
  const platformFeeWallet = "0xd3f7a96c2971d5ce38c3e4ae87e6b7d1b7344b01";
  const treasuryWallet = "0x7b145c9aa9d9b0fe18c83568e879249398e3eb2d";
  const rewardManager = "0x5cfdaaf7dfb394fb1f63aef53c1095a21656d75a";

  await (await escrow.setPlatformFeeAddress(platformFeeWallet)).wait();
  console.log("✅ Platform fee address updated:", platformFeeWallet);

  await (await escrow.setTreasuryAddress(treasuryWallet)).wait();
  console.log("✅ Treasury address updated:", treasuryWallet);

  await (await escrow.setRewardManager(rewardManager)).wait();
  console.log("✅ Reward manager updated:", rewardManager);
}

main().catch((err) => {
  console.error("❌ Error updating wallets:", err);
  process.exit(1);
});

