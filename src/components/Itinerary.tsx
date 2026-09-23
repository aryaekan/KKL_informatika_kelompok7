import { useState } from 'react';
import { ITINERARY_DATA } from '../data/kklData';
import { Calendar, Clock, MapPin, CheckCircle, Navigation } from 'lucide-react';

export default function Itinerary() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = ITINERARY_DATA[activeDayIndex];

  return (
    <section id="jadwal" className="py-20 bg-[#0c0c0e] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Rute & Jadwal Kegiatan Terpadu</span>
          </div>
          <h2 className="font-bali-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
            Itinerary Ekspedisi 5 Hari KKL
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
            Rangkaian agenda kegiatan mahasiswa Teknik Informatika UPGRIS Kelompok 7, 
            dimulai dari kunjungan industri di Kota Semarang hingga eksplorasi kebudayaan dan instansi di Pulau Bali.
          </p>
        </div>

        {/* Day Switcher Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-10">
          {ITINERARY_DATA.map((item, idx) => (
            <button
              key={item.day}
              onClick={() => setActiveDayIndex(idx)}
              className={`p-3.5 rounded-xl text-left border transition-all duration-200 ${
                activeDayIndex === idx
                  ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-md shadow-amber-400/20'
                  : 'bg-[#141419] text-zinc-300 border-white/[0.08] hover:border-white/20 hover:bg-[#1a1a22]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${activeDayIndex === idx ? 'text-zinc-900' : 'text-amber-400'}`}>
                  HARI 0{item.day}
                </span>
                <span className={`text-[10px] ${activeDayIndex === idx ? 'text-zinc-800 font-medium' : 'text-zinc-400'}`}>
                  {item.date.split(',')[0]}
                </span>
              </div>
              <p className={`text-xs font-semibold mt-1 truncate ${activeDayIndex === idx ? 'text-zinc-950' : 'text-white'}`}>
                {item.theme}
              </p>
            </button>
          ))}
        </div>

        {/* Active Day Overview Card */}
        <div className="rounded-2xl bg-[#141419] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
                <span>Hari ke-{activeDay.day}</span>
                <span>·</span>
                <span>{activeDay.date}</span>
                <span>·</span>
                <span className="text-zinc-400">{activeDay.theme}</span>
              </div>
              <h3 className="font-bali-title text-xl sm:text-2xl font-bold text-white">
                {activeDay.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed max-w-3xl">
                {activeDay.description}
              </p>
            </div>

            {/* Visited locations for the day */}
            <div className="lg:max-w-xs shrink-0 bg-[#0f0f14] p-4 rounded-xl border border-white/[0.06] space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                Destinasi Hari Ini:
              </span>
              <ul className="space-y-1 text-xs text-zinc-200">
                {activeDay.locations.map((loc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="truncate">{loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Activities Timeline */}
          <div className="mt-8 space-y-6">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Kronologi Agenda Kegiatan
            </h4>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-400 before:via-amber-500/50 before:to-zinc-800">
              {activeDay.activities.map((act, idx) => (
                <div key={idx} className="relative group">
                  {/* Bullet marker */}
                  <div className="absolute -left-6 sm:-left-8 top-1 w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#141419] border-2 border-amber-400 group-hover:bg-amber-400 transition-colors" />

                  <div className="p-4 rounded-xl bg-[#181820] border border-white/[0.06] group-hover:border-amber-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-mono tabular-nums">{act.time} WIB / WITA</span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {act.activity}
                      </p>
                      {act.note && (
                        <p className="text-xs text-zinc-400 italic">
                          Catatan: {act.note}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 text-xs text-zinc-300 bg-[#0f0f13] px-3 py-1.5 rounded-lg border border-white/[0.04]">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{act.place}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Informative banner for group coordinator */}
        <div className="p-4 rounded-xl bg-[#141418] border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Koordinator Bus 2: Dimas Arya Pratama (Ketua Kelompok 7)</p>
              <p className="text-zinc-400">Seluruh anggota diimbau kumpul tepat waktu 15 menit sebelum keberangkatan setiap destinasi.</p>
            </div>
          </div>
          <a
            href="#destinasi"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#22222b] hover:bg-[#2c2c38] text-amber-300 font-medium whitespace-nowrap self-start sm:self-auto"
          >
            Eksplorasi Profil Destinasi
          </a>
        </div>

      </div>
    </section>
  );
}
