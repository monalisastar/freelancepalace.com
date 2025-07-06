export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  focus: 'web3' | 'ai' | 'climate' | 'ethics' | 'creative' | 'default';
  segment: 'creative-tech' | 'future';
  highlighted?: boolean;
};

export const services: Service[] = [
  // 🔹 Highlighted 8 Services (for rotating section)
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

  // 🔹 Creative & Freelance Services
  {
    id: 'web-dev',
    title: 'Web Development',
    slug: 'web-development',
    description: 'Responsive websites and apps built using modern frameworks.',
    image: '/images/creative-freelance.png',
    focus: 'creative',
    segment: 'creative-tech',
  },
  {
    id: 'branding',
    title: 'Branding & Logo Design',
    slug: 'branding-logo-design',
    description: 'Create a bold visual identity with modern branding assets.',
    image: '/images/creative-freelance.png',
    focus: 'creative',
    segment: 'creative-tech',
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    slug: 'content-writing',
    description: 'SEO articles, blogs, product descriptions, and creative writing.',
    image: '/images/creative-freelance.png',
    focus: 'creative',
    segment: 'creative-tech',
  },

  // 🔹 Crypto as a Service
  {
    id: 'token-launch',
    title: 'Crypto Token Creation',
    slug: 'token-creation-launch',
    description: 'Launch custom ERC20/SPL tokens for your brand or project.',
    image: '/images/crypto-token.png',
    focus: 'web3',
    segment: 'future',
  },
  {
    id: 'tokenomics',
    title: 'Tokenomics Strategy',
    slug: 'tokenomics-strategy',
    description: 'Plan utility, rewards, lock schedules, and staking models.',
    image: '/images/crypto-token.png',
    focus: 'web3',
    segment: 'future',
  },
  {
    id: 'crypto-payments',
    title: 'Crypto Payment Integration',
    slug: 'crypto-payment-integration',
    description: 'Add USDT, ETH, or custom tokens to your app or checkout.',
    image: '/images/crypto-services.png',
    focus: 'web3',
    segment: 'future',
  },
  {
    id: 'nft-deployment',
    title: 'NFT Deployment & Minting',
    slug: 'nft-deployment',
    description: 'Custom NFT sites, IPFS storage, and smart minting logic.',
    image: '/images/crypto-services.png',
    focus: 'web3',
    segment: 'future',
  },
  {
    id: 'wallet-integration',
    title: 'Wallet Integration',
    slug: 'wallet-integration',
    description: 'Connect MetaMask, WalletConnect, and Web3 wallets to your app.',
    image: '/images/crypto-services.png',
    focus: 'web3',
    segment: 'future',
  },
  {
    id: 'flr-setup',
    title: 'FLR Integration & Dashboard Setup',
    slug: 'flr-integration-dashboard',
    description: 'Incorporate your FLR rewards, escrow flows, and smart dashboard.',
    image: '/images/crypto-services.png',
    focus: 'web3',
    segment: 'future',
  },

  // 🔹 NEW SERVICES (Now Appended)

  // AI
  {
    id: 'ai-model-tuning',
    title: 'AI Model Tuning',
    slug: 'ai-model-tuning',
    description: 'Fine-tune language or vision models for your specialized business needs.',
    image: '/images/ai-model-tuning.png',
    focus: 'ai',
    segment: 'future',
  },
  {
    id: 'data-annotation',
    title: 'Data Annotation Services',
    slug: 'data-annotation-services',
    description: 'Label and prepare datasets to train high-performance AI models.',
    image: '/images/data-annotation.png',
    focus: 'ai',
    segment: 'future',
  },

  // Climate
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint Calculation',
    slug: 'carbon-footprint-calculation',
    description: 'Assess Scope 1, 2, and 3 emissions for accurate carbon reporting.',
    image: '/images/carbon-footprint.png',
    focus: 'climate',
    segment: 'future',
  },
  {
    id: 'offset-verification',
    title: 'Offset Project Verification',
    slug: 'offset-verification',
    description: 'Certify emission reductions for carbon trading and compliance.',
    image: '/images/offset-verification.png',
    focus: 'climate',
    segment: 'future',
  },

  // Ethics
  {
    id: 'ai-ethics-audit',
    title: 'AI Ethics Audit',
    slug: 'ai-ethics-audit',
    description: 'Review AI systems for bias, fairness, and ethical compliance.',
    image: '/images/ai-ethics-audit.png',
    focus: 'ethics',
    segment: 'future',
  },
  {
    id: 'zk-integration',
    title: 'ZK Systems Integration',
    slug: 'zk-integration',
    description: 'Integrate Zero-Knowledge tech for privacy-preserving applications.',
    image: '/images/zk-integration.png',
    focus: 'ethics',
    segment: 'future',
  },

  // Strategy
  {
    id: 'platform-escrow',
    title: 'Platform Escrow Setup',
    slug: 'platform-escrow-setup',
    description: 'Add secure, programmable escrow layers to any SaaS or marketplace.',
    image: '/images/platform-escrow-setup.png',
    focus: 'default',
    segment: 'future',
  },
  {
    id: 'token-rewards',
    title: 'Revenue Strategy & Token Rewards',
    slug: 'token-rewards',
    description: 'Monetize your platform with incentive systems using FLR or crypto.',
    image: '/images/token-rewards.png',
    focus: 'default',
    segment: 'future',
  }
];

