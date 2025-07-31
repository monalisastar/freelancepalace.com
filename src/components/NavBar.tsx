'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10 text-white">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* FLR Trust Labs Badge */}
        <Link href="/flr-trust">
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 cursor-pointer hover:opacity-90 transition">
            FLR Trust Labs
          </div>
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/escrow">Escrow Services</Link>
        </div>

        {/* Desktop Login */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="px-5 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 bg-black/90 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 p-6 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link href="/escrow" onClick={() => setMenuOpen(false)}>Escrow Services</Link>
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-2 rounded-md bg-white text-black text-center hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
