const fs = require("fs");
const path = require("path");

const wallets = {
  platformFee: "0xd3f7a96c2971d5ce38c3e4ae87e6b7d1b7344b01",
  treasury: "0x7b145c9aa9d9b0fe18c83568e879249398e3eb2d",
  rewardManager: "0x5cfdaaf7dfb394fb1f63aef53c1095a21656d75a",
  tokenManager: "0x3994bf8Dd903097F81F4d666e8d8E744728586f0",
  escrowBase: "0x311f80603A105FC88a122271F349BD768bF9DD46"
};

const outputPath = path.join(__dirname, "../frontend/constants/escrow-wallets.json");

fs.writeFileSync(outputPath, JSON.stringify(wallets, null, 2));
console.log("✅ Exported wallet config to:", outputPath);

