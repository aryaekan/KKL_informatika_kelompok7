import { useState, useEffect } from 'react';
import { GALLERY_INITIAL_DATA } from '../data/kklData';
import { PhotoItem } from '../types';
import { Camera, Heart, Plus, X, MapPin, Calendar, User, UploadCloud, Eye } from 'lucide-react';

const STORAGE_KEY = 'kkl_kelompok7_gallery_v1';

export default function Gallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return GALLERY_INITIAL_DATA;
  });

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activeLightbox, setActiveLightbox] = useState<PhotoItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  // Form states for new photo upload
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<'Industri' | 'Budaya' | 'Pantai' | 'Kelompok'>('Budaya');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newAuthor, setNewAuthor] = useState('Anggota Kelompok 7');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // ignore
    }
  }, [photos]);

  const filteredPhotos = activeCategory === 'Semua'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlyLiked = likedPhotos[id];
    setLikedPhotos({ ...likedPhotos, [id]: !isCurrentlyLiked });
    setPhotos(
      photos.map((p) =>
        p.id === id ? { ...p, likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const newPhotoItem: PhotoItem = {
      id: `p-${Date.now()}`,
      title: newTitle,
      location: newLocation || 'Bali, Indonesia',
      category: newCategory,
      imageUrl: newImageUrl,
      caption: newCaption || 'Momen seru KKL Informatika UPGRIS Kelompok 7.',
      author: newAuthor,
      date: 'KKL Hari Ini',
      likes: 1
    };

    setPhotos([newPhotoItem, ...photos]);
    setIsUploadModalOpen(false);

    // Reset fields
    setNewTitle('');
    setNewLocation('');
    setNewImageUrl('');
    setNewCaption('');
  };

  // Handle local file selection to data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="galeri" className="py-20 bg-[#0e0e12] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Dokumentasi Visual Interaktif</span>
            </div>
            <h2 className="font-bali-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
              Galeri Foto Ekspedisi KKL
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
              Koleksi foto otentik kegiatan observasi industri, destinasi budaya candi dan teater, 
              keindahan pantai, serta kekompakan mahasiswa Kelompok 7 di Pulau Bali.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Unggah Foto Dokumentasi</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {['Semua', 'Industri', 'Budaya', 'Pantai', 'Kelompok'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                  : 'bg-[#18181f] text-zinc-400 hover:text-zinc-100 hover:bg-[#23232c]'
              }`}
            >
              {cat} ({cat === 'Semua' ? photos.length : photos.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>

        {/* Photo Bento / Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item, index) => {
            const isFeatured = index === 0 || index === 3;
            return (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-[#141419] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-200 flex flex-col relative ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Photo container */}
                <div className="relative aspect-[16/10] bg-[#1a1a24] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top overlay metadata */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-zinc-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:scale-110 transition-transform"
                      aria-label="Suka Foto"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedPhotos[item.id] ? 'fill-red-500 text-red-500' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bottom overlay info */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-amber-300 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <h3 className="font-bali-title text-base sm:text-lg font-bold leading-snug truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card footer description */}
                <div className="p-4 bg-[#141419] flex items-center justify-between text-xs text-zinc-400 border-t border-white/[0.06]">
                  <span className="truncate max-w-[200px]">Oleh: {item.author}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <Heart className="w-3.5 h-3.5 text-amber-400" />
                      <span className="tabular-nums">{item.likes}</span>
                    </span>
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Detail
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#14141a] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 text-zinc-300 hover:text-white bg-black/60 rounded-full hover:bg-black/80"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Area */}
            <div className="relative max-h-[65vh] flex items-center justify-center bg-black">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            {/* Metadata and Caption */}
            <div className="p-6 space-y-3 bg-[#16161d]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                <div>
                  <h3 className="font-bali-title text-xl font-bold text-white">
                    {activeLightbox.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeLightbox.location}</span>
                    <span>·</span>
                    <span className="text-amber-400 font-medium">{activeLightbox.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(activeLightbox.id, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22222c] border border-white/10 text-xs font-semibold text-white hover:bg-[#2a2a36]"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedPhotos[activeLightbox.id] ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                    <span className="tabular-nums">{activeLightbox.likes} Suka</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeLightbox.caption}
              </p>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Fotografer: <strong className="text-zinc-200">{activeLightbox.author}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{activeLightbox.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#16161d] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <UploadCloud className="w-4 h-4" />
              <span>Unggah Dokumentasi Mahasiswa</span>
            </div>

            <h3 className="font-bali-title text-xl font-bold text-white">
              Tambah Foto Kegiatan KKL
            </h3>

            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Judul Foto Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Diskusi Kelompok 7 di Tepi Danau Beratan"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Lokasi Foto
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Contoh: Pantai Pandawa / Victoria Care"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Kategori Foto
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as 'Industri' | 'Budaya' | 'Pantai' | 'Kelompok')}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Budaya">Budaya & Pura</option>
                    <option value="Industri">Kunjungan Industri & Instansi</option>
                    <option value="Pantai">Pantai & Rekreasi</option>
                    <option value="Kelompok">Momen Kelompok 7</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Pilih Berkas Foto Lokal (atau masukkan URL di bawah)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-zinc-950 hover:file:bg-amber-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Atau Masukkan URL Gambar (Direct Link / Online) *
                </label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {newImageUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-[#0d0d10]">
                  <img
                    src={newImageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                  <div className="absolute top-2 left-2 text-[10px] bg-black/70 px-2 py-0.5 rounded text-zinc-300">
                    Pratinjau Foto
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Nama Fotografer / Mahasiswa
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Contoh: Rizky Kurniawan"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Keterangan Foto / Cerita Momen
                </label>
                <textarea
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Tuliskan cerita menarik di balik momen ini..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#22222b] rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Simpan ke Galeri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
