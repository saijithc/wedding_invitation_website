'use client';

import React, { useState, useEffect } from 'react';
import ParticleCanvas from '../components/ParticleCanvas';
import MusicPill from '../components/MusicPill';
import SplashCover from '../components/SplashCover';
import DetailsView from '../components/DetailsView';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('open') === 'true' || window.location.hash === '#details') {
        setIsOpened(true);
      }
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#details');
    }
  };

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-[#FAF7F2]">
      {/* Background Petal & Sparkle Particles (Visible in both views) */}
      <ParticleCanvas />

      {/* Persistent Floating Music Controller */}
      <MusicPill autoPlayTrigger={isOpened} />

      {/* Page 1: Splash / Cover View */}
      <div
        className={`fixed inset-0 w-full h-full overflow-y-auto custom-scrollbar transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] z-10 ${
          isOpened
            ? 'opacity-0 -translate-y-16 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <SplashCover onOpen={handleOpenInvitation} isOpened={isOpened} />
      </div>

      {/* Page 2: Details Sheet View (Slides Up upon swipe unlock) */}
      <div
        aria-hidden={!isOpened}
        className={`fixed inset-0 w-full h-full overflow-y-auto custom-scrollbar transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] z-20 ${
          isOpened
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Subtle top back button to return to cover if desired */}
        <div className="max-w-xl mx-auto px-4 pt-3 flex justify-start">
          <button
            onClick={() => setIsOpened(false)}
            type="button"
            className="text-[11px] uppercase tracking-widest text-[#8C6D52] hover:text-[#3D2A1D] px-3 py-1 rounded-full glass-pill border border-[#B89758]/25 transition-all"
          >
            ← Cover Page
          </button>
        </div>

        <DetailsView />
      </div>
    </main>
  );
}
