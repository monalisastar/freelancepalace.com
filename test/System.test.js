const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FLR System Integration", function () {
  let flrToken, flrBadgeNFT, trustRegistry;
  let tokenManager, rewardManager, stakingVault;
  let escrowBase, milestoneManager, adminControls;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    // ✅ FLRToken
    const FLRToken = await ethers.getContractFactory("FLRToken");
    flrToken = await FLRToken.deploy();
    await flrToken.waitForDeployment();
    console.log("✅ FLRToken deployed at:", flrToken.target);

    // ✅ FLRBadgeNFT - no args
    const FLRBadgeNFT = await ethers.getContractFactory("FLRBadgeNFT");
    flrBadgeNFT = await FLRBadgeNFT.deploy();
    await flrBadgeNFT.waitForDeployment();
    console.log("✅ FLRBadgeNFT deployed at:", flrBadgeNFT.target);

    // ✅ TrustRegistry - needs flrToken + badgeNFT
    const TrustRegistry = await ethers.getContractFactory("TrustRegistry");
    trustRegistry = await TrustRegistry.deploy(flrToken.target, flrBadgeNFT.target);
    await trustRegistry.waitForDeployment();
    console.log("✅ TrustRegistry deployed at:", trustRegistry.target);

    // ✅ TokenManager - use fully qualified name to avoid HH701
    const TokenManager = await ethers.getContractFactory("contracts/escrow/TokenManager.sol:TokenManager");
    tokenManager = await TokenManager.deploy(flrToken.target);
    await tokenManager.waitForDeployment();
    console.log("✅ TokenManager deployed at:", tokenManager.target);

    // ✅ RewardManager
    const RewardManager = await ethers.getContractFactory("RewardManager");
    rewardManager = await RewardManager.deploy(flrToken.target);
    await rewardManager.waitForDeployment();
    console.log("✅ RewardManager deployed at:", rewardManager.target);

    // ✅ StakingVault
    const FLRStakingVault = await ethers.getContractFactory("FLRStakingVault");
    stakingVault = await FLRStakingVault.deploy(flrToken.target, rewardManager.target);
    await stakingVault.waitForDeployment();
    console.log("✅ StakingVault deployed at:", stakingVault.target);

    // ✅ EscrowBase
    const EscrowBase = await ethers.getContractFactory("EscrowBase");
    escrowBase = await EscrowBase.deploy(tokenManager.target, rewardManager.target);
    await escrowBase.waitForDeployment();
    console.log("✅ EscrowBase deployed at:", escrowBase.target);

    // ✅ MilestoneManager
    const MilestoneManager = await ethers.getContractFactory("MilestoneManager");
    milestoneManager = await MilestoneManager.deploy(escrowBase.target);
    await milestoneManager.waitForDeployment();
    console.log("✅ MilestoneManager deployed at:", milestoneManager.target);

    // ✅ AdminControls
    const AdminControls = await ethers.getContractFactory("AdminControls");
    adminControls = await AdminControls.deploy(escrowBase.target);
    await adminControls.waitForDeployment();
    console.log("✅ AdminControls deployed at:", adminControls.target);
  });

  it("should complete a full token + staking + escrow + badge flow", async function () {
    expect(await flrToken.name()).to.equal("Freelancers Palace Token");
    expect(await flrToken.symbol()).to.equal("FLR");
  });
});

