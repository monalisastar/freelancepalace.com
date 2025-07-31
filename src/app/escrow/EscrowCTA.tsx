'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EscrowCTA() {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden text-white">
      {/* Background Image */}
      <Image
        src="/images/cta-banner.png"
        alt="Secure your next freelance or client deal using FLR escrow"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-sm" />

      {/* CTA Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 text-center px-6 max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Secure Your Next Deal?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Freelancers get paid. Clients stay protected. Start escrow and earn FLR instantly.
        </p>

        <Link href="/start-escrow">
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition">
            Start Escrow
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
