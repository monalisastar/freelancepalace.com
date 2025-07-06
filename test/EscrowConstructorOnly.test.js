// test/EscrowConstructorOnly.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EscrowBase - Constructor Test Only", function () {
  let escrow;

  it("should deploy with constructor args", async function () {
    const [owner] = await ethers.getSigners();

    const Dummy = await ethers.getContractFactory("contracts/escrow/TokenManager.sol:TokenManager");
    const dummyTokenMgr = await Dummy.deploy();
    await dummyTokenMgr.deployed();

    const DummyReward = await ethers.getContractFactory("contracts/escrow/RewardManager.sol:RewardManager");
    const dummyRewardMgr = await DummyReward.deploy();
    await dummyRewardMgr.deployed();

    const Escrow = await ethers.getContractFactory("contracts/escrow/EscrowBase.sol:EscrowBase");
    escrow = await Escrow.deploy(owner.address, dummyTokenMgr.address, dummyRewardMgr.address);
    await escrow.deployed();

    expect(await escrow.admin()).to.equal(owner.address);
  });
});

