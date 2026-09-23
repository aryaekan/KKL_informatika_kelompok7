import { Compass, GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#09090c] border-t border-white/[0.08] text-zinc-400 text-xs py-14 relative overflow-hidden">
      {/* Balinese Poleng subtle accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
      <div className="absolute top-1 inset-x-0 h-1.5 bg-poleng-subtle opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.06]">
          
          {/* Col 1: UPGRIS & Kelompok 7 Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bali-title text-base font-bold tracking-wide">
              <span>KKL INFORMATIKA</span>
              <span className="text-amber-400">·</span>
              <span className="text-amber-400">KELOMPOK 7</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Dokumentasi resmi Kuliah Kerja Lapangan (KKL) Program Studi Teknik Informatika, 
              Fakultas Teknik dan Informatika, Universitas PGRI Semarang (UPGRIS). 
              Ekspedisi Semarang ke Pulau Bali.
            </p>
            <div className="pt-2 flex items-center gap-2 text-zinc-400 text-[11px]">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Kampus 4 UPGRIS: Jl. Gajah Raya No. 40, Kota Semarang</span>
            </div>
          </div>

          {/* Col 2: 9 Destinasi Quick Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Destinasi KKL Terpadu</span>
            </h4>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-zinc-400">
              <span>· PT Victoria Care Semarang</span>
              <span>· Pantai Kuta Bali</span>
              <span>· Pura Ulun Danu Beratan</span>
              <span>· Balai Diklat Denpasar</span>
              <span>· Joger Bali Luwus</span>
              <span>· Cafe Tepi Pantai</span>
              <span>· Devdan Show Nusa Dua</span>
              <span>· Tari Kecak Sunset</span>
              <span>· Pantai Pandawa Kutuh</span>
            </div>
          </div>

          {/* Col 3: Balinese Wisdom */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Filosofi Kearifan Bali
            </h4>
            <div className="p-3 rounded-lg bg-[#121217] border border-white/[0.06] text-[11px] space-y-1">
              <p className="text-amber-300 font-semibold">"Tri Hita Karana"</p>
              <p className="text-zinc-400 leading-relaxed">
                Tiga penyebab terciptanya kebahagiaan sejati: keharmonisan manusia dengan Tuhan, 
                keharmonisan dengan alam semesta, dan keharmonisan dengan sesama manusia.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>
            © 2026 Kelompok 7 KKL Teknik Informatika Universitas PGRI Semarang (UPGRIS).
          </p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan dedikasi mahasiswa Kelompok 7</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>untuk Almamater UPGRIS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
