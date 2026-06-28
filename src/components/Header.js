'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-500">
          Design Pro Mega
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-red-400 transition">Home</Link>
          <Link href="/studio/video" className="hover:text-red-400 transition">Video Studio</Link>
          <Link href="/contact" className="hover:text-red-400 transition">Contact</Link>
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 py-4 space-y-2 text-center">
          <Link href="/" className="block hover:text-red-400" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/studio/video" className="block hover:text-red-400" onClick={() => setMenuOpen(false)}>Video Studio</Link>
          <Link href="/contact" className="block hover:text-red-400" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
