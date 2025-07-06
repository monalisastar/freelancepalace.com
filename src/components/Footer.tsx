'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Brand + Tagline */}
        <div>
          <h3 className="text-xl font-bold text-white">Freelancers Palace</h3>
          <p className="mt-2 text-sm text-gray-400">
            Empowering trust through blockchain-secured freelance work and escrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="#services" className="hover:underline">Services</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/start-escrow" className="hover:underline">Start Escrow</Link></li>
          </ul>
        </div>

        {/* Contact / Future Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Get in Touch</h4>
          <p className="text-sm text-gray-400">
            Have questions or feedback? Reach out on Discord, Twitter, or by email.
          </p>
          {/* Optional future social icons */}
          {/* <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="Discord"><DiscordIcon /></a>
          </div> */}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
        © 2025 Freelancers Palace. All rights reserved.
      </div>
    </footer>
  );
}

