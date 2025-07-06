'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRightCircle } from 'lucide-react';

export default function StartEscrow() {
  return (
    <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-20 px-6 md:px-16 overflow-hidden">
      {/* Optional background video or particle effect could go here */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <p className="uppercase tracking-widest text-blue-400 text-sm mb-2">FLR Escrow</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Secure. Verified. Automated.
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Whether you're buying digital goods, hiring remote talent, or closing high-trust deals — FLR Escrow protects both sides using blockchain smart contracts.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <ShieldCheck className="text-blue-400 mb-4" size={32} />
            <h4 className="text-xl font-semibold mb-2">Buyer & Seller Protection</h4>
            <p className="text-gray-400 text-sm">Escrow ensures money and goods are only exchanged when both parties are satisfied.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <ShieldCheck className="text-green-400 mb-4" size={32} />
            <h4 className="text-xl font-semibold mb-2">Smart Contract Automation</h4>
            <p className="text-gray-400 text-sm">No middleman. Our contracts hold, verify, and release funds seamlessly.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <ShieldCheck className="text-purple-400 mb-4" size={32} />
            <h4 className="text-xl font-semibold mb-2">Fast Dispute Resolution</h4>
            <p className="text-gray-400 text-sm">Built-in arbitration and history tracking ensures clarity and quick outcomes.</p>
          </motion.div>
        </div>

        <Link href="/start-escrow">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-semibold shadow-lg text-white text-lg inline-flex items-center gap-2"
          >
            Start Escrow Deal <ArrowRightCircle size={22} />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

