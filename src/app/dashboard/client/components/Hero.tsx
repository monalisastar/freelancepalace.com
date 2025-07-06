'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { BadgeCheck, ShieldCheck, Lock } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center">
      {/* 🔁 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/flr-hero.mp4" type="video/mp4" />
      </video>

      {/* 🔲 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e1b2c]/80 to-[#1e324f]/70 z-10 backdrop-blur-md" />

      {/* 🔤 Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center px-4 md:px-10 max-w-4xl"
      >
        <p className="text-sm tracking-widest text-blue-400 uppercase mb-2">FLR Trust Labs</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Trust is the New Currency.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          FLR Trust Labs powers the integrity, compliance, and security layer behind every transaction.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 transition rounded-xl shadow-md">
            Book a Trust Consultation
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-lg border-white/40 hover:bg-white/10 backdrop-blur-sm rounded-xl"
          >
            Explore Our Certifications
          </Button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-4 items-center justify-center text-sm text-white/80">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-400" /> Blockchain Verified
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-yellow-400" /> AI Audited
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" /> Escrow Secured
          </div>
        </div>
      </motion.div>
    </section>
  )
}

