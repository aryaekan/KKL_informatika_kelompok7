import { Destination, GroupMember, PhotoItem, ItineraryDay, GuestbookEntry, VideoItem } from '../types';

import heroTempleImg from '../assets/images/hero_bali_temple_1790160700048.jpg';
import factoryImg from '../assets/images/industrial_visit_factory_1790160725226.jpg';
import kecakImg from '../assets/images/kecak_dance_performance_1790160739511.jpg';
import pandawaImg from '../assets/images/pandawa_beach_coast_1790160751938.jpg';
import devdanImg from '../assets/images/devdan_cultural_show_1790160763025.jpg';

export const ASSETS = {
  heroTemple: heroTempleImg,
  factory: factoryImg,
  kecak: kecakImg,
  pandawa: pandawaImg,
  devdan: devdanImg,
};

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'victoria-care',
    name: 'PT Victoria Care Indonesia Tbk',
    category: 'Kunjungan Industri',
    location: 'Kawasan Industri Candi, Semarang',
    regency: 'Kota Semarang, Jawa Tengah',
    image: factoryImg,
    shortDesc: 'Pusat riset & manufaktur kosmetik dan personal care berskala nasional dengan sistem otomasi industri berteknologi tinggi.',
    fullDesc: 'Kunjungan industri perdana sebelum menyeberang ke Pulau Dewata. Mahasiswa Teknik Informatika UPGRIS mempelajari implementasi Enterprise Resource Planning (ERP), Smart Inventory Management, otomatisasi conveyor line, serta Quality Assurance berbasis sistem digital modern.',
    itRelevance: 'Penerapan ERP (Enterprise Resource Planning), Internet of Things (IoT) monitoring suhu produksi, automated packaging robotics, and barcode tracking system.',
    highlights: [
      'Observasi laboratorium R&D dan formulasi produk',
      'Pemaparan arsitektur sistem ERP & Supply Chain Management',
      'Studi kasus otomasi robotik pengemasan produk',
      'Diskusi interaktif bersama IT & Engineering Division'
    ],
    dayNumber: 1
  },
  {
    id: 'ulun-danu',
    name: 'Pura Ulun Danu Beratan',
    category: 'Wisata Budaya',
    location: 'Danau Beratan, Candikuning, Baturiti',
    regency: 'Tabanan, Bali',
    image: heroTempleImg,
    shortDesc: 'Kompleks candi suci tepi danau di dataran tinggi Bedugul dengan arsitektur Meru bertingkat khas peradaban Bali.',
    fullDesc: 'Destinasi pertama setibanya di Pulau Bali. Pura yang berdiri sejak abad ke-17 ini didedikasikan untuk Dewi Danu (dewi air, danau, dan sungai) dan sistem irigasi tradisional Subak yang diakui UNESCO.',
    itRelevance: 'Analisis digitalisasi sistem ticketing wisata, virtual tour 360°, serta pelestarian warisan budaya melalui dokumentasi digital multimedia.',
    highlights: [
      'Pemandangan magis Candi Meru 11 tingkat di atas permukaan danau',
      'Udara sejuk pegunungan Bedugul berketinggian 1.239 mdpl',
      'Observasi integrasi POS e-ticketing bagi turis domestik & mancanegara',
      'Sesi foto bersama rombongan Kelompok 7 dengan pakaian adat madya'
    ],
    dayNumber: 2
  },
  {
    id: 'joger-bali',
    name: 'Joger Bali (Pabrik Kata-Kata)',
    category: 'Hiburan & Edukasi',
    location: 'Jl. Raya Denpasar-Bedugul Km 37.5, Luwus',
    regency: 'Tabanan & Kuta, Bali',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Ikon kreativitas dan humor Indonesia, pusat cinderamata unik dengan filosofi kata-kata motivasi dan satir cerdas.',
    fullDesc: 'Tempat bertemunya seni olah kata, budaya lokal, dan strategi branding kreatif. Didirikan oleh Joseph Theodorus Wulianadi (Pak Joger), tempat ini mengajarkan pentingnya diferensiasi merk yang sangat kuat dalam dunia bisnis digital modern.',
    itRelevance: 'Studi strategi Copywriting, Brand Identity di media sosial, serta manajemen inventori ritel offline-to-online.',
    highlights: [
      'Koleksi ribuan kaos dengan kata-kata khas yang tidak dijual di tempat lain',
      'Pengalaman autentik berinteraksi dengan keramahan staf Joger',
      'Analisis alur layout toko psikologis belanja pengunjung',
      'Belanja cinderamata khas untuk keluarga dan rekan kampus'
    ],
    dayNumber: 2
  },
  {
    id: 'devdan-show',
    name: 'Devdan Show: Treasure of the Archipelago',
    category: 'Hiburan & Edukasi',
    location: 'Nusa Dua Theatre, Kawasan Pariwisata Nusa Dua',
    regency: 'Badung, Bali',
    image: devdanImg,
    shortDesc: 'Pertunjukan teater panggung spektakuler kelas dunia yang memadukan tarian tradisional nusantara dengan akrobatik modern.',
    fullDesc: 'Pertunjukan 90 menit memukau yang membawa penonton menjelajah kekayaan nusantara: Bali, Sumatra, Jawa, Kalimantan, hingga Papua. Menggunakan efek tata panggung canggih termasuk hujan panggung sintetis, aerial acrobatics, dan tata cahaya cerdas.',
    itRelevance: 'Stage Automation & DMX Lighting Control, synchronized sound engineering, dan video mapping projection mapping terintegrasi.',
    highlights: [
      'Tata panggung canggih dengan dynamic water stage & aerial silks',
      'Kombinasi tarian tradisional dengan akrobat kontemporer',
      'Sistem tata suara digital surround 7.1 yang mengguncang panggung',
      'Apresiasi keberagaman budaya Indonesia dari Sabang sampai Merauke'
    ],
    dayNumber: 3
  },
  {
    id: 'pantai-pandawa',
    name: 'Pantai Pandawa (Kutuh)',
    category: 'Wisata Bahari',
    location: 'Desa Kutuh, Kuta Selatan',
    regency: 'Badung, Bali',
    image: pandawaImg,
    shortDesc: 'Pantai eksotis berpasir putih yang diapit tebing kapur megah dengan 5 patung ksatria Panca Pandawa.',
    fullDesc: 'Dahulu dikenal sebagai Secret Beach karena tersembunyi di balik perbukitan kapur. Kini menjadi salah satu primadona bahari Bali Selatan dengan air laut jernih bergradasi toska dan ombak yang tenang untuk kano dan berenang.',
    itRelevance: 'Studi pemetaan GIS (Geographic Information System) untuk pengelolaan kawasan wisata pesisir dan sistem promosi digital desa wisata Kutuh.',
    highlights: [
      'Menyusuri jalan belah tebing dengan patung Yudistira, Bima, Arjuna, Nakula, Sadewa',
      'Aktivitas watersport kano di pesisir berair toska bening',
      'Sesi dokumentasi drone dan fotografi kelompok KKL Kelompok 7',
      'Kudapan kelapa muda segar di bibir pantai'
    ],
    dayNumber: 3
  },
  {
    id: 'pantai-kuta',
    name: 'Pantai Kuta Bali',
    category: 'Wisata Bahari',
    location: 'Kecamatan Kuta',
    regency: 'Badung, Bali',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Pantai paling ikonik di Bali dengan hamparan pasir putih panjang dan pemandangan matahari terbenam kelas dunia.',
    fullDesc: 'Pusat denyut pariwisata internasional Bali. Mahasiswa KKL menikmati suasana sore hari sembari mengamati bagaimana ekosistem digital (fintech QRIS, ride hailing apps, digital nomads) beroperasi penuh di kawasan Kuta.',
    itRelevance: 'Infrastruktur Public Wi-Fi, ekosistem transaksi cashless (QRIS & NFC cross-border), serta implementasi Smart Tourism hotspot.',
    highlights: [
      'Sunset dramatis berlatar siluet peselancar di garis cakrawala',
      'Observasi interaksi turis global dan pelaku UMKM lokal',
      'Hunting foto street photography dan lanskap senja',
      'Eksplorasi trotoar pejalan kaki Kuta yang telah direvitalisasi'
    ],
    dayNumber: 4
  },
  {
    id: 'balai-diklat-denpasar',
    name: 'Balai Diklat Keagamaan / BPSDM Denpasar',
    category: 'Instansi',
    location: 'Jl. Melati No. 25, Dangin Puri Kangin',
    regency: 'Kota Denpasar, Bali',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Kunjungan instansi pemerintah untuk studi transformasi digital, e-learning ASN, dan tata kelola sistem informasi publik.',
    fullDesc: 'Kunjungan akademik resmi mahasiswa Informatika UPGRIS ke instansi pelatihan aparatur di Bali. Membahas arsitektur Learning Management System (LMS), Sistem Informasi Kepegawaian (SIMPEG), dan integrasi cloud security pada infrastruktur pemerintahan daerah.',
    itRelevance: 'E-Government frameworks, Big Data analytics untuk evaluasi pelatihan pegawai, Cloud infrastructure, dan Cyber Security protokol instansi.',
    highlights: [
      'Sambutan hangat oleh jajaran pimpinan Balai Diklat Denpasar',
      'Paparan implementasi Smart Training System & e-Office ASN',
      'Tanya jawab mendalam mengenai arsitektur basis data & keamanan siber',
      'Penyerahan plakat kenang-kenangan dari KKL Informatika UPGRIS Kelompok 7'
    ],
    dayNumber: 4
  },
  {
    id: 'cafe-tepi-pantai',
    name: 'Cafe Tepi Pantai (Jimbaran / Sunset Coast)',
    category: 'Hiburan & Edukasi',
    location: 'Pesisir Pantai Jimbaran & Seminyak',
    regency: 'Badung, Bali',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Malam keakraban dan gala dinner tepi pantai dengan hidangan laut khas Bali diiringi deburan ombak dan lilin meja.',
    fullDesc: 'Momen santai untuk mempererat kekeluargaan Kelompok 7 dan seluruh civitas KKL Informatika. Menikmati santap malam beralaskan pasir pantai, musik akustik, serta refleksi hasil kunjungan studi selama perjalanan KKL di Bali.',
    itRelevance: 'Digital Menu QR system, Cloud-based Point-of-Sale (POS) integration, and digital guest experience management in hospitality IT.',
    highlights: [
      'Dinner seafood bakar bumbu rempah khas Bali di meja tepi pantai',
      'Sesi sharing session dan evaluasi harian kegiatan Kelompok 7',
      'Suasana temaram lilin dengan gemercik ombak malam Samudra Hindia',
      'Foto bersama dengan dresscode seragam KKL Informatika UPGRIS'
    ],
    dayNumber: 4
  },
  {
    id: 'tari-kecak',
    name: 'Pertunjukan Seni Tari Kecak',
    category: 'Wisata Budaya',
    location: 'Panggung Terbuka Tebing Pantai Melasti / Uluwatu',
    regency: 'Badung, Bali',
    image: kecakImg,
    shortDesc: 'Tarian sakral kolosal legendaris dengan puluhan penari pria berseru serempak "Cak-cak-cak" melingkari kobaran api suci.',
    fullDesc: 'Salah satu mahakarya seni pertunjukan paling magis di dunia. Menceritakan epik Ramayana tentang penyelamatan Dewi Sita dari cengkeraman Rahwana dengan bantuan ksatria kera Hanoman, diiringi irama vokal ritmis tanpa alat musik instrumental.',
    itRelevance: 'Akustik suara spasial alami, pelestarian seni nusantara via digital preservation & VR archive, serta visual timing choreography.',
    highlights: [
      'Koor vokal harmonis puluhan penari berpakaian kain poleng khas Bali',
      'Adegan dramatis Hanoman melompati lingkaran api membara',
      'Panggung tebing alam beratapkan senja keemasan nan sakral',
      'Momen edukasi budaya mendalam bagi seluruh mahasiswa Informatika'
    ],
    dayNumber: 5
  }
];

