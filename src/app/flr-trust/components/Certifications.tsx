'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheck,
  BadgeCheck,
  Lock,
  Globe2,
  Brain // ✅ Add this line
} from 'lucide-react'

const certs = [
  {
    title: 'FLR Verified',
    description: 'Issued to partners and freelancers who meet internal verification thresholds.',
    icon: BadgeCheck
  },
  {
    title: 'Smart Contract Audits',
    description: 'Verified by industry leaders like Certik and OpenZeppelin for contract security.',
    icon: ShieldCheck
  },
  {
    title: 'AI Fairness Testing',
    description: 'Our models undergo bias checks and logic audits before deployment.',
    icon: Brain
  },
  {
    title: 'GDPR / ISO 27001 Ready',
    description: 'FLR Trust policies align with global data privacy and security standards.',
    icon: Lock
  },
  {
    title: 'KYC & AML Guidelines',
    description: 'We apply know-your-customer rules and anti-fraud principles in key flows.',
    icon: Globe2
  }
]

export default function Certifications() {
  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-[#1e324f] to-[#0e1b2c] text-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Security & Certifications
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Our platform adheres to the highest standards of digital security, compliance, and algorithmic fairness.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map(({ title, description, icon: Icon }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-3">
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

