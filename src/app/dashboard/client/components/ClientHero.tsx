// app/dashboard/client/components/ClientHero.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function ClientHero() {
  const [greeting, setGreeting] = useState("Welcome");
  const userName = "Brian"; // Replace with session logic later
  const activeProjects = 3;
  const escrowBalance = 1250;
  const flrTier = "Gold";
  const dealsToPlatinum = 3;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-2xl bg-white/40 backdrop-blur-md shadow-md p-6 md:p-8 border border-white/30"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900/90">
            {greeting}, {userName} 👋
          </h1>
          <p className="text-sm md:text-base text-gray-700">
            You have <strong>{activeProjects} active project{Number(activeProjects) !== 1 ? "s" : ""}</strong> &mdash;
            <strong> ${escrowBalance.toLocaleString()}</strong> in escrow &mdash;
            <strong> FLR Tier: {flrTier}</strong>
          </p>
          <div className="mt-2 text-sm text-blue-800 bg-blue-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Sparkles size={14} /> You're {dealsToPlatinum} deal{Number(dealsToPlatinum) !== 1 ? "s" : ""} away from <strong className="ml-1">Platinum rewards</strong>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm">
          🚀 Start New Project
        </button>
      </div>
    </motion.div>
  );
}




