'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronRight } from 'lucide-react';

interface TraditionalSealOpenerProps {
  onComplete: () => void;
  isOpened: boolean;
}

export default function TraditionalSealOpener({ onComplete, isOpened }: TraditionalSealOpenerProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isLit, setIsLit] = useState(false);

  React.useEffect(() => {
    if (!isOpened) {
      setIsOpening(false);
      setIsLit(false);
    }
  }, [isOpened]);

  const handleOpen = () => {
    if (isOpening) return;
    setIsLit(true);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('play-wedding-music'));
      if ('vibrate' in navigator) {
        navigator.vibrate([20, 30, 20]);
      }
    }

    setTimeout(() => {
      setIsOpening(true);
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.78 },
        colors: ['#D4AF37', '#B89758', '#E6CF9B', '#8C6D52', '#FAF7F2'],
      });
      setTimeout(() => onComplete(), 450);
    }, 600);
  };

  return (
    <>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>

      <div className="w-full max-w-sm mx-auto flex justify-center pt-4 pb-2 px-4">
        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          aria-label="Light Diya and Open Invitation"
          className={`group relative flex items-center w-full max-w-[280px] p-1.5 pr-5 gap-3 rounded-full border border-[#B89758]/40 shadow-sm transition-all duration-500 overflow-hidden ${
            isLit ? 'bg-[#FAF7F2] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-white hover:bg-[#FAF7F2] hover:shadow-md hover:border-[#B89758]/60'
          }`}
        >
          {/* Warm background glow overlay when lit */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#F7DF94]/20 to-transparent transition-opacity duration-700 pointer-events-none ${
              isLit ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Icon Circle (Diya Container) */}
          <div
            className={`relative shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 z-10 ${
              isLit
                ? 'bg-gradient-to-br from-[#F7DF94] to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-gradient-to-br from-[#E6CF9B] to-[#B89758] group-hover:scale-105'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-end justify-center pb-1.5 overflow-hidden">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                {/* Diya Bowl */}
                <path
                  d="M6 19 C6 24 10 26.5 16 26.5 C22 26.5 26 24 26 19 C22 19 19 20.5 16 20.5 C13 20.5 10 19 6 19 Z"
                  fill="#C5A869"
                  stroke="#B89758"
                  strokeWidth="0.6"
                />
                {/* Bowl Rim */}
                <path
                  d="M8 19 C10 17 13 16.5 16 16.5 C19 16.5 22 17 24 19"
                  stroke="#D4AF37"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                {/* Wick */}
                <line x1="16" y1="16.5" x2="16" y2="13.5" stroke="#8C6D52" strokeWidth="0.9" strokeLinecap="round" />

                {/* Flame */}
                {isLit ? (
                  <g style={{ animation: 'sway 1.5s ease-in-out infinite, flicker 1.2s ease-in-out infinite', transformOrigin: '16px 13.5px' }}>
                    <path
                      d="M16 5 C16 5 18.5 9.5 18.5 12 C18.5 13.5 17.2 14.8 16 14.8 C14.8 14.8 13.5 13.5 13.5 12 C13.5 9.5 16 5 16 5 Z"
                      fill="#F97316"
                      opacity="0.8"
                    />
                    <path
                      d="M16 7 C16 7 17.5 10 17.5 12 C17.5 12.8 16.8 13.5 16 13.5 C15.2 13.5 14.5 12.8 14.5 12 C14.5 10 16 7 16 7 Z"
                      fill="#FCD34D"
                    />
                  </g>
                ) : (
                  <circle cx="16" cy="13.2" r="0.9" fill="#5A4231" opacity="0.5" />
                )}
              </svg>
            </div>
          </div>

          {/* Button Text */}
          <div className="flex-1 text-left z-10 pl-1">
            <p className={`font-serif font-bold text-[15px] leading-tight transition-colors duration-500 ${isLit ? 'text-[#8C6D52]' : 'text-[#3D2A1D]'}`}>
              {isOpening ? 'Opening…' : isLit ? 'Lighting...' : 'Open Invitation'}
            </p>
            {!isLit && (
              <p className="text-[10px] text-[#B89758] font-semibold uppercase tracking-widest mt-0.5">
                Tap to light Diya
              </p>
            )}
          </div>

          {/* Arrow */}
          <div className="shrink-0 z-10 transition-transform duration-300 group-hover:translate-x-1">
            {isLit ? (
               <div className="w-5 h-5 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
            ) : (
               <ChevronRight className="w-5 h-5 text-[#B89758]" />
            )}
          </div>
        </button>
      </div>
    </>
  );
}