export const GROUP_MEMBERS_DATA: GroupMember[] = [
  {
    id: 'm-1',
    name: 'Ismi Adiiba Azkia',
    npm: '24670028',
    role: 'Ketua Kelompok & Koordinator Lapangan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    bio: 'Mahasiswa Teknik Informatika UPGRIS angkatan 2022. Bertanggung jawab mengkoordinasi mobilitas kelompok 7 selama rangkaian KKL Semarang-Bali.',
    specialty: 'Full-Stack Web & Software Engineering',
    instagram: '@dimas_arya7',
    github: 'dimas-arya',
    quote: 'KKL bukan sekadar jalan-jalan, tapi jembatan antara teori di kampus dengan implementasi nyata teknologi di industri!',
    badgeNumber: 'KKL-TI-07-01'
  },
  {
    id: 'm-2',
    name: 'Robiatul Adawiyyah',
    npm: '22670058',
    role: 'Sekretaris & Divisi Riset Data',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
    bio: 'Mencatat seluruh poin-poin materi kunjungan di PT Victoria Care dan Balai Diklat Denpasar untuk bahan penyusunan laporan KKL.',
    specialty: 'Data Science & UI/UX Design',
    instagram: '@nabilaputrian',
    github: 'nabilaputri',
    quote: 'Bali menyimpan pesona tradisi yang lestari berdampingan dengan akselerasi digital modern yang menginspirasi.',
    badgeNumber: 'KKL-TI-07-02'
  },
  {
    id: 'm-3',
    name: 'Rizal Fany Triyanto',
    npm: '22670073',
    role: 'Divisi IT & Dokumentasi Multimedia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    bio: 'Mengabadikan setiap sudut keindahan Bali dan momen seru Kelompok 7 mulai dari fotografi udara (drone), mirrorless, hingga editing video reels.',
    specialty: 'Computer Vision & Multimedia Production',
    instagram: '@rizky_kurnia',
    github: 'rizky-kurnia',
    quote: 'Setiap frame di Bali adalah karya seni visual, dan teknologi membantu kita menyimpannya abadi dalam ingatan.',
    badgeNumber: 'KKL-TI-07-03'
  },
  {
    id: 'm-4',
    name: ' Alwan Naufal Zaki',
    npm: '22670089',
    role: 'Bendahara & Manajemen Logistik',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    bio: 'Mengelola alokasi dana operasional kelompok, koordinasi konsumsi, tiket masuk destinasi, serta logistik seluruh anggota Kelompok 7.',
    specialty: 'Information System & Business Intelligence',
    instagram: '@siti_rahma',
    quote: 'Kompak bersama Kelompok 7: dari aroma rempah Victoria Care Semarang sampai hangatnya pasir Pantai Pandawa!',
    badgeNumber: 'KKL-TI-07-04'
  },
  {
    id: 'm-5',
    name: 'Arya Eka Nugraha ',
    npm: '22670104',
    role: 'Divisi Humas & Relasi Eksternal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    bio: 'Menghubungkan Kelompok 7 dengan tour guide bus, PIC perusahaan di PT Victoria Care, dan pemateri di Balai Diklat Denpasar.',
    specialty: 'Network Administration & Cloud Computing',
    instagram: '@fajar_saputra',
    github: 'fajarsaputra',
    quote: 'Belajar arsitektur jaringan dan sistem otomasi langsung di lapangan jauh lebih menantang dan membuka wawasan.',
    badgeNumber: 'KKL-TI-07-05'
  },
  {
    id: 'm-6',
    name: 'MUHAMMAD ILHAM FEBRIANTO',
    npm: '22670122',
    role: 'Divisi Konten Digital & Web Portal',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80',
    bio: 'Mengembangkan dan merawat portal web dokumentasi KKL Kelompok 7 dengan sentuhan arsitektur khas Pulau Dewata.',
    specialty: 'Frontend Web Development & Creative Writing',
    instagram: '@anisa_dlestari',
    github: 'anisadwi',
    quote: 'Membawa semangat UPGRIS ke Pulau Dewata, pulang membawa ilmu komputasi dan persahabatan seumur hidup.',
    badgeNumber: 'KKL-TI-07-06'
  }
];

