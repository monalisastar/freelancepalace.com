const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EscrowBase - Wallet Update Flow", function () {
  let EscrowBase, escrow, deployer, addr1, addr2, addr3, addr4;

  const dummy = "0x000000000000000000000000000000000000dEaD";

  beforeEach(async function () {
    [deployer, addr1, addr2, addr3, addr4] = await ethers.getSigners();

    EscrowBase = await ethers.getContractFactory("EscrowBase");
    escrow = await EscrowBase.deploy(dummy, dummy, dummy, dummy);
    await escrow.waitForDeployment(); // ✅ fixed for Ethers v6
  });

  it("should deploy with dummy addresses", async function () {
    expect(await escrow.platformFeeAddress()).to.equal(dummy);
    expect(await escrow.treasuryAddress()).to.equal(dummy);
    expect(await escrow.rewardManager()).to.equal(dummy);
    expect(await escrow.tokenManager()).to.equal(dummy);
  });

  it("should allow owner to update platformFeeAddress", async function () {
    await escrow.setPlatformFeeAddress(addr1.address);
    expect(await escrow.platformFeeAddress()).to.equal(addr1.address);
  });

  it("should allow owner to update treasuryAddress", async function () {
    await escrow.setTreasuryAddress(addr2.address);
    expect(await escrow.treasuryAddress()).to.equal(addr2.address);
  });

  it("should allow owner to update rewardManager", async function () {
    await escrow.setRewardManager(addr3.address);
    expect(await escrow.rewardManager()).to.equal(addr3.address);
  });

  it("should allow owner to update tokenManager", async function () {
    await escrow.setTokenManager(addr4.address);
    expect(await escrow.tokenManager()).to.equal(addr4.address);
  });

  it("should revert if non-owner tries to update", async function () {
    await expect(
      escrow.connect(addr1).setPlatformFeeAddress(addr1.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});

