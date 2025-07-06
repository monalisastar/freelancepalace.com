'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, UploadCloud, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Lock size={32} />,
    title: 'Step 1: Deposit Secured',
    description: 'Client initiates an escrow deal and deposits funds securely via fiat or crypto.',
  },
  {
    icon: <UploadCloud size={32} />,
    title: 'Step 2: Work Delivered',
    description: 'The freelancer or seller delivers the agreed-upon service or digital goods.',
  },
  {
    icon: <CheckCircle size={32} />,
    title: 'Step 3: Client Confirms',
    description: 'The client reviews and confirms the successful delivery of the work.',
  },
  {
    icon: <Rocket size={32} />,
    title: 'Step 4: Funds Released',
    description: 'Funds are released instantly, minus platform fees. FLR rewards are triggered.',
  },
];

export default function EscrowHowItWorks() {
  return (
    <section id="how-it-works" className="w-full flex flex-col items-center justify-center px-6 text-center">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-white"
      >
        How FLR Escrow Works
      </motion.h2>

      {/* Infographic Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-5xl mb-12"
      >
        <Image
          src="/images/escrow-process.png"
          alt="How It Works"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Animated Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition text-white"
          >
            <div className="flex items-center gap-3 mb-3 text-blue-400">
              {step.icon}
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </div>
            <p className="text-sm text-gray-200">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

