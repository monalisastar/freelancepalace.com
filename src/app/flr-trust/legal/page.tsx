'use client'

import { motion } from 'framer-motion'

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0e1b2c] to-[#1e324f] text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-16">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10"
        >
          FLR Trust Legal & Compliance
        </motion.h1>

        {/* Terms of Service */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-md"
        >
          <h2 className="text-2xl font-semibold mb-4">1. Terms of Service</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            By using FLR Trust Labs services, you agree to adhere to our platform terms, including rules for dispute resolution, escrow use, badge qualification, and verification protocols. Violations may result in badge revocation or service restriction.
          </p>
        </motion.section>

        {/* Privacy Policy */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-md"
        >
          <h2 className="text-2xl font-semibold mb-4">2. Privacy Policy</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            FLR Trust Labs collects limited personal and behavioral data for the purposes of compliance scoring, KYC, dispute logs, and reputation analysis. We do not sell or expose this data. All information is stored securely and is GDPR-aligned.
          </p>
        </motion.section>

        {/* Compliance Statement */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-md"
        >
          <h2 className="text-2xl font-semibold mb-4">3. Compliance & Blockchain Integrity</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Our protocols include cryptographic integrity, AI-audited workflows, optional identity verification, and on-chain transaction stamping. We actively monitor for fraud, manipulation, or AI misuse, and collaborate with global compliance bodies.
          </p>
        </motion.section>

        {/* Jurisdiction */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-md"
        >
          <h2 className="text-2xl font-semibold mb-4">4. Jurisdiction & Arbitration</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            FLR Trust Labs operates globally but adheres to decentralized arbitration first. Formal disputes may be escalated through neutral jurisdictions or blockchain-governed councils, subject to mutual consent.
          </p>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 backdrop-blur-md"
        >
          <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            For legal inquiries or partnership audits, contact our trust team at <a href="mailto:legal@flrtrust.xyz" className="text-blue-400 hover:underline">legal@flrtrust.xyz</a>
          </p>
        </motion.section>

      </div>
    </main>
  )
}

