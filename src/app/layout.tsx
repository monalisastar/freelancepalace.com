import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientRoot from '../components/ClientRoot';
import CanonicalUrl from '../components/CanonicalUrl';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Freelancers Palace – Hire Elite Talent for Web3, AI, Climate & More',
  description:
    'A futuristic freelance platform where verified experts in AI, Climate Action, Web3, and Creative Tech meet premium clients. Built on FLR trust and blockchain-secured escrow.',
  keywords: [
    'Freelancers Palace',
    'Web3 Freelancers',
    'AI Experts',
    'Climate Talent',
    'Escrow Platform',
    'Decentralized Freelance',
    'Hire Freelancers',
    'FLR token',
    'Remote Work 2025',
  ],
  openGraph: {
    title: 'Freelancers Palace',
    description:
      'Hire elite, verified talent across AI, Web3, and Climate sectors.',
    url: 'https://freelancerspalace.com',
    siteName: 'Freelancers Palace',
    images: [
      {
        url: '/images/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Freelancers Palace Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@freelancerspalace',
    title: 'Freelancers Palace – The Future of Freelance',
    description: 'Discover verified freelancers in AI, Climate, Web3 & more.',
    images: ['/images/og-preview.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ JSON-LD for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: 'Freelancers Palace',
              url: 'https://freelancerspalace.com',
              logo: 'https://freelancerspalace.com/images/logo.png',
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
        <CanonicalUrl />
      </body>
    </html>
  );
}


