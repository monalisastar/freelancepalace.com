const fs = require("fs");
const path = require("path");

const CONTRACT_NAME = "EscrowBase";
const artifactPath = path.resolve(
  __dirname,
  `../artifacts/contracts/${CONTRACT_NAME}.sol/${CONTRACT_NAME}.json`
);
const outputPath = path.resolve(
  __dirname,
  `../frontend/abis/${CONTRACT_NAME}.json`
);

// Ensure frontend/abis folder exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Extract ABI only
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const abiOnly = JSON.stringify(artifact.abi, null, 2);

fs.writeFileSync(outputPath, abiOnly);
console.log(`✅ Synced ${CONTRACT_NAME} ABI to frontend/abis/${CONTRACT_NAME}.json`);