export const GALLERY_INITIAL_DATA: PhotoItem[] = [
  {
    id: 'p-1',
    title: 'Keagungan Meru Danau Beratan',
    location: 'Pura Ulun Danu Beratan, Bedugul',
    category: 'Budaya',
    imageUrl: heroTempleImg,
    caption: 'Suasana pagi yang tenang dan sejuk berkabut di Danau Beratan saat Kelompok 7 tiba di Bedugul.',
    author: 'Rizky Kurniawan (Div. Dokumentasi)',
    date: 'Hari ke-2 KKL',
    likes: 42
  },
  {
    id: 'p-2',
    title: 'Kunjungan Industri Victoria Care Semarang',
    location: 'Kawasan Industri Candi, Semarang',
    category: 'Industri',
    imageUrl: factoryImg,
    caption: 'Pemaparan ruang kontrol otomatisasi dan sistem penjaminan mutu di lini manufaktur kosmetik modern.',
    author: 'Dimas Arya Pratama (Ketua Kelompok 7)',
    date: 'Hari ke-1 KKL',
    likes: 38
  },
  {
    id: 'p-3',
    title: 'Kobaran Api dan Semangat Tari Kecak',
    location: 'Panggung Tebing Melasti / Uluwatu',
    category: 'Budaya',
    imageUrl: kecakImg,
    caption: 'Momen dramatis saat Hanoman dikelilingi lingkaran api unggun sakral diiringi paduan suara vokal cak.',
    author: 'Rizky Kurniawan (Div. Dokumentasi)',
    date: 'Hari ke-5 KKL',
    likes: 56
  },
  {
    id: 'p-4',
    title: 'Tebing Kapur dan Birunya Laut Pandawa',
    location: 'Pantai Pandawa, Kutuh',
    category: 'Pantai',
    imageUrl: pandawaImg,
    caption: 'Panorama memukau tebing kapur yang dipahat patung panca pandawa menghadap gradasi air laut toska.',
    author: 'Nabila Putri Anindya',
    date: 'Hari ke-3 KKL',
    likes: 49
  },
  {
    id: 'p-5',
    title: 'Panggung Megah Devdan Show Nusa Dua',
    location: 'Nusa Dua Theatre, Bali',
    category: 'Budaya',
    imageUrl: devdanImg,
    caption: 'Kemegahan tata panggung spektakuler teater Devdan yang menggabungkan akrobatik dan busana adat kepulauan nusantara.',
    author: 'Fajar Bagus Saputra',
    date: 'Hari ke-3 KKL',
    likes: 34
  },
  {
    id: 'p-6',
    title: 'Sunset Hangat di Bibir Pantai Kuta',
    location: 'Pantai Kuta, Badung',
    category: 'Pantai',
    imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Matahari tenggelam perlahan di ufuk barat Pantai Kuta, dinikmati bersama teman-teman seperjuangan satu almamater.',
    author: 'Siti Rahmawati',
    date: 'Hari ke-4 KKL',
    likes: 51
  },
  {
    id: 'p-7',
    title: 'Belanja dan Berburu Kata-Kata di Joger',
    location: 'Joger Bali Luwus, Bedugul',
    category: 'Kelompok',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    caption: 'Keseruan Kelompok 7 membaca slogan-slogan humor unik dan memilih cinderamata khas Bali sebelum melanjutkan perjalanan.',
    author: 'Anisa Dwi Lestari',
    date: 'Hari ke-2 KKL',
    likes: 29
  },
  {
    id: 'p-8',
    title: 'Makan Malam Tepi Pantai & Malam Keakraban',
    location: 'Cafe Tepi Pantai Jimbaran Coast',
    category: 'Pantai',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Suasana syahdu lilin meja pantai beralaskan pasir putih sembari berdiskusi tentang progres penyusunan laporan KKL.',
    author: 'Dimas Arya Pratama',
    date: 'Hari ke-4 KKL',
    likes: 47
  },
  {
    id: 'p-9',
    title: 'Sesi Diskusi E-Gov di Balai Diklat Denpasar',
    location: 'Balai Diklat BPSDM Denpasar',
    category: 'Industri',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    caption: 'Pemaparan sistem e-learning dan manajemen data kepegawaian berbasis digital oleh narasumber Balai Diklat.',
    author: 'Fajar Bagus Saputra',
    date: 'Hari ke-4 KKL',
    likes: 31
  }
];

