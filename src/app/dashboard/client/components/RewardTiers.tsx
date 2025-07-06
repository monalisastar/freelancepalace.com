// app/dashboard/client/components/RewardTiers.tsx
"use client";

import { motion } from "framer-motion";
import { Gift, TrendingUp, Trophy } from "lucide-react";

const currentFLR = 340;
const tier = "Gold";
const nextTier = "Platinum";
const targetFLR = 500;
const percent = Math.min((currentFLR / targetFLR) * 100, 100);
const flrNeeded = targetFLR - currentFLR;

export default function RewardTiers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-white/50 backdrop-blur-md p-6 border border-white/30 shadow-md space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Trophy size={18} /> FLR Rewards Tier
        </h3>
        <span className="text-xs text-gray-600">FLR: {currentFLR}</span>
      </div>

      {/* Current Tier */}
      <div className="text-sm text-gray-700">
        🏅 You are currently <strong>{tier}</strong> tier.
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>{currentFLR} FLR</span>
          <span>{targetFLR} FLR ({nextTier})</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Nudge */}
      <div className="text-xs text-blue-800 bg-blue-100 px-3 py-2 rounded-md inline-flex items-center gap-1">
        <TrendingUp size={14} /> Only <strong className="ml-1">{flrNeeded} FLR</strong> away from <strong className="ml-1">{nextTier}</strong> tier!
      </div>

      {/* Bonus Section */}
      <div className="bg-white/70 border border-white/40 p-4 rounded-xl space-y-1 text-sm text-gray-700">
        <div className="flex items-center gap-2 font-medium">
          <Gift size={16} className="text-yellow-500" />
          Unlocked Perks (Gold)
        </div>
        <ul className="list-disc ml-5 mt-1 space-y-1 text-xs">
          <li>✅ 10% platform fee discount</li>
          <li>✅ Bonus FLR for every referral</li>
        </ul>
        <div className="mt-2 text-xs text-gray-500">
          🎯 Next Tier Bonus: Priority project placement + 0% fees
        </div>
      </div>

      {/* Optional AI Insight (mocked) */}
      <div className="text-xs text-green-700 bg-green-100 px-3 py-2 rounded-md mt-2">
        🤖 FLR Assistant Tip: Based on your current pace, you’ll reach Platinum by the 28th!
      </div>
    </motion.div>
  );
}

