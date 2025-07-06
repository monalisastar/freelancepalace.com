// app/dashboard/client/components/WalletCard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, DollarSign, Coins, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const weeklySpendingData = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 180 },
  { day: "Wed", amount: 200 },
  { day: "Thu", amount: 90 },
  { day: "Fri", amount: 140 },
  { day: "Sat", amount: 220 },
  { day: "Sun", amount: 160 },
];

export default function WalletCard() {
  const escrowUSD = 1250;
  const flrBalance = 320;
  const flrSpent = 180;
  const flrEarned = flrBalance + flrSpent;
  const flrToUSD = 0.75;
  const flrToPlatinum = 80;

  const [showUSD, setShowUSD] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [graphExpanded, setGraphExpanded] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const toggleCurrency = () => setShowUSD(!showUSD);
  const toggleTransactions = () => setExpanded(!expanded);
  const toggleGraph = () => setGraphExpanded(!graphExpanded);

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => setClaimed(false), 3000); // Reset after 3s
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white/50 backdrop-blur-md border border-white/30 p-6 shadow-md space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Wallet size={18} /> Wallet Summary
          </h3>
          <p className="text-sm text-gray-600">Escrow + FLR Rewards</p>
        </div>
        <button
          onClick={toggleCurrency}
          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition"
        >
          Toggle to {showUSD ? "FLR" : "USD"}
        </button>
      </div>

      {/* Balances */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-gray-800">
            <DollarSign size={16} className="text-green-600" />
            Escrow Balance
          </span>
          <strong>${escrowUSD.toLocaleString()}</strong>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-gray-800">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Coins size={16} className="text-yellow-500" />
            </motion.div>
            FLR Balance
          </span>
          <strong>
            {showUSD
              ? `$${(flrBalance * flrToUSD).toFixed(2)}`
              : `${flrBalance} FLR`}
          </strong>
        </div>
      </div>

      {/* Rewards Summary */}
      <div className="rounded-lg bg-white/70 border border-white/40 p-4 mt-1 space-y-2">
        <p className="text-sm text-gray-700 font-medium">FLR Rewards Summary</p>
        <div className="flex justify-between text-xs">
          <span>Earned: <strong>{flrEarned} FLR</strong></span>
          <span>Spent: <strong>{flrSpent} FLR</strong></span>
        </div>
        <div className="text-blue-800 bg-blue-100 px-3 py-1 rounded-full inline-flex items-center gap-1 text-xs">
          <TrendingUp size={14} /> Earn <strong className="ml-1">{flrToPlatinum} more FLR</strong> to reach Platinum Tier!
        </div>
        <button
          onClick={handleClaim}
          disabled={claimed}
          className="w-full text-center mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          {claimed ? "🎉 Claimed!" : "Claim FLR Reward"}
        </button>
      </div>

      {/* Chart */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-700 font-medium">Weekly Escrow Activity</p>
          <button
            onClick={toggleGraph}
            className="text-xs text-blue-600 hover:underline"
          >
            {graphExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
        <ResponsiveContainer width="100%" height={graphExpanded ? 180 : 100}>
          <LineChart data={weeklySpendingData}>
            <XAxis dataKey="day" stroke="#888" fontSize={11} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                fontSize: "12px",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Expand Transactions */}
      <div>
        <button
          onClick={toggleTransactions}
          className="text-xs text-blue-700 hover:underline flex items-center gap-1"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />} 
          {expanded ? "Hide Transactions" : "Show Transactions"}
        </button>
        {expanded && (
          <div className="mt-3 text-xs text-gray-700 space-y-1">
            <p>• Released $200 to Zara Moon</p>
            <p>• Deposited $500 to Smart Contract Audit</p>
            <p>• Earned 50 FLR (Referral Bonus)</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

