'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  PenLine,
  Brain,
  Lock,
  ReceiptText,
  ShieldAlert,
  Star
} from 'lucide-react'

const steps = [
  {
    title: 'Token Verification',
    description: 'Each participant’s identity and token is verified before deal creation.',
    icon: CheckCircle
  },
  {
    title: 'Deal Setup',
    description: 'Smart contracts are generated based on deal terms and project type.',
    icon: PenLine
  },
  {
    title: 'AI-Backed Compliance',
    description: 'Our AI engine scans contract logic and matches it against FLR security rules.',
    icon: Brain
  },
  {
    title: 'Escrow Transaction',
    description: 'Funds are securely locked via on-chain escrow with optional audit triggers.',
    icon: Lock
  },
  {
    title: 'Receipt Stamping',
    description: 'A blockchain-stamped receipt is issued for both parties — forever traceable.',
    icon: ReceiptText
  },
  {
    title: 'Dispute Fallback',
    description: 'If triggered, an AI-based or mod-led resolution is initiated with full logs.',
    icon: ShieldAlert
  },
  {
    title: 'Reputation Scoring',
    description: 'Each outcome contributes to the user’s FLR Trust Score and badges.',
    icon: Star
  }
]

export default function TrustArchitecture() {
  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-tr from-[#0e1b2c] to-[#1e324f] text-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Trust Architecture
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Every FLR-secured transaction flows through a layered trust engine — from identity to dispute to permanent score.
        </p>
      </div>

      {/* Step Flow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-blue-400 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <Icon className="w-7 h-7 text-blue-400" />
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-gray-300">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

