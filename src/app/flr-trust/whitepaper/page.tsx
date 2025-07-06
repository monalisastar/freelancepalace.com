'use client'

import { motion } from 'framer-motion'
import { FileText, ShieldCheck, Brain, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    title: '1. Introduction',
    icon: FileText,
    content: `FLR Trust Labs is the integrity layer behind the Freelancers Palace and Escrow systems. This whitepaper outlines our architecture, verification model, and vision for protocol-level trust.`
  },
  {
    title: '2. Vision & Philosophy',
    icon: Brain,
    content: `We believe trust is not just a legal concept — it's a programmable asset. Our hybrid system blends AI, blockchain, and human oversight to build a decentralized, auditable reputation system.`
  },
  {
    title: '3. Technical Architecture',
    icon: ShieldCheck,
    content: `FLR uses a modular trust stack: Token Verification → Deal Setup → AI Compliance Engine → Escrow Lock → Receipt Stamping → Dispute Resolver → Reputation Ledger. Each step is cryptographically logged.`
  },
  {
    title: '4. Verification Model',
    icon: CheckCircle,
    content: `FLR Badges are issued after identity verification, contract history review, and trust score calculations. We employ KYC, behavioral metrics, and cross-platform signals.`
  },
  {
    title: '5. Reputation Scoring System',
    icon: Star,
    content: `Each verified deal updates a user's Trust Score — a weighted measure of audit success, dispute outcomes, delivery reliability, and feedback loops. Higher scores unlock premium badge tiers.`
  }
]

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0e1b2c] to-[#1e324f] text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-10 text-center"
        >
          FLR Trust Labs Whitepaper
        </motion.h1>

        {sections.map(({ title, content, icon: Icon }, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base">{content}</p>
          </motion.section>
        ))}

        {/* Download Button */}
        <div className="text-center mt-16">
          <Link
            href="/docs/flr-whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition text-white text-lg font-medium"
          >
            📥 Download Full PDF
          </Link>
        </div>
      </div>
    </main>
  )
}

