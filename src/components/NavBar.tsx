'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10 text-white">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* FLR Trust Labs Badge */}
        <Link href="/flr-trust">
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 cursor-pointer hover:opacity-90 transition">
            FLR Trust Labs
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="flex gap-6 items-center text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/escrow">Escrow Services</Link>
        </div>

        {/* Login Button */}
        <div>
          <Link
            href="/login"
            className="px-5 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}


