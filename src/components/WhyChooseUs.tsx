'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Handshake, BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WhyChooseUs() {
  return (
    <section className="w-full relative bg-[#0b0f1a] py-20 px-6 md:px-20 text-white overflow-hidden">
      
      {/* Floating Icons (behind) */}
      <ShieldCheck className="w-24 h-24 text-blue-600 absolute top-10 left-10 opacity-10 rotate-12 hidden md:block" />
      <Handshake className="w-24 h-24 text-green-500 absolute bottom-20 left-1/3 opacity-10 -rotate-6 hidden md:block" />
      <BadgeDollarSign className="w-28 h-28 text-purple-500 absolute top-1/3 right-10 opacity-10 rotate-12 hidden md:block" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase text-blue-400 font-semibold tracking-wide mb-2">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            Trust-Centric. Vision-Driven. Borderless.
          </h2>

          <ul className="space-y-4 text-sm text-gray-300 mb-8">
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              Every user is verified. Every deal protected. Every action earns FLR trust scores.
            </li>
            <li className="flex items-center gap-3">
              <Handshake className="w-5 h-5 text-sky-400" />
              Smart contract escrow for seamless, secure payments.
            </li>
            <li className="flex items-center gap-3">
              <BadgeDollarSign className="w-5 h-5 text-purple-400" />
              FLR token rewards and transparent reputation economics.
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

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/whychooseus.png"
            alt="Why Choose Us"
            width={600}
            height={600}
            className="w-full rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
