"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Service = {
  title: string;
  slug: string;
  description: string;
  image: string;
  benefits?: string[];
};

export default function MotionServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="px-4"
    >
      <div
        className={`bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer ${
          expanded ? "max-h-[1000px]" : "max-h-[400px]"
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <Image
          src={service.image}
          alt={service.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover"
        />
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
          <p className="text-sm text-zinc-400 mb-4">{service.description}</p>

          {expanded && (
            <>
              {service.benefits && (
                <ul className="list-disc list-inside text-zinc-300 text-sm space-y-1 mb-4">
                  {service.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              <Link
                href="/login"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Start Your Project
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}