export const ITINERARY_DATA: ItineraryDay[] = [
  {
    day: 1,
    title: 'Pelepasan Semarang & Kunjungan Industri Victoria Care',
    date: 'Rabu, 18 Juni',
    theme: 'Eksplorasi Industri & Keberangkatan',
    description: 'Rombongan KKL Teknik Informatika UPGRIS dilepas resmi dari Kampus 4 Jl. Gajah Raya Semarang menuju kunjungan industri perdana di PT Victoria Care Indonesia Tbk, kemudian meluncur via Tol Trans Jawa.',
    locations: ['Kampus UPGRIS Semarang', 'Kawasan Industri Candi Semarang', 'Tol Trans Jawa - Pelabuhan Ketapang'],
    activities: [
      { time: '07:30 - 08:30', activity: 'Apel Pelepasan & Doa Bersama di Kampus 4 UPGRIS Semarang', place: 'Kampus 4 UPGRIS' },
      { time: '09:00 - 12:30', activity: 'Kunjungan Industri & Kuliah Lapangan PT Victoria Care Indonesia', place: 'Kawasan Industri Candi Semarang', note: 'Observasi lini otomasi & ERP' },
      { time: '12:30 - 13:30', activity: 'Makan Siang & Sholat Berjamaah', place: 'Resto Lokal Semarang' },
      { time: '14:00 - 23:30', activity: 'Perjalanan Bus Wisata Menuju Banyuwangi via Tol Trans-Jawa', place: 'Trans Jawa Highway', note: 'Transit makan malam di Caruban / Probolinggo' }
    ]
  },
  {
    day: 2,
    title: 'Penyeberangan Selat Bali, Pura Ulun Danu & Joger',
    date: 'Kamis, 19 Juni',
    theme: 'Menyapa Keindahan Pulau Dewata',
    description: 'Menyeberang dari Pelabuhan Ketapang menuju Gilimanuk saat fajar menyingsing, disambut kesejukan dataran tinggi Bedugul dan kejeniusan branding di Joger Bali.',
    locations: ['Pelabuhan Gilimanuk', 'Pura Ulun Danu Beratan Bedugul', 'Joger Bali Luwus', 'Hotel Denpasar'],
    activities: [
      { time: '05:00 - 06:30', activity: 'Pendaratan di Pelabuhan Gilimanuk & Sarapan Pagi Khas Bali', place: 'Gilimanuk' },
      { time: '09:00 - 12:00', activity: 'Eksplorasi Budaya & Dokumentasi di Pura Ulun Danu Beratan', place: 'Bedugul, Tabanan', note: 'Pura terapung di atas danau' },
      { time: '12:30 - 14:00', activity: 'Makan Siang Prasmanan Khas Bedugul', place: 'Mentari Resto Bedugul' },
      { time: '14:30 - 17:00', activity: 'Kunjungan Edukasi Branding & Belanja Kreatif di Joger Bali', place: 'Joger Luwus Tabanan' },
      { time: '18:30 - 20:00', activity: 'Check-in Hotel di Denpasar & Istirahat', place: 'Hotel Denpasar' }
    ]
  },
  {
    day: 3,
    title: 'Tebing Putih Pantai Pandawa & Devdan Show Nusa Dua',
    date: 'Jumat, 20 Juni',
    theme: 'Harmoni Samudra & Panggung Mahakarya',
    description: 'Menjelajahi keindahan pesisir selatan Bali di Pantai Pandawa dengan tebing kapur megah berukir Panca Pandawa, dilanjutkan apresiasi seni teater kelas dunia di Devdan Show Nusa Dua.',
    locations: ['Pantai Pandawa', 'Desa Wisata Kutuh', 'Nusa Dua Theatre'],
    activities: [
      { time: '08:30 - 12:00', activity: 'Eksplorasi Bahari & Dokumentasi Drone Kelompok 7 di Pantai Pandawa', place: 'Pantai Pandawa, Kutuh' },
      { time: '12:30 - 14:00', activity: 'Sholat Jumat & Makan Siang Bersama', place: 'Kawasan Puja Mandala Nusa Dua' },
      { time: '15:00 - 18:30', activity: 'Menyaksikan Pertunjukan Teatrikal Spektakuler Devdan Show', place: 'Nusa Dua Theatre', note: 'Treasure of the Archipelago' },
      { time: '19:30 - 21:00', activity: 'Makan Malam & Evaluasi Kegiatan Hari ke-3', place: 'Resto Lokal Badung' }
    ]
  },
  {
    day: 4,
    title: 'Kunjungan Balai Diklat Denpasar, Pantai Kuta & Cafe Tepi Pantai',
    date: 'Sabtu, 21 Juni',
    theme: 'Studi Birokrasi Digital & Romantisme Senja',
    description: 'Kunjungan akademik ke Balai Diklat Denpasar untuk memahami transformasi sistem e-learning dan tata kelola TI pemerintahan, disambung senja di Pantai Kuta dan gala dinner di Cafe Tepi Pantai.',
    locations: ['Balai Diklat Denpasar', 'Pantai Kuta', 'Cafe Tepi Pantai Jimbaran'],
    activities: [
      { time: '09:00 - 12:00', activity: 'Kunjungan Studi Informatika & Smart E-Gov di Balai Diklat Denpasar', place: 'Balai Diklat Denpasar', note: 'Diskusi panel sistem informasi' },
      { time: '12:30 - 14:00', activity: 'Makan Siang & Coffee Break Edukasi', place: 'Denpasar City' },
      { time: '15:30 - 18:00', activity: 'Menikmati Sunset Emas & Denyut Wisata di Pantai Kuta', place: 'Pantai Kuta Bali' },
      { time: '18:30 - 21:30', activity: 'Malam Keakraban Kelompok 7 & Dinner di Cafe Tepi Pantai', place: 'Cafe Tepi Pantai Jimbaran', note: 'Seafood dinner & deburan ombak' }
    ]
  },
  {
    day: 5,
    title: 'Magis Tari Kecak Sunset & Perjalanan Pulang ke Semarang',
    date: 'Minggu, 22 Juni',
    theme: 'Mahakarya Seni Tradisi & Kembali ke Almamater',
    description: 'Menutup petualangan KKL dengan menyaksikan pertunjukan Tari Kecak yang memukau di atas tebing berlatar senja Samudra Hindia, sebelum bertolak kembali ke Semarang membawa segudang ilmu dan memori berharga.',
    locations: ['Panggung Tari Kecak', 'Pusat Oleh-oleh Krisna / Agung Bali', 'Pelabuhan Gilimanuk - Semarang'],
    activities: [
      { time: '09:00 - 12:00', activity: 'Check-out Hotel & Belanja Oleh-oleh Terakhir', place: 'Pusat Oleh-oleh Khas Bali' },
      { time: '12:30 - 14:00', activity: 'Makan Siang Bersama Rombongan', place: 'Resto Lokal Denpasar' },
      { time: '16:30 - 18:30', activity: 'Menyaksikan Pertunjukan Kolosal Tari Kecak Sunset', place: 'Panggung Terbuka Tebing Pantai', note: 'Epik Ramayana & Hanoman' },
      { time: '19:30 - Selesai', activity: 'Perjalanan Balik Menuju Semarang Membawa Kenangan Abadi', place: 'Gilimanuk - Pelabuhan Ketapang - Semarang' }
    ]
  }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Dr. Ir. Supriyono, M.Kom.',
    roleOrAffiliation: 'Dosen Pembimbing KKL Informatika UPGRIS',
    message: 'Apresiasi yang tinggi untuk Kelompok 7! Dokumentasi portal web ini sangat rapi, informatif, dan mencerminkan keahlian rekayasa web mahasiswa Informatika UPGRIS. Sukses selalu untuk penyusunan laporan KKL!',
    timestamp: '22 Juni 2026, 19:40',
    rating: 5
  },
  {
    id: 'gb-2',
    name: 'Alif Bayu Pratama',
    roleOrAffiliation: 'Ketua BEM FTI UPGRIS',
    message: 'Keren banget vibe Balinya berasa banget! Mulai dari kunjungan pabrik Victoria Care sampai syahdunya senja pantai dan Tari Kecak dirangkum dengan sangat apik. Bangga sama Kelompok 7!',
    timestamp: '22 Juni 2026, 21:15',
    rating: 5
  },
  {
    id: 'gb-3',
    name: 'Jessica Clarissa',
    roleOrAffiliation: 'Mahasiswi Informatika UPGRIS (Kelompok 3)',
    message: 'UI websitenya estetik parah, nuansa Bali berpadu rapi dengan typography modern! Sukses terus buat teman-teman Kelompok 7, kenangan KKL Bali 2026 nggak bakal terlupakan!',
    timestamp: '23 Juni 2026, 08:30',
    rating: 5
  }
];

