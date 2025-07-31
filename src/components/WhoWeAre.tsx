'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhoWeAre() {
  return (
    <section className="w-full bg-[#0b0f1a] py-20 px-6 md:px-20 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/whoweare.png"
            alt="Who We Are"
            width={600}
            height={600}
            className="w-full rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase text-blue-400 font-semibold tracking-wide mb-2">
            Who We Are
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            Freelancers Palace <br /> The Future of Freelance
          </h2>

          <p className="text-gray-300 mb-6">
            We’re building a global trust ecosystem where verified talent and visionary clients collaborate with confidence.
            Powered by FLR Trust Labs and smart contract escrow, our platform empowers high-impact freelancers in AI, Climate, Web3, and more.
          </p>

          <ul className="space-y-4 text-sm text-gray-200 mb-8">
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              FLR Trust Labs – Decentralized credibility + compliance scoring.
            </li>
            <li className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-sky-400" />
              Global verified network of future-ready freelancers and clients.
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Escrow Services – Secure, trustless payments backed by smart contracts.
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Your Project
            </Button>
            <Button
              className="bg-white text-black hover:bg-gray-100 font-semibold shadow-sm"
            >
              Apply as a Freelancer
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
