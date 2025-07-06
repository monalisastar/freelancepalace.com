// app/dashboard/client/components/StartProjectCTA.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, XCircle } from "lucide-react";

const categories = ["Web3", "AI & Data", "Climate", "Creative", "Ethical Tech", "Strategy"];

export default function StartProjectCTA() {
  const [open, setOpen] = useState(false);
  const [helped, setHelped] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");

  const isValid = title && description && category && budget && duration;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = { title, description, category, budget, duration };
    console.log("Submitting project:", payload);

    setOpen(false);
    setTitle("");
    setDescription("");
    setCategory("");
    setBudget("");
    setDuration("");
    setHelped(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition"
      >
        🚀 Start New Project
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 160 }}
              className="w-full max-w-2xl bg-white/40 border border-white/30 backdrop-blur-xl shadow-lg rounded-2xl p-6 md:p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
              >
                <XCircle size={22} />
              </button>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">Start a New Project</h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800">
                {/* Category */}
                <div className="space-y-1">
                  <label>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 rounded-md bg-white/60 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label>Project Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded-md bg-white/60 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Build a Web3 Rewards Dashboard"
                  />
                </div>

                {/* Description + Help */}
                <div className="space-y-1">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 rounded-md bg-white/60 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Describe your project goals, expectations, and required skills"
                  />
                  {!helped && (
                    <button
                      type="button"
                      onClick={() => {
                        setDescription(
                          "We're building a Web3 dashboard that tracks FLR rewards in real-time. It must support token integration, user auth, and futuristic UI. Help needed for smart contract UI sync and wallet connection."
                        );
                        setHelped(true);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-blue-700 hover:underline mt-1"
                    >
                      <Sparkles size={14} /> Help me write this
                    </button>
                  )}
                </div>

                {/* Budget + Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label>Estimated Budget (USD)</label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full p-2 rounded-md bg-white/60 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="e.g., 500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label>Duration (in days)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-2 rounded-md bg-white/60 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="e.g., 14"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full py-3 rounded-lg font-medium text-white transition ${
                      isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Submit Project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

