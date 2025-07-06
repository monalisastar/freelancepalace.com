const { expect } = require("chai");
const hre = require("hardhat");
const ethers = hre.ethers;

describe("EscrowDeal - Lifecycle Test", function () {
  let escrowDeal, token, client, freelancer, owner, treasury, platform;
  let milestones;

  beforeEach(async function () {
    [owner, client, freelancer, treasury, platform] = await ethers.getSigners();

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    token = await ERC20Mock.deploy("Test Token", "TT", 18);
    await token.waitForDeployment();
    await token.connect(owner).transfer(client.address, ethers.parseEther("1000"));

    const TokenManager = await ethers.getContractFactory("TokenManager");
    const tokenManager = await TokenManager.deploy();
    await tokenManager.waitForDeployment();

    const EscrowDeal = await ethers.getContractFactory("EscrowDeal");
    escrowDeal = await EscrowDeal.deploy(
      platform.address,
      treasury.address,
      "0x1111111111111111111111111111111111111111", // dummy rewardManager
      await tokenManager.getAddress()
    );
    await escrowDeal.waitForDeployment();

    const escrowAddress = await escrowDeal.getAddress();
    const tokenAddress = await token.getAddress();

    await token.connect(client).approve(escrowAddress, ethers.parseEther("3"));
    milestones = [ethers.parseEther("1"), ethers.parseEther("2")];

    // ✅ FINAL FIX: Correct parameter order
    await escrowDeal.connect(client).createEscrowDeal(
      client.address,
      freelancer.address,
      tokenAddress,
      [...milestones],
      "Qm123"
    );
  });

  it("should create a new escrow deal with milestones", async function () {
    const deal = await escrowDeal.deals(0);
    expect(deal.client).to.equal(client.address);
    expect(deal.freelancer).to.equal(freelancer.address);
    expect(deal.status).to.equal(0); // Created
  });
});

