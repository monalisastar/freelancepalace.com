import { ethers } from "ethers";
import EscrowBaseABI from "@/abis/EscrowBase.json"; // ✅ Ensure ABI is present
import { ESCROW_BASE_ADDRESS } from "@/constants/addresses"; // Your deployed contract

export async function getWallets(provider) {
  const contract = new ethers.Contract(ESCROW_BASE_ADDRESS, EscrowBaseABI, provider);

  const [platformFee, treasury, rewardManager, tokenManager] = await Promise.all([
    contract.platformFeeAddress(),
    contract.treasuryAddress(),
    contract.rewardManager(),
    contract.tokenManager(),
  ]);

  return {
    platformFee,
    treasury,
    rewardManager,
    tokenManager,
  };
}

