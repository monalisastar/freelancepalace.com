// src/lib/faqData.ts

export const faqData = {
  platform: [
    {
      question: 'What is Freelancers Palace?',
      answer:
        'Freelancers Palace is a futuristic freelance platform focused on ethical innovation in Web3, AI, Climate, and Digital Trust sectors.',
    },
    {
      question: 'what makes freelancer palace, unique',
      answer:
        'We prioritize impact-driven projects, verified talent, and FLR token-based rewards for ethical and transparent freelancing.',
    },
    {
      question: 'Do you have a mobile app?',
      answer:
        'A mobile version is in development. For now, the platform is fully responsive and works seamlessly on mobile browsers.',
    },
  ],

  clients: [
    {
      question: 'How do I hire a freelancer?',
      answer:
        'Create a client account, post a project, and invite qualified freelancers. You can also browse talent profiles and make direct offers.',
    },
    {
      question: 'What kind of projects can I post?',
      answer:
        'We support projects in Web3 development, AI & data services, carbon reporting, design, consulting, and more.',
    },
    {
      question: 'How are payments handled?',
      answer:
        'All payments go through secure escrow. Funds are only released when both parties are satisfied. You can pay via card, crypto, or mobile money.',
    },
  ],

  freelancers: [
    {
      question: 'What are the requirements to join as a freelancer?',
      answer:
        'You must pass our application process, which includes portfolio submission, certification validation, and optional identity verification.',
    },
    {
      question: 'How do I get paid?',
      answer:
        'Once the client approves your work, funds in escrow are released to your wallet or preferred payment method.',
    },
    {
      question: 'Can I earn FLR tokens?',
      answer:
        'Yes! Verified freelancers earn FLR reward tokens for each successful, highly-rated project. These can be redeemed or used on the platform.',
    },
  ],

  escrow: [
    {
      question: 'What is escrow and how does it work?',
      answer:
        'Escrow protects both parties by holding funds until the project is complete. Disputes can be raised if there’s disagreement on delivery.',
    },
    {
      question: 'Do you support crypto payments?',
      answer:
        'Yes. You can use USDT, ETH, and FLR token for payments. Smart contract escrow is available for Web3 deals.',
    },
    {
      question: 'What happens if there is a dispute?',
      answer:
        'Our moderation team — and in some cases AI — will review the dispute fairly. Funds are only released once resolution is achieved.',
    },
  ],
};

export type FAQCategory = keyof typeof faqData;

