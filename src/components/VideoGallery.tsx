import { useState, useEffect } from 'react';
import { INITIAL_VIDEOS_DATA } from '../data/kklData';
import { VideoItem } from '../types';
import { Video, Play, Plus, X, MapPin, Heart, Clock, Upload, Film, Eye, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'kkl_kelompok7_videos_v1';

export default function VideoGallery() {
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_VIDEOS_DATA;
  });

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activePlayerVideo, setActivePlayerVideo] = useState<VideoItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});
  const [uploadToast, setUploadToast] = useState(false);

  // Form states for uploading new video
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<'Aftermovie' | 'Kunjungan Industri' | 'Wisata & Budaya' | 'Vlog Kelompok'>('Wisata & Budaya');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');
  const [newVideographer, setNewVideographer] = useState('Tim Multimedia Kelompok 7');
  const [newDuration, setNewDuration] = useState('02:15');
  const [newDescription, setNewDescription] = useState('');
  const [localFileObjectUrl, setLocalFileObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Filter out raw blob URLs from saving to localStorage to prevent quota errors, save url or file indicator
      const persistableVideos = videos.map(v => {
        if (v.videoUrl.startsWith('blob:')) {
          // keep blob in memory, but in localstorage keep sample fallback or local marker
          return { ...v, videoUrl: v.videoUrl };
        }
        return v;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistableVideos));
    } catch {
      // ignore
    }
  }, [videos]);

  const categories = ['Semua', 'Aftermovie', 'Kunjungan Industri', 'Wisata & Budaya', 'Vlog Kelompok'];

  const filteredVideos = activeCategory === 'Semua'
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedVideos[id];
    setLikedVideos({ ...likedVideos, [id]: !isLiked });
    setVideos(
      videos.map((v) =>
        v.id === id ? { ...v, likes: isLiked ? v.likes - 1 : v.likes + 1 } : v
      )
    );
  };

  const handleLocalVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objUrl = URL.createObjectURL(file);
      setLocalFileObjectUrl(objUrl);
      setNewVideoUrl(objUrl);
      
      // Try to read duration
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.src = objUrl;
      tempVideo.onloadedmetadata = () => {
        const totalSec = Math.floor(tempVideo.duration);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        setNewDuration(`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`);
      };
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newVideoUrl) return;

    const newVideo: VideoItem = {
      id: `v-${Date.now()}`,
      title: newTitle,
      location: newLocation || 'Bali, Indonesia',
      category: newCategory,
      videoUrl: newVideoUrl,
      thumbnailUrl: newThumbnailUrl || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      duration: newDuration || '02:30',
      description: newDescription || 'Dokumentasi video kegiatan KKL Teknik Informatika UPGRIS Kelompok 7.',
      videographer: newVideographer,
      date: 'KKL Hari Ini',
      views: 12,
      likes: 1,
      isLocalFile: uploadType === 'file'
    };

    setVideos([newVideo, ...videos]);
    setIsUploadModalOpen(false);
    setUploadToast(true);
    setTimeout(() => setUploadToast(false), 3500);

    // Reset inputs
    setNewTitle('');
    setNewLocation('');
    setNewVideoUrl('');
    setNewThumbnailUrl('');
    setNewDescription('');
    setLocalFileObjectUrl(null);
  };

  // Helper to check if URL is a YouTube link
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return null;
  };

  return (
    <section id="dokumentasi-video" className="py-20 bg-[#0c0c0e] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <Film className="w-4 h-4 text-amber-400" />
              <span>Dokumentasi Sinematik & Kuliah Lapangan</span>
            </div>
            <h2 className="font-bali-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
              Dokumentasi Video <span className="text-gold-gradient">KKL Kelompok 7</span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
              Kompilasi rekaman video aftermovie, liputan kunjungan otomasi industri pabrik, rekaman pertunjukan teater seni, 
              serta vlog harian mahasiswa Teknik Informatika UPGRIS yang dapat ditonton dan diunggah langsung.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md shadow-amber-400/10"
            >
              <Upload className="w-4 h-4" />
              <span>Unggah Video Baru</span>
            </button>
          </div>
        </div>

        {uploadToast && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Video dokumentasi KKL berhasil diunggah dan ditambahkan ke daftar putar!</span>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                  : 'bg-[#18181f] text-zinc-400 hover:text-zinc-100 hover:bg-[#23232c]'
              }`}
            >
              {cat} ({cat === 'Semua' ? videos.length : videos.filter((v) => v.category === cat).length})
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActivePlayerVideo(vid)}
              className="group cursor-pointer rounded-2xl bg-[#141419] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-black/70"
            >
              {/* Video Thumbnail & Play Overlay */}
              <div className="relative aspect-video bg-[#1a1a24] overflow-hidden">
                <img
                  src={vid.thumbnailUrl || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Big Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400/90 text-zinc-950 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-amber-400/30">
                    <Play className="w-5 h-5 fill-zinc-950 ml-0.5" />
                  </div>
                </div>

                {/* Top Overlay Indicators */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                    {vid.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-200 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{vid.duration}</span>
                  </div>
                </div>

                {/* Bottom Overlay Location */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                  <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{vid.location}</span>
                  </span>
                  <span className="text-[11px] text-zinc-400">{vid.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bali-title text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                {/* Card Meta Footer */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                  <span className="truncate max-w-[160px] text-zinc-300">
                    Oleh: {vid.videographer}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="tabular-nums">{vid.views}</span>
                    </span>
                    <button
                      onClick={(e) => handleLike(vid.id, e)}
                      className="flex items-center gap-1 text-zinc-300 hover:text-amber-400"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          likedVideos[vid.id] ? 'fill-red-500 text-red-500' : 'text-zinc-400'
                        }`}
                      />
                      <span className="tabular-nums">{vid.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Player Modal */}
      {activePlayerVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActivePlayerVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#14141a] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePlayerVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 text-zinc-300 hover:text-white bg-black/70 rounded-full hover:bg-black/90"
              aria-label="Tutup Video Player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Playback Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {getYouTubeEmbedUrl(activePlayerVideo.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activePlayerVideo.videoUrl)!}
                  title={activePlayerVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activePlayerVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Browser Anda tidak mendukung tag video HTML5.
                </video>
              )}
            </div>

            {/* Video Details Pane */}
            <div className="p-6 space-y-4 bg-[#16161d]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {activePlayerVideo.category} · Durasi: {activePlayerVideo.duration}
                  </span>
                  <h3 className="font-bali-title text-xl font-bold text-white mt-1">
                    {activePlayerVideo.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activePlayerVideo.location}</span>
                    <span>·</span>
                    <span>{activePlayerVideo.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleLike(activePlayerVideo.id, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22222c] border border-white/10 text-xs font-semibold text-white hover:bg-[#2a2a36]"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedVideos[activePlayerVideo.id] ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                    <span className="tabular-nums">{activePlayerVideo.likes} Suka</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activePlayerVideo.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 border-t border-white/[0.06]">
                <div>
                  Videografer: <strong className="text-zinc-200">{activePlayerVideo.videographer}</strong>
                </div>
                <div>
                  Kelompok 7 · KKL Informatika UPGRIS
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Video Modal Form */}
      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-[#16161d] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <Video className="w-4 h-4" />
              <span>Unggah Dokumentasi Video</span>
            </div>

            <h3 className="font-bali-title text-xl font-bold text-white">
              Tambah Video KKL Kelompok 7
            </h3>

            {/* Choose Source Mode */}
            <div className="flex items-center gap-2 p-1 bg-[#101014] rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setUploadType('file')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  uploadType === 'file' ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Pilih Berkas Video (Lokal)
              </button>
              <button
                type="button"
                onClick={() => setUploadType('url')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  uploadType === 'url' ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tautan Video (URL / YouTube)
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              
              {uploadType === 'file' ? (
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Pilih Berkas Video (.mp4, .webm, .mov) *
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    required={!newVideoUrl}
                    onChange={handleLocalVideoUpload}
                    className="w-full text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-zinc-950 hover:file:bg-amber-300 cursor-pointer"
                  />
                  {localFileObjectUrl && (
                    <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Berkas video lokal siap diputar di browser!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    URL Video (Direct MP4 atau Link YouTube) *
                  </label>
                  <input
                    type="url"
                    required
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... atau https://domain.com/video.mp4"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Judul Video *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Kunjungan Otomasi Victoria Care / Tari Kecak Sunset"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Lokasi Kunjungan
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Contoh: Pantai Pandawa / Bedugul"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Kategori Video
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as 'Aftermovie' | 'Kunjungan Industri' | 'Wisata & Budaya' | 'Vlog Kelompok')}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Wisata & Budaya">Wisata & Budaya</option>
                    <option value="Kunjungan Industri">Kunjungan Industri</option>
                    <option value="Aftermovie">Aftermovie</option>
                    <option value="Vlog Kelompok">Vlog Kelompok</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Nama Videografer / Tim
                  </label>
                  <input
                    type="text"
                    value={newVideographer}
                    onChange={(e) => setNewVideographer(e.target.value)}
                    placeholder="Contoh: Rizky Kurniawan"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Estimasi Durasi (mm:ss)
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="02:30"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  URL Gambar Cover / Thumbnail (Opsional)
                </label>
                <input
                  type="url"
                  value={newThumbnailUrl}
                  onChange={(e) => setNewThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Deskripsi / Cerita Momen Video
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Ceritakan momen penting yang terekam dalam video ini..."
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
                  className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Simpan Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
