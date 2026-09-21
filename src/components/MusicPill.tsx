'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPillProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPill({ autoPlayTrigger = false }: MusicPillProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fade audio volume smoothly
  const fadeVolume = useCallback((from: number, to: number, durationMs: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const steps = 30;
    const interval = durationMs / steps;
    const delta = (to - from) / steps;
    let current = from;
    audio.volume = current;

    const timer = setInterval(() => {
      current = Math.max(0, Math.min(1, current + delta));
      if (audio) audio.volume = current;
      if ((delta > 0 && current >= to) || (delta < 0 && current <= to)) {
        clearInterval(timer);
      }
    }, interval);
  }, []);

  // Play audio safely
  const startPlaying = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeVolume(0, 0.65, 1800);
      })
      .catch((err) => {
        console.log('Audio autoplay prevented or error:', err);
        setIsPlaying(false);
      });
  }, [fadeVolume]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeVolume(audio.volume, 0, 400);
      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 400);
    } else {
      startPlaying();
    }
  };

  // Trigger when autoPlayTrigger prop turns true (e.g. upon swipe completion)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startPlaying();
    }
  }, [autoPlayTrigger, isPlaying, startPlaying]);

  // Listen for synchronous play event (e.g. from seal opener click)
  useEffect(() => {
    const handlePlayMusic = () => {
      if (!isPlaying) {
        startPlaying();
      }
    };
    
    window.addEventListener('play-wedding-music', handlePlayMusic);
    return () => {
      window.removeEventListener('play-wedding-music', handlePlayMusic);
    };
  }, [isPlaying, startPlaying]);


  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/your_turn.mp3"
        loop
        preload="auto"
        onCanPlay={() => setIsLoaded(true)}
      />

      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full glass-pill border border-[#B89758]/35 shadow-md text-[#3D2A1D] hover:bg-white transition-all duration-300 active:scale-95 group"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-medium text-[#6B5445] group-hover:text-[#3D2A1D]">
          {isPlaying ? 'Playing' : 'Music'}
        </span>

        {/* Animated equalizer waves when playing */}
        <div className="flex items-center gap-0.5 h-3">
          {isPlaying ? (
            <>
              <span className="w-0.5 h-2 bg-[#B89758] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3 bg-[#B89758] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-1.5 bg-[#B89758] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
            </>
          ) : (
            <Music className="w-3.5 h-3.5 text-[#8C6D52] group-hover:text-[#3D2A1D]" />
          )}
        </div>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#B89758]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#8C6D52]" />
        )}
      </button>
    </>
  );
}
