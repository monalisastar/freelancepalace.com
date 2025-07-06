'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is FLR Trust Labs?',
    answer: 'FLR Trust Labs is the infrastructure layer powering Freelancers Palace and FLR Escrow — providing trust scoring, badge verification, smart contract audits, and dispute resolution flows.'
  },
  {
    question: 'How does FLR verify smart contracts?',
    answer: 'Our audit system uses static analysis, AI logic scoring, and optional partner review (e.g., Certik, OpenZeppelin) to verify smart contract integrity and behavior.'
  },
  {
    question: 'What makes a deal FLR Verified?',
    answer: 'FLR Verified deals go through token validation, AI-based compliance scanning, escrow lock verification, and blockchain-stamped receipts. They are fully traceable.'
  },
  {
    question: 'Who can apply for a Trust Badge?',
    answer: 'Verified freelancers, businesses, or platform users who complete identity, credential, or contract history review can apply for FLR Badges.'
  },
  {
    question: 'Is my data safe with FLR?',
    answer: 'Yes. All user data is encrypted, never sold, and follows GDPR-aligned principles. Only minimum behavioral metadata is used to inform trust algorithms.'
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0e1b2c] to-[#1e324f] text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Frequently Asked Questions
        </motion.h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 text-gray-300 text-sm"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}

