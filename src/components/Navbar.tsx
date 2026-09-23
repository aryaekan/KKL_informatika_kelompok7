import { useState } from 'react';
import BaliAmbience from './BaliAmbience';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Destinasi', href: '#destinasi' },
    { label: 'Jadwal KKL', href: '#jadwal' },
    { label: 'Galeri Foto', href: '#galeri' },
    { label: 'Video KKL', href: '#dokumentasi-video' },
    { label: 'Kelompok 7', href: '#kelompok-7' },
    { label: 'Buku Pesan', href: '#buku-pesan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-bali-title text-base sm:text-lg font-bold tracking-wider text-zinc-100 hover:text-amber-400 transition-colors whitespace-nowrap"
        >
          KKL INFORMATIKA <span className="text-amber-400">·</span> KELOMPOK 7
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <BaliAmbience />
          <a
            href="#kelompok-7"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shadow-sm"
          >
            Anggota Tim
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100 rounded-md"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#111114] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-white/[0.05] rounded-md hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.08]">
            <a
              href="#kelompok-7"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-md"
            >
              Lihat Profil Kelompok 7
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
