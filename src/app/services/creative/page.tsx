'use client';

import React, { useEffect, useRef, useState } from "react";
import { creativeServices } from "@/lib/expandedServices/creative";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Service = {
  title: string;
  slug: string;
  image: string;
  description: string;
};

const CreativePage = () => {
  const services: Service[] = creativeServices;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 320,
          behavior: "smooth"
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="min-h-screen bg-[#0b1e32] text-white">
      {/* Back Button */}
      <div className="px-4 pt-6">
        <Link href="/services" className="inline-flex items-center text-sm text-blue-400 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
        </Link>
      </div>

      {/* Header */}
      <div className="px-4 py-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide">Creative & Freelance Services</h1>
        <p className="text-zinc-400 mt-2 max-w-2xl mx-auto">
          Explore future-ready creative offerings from anime illustration to pitch decks, podcasts, and virtual fashion design.
        </p>
      </div>

      {/* Carousel */}
      <div className="overflow-x-auto whitespace-nowrap px-4 pb-8" ref={scrollRef}>
        <div className="flex gap-6">
          {services.map((service: Service, index: number) => (
            <motion.div
              key={service.slug}
              className="min-w-[280px] max-w-[300px] flex-shrink-0"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-zinc-800 border-zinc-700 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 whitespace-normal break-words">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed whitespace-normal">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/creative/${service.slug}`}
                    className="block mt-3 text-blue-400 text-sm hover:underline"
                  >
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 text-center text-sm text-zinc-500 py-4">
        &copy; {new Date().getFullYear()} Freelancers Palace · All rights reserved
      </footer>
    </div>
  );
};

export default CreativePage;

