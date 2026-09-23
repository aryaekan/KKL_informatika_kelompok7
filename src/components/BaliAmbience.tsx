import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BaliAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startAmbience = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Generate soft pink/brown ocean wave noise
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.04; // low volume
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate muffled ocean swells
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gain;

      // Gentle wave swell cycle
      let waveUp = true;
      intervalRef.current = window.setInterval(() => {
        if (!gainNodeRef.current || !audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        if (waveUp) {
          gainNodeRef.current.gain.linearRampToValueAtTime(0.24, now + 3);
          filter.frequency.linearRampToValueAtTime(540, now + 3);
        } else {
          gainNodeRef.current.gain.linearRampToValueAtTime(0.08, now + 3.5);
          filter.frequency.linearRampToValueAtTime(260, now + 3.5);
        }
        waveUp = !waveUp;
      }, 3500);

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAmbience = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAmbience = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbience();
    };
  }, []);

  return (
    <button
      onClick={toggleAmbience}
      title={isPlaying ? 'Heningkan Suara Alam Bali' : 'Putar Suasana Pantai & Deburan Ombak Bali'}
      aria-label="Toggle Suasana Ombak Bali"
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 whitespace-nowrap ${
        isPlaying
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
          : 'bg-[#18181b] text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline">Ombak Bali Aktif</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Suasana Ombak</span>
        </>
      )}
    </button>
  );
}
