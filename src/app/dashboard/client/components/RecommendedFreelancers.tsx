// app/dashboard/client/components/RecommendedFreelancers.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const mockFreelancers = [
  {
    name: "Alex Stone",
    category: "Web3 Smart Contracts",
    rating: 4.8,
    priceRange: "$50–$100/hr",
    id: 1,
  },
  {
    name: "Zara Moon",
    category: "AI Chatbot Designer",
    rating: 4.9,
    priceRange: "$60–$120/hr",
    id: 2,
  },
  {
    name: "Leo Vega",
    category: "Carbon Project Verifier",
    rating: 4.7,
    priceRange: "$45–$90/hr",
    id: 3,
  },
];

export default function RecommendedFreelancers() {
  const [tagline, setTagline] = useState("Handpicked for your next project");

  useEffect(() => {
    // Later: Use category insights or assistant suggestion
    const tags = [
      "Based on your Web3 hiring patterns",
      "AI-picked matches for your industry",
      "Because you love bold innovation",
    ];
    setTagline(tags[Math.floor(Math.random() * tags.length)]);
  }, []);

  return (
    <section className="space-y-4">
      <motion.h2
        className="text-xl md:text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Recommended Freelancers
      </motion.h2>
      <p className="text-sm text-gray-600">{tagline}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockFreelancers.map((freelancer) => (
          <motion.div
            key={freelancer.id}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl bg-white/50 backdrop-blur-md border border-white/30 shadow-md p-5 space-y-2 transition"
          >
            <h3 className="text-lg font-medium text-gray-900">{freelancer.name}</h3>
            <p className="text-sm text-gray-700">{freelancer.category}</p>
            <p className="text-sm text-gray-600">⭐ {freelancer.rating} rating</p>
            <p className="text-sm text-gray-600">💰 {freelancer.priceRange}</p>
            <button className="mt-2 px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition">
              View Profile
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

