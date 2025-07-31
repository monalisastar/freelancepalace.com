import { Geist, Geist_Mono } from 'next/font/google';
import ClientRoot from '../components/ClientRoot';
import CanonicalUrl from '../components/CanonicalUrl';
import Footer from '../components/Footer';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const domain = headerList.get('host') || '';

  const isPalace = domain.includes('freelancerpalace.com');
  const isVerse = domain.includes('freelancersverse.com');

  return {
    title: isPalace
      ? 'Freelancers Palace – The Future of Trust-Based Freelance Work'
      : 'Freelancersverse – The Future of Trust-Based Freelance Work',
    description: isPalace
      ? 'Freelancers Palace is a futuristic freelance platform where verified experts in AI, Climate Action, Web3, and Creative Tech connect with premium clients. Built on FLR trust and blockchain-secured escrow.'
      : 'Freelancersverse is a futuristic freelance platform where verified experts in AI, Climate Action, Web3, and Creative Tech connect with premium clients. Built on FLR trust and blockchain-secured escrow.',
    keywords: [
      // Brand
      'Freelancers Palace',
      'Freelancersverse',
      'FLR token',
      'FLR trust score',

      // Freelance talent categories
      'Web3 Freelancers',
      'AI Experts for Hire',
      'Climate Talent Network',
      'Creative Freelancers',
      'Ethical AI Freelancers',
      'Blockchain Developers',
      'Sustainability Consultants',
      'Remote Designers',
      'Prompt Engineers',
      'Smart Contract Auditors',

      // Employer searches
      'Hire Remote Freelancers',
      'Top Freelance Developers',
      'Verified Freelancers for Hire',
      'Hire AI Engineers',
      'Hire Climate Consultants',
      'Freelancer Vetting Platform',
      'Escrow Freelance Marketplace',
      'Trust-Based Hiring Platform',
      'Find Certified Freelancers',

      // Freelancer job searches
      'Remote Jobs 2025',
      'Work from Home Opportunities',
      'Freelance Work Online',
      'Web3 Jobs',
      'AI Freelance Projects',
      'Climate Action Freelance Jobs',
      'Get Paid in Crypto',
      'Decentralized Jobs Marketplace',
      'Freelance Platform with Escrow',

      // General SEO + discovery
      'Freelance Work 2025',
      'Remote Work for Developers',
      'Freelance Projects with Escrow',
      'Decentralized Freelance Platform',
      'Next-Gen Freelance Marketplace',
      'Secure Freelance Payments',
      'Blockchain Freelance Jobs',
      'Global Freelance Opportunities',
      'Freelance Platforms like Upwork',
      'Futuristic Freelance Network',
    ],
    openGraph: {
      title: isPalace ? 'Freelancers Palace' : 'Freelancersverse',
      description:
        'Hire elite, verified talent across AI, Web3, and Climate sectors.',
      url: isPalace ? 'https://freelancerpalace.com' : 'https://freelancersverse.com',
      siteName: isPalace ? 'Freelancers Palace' : 'Freelancersverse',
      images: [
        {
          url: isPalace ? '/images/og-palace.jpg' : '/images/og-verse.jpg',
          width: 1200,
          height: 630,
          alt: isPalace ? 'Freelancers Palace Preview' : 'Freelancersverse Preview',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: isPalace ? '@freelancerspalace' : '@freelancersverse',
      title: isPalace
        ? 'Freelancers Palace – The Future of Freelance'
        : 'Freelancersverse – The Future of Freelance',
      description: 'Discover verified freelancers in AI, Climate, Web3 & more.',
      images: [isPalace ? '/images/og-palace.jpg' : '/images/og-verse.jpg'],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="qjRccsiCX5RnDXdVnj5HrPPMgXOlnxORytP1Z2ELS6g" />
        {/* JSON-LD will default to palace; you can dynamically render this later with useEffect if needed */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Freelancers Palace',
              url: 'https://freelancerpalace.com',
              logo: 'https://freelancerpalace.com/images/logo.png',
              sameAs: [
                'https://twitter.com/freelancerspalace',
                'https://discord.gg/YOUR-DISCORD-INVITE',
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientRoot>{children}</ClientRoot>
        <Footer />
        <CanonicalUrl />
      </body>
    </html>
  );
}
