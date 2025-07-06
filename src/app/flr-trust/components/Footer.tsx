'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 text-white text-sm py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-300">
        
        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Navigation</h4>
          <ul className="space-y-1">
            <li><Link href="/flr-trust">About</Link></li>
            <li><Link href="/flr-trust/faq">FAQ</Link></li>
            <li><Link href="/flr-trust/certifications">Certifications</Link></li>
            <li><Link href="/flr-trust/whitepaper">Whitepaper</Link></li>
          </ul>
        </div>

        {/* Trust Pillars */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Trust</h4>
          <ul className="space-y-1">
            <li>Escrow Verified</li>
            <li>AI Audited</li>
            <li>FLR Trust Badge</li>
          </ul>
        </div>

        {/* External Links */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Ecosystem</h4>
          <ul className="space-y-1">
            <li><Link href="/">Freelancers Palace</Link></li>
            <li><Link href="/escrow">FLR Escrow</Link></li>
            <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">Join Discord</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/flr-trust/legal">Terms of Service</Link></li>
            <li><Link href="/flr-trust/legal">Privacy Policy</Link></li>
            <li><Link href="/flr-trust/legal">Compliance</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-white/30 text-xs">
        &copy; {new Date().getFullYear()} FLR Trust Labs. All rights reserved.
      </div>
    </footer>
  )
}

