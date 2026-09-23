import { useState, useEffect } from 'react';
import { DESTINATIONS_DATA } from '../data/kklData';
import { Destination } from '../types';
import { 
  MapPin, 
  Cpu, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  Compass, 
  Edit3, 
  Save, 
  RotateCcw, 
  Upload, 
  Calendar, 
  Image as ImageIcon 
} from 'lucide-react';

const STORAGE_KEY = 'kkl_destinations_custom_v1';

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DESTINATIONS_DATA;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);
  
  // State for Edit Modal
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [editForm, setEditForm] = useState<{
    id: string;
    name: string;
    dayNumber: number;
    image: string;
    category: Destination['category'];
    location: string;
    regency: string;
    shortDesc: string;
    itRelevance: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(destinations));
    } catch {
      // ignore
    }
  }, [destinations]);

  const categories = ['Semua', 'Kunjungan Industri', 'Wisata Budaya', 'Wisata Bahari', 'Hiburan & Edukasi', 'Instansi'];

  const filteredDestinations = selectedCategory === 'Semua'
    ? destinations
    : destinations.filter((d) => d.category === selectedCategory);

  const handleOpenEdit = (dest: Destination, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingDest(dest);
    setEditForm({
      id: dest.id,
      name: dest.name,
      dayNumber: dest.dayNumber,
      image: dest.image,
      category: dest.category,
      location: dest.location,
      regency: dest.regency,
      shortDesc: dest.shortDesc,
      itRelevance: dest.itRelevance,
    });
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editForm) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditForm({
            ...editForm,
            image: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm || !editForm.name) return;

    const updated = destinations.map((d) => {
      if (d.id === editForm.id) {
        return {
          ...d,
          name: editForm.name,
          dayNumber: Number(editForm.dayNumber) || 1,
          image: editForm.image,
          category: editForm.category,
          location: editForm.location,
          regency: editForm.regency,
          shortDesc: editForm.shortDesc,
          itRelevance: editForm.itRelevance,
        };
      }
      return d;
    });

    setDestinations(updated);

    // If modal detail is currently open for this destination, update it too
    if (activeModalDest && activeModalDest.id === editForm.id) {
      const updatedItem = updated.find((d) => d.id === editForm.id) || null;
      setActiveModalDest(updatedItem);
    }

    setEditingDest(null);
    setEditForm(null);
    setToastMessage(`Destinasi "${editForm.name}" berhasil diperbarui!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResetToDefault = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan seluruh data dan gambar destinasi ke data bawaan awal?')) {
      setDestinations(DESTINATIONS_DATA);
      localStorage.removeItem(STORAGE_KEY);
      if (activeModalDest) {
        const found = DESTINATIONS_DATA.find((d) => d.id === activeModalDest.id);
        setActiveModalDest(found || null);
      }
      setToastMessage('Data destinasi berhasil dikembalikan ke versi bawaan awal.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <section id="destinasi" className="py-20 bg-[#0e0e12] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Titik Kunjungan KKL Informatika UPGRIS</span>
            </div>
            <h2 className="font-bali-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
              Rangkaian Destinasi Studi & Budaya di Semarang & Bali
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
              Daftar tempat yang dikunjungi selama KKL. Anda dapat mengubah foto/gambar, nama tempat, 
              serta hari kunjungan sesuai dengan jadwal kegiatan yang berjalan.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 bg-[#16161c] hover:bg-[#202028] border border-white/[0.08] rounded-lg transition-colors"
              title="Kembalikan semua nama, hari, dan gambar destinasi ke awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Destinasi</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Functional Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm shadow-amber-400/20'
                  : 'bg-[#18181f] text-zinc-400 hover:text-zinc-100 hover:bg-[#23232c]'
              }`}
            >
              {cat} ({cat === 'Semua' ? destinations.length : destinations.filter((d) => d.category === cat).length})
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest, idx) => (
            <div
              key={dest.id}
              onClick={() => setActiveModalDest(dest)}
              className="group cursor-pointer rounded-2xl bg-[#141419] border border-white/[0.07] hover:border-amber-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-black/80 relative"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-[16/10] bg-[#1a1a22] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-black/40" />
                  
                  {/* Clean Day Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-100 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Hari ke-{dest.dayNumber} KKL</span>
                  </div>

                  {/* Edit Quick Button on Card Top Right */}
                  <button
                    onClick={(e) => handleOpenEdit(dest, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 transition-colors backdrop-blur-md"
                    title="Ganti Gambar, Nama, atau Hari Kunjungan"
                    aria-label="Edit Destinasi"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Card Bottom Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                    <span className="flex items-center gap-1 truncate max-w-[180px]">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{dest.regency}</span>
                    </span>
                    <span className="text-amber-400 text-[11px] font-medium">{dest.category}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-[11px] text-zinc-400 font-mono mb-1">
                      0{idx + 1}. Titik Perjalanan
                    </div>
                    <h3 className="font-bali-title text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {dest.shortDesc}
                    </p>
                  </div>

                  {/* IT Relevance Box */}
                  <div className="pt-3 border-t border-white/[0.06]">
                    <div className="flex items-start gap-2 text-xs text-zinc-300">
                      <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-zinc-300 leading-tight line-clamp-2">
                        <strong className="text-amber-300 font-semibold">Fokus TI: </strong>
                        {dest.itRelevance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action hints */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-amber-400 font-medium border-t border-white/[0.04]">
                <span className="flex items-center gap-1 group-hover:underline">
                  <span>Lihat Detail</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
                <button
                  type="button"
                  onClick={(e) => handleOpenEdit(dest, e)}
                  className="text-zinc-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Data</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Detail for Destinasi */}
      {activeModalDest && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveModalDest(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#16161c] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalDest(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors z-10"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-[#0f0f13]">
              <img
                src={activeModalDest.image}
                alt={activeModalDest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161c] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  {activeModalDest.category} · Hari ke-{activeModalDest.dayNumber} KKL
                </span>
                <h3 className="font-bali-title text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {activeModalDest.name}
                </h3>
              </div>
            </div>

            {/* Location & Metadata */}
            <div className="flex items-center justify-between gap-2 text-xs text-zinc-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{activeModalDest.location}, {activeModalDest.regency}</span>
              </div>
              <button
                onClick={() => handleOpenEdit(activeModalDest)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-zinc-950 font-semibold transition-colors text-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ganti Gambar / Nama / Hari</span>
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wide">
                Deskripsi & Catatan Kunjungan
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeModalDest.fullDesc}
              </p>
            </div>

            {/* IT Focus */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Relevansi Bidang Teknik Informatika (TI)</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {activeModalDest.itRelevance}
              </p>
            </div>

            {/* Highlights List */}
            {activeModalDest.highlights && activeModalDest.highlights.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-2.5">
                  Poin Utama Kegiatan & Observasi:
                </h4>
                <ul className="space-y-2">
                  {activeModalDest.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => handleOpenEdit(activeModalDest)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Destinasi Ini</span>
              </button>
              <button
                onClick={() => setActiveModalDest(null)}
                className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#22222b] rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Destination Modal Form (Ganti Gambar, Nama, Hari) */}
      {editingDest && editForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setEditingDest(null)}
        >
          <div
            className="relative w-full max-w-xl bg-[#16161d] border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingDest(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <Edit3 className="w-4 h-4" />
              <span>Kustomisasi Data Destinasi KKL</span>
            </div>

            <h3 className="font-bali-title text-xl font-bold text-white">
              Ganti Gambar, Nama & Hari Kunjungan
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              
              {/* 1. Ganti Nama Destinasi */}
              <div>
                <label className="block text-zinc-200 font-semibold mb-1">
                  Nama Destinasi Kunjungan *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Contoh: Pura Ulun Danu Beratan / PT Victoria Care Indonesia"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0f0f14] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-sm font-medium"
                />
              </div>

              {/* 2. Ganti Hari Kunjungan */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-200 font-semibold mb-1">
                    Hari Kunjungan KKL *
                  </label>
                  <select
                    value={editForm.dayNumber}
                    onChange={(e) => setEditForm({ ...editForm, dayNumber: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0f0f14] border border-white/10 text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value={1}>Hari ke-1 (Semarang & Perjalanan)</option>
                    <option value={2}>Hari ke-2 (Bedugul & Tabanan)</option>
                    <option value={3}>Hari ke-3 (Nusa Dua & Pantai Selatan)</option>
                    <option value={4}>Hari ke-4 (Denpasar, Kuta & Sunset)</option>
                    <option value={5}>Hari ke-5 (Tari Kecak & Penutupan)</option>
                    <option value={6}>Hari ke-6</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-200 font-semibold mb-1">
                    Kategori Destinasi
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value as Destination['category'] })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0f0f14] border border-white/10 text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value="Kunjungan Industri">Kunjungan Industri</option>
                    <option value="Wisata Budaya">Wisata Budaya</option>
                    <option value="Wisata Bahari">Wisata Bahari</option>
                    <option value="Hiburan & Edukasi">Hiburan & Edukasi</option>
                    <option value="Instansi">Instansi</option>
                  </select>
                </div>
              </div>

              {/* 3. Ganti Gambar Destinasi */}
              <div className="p-3.5 rounded-xl bg-[#0f0f14] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Ganti Gambar / Foto Destinasi</span>
                </div>

                {/* Upload File Gambar Lokal */}
                <div>
                  <label className="block text-zinc-400 text-[11px] mb-1">
                    Opsi A: Unggah Berkas Gambar Baru (dari Laptop/HP)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="w-full text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-zinc-950 hover:file:bg-amber-300 cursor-pointer"
                  />
                </div>

                {/* Atau URL Gambar */}
                <div>
                  <label className="block text-zinc-400 text-[11px] mb-1">
                    Opsi B: Atau Masukkan URL Gambar (Direct Link)
                  </label>
                  <input
                    type="url"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#14141a] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Preview Image */}
                {editForm.image && (
                  <div>
                    <span className="block text-[11px] text-zinc-400 mb-1">Pratinjau Gambar Baru:</span>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">
                      <img
                        src={editForm.image}
                        alt="Pratinjau Gambar Baru"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.opacity = '0.3';
                        }}
                      />
                      <div className="absolute top-2 left-2 text-[10px] bg-black/70 px-2 py-0.5 rounded text-amber-300 font-mono">
                        Preview Terpilih
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lokasi & Daerah */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Lokasi / Alamat Singkat
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder="Contoh: Danau Beratan, Baturiti"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0f0f14] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Kabupaten / Wilayah
                  </label>
                  <input
                    type="text"
                    value={editForm.regency}
                    onChange={(e) => setEditForm({ ...editForm, regency: e.target.value })}
                    placeholder="Contoh: Tabanan, Bali"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0f0f14] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Deskripsi Singkat */}
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={editForm.shortDesc}
                  onChange={(e) => setEditForm({ ...editForm, shortDesc: e.target.value })}
                  placeholder="Ringkasan kegiatan atau keunikan tempat..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0f0f14] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Fokus TI */}
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Keterkaitan dengan Bidang Informatika (TI)
                </label>
                <input
                  type="text"
                  value={editForm.itRelevance}
                  onChange={(e) => setEditForm({ ...editForm, itRelevance: e.target.value })}
                  placeholder="Contoh: ERP, IoT, E-Ticketing, Lighting DMX Automation..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0f0f14] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#22222b] rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md shadow-amber-400/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
