import { useState, useEffect } from 'react';
import { INITIAL_GUESTBOOK } from '../data/kklData';
import { GuestbookEntry } from '../types';
import { MessageSquare, Send, Star, CheckCircle, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'kkl_kelompok7_guestbook_v1';

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_GUESTBOOK;
  });

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedToast, setSubmittedToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name,
      roleOrAffiliation: role || 'Rekan Mahasiswa UPGRIS',
      message,
      timestamp: 'Baru saja',
      rating
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setRole('');
    setMessage('');
    setRating(5);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3500);
  };

  return (
    <section id="buku-pesan" className="py-20 bg-[#0c0c0e] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Kesan, Pesan & Doa Perjalanan</span>
          </div>
          <h2 className="font-bali-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
            Buku Kenangan KKL Kelompok 7
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
            Tinggalkan pesan kesan, salam almamater, atau apresiasi untuk seluruh tim dan rekan seperjuangan 
            Teknik Informatika UPGRIS yang telah menyelesaikan rangkaian kegiatan KKL di Bali.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-5 bg-[#141419] border border-white/[0.08] rounded-2xl p-6 sm:p-7 relative">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tuliskan Kesan Anda</span>
            </div>

            {submittedToast && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Terima kasih! Pesan kesan Anda berhasil diterbitkan.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap / Panggilan"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0d0d11] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Afiliasi / Status
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Mahasiswa TI UPGRIS / Dosen / Alumni"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0d0d11] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Rating Pengalaman KKL
                </label>
                <div className="flex items-center gap-1 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-zinc-500 hover:text-amber-400 transition-colors"
                      aria-label={`Beri bintang ${star}`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs text-zinc-400">{rating} dari 5 bintang</span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Pesan, Kesan & Harapan *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan pengalaman seru atau kesan Anda terhadap kegiatan KKL dan kekompakan Kelompok 7..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0d0d11] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md shadow-amber-400/10"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Kesan & Pesan</span>
              </button>
            </form>
          </div>

          {/* Right: Message Stream */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
              <span>{entries.length} Catatan dari Komunitas KKL</span>
              <span>Terbaru di atas</span>
            </div>

            <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-xl bg-[#141419] border border-white/[0.06] hover:border-amber-500/20 transition-colors space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-sm text-white">
                        {entry.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {entry.roleOrAffiliation}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {Array.from({ length: entry.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    "{entry.message}"
                  </p>

                  <div className="pt-2 border-t border-white/[0.04] text-[11px] text-zinc-500 text-right">
                    {entry.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
