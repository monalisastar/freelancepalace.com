'use client';

import React, { useState, useEffect } from 'react';
import { useFocus } from '@/context/FocusContext';
import { motion, AnimatePresence } from 'framer-motion';

const videoPaths: Record<string, string> = {
  default: '/videos/default.mp4.mp4',
  web3: '/videos/web3.mp4.mp4',
  ai: '/videos/tech.mp4.mp4',
  climate: '/videos/nature.mps.mp4',
  ethics: '/videos/default.mp4.mp4',
  creative: '/videos/creative.mp4.mp4',
};

const taglines: Record<string, string> = {
  default: 'Web3-ready. Escrow-powered. Verified freelancers & instant engagement.',
  web3: 'Code the future with smart contracts, DAOs, and secure networks.',
  ai: 'Leverage AI, data, and intelligent automation for next-gen solutions.',
  climate: 'Nature-based solutions. Verified green talent. Carbon-native services.',
  ethics: 'Trust-first systems. Privacy-by-design. Responsible technology.',
  creative: 'Design the difference. Build immersive, meaningful futures.',
};

const focusLabels: Record<'default' | 'web3' | 'ai' | 'climate' | 'ethics' | 'creative', string> = {
  default: 'General',
  web3: 'Web3 & Trust',
  ai: 'AI & Data',
  climate: 'Climate & ESG',
  ethics: 'Privacy & Ethics',
  creative: 'Creative Futures',
};

export default function Hero() {
  const { focus, setFocus } = useFocus();
  const [videoKey, setVideoKey] = useState(focus);

  useEffect(() => {
    setVideoKey(focus);
  }, [focus]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <AnimatePresence mode="wait">
        <motion.video
          key={videoKey}
          src={videoPaths[focus]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm pointer-events-none" />

      {/* Freelancers Palace Title - Top Left */}
      <div className="absolute top-24 left-6 z-20">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
          Freelancers Palace
        </h1>
      </div>

      {/* Hero Content - Centered */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 text-center space-y-5">
        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl font-medium text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          The Global Trust Marketplace for Web3, AI, and Climate Solutions.
        </motion.p>

        {/* Dynamic Tagline */}
        <motion.p
          className="text-sm md:text-base text-white/70"
          key={taglines[focus]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {taglines[focus]}
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          <a
            href="/client-register"
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Start Your Project
          </a>
          <a
            href="/register"
            className="px-6 py-3 rounded-md border border-white text-white font-medium hover:bg-white hover:text-black transition"
          >
            Apply as a Freelancer
          </a>
        </div>

        {/* Focus Mode Toggle */}
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          {(Object.keys(focusLabels) as (keyof typeof focusLabels)[]).map((key) => (
            <button
              key={key}
              onClick={() => setFocus(key)}
              className={`px-4 py-2 rounded-full border transition text-sm ${
                focus === key
                  ? 'bg-white text-black'
                  : 'bg-transparent border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              {focusLabels[key]}
            </button>
          ))}
        </div>

        {/* Floating Signature Quote */}
        <p className="absolute bottom-4 left-4 text-xs italic text-white/60">
          “Where Talent Meets Trust. Where Future Meets Function.”
        </p>

        {/* Floating Brand Footer */}
        <p className="absolute bottom-4 right-4 text-xs text-white/70">
          Powered by Adaptive AI Mode™ · FLR Trust Labs
        </p>
      </div>
    </section>
  );
}


