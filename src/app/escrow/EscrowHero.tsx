'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EscrowHero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/escrow-hero.png"
        alt="Escrow Hero"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-6 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Secure Deals. Guaranteed Delivery.
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Powered by FLR. Escrow for digital goods, freelancers, and Web3 creators.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/start-escrow">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
              Start Escrow
            </button>
          </Link>

          <a href="#how-it-works">
            <button className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
              Learn How It Works
            </button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

