'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const steps = ['Deal Setup', 'Terms', 'Escrow Mode', 'Summary', 'Confirm'];

export default function StartEscrowPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    creatorEmail: '',
    amount: '',
    currency: 'USD',
    counterparty: '',
    description: '',
    conditions: '',
    mode: 'Traditional',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const isEmail = formData.counterparty.includes('@');
      const counterpartyEmail = isEmail ? formData.counterparty : undefined;
      const counterpartyPhone = !isEmail ? formData.counterparty : undefined;

      const payload = {
        amount: formData.amount,
        currency: formData.currency,
        counterpartyId: crypto.randomUUID(),
        counterpartyLabel: formData.counterparty,
        counterpartyEmail,
        counterpartyPhone,
        description: formData.description,
        conditions: formData.conditions,
        mode: formData.mode,
        creatorEmail: formData.creatorEmail,
      };

      const res = await fetch('/api/escrow/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        toast.success('✅ Deal created successfully!');
        setTimeout(() => {
          router.push(result.redirectTo); // ✅ redirect to /escrow/success
        }, 2000);
      } else {
        toast.error(`❌ Failed: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const parsedAmount = parseFloat(formData.amount || '0');
  const platformFee = parsedAmount > 0 ? (parsedAmount * 0.05).toFixed(2) : '0.00';
  const totalWithFee = parsedAmount > 0 ? (parsedAmount + parseFloat(platformFee)).toFixed(2) : '0.00';

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1c1e2b] to-[#0f0f0f] text-white flex flex-col items-center justify-center px-6 py-12">
      <Toaster position="top-right" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Start a New Escrow Deal</h1>
        <p className="text-gray-400">Secure. Multi-currency. Powered by FLR.</p>
      </div>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Deal Setup</h2>

              <input
                type="email"
                name="creatorEmail"
                placeholder="Your Email Address"
                value={formData.creatorEmail}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-black/30 border border-white/20"
              />

              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-black/30 border border-white/20"
              >
                <option value="USD">USD</option>
                <option value="KES">KES (M-Pesa)</option>
                <option value="NGN">NGN (Naira Wallet)</option>
                <option value="BTC">BTC (Bitcoin)</option>
                <option value="ETH">ETH (Ethereum)</option>
                <option value="USDT">USDT (Tether)</option>
                <option value="FLR">FLR (Platform Token)</option>
              </select>

              <input
                type="number"
                name="amount"
                placeholder={`Amount in ${formData.currency}`}
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-black/30 border border-white/20"
              />

              <input
                type="text"
                name="counterparty"
                placeholder="Counterparty Email or Phone"
                value={formData.counterparty}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-black/30 border border-white/20"
              />

              <div className="text-sm text-gray-300">
                💸 Platform Fee (5%): <strong>{platformFee} {formData.currency}</strong><br />
                🔐 Total to Lock: <strong>{totalWithFee} {formData.currency}</strong>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
              <textarea
                name="description"
                placeholder="What is this deal about?"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-black/30 border border-white/20"
              />
              <textarea
                name="conditions"
                placeholder="Release conditions (e.g., deliver files, review)"
                value={formData.conditions}
                onChange={handleChange}
                className="w-full p-3 rounded bg-black/30 border border-white/20"
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Choose Escrow Mode</h2>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full p-3 rounded bg-black/30 border border-white/20"
              >
                <option value="Traditional">Traditional (Mobile Money/Card)</option>
                <option value="Smart Contract">Smart Contract (Crypto/Web3)</option>
              </select>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Deal Summary</h2>
              <div className="text-sm text-gray-300 space-y-2 text-left">
                <p>📧 Your Email: <strong>{formData.creatorEmail}</strong></p>
                <p>💰 Amount: <strong>{formData.amount} {formData.currency}</strong></p>
                <p>💸 Fee (5%): <strong>{platformFee} {formData.currency}</strong></p>
                <p>🔐 Total Locked: <strong>{totalWithFee} {formData.currency}</strong></p>
                <p>👤 Counterparty: <strong>{formData.counterparty}</strong></p>
                <p>📝 Description: <strong>{formData.description}</strong></p>
                <p>📜 Conditions: <strong>{formData.conditions}</strong></p>
                <p>⚙️ Escrow Mode: <strong>{formData.mode}</strong></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="px-6 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="ml-auto px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto px-6 py-2 rounded bg-green-600 hover:bg-green-700 transition font-semibold"
            >
              {loading ? 'Creating...' : 'Confirm Deal'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}



