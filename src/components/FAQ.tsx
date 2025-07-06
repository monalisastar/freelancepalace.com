'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How does FLR Escrow work?',
    answer:
      'Funds are held securely in smart contracts until both buyer and seller confirm delivery of the agreed service or product.',
  },
  {
    question: 'Can I use this platform globally ',
    answer:
      'Absolutely. Freelancers Palace is built for global transactions — anyone can hire or freelance from anywhere.',
  },
  {
    question: 'What happens in case of a dispute?',
    answer:
      'If either party reports an issue, the deal is paused and our resolution process begins. Moderators and blockchain proof ensure fairness.',
  },
  {
    question: 'Are freelancers verified?',
    answer:
      'Yes — we vet each freelancer through a structured interview and portfolio review process before approval.',
  },
  {
    question: 'How do I get paid?',
    answer:
      'Payments are released instantly upon approval. You can withdraw via crypto wallets, local payment integrations, or bank transfer (coming soon).',
  },
  {
    question: 'What fees does the platform charge?',
    answer:
      'We charge a small escrow fee (typically 5–10%) depending on the transaction volume and currency used.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-gray-100 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Frequently Asked Questions</h2>
        <div className="text-left space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 cursor-pointer"
              onClick={() => toggleIndex(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-xl">{activeIndex === index ? '−' : '+'}</span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/faq">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold">
              View All FAQs
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

