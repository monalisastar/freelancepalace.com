'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ScrollText,
  UserCheck,
  Link2,
} from 'lucide-react';

const trustFeatures = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'End-to-End Encryption',
    description: 'Every transaction is protected using bank-grade encryption technology.',
  },
  {
    icon: <ScrollText size={32} />,
    title: 'Smart Contract Verified',
    description: 'Our smart contract logic is public and auditable on-chain.',
  },
  {
    icon: <UserCheck size={32} />,
    title: 'Verified Participants',
    description: 'All users are KYC-verified or wallet-authenticated for extra security.',
  },
  {
    icon: <Link2 size={32} />,
    title: 'Blockchain Receipts',
    description: 'Transaction records are transparently stored and verifiable on the blockchain.',
  },
];

export default function EscrowTrustFeatures() {
  return (
    <section id="trust" className="w-full flex flex-col items-center justify-center px-6 text-center">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-white"
      >
        Why Trust FLR Escrow?
      </motion.h2>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mb-12"
      >
        <Image
          src="/images/feature-icons.png.jpg"
          alt="Trust Features"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Trust Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {trustFeatures.map((item, index) => (
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

