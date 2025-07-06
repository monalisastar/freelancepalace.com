'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { DollarSign, Users, Coins, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  {
    icon: <DollarSign size={32} />,
    title: 'Total Escrowed',
    value: 1280000,
    suffix: '+',
    description: 'USD value of protected transactions.',
  },
  {
    icon: <Users size={32} />,
    title: 'Users Onboarded',
    value: 7500,
    suffix: '+',
    description: 'Freelancers, clients, and traders using the platform.',
  },
  {
    icon: <Coins size={32} />,
    title: 'FLR Rewards Issued',
    value: 64000,
    suffix: '+',
    description: 'FLR tokens rewarded across escrow deals.',
  },
  {
    icon: <FileText size={32} />,
    title: 'Deals Completed',
    value: 4200,
    suffix: '+',
    description: 'Escrow contracts completed successfully.',
  },
];

// Simple count-up animation
function useCountUp(target: number, speed = 50) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = Math.max(Math.floor(target / 100), 1);
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev + step >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + step;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [target]);
  return count;
}

export default function EscrowStats() {
  return (
    <section id="stats" className="w-full flex flex-col items-center justify-center px-6 text-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-white"
      >
        FLR Escrow in Numbers
      </motion.h2>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mb-12"
      >
        <Image
          src="/images/escrow-stats.png.jpg"
          alt="FLR Escrow Stats"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {stats.map((stat, index) => {
          const count = useCountUp(stat.value);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition text-white"
            >
              <div className="flex items-center gap-3 mb-3 text-green-400">
                {stat.icon}
                <h3 className="text-xl font-semibold">{stat.title}</h3>
              </div>
              <p className="text-3xl font-bold mb-1">
                {count.toLocaleString()}<span>{stat.suffix}</span>
              </p>
              <p className="text-sm text-gray-200">{stat.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

