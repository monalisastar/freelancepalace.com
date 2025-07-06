// app/faq/page.tsx
'use client';

import { useState } from 'react';
import { faqData, FAQCategory } from '@/lib/faqData';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const categories: FAQCategory[] = ['platform', 'clients', 'freelancers', 'escrow'];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('platform');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const filteredFaqs = faqData[activeCategory].filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white py-16 px-4">
      <motion.section
        className="max-w-4xl mx-auto space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-400">Everything you need to know about using Freelancers Palace.</p>
        </div>

        {/* Search Input */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setExpandedIndex(null);
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-full border transition ${
                activeCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-gray-500">No matching questions found.</p>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur rounded-md border border-white/10"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left px-6 py-4 font-medium text-lg flex justify-between items-center"
                >
                  {faq.question}
                  <span className="ml-4">{expandedIndex === index ? '−' : '+'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {expandedIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-gray-300"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>

        {/* AI Assistant Suggestion (Mock) */}
        <motion.div
          className="mt-12 bg-white/10 rounded-md p-6 text-white border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="font-semibold text-blue-400 mb-2">🤖 Need help?</p>
          <p className="text-sm text-gray-300">
            Our AI assistant is ready to help you 24/7. Click the floating AI icon at the bottom right to ask more questions or get personalized help.
          </p>
        </motion.div>

        {/* CTA Block */}
        <motion.div
          className="mt-16 text-center border-t border-white/10 pt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-4">Reach out to our support team or consult with an AI assistant directly.</p>
          <Link
            href="/support"
            className="inline-block px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Contact Support
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
