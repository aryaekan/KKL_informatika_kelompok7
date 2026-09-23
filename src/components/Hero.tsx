import { ASSETS, KKL_STATS } from '../data/kklData';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-24 border-b border-white/[0.08] bg-[#0c0c0e]">
      {/* Subtle Balinese Poleng accent strip at top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
      <div className="absolute top-1 inset-x-0 h-2 bg-poleng-subtle opacity-60" />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Context */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-amber-400 tracking-wider uppercase font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Kuliah Kerja Lapangan (KKL) · Teknik Informatika UPGRIS</span>
            </div>

            <h1 className="font-bali-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
              Ekspedisi Budaya & Teknologi Pulau Dewata
              <span className="block text-gold-gradient mt-1">Kelompok 7 Informatika UPGRIS</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Dokumentasi komprehensif perjalanan studi lapangan mahasiswa Teknik Informatika Universitas PGRI Semarang. 
              Menghubungkan implementasi otomatisasi industri dan sistem cerdas modern dengan keluhuran tradisi serta keindahan Pulau Bali.
            </p>

            {/* Micro Balinese Greeting quote */}
            <div className="p-4 rounded-xl bg-[#141418] border border-amber-500/20 text-xs text-zinc-300 flex items-start gap-3">
              <span className="text-lg leading-none">🪷</span>
              <div>
                <p className="font-medium text-amber-300">Om Swastyastu · Salam Hangat dari Kelompok 7</p>
                <p className="text-zinc-400 mt-0.5">
                  Dari Semarang (Victoria Care Indonesia) hingga Denpasar, Badung, dan Tabanan.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#destinasi"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>Lihat 9 Destinasi Kunjungan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#kelompok-7"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-[#18181c] hover:bg-[#202026] border border-white/[0.1] rounded-lg transition-colors"
              >
                <span>Anggota Kelompok 7</span>
              </a>
            </div>

            {/* Quantitative Stats Row (Anti-Slop compliant: unboxed, clean tabular data) */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="block font-bali-title text-2xl font-bold text-white tabular-nums">
                  {KKL_STATS.destinationsCount}
                </span>
                <span className="text-xs text-zinc-400">Titik Kunjungan</span>
              </div>
              <div>
                <span className="block font-bali-title text-2xl font-bold text-white tabular-nums">
                  {KKL_STATS.membersCount}
                </span>
                <span className="text-xs text-zinc-400">Mahasiswa Kelompok 7</span>
              </div>
              <div>
                <span className="block font-bali-title text-2xl font-bold text-white tabular-nums">
                  {KKL_STATS.totalDistanceKm} <span className="text-xs font-sans text-amber-400 font-normal">KM</span>
                </span>
                <span className="text-xs text-zinc-400">Rute Semarang-Bali</span>
              </div>
              <div>
                <span className="block font-bali-title text-2xl font-bold text-white tabular-nums">
                  {KKL_STATS.daysCount} <span className="text-xs font-sans text-amber-400 font-normal">Hari</span>
                </span>
                <span className="text-xs text-zinc-400">Durasi Ekspedisi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-black/80 bg-[#121216] aspect-[4/3] lg:aspect-[3/4]">
              <img
                src={ASSETS.heroTemple}
                alt="Pura Ulun Danu Beratan Bedugul Bali - Landmark KKL Informatika UPGRIS"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Subtle Balinese Gold Frame Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Bottom Visual Annotation */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Danau Beratan, Tabanan, Bali</span>
                </div>
                <h2 className="font-bali-title text-lg sm:text-xl font-bold leading-snug">
                  Pura Ulun Danu Beratan
                </h2>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                  Destinasi ikonik dataran tinggi Bedugul yang menjadi salah satu titik observasi budaya dan digital ticketing Kelompok 7.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
                  <span>Bus 2 · Angkatan 2022</span>
                  <span className="text-amber-300 font-semibold">Dokumentasi KKL 2026</span>
                </div>
              </div>
            </div>

            {/* Floating decorative badge */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 p-3 rounded-xl bg-[#17171d]/95 backdrop-blur-md border border-amber-500/30 shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-lg">
                🏝️
              </div>
              <div>
                <p className="text-xs font-semibold text-white">KKL Informatika UPGRIS</p>
                <p className="text-[11px] text-zinc-400">Semarang ➔ Bali PP</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
