import React from 'react';
import Image from 'next/image';

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-10 md:px-20">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-indigo-700 flex items-center gap-2">
          📈 SEO & Digital Marketing
        </h1>
        <p className="text-lg text-gray-600">
          Supercharge your brand's online visibility. Our marketing freelancers use data-driven strategies to boost
          engagement, conversions, and organic reach — all backed by Web3-secure escrow and $FLR token rewards.
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src="/images/seo.jpeg"
            alt="SEO and marketing service"
            width={500}
            height={300}
            className="rounded-md shadow-md"
          />
          <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>SEO audits, on-page optimization & keyword targeting</li>
              <li>Google Ads, Meta campaigns, and funnel optimization</li>
              <li>Content strategy & growth marketing</li>
              <li>Discord-based collaboration with real-time updates</li>
              <li>Protected payments using smart contract escrow</li>
            </ul>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            💬 Client Testimonials
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-700">
              “We ranked #1 for our main keyword in just 3 weeks. The marketing team nailed it.”
              <br />
              <span className="text-sm text-indigo-600 font-semibold">— Marcus T., E-commerce Founder</span>
            </blockquote>
            <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-700">
              “The campaign ROI was incredible. Transparent billing and blockchain-secured workflow = win.”
              <br />
              <span className="text-sm text-indigo-600 font-semibold">— Stacy L., SaaS Growth Lead</span>
            </blockquote>
          </div>
        </section>

        <div className="flex gap-4 mt-8">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition">
            Hire a Marketer
          </button>
          <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50 transition">
            Apply as Freelancer
          </button>
        </div>
      </div>
    </main>
  );
}

