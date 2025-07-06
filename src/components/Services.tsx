'use client';

import React, { useEffect, useState } from 'react';
import { Service } from '@/lib/services/services';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Final 8 services
const rotatingServices: Service[] = [
  {
    id: 'sc-audit',
    title: 'Smart Contract Auditing',
    slug: 'smart-contract-auditing',
    description: 'Audit and secure your smart contracts with our Web3 experts.',
    image: '/images/web3-services.png',
    focus: 'web3',
    segment: 'future',
    highlighted: true,
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    slug: 'prompt-engineering',
    description: 'Craft optimized AI prompts for content, coding, or research.',
    image: '/images/ai-services.png',
    focus: 'ai',
    segment: 'future',
    highlighted: true,
  },
  {
    id: 'carbon-design',
    title: 'Carbon Credit Project Setup',
    slug: 'carbon-credit-project-setup',
    description: 'Launch, register, and scale a carbon credit initiative.',
    image: '/images/carbon-credits.png',
    focus: 'climate',
    segment: 'future',
    highlighted: true,
  },
  {
    id: 'zk-privacy',
    title: 'Privacy-by-Design Consulting',
    slug: 'privacy-by-design-consulting',
    description: 'Integrate privacy-first architecture using ZK and trust tech.',
    image: '/images/privacy-consulting.png',
    focus: 'ethics',
    segment: 'future',
    highlighted: true,
  },
  {
    id: 'eco-branding',
    title: 'Eco Branding & UI',
    slug: 'eco-branding-ui',
    description: 'Build futuristic, sustainable visual identities for your platform.',
    image: '/images/eco-branding-ui.png',
    focus: 'creative',
    segment: 'creative-tech',
    highlighted: true,
  },
  {
    id: 'general-strategy',
    title: 'Digital Strategy & Escrow Setup',
    slug: 'digital-strategy-escrow',
    description: 'Launch your digital service flow with FLR-backed escrow.',
    image: '/images/digital-strategy.png',
    focus: 'default',
    segment: 'future',
    highlighted: true,
  },
  {
    id: 'creative-freelance',
    title: 'Creative & Freelance Services',
    slug: 'creative-freelance',
    description: 'Explore anime art, product design, branding, and more.',
    image: '/images/creative-freelance.png',
    focus: 'creative',
    segment: 'creative-tech',
    highlighted: true,
  },
  {
    id: 'crypto-services',
    title: 'Crypto Services',
    slug: 'crypto-services',
    description: 'Launch tokens, NFTs, wallets, and Web3 apps with us.',
    image: '/images/crypto-services.png',
    focus: 'web3',
    segment: 'future',
    highlighted: true,
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % rotatingServices.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentSlice = [
    rotatingServices[currentIndex % rotatingServices.length],
    rotatingServices[(currentIndex + 1) % rotatingServices.length],
    rotatingServices[(currentIndex + 2) % rotatingServices.length],
  ];

  return (
    <section className="relative py-20 px-4 md:px-12 bg-black/80 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Explore Our Top Services</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentSlice.map((service) => (
              <div
                key={service.id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/10 hover:shadow-xl transition group"
              >
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-white/70 mb-3">{service.description}</p>
                <a
                  href={`/services/${service.slug}`}
                  className="inline-block px-4 py-2 bg-white text-black rounded-md hover:bg-blue-500 hover:text-white transition"
                >
                  Explore
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10">
          <a
            href="/services"
            className="px-6 py-3 rounded-md border border-white text-white hover:bg-white hover:text-black transition"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}

