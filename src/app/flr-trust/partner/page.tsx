'use client'

import { motion } from 'framer-motion'

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0e1b2c] to-[#1e324f] text-white py-24 px-6 md:px-20">
      <div className="max-w-5xl mx-auto space-y-24">

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Partner with FLR Trust Labs
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join a global ecosystem committed to building trust across digital contracts, escrows, and credential systems. Whether you're a Web3 project, climate org, or AI platform — FLR Trust Labs welcomes you.
          </p>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-semibold text-center">Why Partner with Us?</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-300">
            <li className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              🌍 Be listed as a verified organization in our global Trust Directory.
            </li>
            <li className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              🛡️ Receive compliance audits and escrow stamp integration.
            </li>
            <li className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              🚀 Offer your users badge-linked trust ratings and accountability layers.
            </li>
            <li className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              🤝 Get access to AI arbitration, dispute layers, and transparency logs.
            </li>
          </ul>
        </motion.section>

        {/* Partnership Tiers */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <h2 className="text-2xl font-semibold text-center">Partnership Tiers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                tier: 'Community Verified',
                desc: 'For DAOs, startups, or NGOs seeking verified credibility through FLR Trust.'
              },
              {
                tier: 'Enterprise Secured',
                desc: 'Advanced compliance integration, receipt stamping, and white-label support.'
              },
              {
                tier: 'Sovereign Node Partner',
                desc: 'Flagship partnership with node-level arbitration, badge issuing, and Trust Score APIs.'
              }
            ].map(({ tier, desc }, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md"
              >
                <h3 className="text-lg font-bold mb-2">{tier}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Application Form */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Submit a Partnership Inquiry</h2>
          <form className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 backdrop-blur-md space-y-6 max-w-2xl mx-auto">
            <input
              type="text"
              name="orgName"
              placeholder="Organization Name"
              required
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Contact Email"
              required
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
            />
            <textarea
              name="message"
              placeholder="Tell us about your organization and interest"
              rows={5}
              required
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition font-semibold"
            >
              Submit Partnership Request
            </button>
          </form>
        </motion.section>

      </div>
    </main>
  )
}

