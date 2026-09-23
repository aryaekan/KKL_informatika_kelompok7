import { useState, useEffect } from 'react';
import { GROUP_MEMBERS_DATA } from '../data/kklData';
import { GroupMember } from '../types';
import { Users, Plus, Edit2, IdCard, X, Save, Sparkles, Check, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'kkl_kelompok7_members_v1';

export default function Members() {
  const [members, setMembers] = useState<GroupMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return GROUP_MEMBERS_DATA;
  });

  const [activeIdCard, setActiveIdCard] = useState<GroupMember | null>(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<GroupMember> | null>(null);
  const [isNewMember, setIsNewMember] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch {
      // ignore
    }
  }, [members]);

  const handleOpenAdd = () => {
    setIsNewMember(true);
    setEditingMember({
      id: `m-${Date.now()}`,
      name: '',
      npm: '22670',
      role: 'Anggota Kelompok 7',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      bio: 'Mahasiswa Teknik Informatika Universitas PGRI Semarang angkatan 2022.',
      specialty: 'Web & Mobile Development',
      instagram: '@upgris_official',
      quote: 'Semangat belajar dan eksplorasi teknologi bersama Kelompok 7 di Bali!',
      badgeNumber: `KKL-TI-07-0${members.length + 1}`
    });
    setIsEditingModalOpen(true);
  };

  const handleOpenEdit = (member: GroupMember) => {
    setIsNewMember(false);
    setEditingMember({ ...member });
    setIsEditingModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name) return;

    if (isNewMember) {
      setMembers([...members, editingMember as GroupMember]);
    } else {
      setMembers(members.map((m) => (m.id === editingMember.id ? (editingMember as GroupMember) : m)));
    }

    setIsEditingModalOpen(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Yakin ingin menghapus anggota ini dari daftar Kelompok 7?')) {
      setMembers(members.filter((m) => m.id !== id));
      if (activeIdCard?.id === id) setActiveIdCard(null);
    }
  };

  const handleResetDefault = () => {
    if (confirm('Kembalikan daftar anggota ke susunan awal tim Kelompok 7?')) {
      setMembers(GROUP_MEMBERS_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <section id="kelompok-7" className="py-20 bg-[#0c0c0e] border-b border-white/[0.08] relative">
      {/* Background Poleng texture accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Struktur Tim & Mahasiswa KKL</span>
            </div>
            <h2 className="font-bali-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
              Profil Anggota <span className="text-gold-gradient">Kelompok 7</span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
              Tim delegasi Kuliah Kerja Lapangan Teknik Informatika Universitas PGRI Semarang (UPGRIS). 
              Solid berkolaborasi dalam observasi industri, dokumentasi budaya, dan laporan riset KKL.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Anggota</span>
            </button>
            <button
              onClick={handleResetDefault}
              title="Reset ke susunan awal"
              className="px-3 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-[#16161c] border border-white/[0.08] rounded-lg transition-colors"
            >
              Reset Tim
            </button>
          </div>
        </div>

        {saveToast && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Data anggota Kelompok 7 berhasil disimpan dan diperbarui!</span>
          </div>
        )}

        {/* 3-in-a-Row Desktop Grid as mandated by portfolio & team reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-[#141419] border border-white/[0.08] p-6 hover:border-amber-500/30 transition-all duration-200 flex flex-col justify-between relative group hover:shadow-xl hover:shadow-black/60"
            >
              {/* Card Top: Avatar and Role */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-amber-500/30 bg-[#22222b] shrink-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bali-title text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {member.name}
                      </h3>
                      {/* Zero-Pill unboxed metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                        <span className="font-mono text-amber-400/90 font-medium">NPM {member.npm}</span>
                        <span aria-hidden="true">·</span>
                        <span>{member.badgeNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions for member */}
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(member)}
                      className="p-1.5 text-zinc-400 hover:text-amber-300 rounded hover:bg-white/[0.05]"
                      title="Edit Data Mahasiswa"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {members.length > 1 && (
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-white/[0.05]"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Role / Responsibility */}
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <p className="text-xs font-semibold text-amber-300">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Fokus Minat: <span className="text-zinc-200">{member.specialty}</span>
                  </p>
                  <p className="text-xs text-zinc-300 mt-3 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Bottom: Quote & Digital ID Card Button */}
              <div className="mt-5 pt-3 border-t border-white/[0.06] space-y-3">
                <blockquote className="text-[11px] italic text-zinc-400 border-l-2 border-amber-500/40 pl-2 line-clamp-2">
                  "{member.quote}"
                </blockquote>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-zinc-500">
                    {member.instagram || 'Teknik Informatika UPGRIS'}
                  </span>
                  <button
                    onClick={() => setActiveIdCard(member)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <IdCard className="w-3.5 h-3.5" />
                    <span>Kartu ID KKL</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Digital ID Card Preview Modal */}
      {activeIdCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveIdCard(null)}
        >
          <div
            className="relative w-full max-w-sm bg-gradient-to-b from-[#181820] to-[#0f0f14] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl text-white space-y-5 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Balinese Top Decoration Bar */}
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
            <div className="absolute top-3 inset-x-0 h-2 bg-poleng-subtle opacity-70" />

            {/* Close Button */}
            <button
              onClick={() => setActiveIdCard(null)}
              className="absolute top-5 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* University & KKL Header */}
            <div className="text-center pt-3">
              <p className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">
                UNIVERSITAS PGRI SEMARANG
              </p>
              <p className="text-xs text-zinc-300 font-medium">
                Fakultas Teknik dan Informatika
              </p>
              <h3 className="font-bali-title text-base font-bold text-white mt-1">
                KKL BALI · KELOMPOK 7
              </h3>
            </div>

            {/* Student Photo */}
            <div className="flex justify-center">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-amber-400 p-1 bg-[#121218] shadow-lg shadow-amber-500/10">
                <img
                  src={activeIdCard.avatar}
                  alt={activeIdCard.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Student Details */}
            <div className="text-center space-y-1">
              <h4 className="font-bali-title text-lg font-bold text-white">
                {activeIdCard.name}
              </h4>
              <p className="font-mono text-xs text-amber-300 font-semibold tracking-wide">
                NPM: {activeIdCard.npm}
              </p>
              <p className="text-xs font-medium text-zinc-300 mt-0.5">
                {activeIdCard.role}
              </p>
            </div>

            {/* QR Code Simulation & Badge Number */}
            <div className="p-3.5 rounded-xl bg-[#0b0b0e] border border-white/[0.08] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">ID Card Badge</span>
                <span className="font-mono text-zinc-200 font-semibold">{activeIdCard.badgeNumber}</span>
                <span className="text-[10px] text-amber-400/90 block">KKL Informatika UPGRIS 2026</span>
              </div>
              <div className="w-12 h-12 bg-white p-1 rounded-md flex items-center justify-center">
                <div className="w-full h-full bg-black flex flex-wrap p-0.5 gap-0.5">
                  <div className="w-3 h-3 bg-white" />
                  <div className="w-1 h-3 bg-white ml-auto" />
                  <div className="w-2 h-2 bg-white" />
                  <div className="w-3 h-3 bg-white ml-auto" />
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <p className="text-[10px] text-center text-zinc-400">
              Kartu Tanda Peserta Resmi Kuliah Kerja Lapangan (Semarang - Bali)
            </p>
          </div>
        </div>
      )}

      {/* Add / Edit Member Modal Form */}
      {isEditingModalOpen && editingMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsEditingModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#16161d] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>{isNewMember ? 'Tambah Anggota Kelompok 7' : 'Edit Data Anggota Kelompok 7'}</span>
            </div>

            <h3 className="font-bali-title text-xl font-bold text-white">
              Data Mahasiswa KKL
            </h3>

            <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Nama Lengkap Mahasiswa *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.name || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    NPM (Nomor Pokok Mahasiswa) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMember.npm || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, npm: e.target.value })}
                    placeholder="22670xxx"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Peran di Kelompok 7 *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMember.role || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    placeholder="Contoh: Koordinator Dokumentasi"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Fokus Minat / Keahlian TI
                </label>
                <input
                  type="text"
                  value={editingMember.specialty || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, specialty: e.target.value })}
                  placeholder="Contoh: Full-Stack Web Development, Data Science"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  URL Foto Profil (Avatar)
                </label>
                <input
                  type="url"
                  value={editingMember.avatar || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Kesan / Quotes KKL Bali
                </label>
                <input
                  type="text"
                  value={editingMember.quote || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, quote: e.target.value })}
                  placeholder="Pesan kesan selama perjalanan KKL..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Deskripsi Singkat / Bio Tugas
                </label>
                <textarea
                  rows={3}
                  value={editingMember.bio || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  placeholder="Tanggung jawab mahasiswa di Kelompok 7..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#101014] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#22222b] rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Anggota</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
