export interface Destination {
  id: string;
  name: string;
  category: 'Kunjungan Industri' | 'Wisata Budaya' | 'Wisata Bahari' | 'Hiburan & Edukasi' | 'Instansi';
  location: string;
  regency: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  itRelevance: string; // Hubungan dengan bidang Informatika (TI)
  highlights: string[];
  dayNumber: number;
}

export interface GroupMember {
  id: string;
  name: string;
  npm: string;
  role: string;
  avatar: string;
  bio: string;
  specialty: string;
  instagram?: string;
  github?: string;
  quote: string;
  badgeNumber: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  location: string;
  category: 'Semua' | 'Industri' | 'Budaya' | 'Pantai' | 'Kelompok';
  imageUrl: string;
  caption: string;
  author: string;
  date: string;
  likes: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  date: string;
  theme: string;
  description: string;
  locations: string[];
  activities: {
    time: string;
    activity: string;
    place: string;
    note?: string;
  }[];
}

export interface GuestbookEntry {
  id: string;
  name: string;
  roleOrAffiliation: string;
  message: string;
  timestamp: string;
  rating: number;
}

export interface VideoItem {
  id: string;
  title: string;
  location: string;
  category: 'Aftermovie' | 'Kunjungan Industri' | 'Wisata & Budaya' | 'Vlog Kelompok';
  videoUrl: string; // Blob URL, direct mp4, or YouTube embed URL
  thumbnailUrl?: string;
  duration: string;
  description: string;
  videographer: string;
  date: string;
  views: number;
  likes: number;
  isLocalFile?: boolean;
}