export const KKL_STATS = {
  totalDistanceKm: '1.480',
  destinationsCount: 9,
  membersCount: 6,
  daysCount: 5,
  busNumber: 'Bus 2 - Kelompok 7',
  academicYear: '2025/2026'
};

export const INITIAL_VIDEOS_DATA: VideoItem[] = [
  {
    id: 'v-1',
    title: 'Official Aftermovie KKL Informatika UPGRIS Kelompok 7',
    location: 'Semarang - Denpasar - Badung - Tabanan',
    category: 'Aftermovie',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: heroTempleImg,
    duration: '03:45',
    description: 'Video kompilasi sinematik seluruh perjalanan KKL Kelompok 7 mulai dari pelepasan kampus di Semarang, kunjungan industri Victoria Care, hingga tari kecak dan pantai di Bali.',
    videographer: 'Rizky Kurniawan (Div. Dokumentasi Kelompok 7)',
    date: 'Hari ke-5 KKL',
    views: 342,
    likes: 88
  },
  {
    id: 'v-2',
    title: 'Kunjungan Industri & Otomasi Robotik PT Victoria Care Semarang',
    location: 'PT Victoria Care Indonesia Tbk, Semarang',
    category: 'Kunjungan Industri',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: factoryImg,
    duration: '04:12',
    description: 'Dokumentasi ruang laboratorium formulasi R&D, lini conveyor packing otomatis, serta sesi tanya jawab teknologi ERP bersama tim engineering pabrik.',
    videographer: 'Dimas Arya Pratama (Ketua Kelompok 7)',
    date: 'Hari ke-1 KKL',
    views: 215,
    likes: 64
  },
  {
    id: 'v-3',
    title: 'Magis Tari Kecak Sunset Tebing Melasti Bali',
    location: 'Panggung Terbuka Pantai Melasti / Uluwatu',
    category: 'Wisata & Budaya',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: kecakImg,
    duration: '02:50',
    description: 'Sorotan vokal ritmis kolosal puluhan penari pria tanpa alat musik dan adegan atraksi Hanoman melompati kobaran api unggun.',
    videographer: 'Rizky Kurniawan & Nabila Putri',
    date: 'Hari ke-5 KKL',
    views: 420,
    likes: 112
  },
  {
    id: 'v-4',
    title: 'Sinematik Drone Tebing Kapur Pantai Pandawa & Sunset Kuta',
    location: 'Pantai Pandawa & Pantai Kuta Bali',
    category: 'Wisata & Budaya',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: pandawaImg,
    duration: '02:35',
    description: 'Pemandangan lanskap dari udara menampilkan tebing terjal berukir patung panca pandawa, laut toska, serta hangatnya senja pantai Kuta.',
    videographer: 'Fajar Bagus Saputra (Humas)',
    date: 'Hari ke-3 & 4 KKL',
    views: 290,
    likes: 76
  },
  {
    id: 'v-5',
    title: 'Pertunjukan Teater Panggung Canggih Devdan Show Nusa Dua',
    location: 'Nusa Dua Theatre, Bali',
    category: 'Wisata & Budaya',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: devdanImg,
    duration: '03:10',
    description: 'Efek tata panggung air dinamis, akrobatik tali sutra udara, dan visual lighting mapping dalam pertunjukan Treasure of the Archipelago.',
    videographer: 'Anisa Dwi Lestari',
    date: 'Hari ke-3 KKL',
    views: 198,
    likes: 53
  }
];

