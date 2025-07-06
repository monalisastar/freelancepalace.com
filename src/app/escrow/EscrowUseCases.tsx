'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brush, Briefcase, FileText, Wallet } from 'lucide-react';

const useCases = [
  {
    icon: <Brush size={32} />,
    title: 'Creative Freelance Projects',
    description: 'Safeguard payments for designers, developers, writers, and more.',
  },
  {
    icon: <Briefcase size={32} />,
    title: 'B2B Service Contracts',
    description: 'Secure high-value contracts and remote team payments with confidence.',
  },
  {
    icon: <FileText size={32} />,
    title: 'License & Account Transfers',
    description: 'Use escrow when selling digital accounts, SaaS licenses, or memberships.',
  },
  {
    icon: <Wallet size={32} />,
    title: 'Peer-to-Peer Crypto Trades',
    description: 'Exchange tokens or NFTs with escrow-based protection and FLR rewards.',
  },
];

export default function EscrowUseCases() {
  return (
    <section id="use-cases" className="w-full flex flex-col items-center justify-center px-6 text-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-white"
      >
        Where Can You Use FLR Escrow?
      </motion.h2>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mb-12"
      >
        <Image
          src="/images/escrow-usecases.png"
          alt="Escrow Use Cases"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Use Case Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {useCases.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition text-white"
          >
            <div className="flex items-center gap-3 mb-3 text-blue-400">
              {item.icon}
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-200">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

