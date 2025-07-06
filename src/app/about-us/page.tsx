// app/about-us/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ShieldCheck,
  Flame,
  Network,
  Globe,
  BadgeCheck,
  Users,
} from 'lucide-react';

const differentiators = [
  { icon: ShieldCheck, label: 'Smart Contract Escrow' },
  { icon: Flame, label: 'FLR Token Rewards' },
  { icon: Network, label: 'Web3-Ready Infrastructure' },
  { icon: Globe, label: 'Carbon & Climate Service Track' },
  { icon: BadgeCheck, label: 'AI-Ethics First Approach' },
  { icon: Users, label: 'Verified Talent Only' },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Hero Section with Video Background */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
          src="/videos/about-hero.mp4.mp4"
        ></video>
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6 px-4 sm:px-6 md:px-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Shaping the Future of Ethical Work
          </motion.h1>
          <motion.p
            className="text-gray-300 text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Freelancers Palace is where technology meets trust. We’re building a future where work is fair, verified, and aligned with human values.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 rounded-lg border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-300">
            To empower creatives, developers, and consultants through a platform rooted in transparency, climate action, and decentralized collaboration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 rounded-lg border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-300">
            A future where ethical freelancing is the norm — supported by smart escrow, blockchain transparency, and AI-guided creativity.
          </p>
        </motion.div>
      </section>

      {/* Differentiators Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">What Sets Us Apart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {differentiators.map(({ icon: Icon, label }, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-lg p-6 text-center space-y-3"
              whileHover={{ scale: 1.03 }}
            >
              <Icon className="mx-auto h-8 w-8 text-blue-400" />
              <p className="text-white font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto space-y-6 px-4 py-20">
        <h2 className="text-3xl font-bold text-center">Our Guiding Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Transparency',
            'Innovation',
            'Creative Sovereignty',
            'Resilience',
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white/5 p-4 rounded-lg text-center border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-white">{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4 pb-20">
        <h2 className="text-3xl font-bold">Be Part of the Movement</h2>
        <p className="text-gray-400">
          Whether you're a client with a mission or a freelancer with a craft — Freelancers Palace welcomes you to a new era of ethical collaboration.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold">
            Apply as Freelancer
          </Link>
          <Link href="/client-register" className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-md font-semibold">
            Start Your Project
          </Link>
        </div>
      </section>
    </main>
  );
}
