'use client'

import { motion } from 'framer-motion'
import {
  FileSearch,
  BrainCircuit,
  BadgeCheck,
  FileText,
  Fingerprint,
  ReceiptText
} from 'lucide-react'

const services = [
  {
    title: 'Smart Contract Auditing',
    description:
      'We scan and verify smart contracts for logic flaws, vulnerabilities, and compliance with Web3 standards.',
    icon: FileSearch
  },
  {
    title: 'AI-Based Dispute Resolution',
    description:
      'Our AI arbitrator ensures fast, unbiased dispute handling with learning-based transparency.',
    icon: BrainCircuit
  },
  {
    title: 'Escrow Verification & Stamp',
    description:
      'FLR-stamped escrows provide a verified protection layer, trusted by enterprises and DAOs.',
    icon: BadgeCheck
  },
  {
    title: 'Enterprise Compliance Reports',
    description:
      'Custom reporting to align your digital operations with global security and audit standards.',
    icon: FileText
  },
  {
    title: 'Credential & Identity Verification',
    description:
      'We validate contributor identities and credentials using cryptographic and KYC-backed methods.',
    icon: Fingerprint
  },
  {
    title: 'Blockchain-Stamped Receipts',
    description:
      'Every FLR-verified action is recorded and stamped on-chain, creating a permanent trust record.',
    icon: ReceiptText
  }
]

export default function CoreServices() {
  return (
    <section className="relative py-24 px-6 md:px-20 bg-gradient-to-br from-[#0e1b2c] to-[#1e324f] text-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Core Trust Services
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          FLR Trust Labs delivers next-gen verification, auditing, and security layers for your most critical transactions.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {services.map(({ title, description, icon: Icon }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:shadow-xl hover:border-blue-400 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <Icon className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-gray-300">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

