'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift, Coins, TrendingUp, Medal } from 'lucide-react';

const rewards = [
  {
    icon: <Gift size={32} />,
    title: 'FLR Cashback',
    description: 'Earn a percentage of your escrow fee back in FLR tokens.',
  },
  {
    icon: <Coins size={32} />,
    title: 'Lower Future Fees',
    description: 'Use FLR tokens to reduce fees on upcoming escrow transactions.',
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Loyalty Tiers',
    description: 'Unlock higher rewards and perks the more you use FLR Escrow.',
  },
  {
    icon: <Medal size={32} />,
    title: 'Reputation Boost',
    description: 'Earn verified badges as you build a trusted transaction history.',
  },
];

export default function EscrowFLRReward() {
  return (
    <section id="flr-reward" className="w-full flex flex-col items-center justify-center px-6 text-center">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-white"
      >
        Earn FLR While You Escrow
      </motion.h2>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mb-12"
      >
        <Image
          src="/images/flr-rewards.png.jpg"
          alt="FLR Rewards"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Reward Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mb-8">
        {rewards.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition text-white"
          >
            <div className="flex items-center gap-3 mb-3 text-yellow-400">
              {item.icon}
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-200">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Optional CTA */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-400 transition"
      >
        Explore FLR Utility
      </motion.a>
    </section>
  );
}

