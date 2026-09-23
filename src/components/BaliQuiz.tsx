import { useState } from 'react';
import { HelpCircle, Check, X, RotateCcw, Award } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  destination: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    destination: 'PT Victoria Care Indonesia Semarang',
    question: 'Sistem teknologi informasi apa yang menjadi fokus utama observasi mahasiswa Informatika di lini pabrik PT Victoria Care Indonesia Semarang?',
    options: [
      'Sistem ERP (Enterprise Resource Planning) & Otomasi Packaging',
      'Desain kemasan manual menggunakan cat minyak',
      'Pembuatan video game 3D bertema kecantikan',
      'Pemasangan kabel telepon analog konvensional'
    ],
    correctIndex: 0,
    explanation: 'Di PT Victoria Care Indonesia, mahasiswa mengamati integrasi ERP untuk supply chain, IoT monitoring suhu reaktor, dan otomasi conveyor robotik.'
  },
  {
    id: 2,
    destination: 'Pura Ulun Danu Beratan',
    question: 'Pura Ulun Danu Beratan yang dikunjungi pada hari ke-2 KKL didedikasikan untuk memuja dewi apa?',
    options: [
      'Dewi Sri (Dewi Padi)',
      'Dewi Danu (Dewi Air, Danau, dan Sungai) & Sistem Subak',
      'Dewi Saraswati (Dewi Pengetahuan)',
      'Dewi Ratih (Dewi Bulan)'
    ],
    correctIndex: 1,
    explanation: 'Pura Ulun Danu Beratan berdiri di tepi Danau Beratan Bedugul untuk memuja Dewi Danu, penjaga kesuburan air dan sistem irigasi Subak Bali.'
  },
  {
    id: 3,
    destination: 'Devdan Show Nusa Dua',
    question: 'Apa keunikan teknologi panggung yang ditampilkan dalam pertunjukan teatrikal Devdan Show di Nusa Dua Theatre?',
    options: [
      'Hanya menggunakan proyektor OHP zaman dulu',
      'Pentas panggung air dinamis (water stage), DMX lighting & aerial acrobatics',
      'Pementasan wayang kulit tanpa pencahayaan panggung',
      'Panggung tanpa penataan suara dan akustik'
    ],
    correctIndex: 1,
    explanation: 'Devdan Show memanfaatkan otomasi panggung canggih dengan hujan buatan panggung, sistem tata suara 7.1, dan efek tata cahaya DMX terprogram.'
  },
  {
    id: 4,
    destination: 'Pantai Pandawa (Kutuh)',
    question: 'Mengapa tebing kapur di jalan masuk Pantai Pandawa dipahat patung-patung ksatria?',
    options: [
      'Melambangkan 5 tokoh Panca Pandawa dari wiracarita Mahabharata',
      'Sebagai benteng pertahanan perang zaman kolonial',
      'Hanya untuk penahan longsoran batu tanpa makna filosofis',
      'Monumen peringatan astronot'
    ],
    correctIndex: 0,
    explanation: 'Tebing Pantai Pandawa dihiasi patung Yudistira, Bima, Arjuna, Nakula, Sadewa, dan Dewi Kunti yang dipahat langsung di dinding kapur.'
  },
  {
    id: 5,
    destination: 'Pertunjukan Tari Kecak',
    question: 'Apa ciri khas paling unik dari musik pengiring pertunjukan sakral Tari Kecak Bali?',
    options: [
      'Diiringi alunan gamelan gong kebyar dengan seratus penabuh',
      'Hanya menggunakan paduan suara ritmis pria berseru "Cak-cak-cak" tanpa alat musik',
      'Diiringi keyboard elektrik dan drum set modern',
      'Hanya menggunakan instrumen tiup seruling bambu'
    ],
    correctIndex: 1,
    explanation: 'Tari Kecak tidak menggunakan instrumen musik konvensional apa pun; musik pengiringnya adalah paduan vokal kolosal puluhan penari pria yang bersahut-sahutan.'
  }
];

export default function BaliQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_DATA[currentIdx];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="kuis" className="py-20 bg-[#0e0e12] border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Kuis Interaktif KKL Informatika</span>
          </div>
          <h2 className="font-bali-title text-2xl sm:text-3xl font-bold text-white">
            Uji Wawasan Destinasi & Teknologi
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm mt-2">
            Seberapa dalam pemahamanmu mengenai tempat-tempat yang dikunjungi Kelompok 7 di Semarang dan Bali?
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-[#141419] border border-white/[0.08] rounded-2xl p-6 sm:p-8 relative">
          
          {!quizFinished ? (
            <div className="space-y-6">
              
              {/* Progress bar and counter */}
              <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/[0.06] pb-3">
                <span className="text-amber-400 font-semibold uppercase tracking-wider">
                  {currentQ.destination}
                </span>
                <span className="font-mono">
                  Pertanyaan {currentIdx + 1} dari {QUIZ_DATA.length}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="font-bali-title text-lg sm:text-xl font-bold text-white leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, i) => {
                  let btnStyle = 'bg-[#181820] text-zinc-300 border-white/[0.06] hover:bg-[#202028] hover:border-amber-500/30';
                  
                  if (isAnswered) {
                    if (i === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-950/60 text-emerald-200 border-emerald-500/80 font-semibold';
                    } else if (i === selectedAnswer) {
                      btnStyle = 'bg-red-950/60 text-red-200 border-red-500/80';
                    } else {
                      btnStyle = 'bg-[#181820] text-zinc-500 border-white/[0.04] opacity-50';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm border transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && i === currentQ.correctIndex && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && i === selectedAnswer && i !== currentQ.correctIndex && (
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2 animate-fadeIn">
                  <p className="text-xs text-amber-300 font-semibold">
                    {selectedAnswer === currentQ.correctIndex ? '🎉 Jawaban Tepat!' : '💡 Pembahasan:'}
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                    >
                      {currentIdx < QUIZ_DATA.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="font-bali-title text-2xl font-bold text-white">
                Kuis KKL Bali Selesai!
              </h3>

              <div className="text-4xl font-bold font-mono text-amber-400">
                {score} / {QUIZ_DATA.length}
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                {score === 5
                  ? 'Luar biasa sempurna! Kamu benar-benar menyimak setiap detail materi kunjungan industri dan destinasi budaya KKL Kelompok 7!'
                  : score >= 3
                  ? 'Bagus sekali! Kamu memiliki wawasan yang solid mengenai destinasi KKL Informatika UPGRIS ke Bali.'
                  : 'Terus semangat! Silakan jelajahi informasi detail destinasi di website ini untuk menambah wawasan.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
