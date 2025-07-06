// app/dashboard/client/components/StatsOverview.tsx
"use client";

import { motion } from "framer-motion";
import { BarChart2, Users, Smile } from "lucide-react";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const mockStats = {
  totalSpend: 3200,
  freelancersHired: 12,
  satisfaction: 94,
  monthlySpend: [
    { month: "Jan", amount: 400 },
    { month: "Feb", amount: 550 },
    { month: "Mar", amount: 300 },
    { month: "Apr", amount: 800 },
    { month: "May", amount: 1150 },
  ],
};

export default function StatsOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-white/50 backdrop-blur-md p-6 border border-white/30 shadow-md space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <BarChart2 size={18} /> Dashboard Overview
        </h3>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="bg-white/70 rounded-lg p-4 shadow-inner space-y-1">
          <div className="flex items-center gap-2 text-blue-700 font-medium">
            💰 Total Spend
          </div>
          <strong className="text-xl">${mockStats.totalSpend.toLocaleString()}</strong>
        </div>
        <div className="bg-white/70 rounded-lg p-4 shadow-inner space-y-1">
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <Users size={14} /> Freelancers Hired
          </div>
          <strong className="text-xl">{mockStats.freelancersHired}</strong>
        </div>
        <div className="bg-white/70 rounded-lg p-4 shadow-inner space-y-1">
          <div className="flex items-center gap-2 text-yellow-700 font-medium">
            <Smile size={14} /> Satisfaction
          </div>
          <strong className="text-xl">{mockStats.satisfaction}%</strong>
        </div>
      </div>

      {/* Chart */}
      <div>
        <p className="text-sm text-gray-800 mb-2 font-medium">Monthly Spend</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={mockStats.monthlySpend}>
            <XAxis dataKey="month" stroke="#888" fontSize={11} />
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

      {/* AI Tip */}
      <div className="text-xs text-green-700 bg-green-100 px-3 py-2 rounded-md">
        🤖 FLR Assistant Tip: You’ve spent the most in AI. Want to set a monthly cap or auto-budget?
      </div>
    </motion.div>
  );
}

