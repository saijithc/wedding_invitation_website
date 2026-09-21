'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronRight } from 'lucide-react';

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
        navigator.vibrate([25, 40, 25]);
      }
    }

    setTimeout(() => {
      setIsOpening(true);
      confetti({
        particleCount: 65,
        spread: 85,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#B89758', '#E6CF9B', '#8C6D52', '#FAF7F2'],
      });
      setTimeout(() => onComplete(), 450);
    }, 600);
  };

  return (
    <>
      <style>{`
        @keyframes flameSway {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(-1deg); }
          25%       { transform: scaleX(0.92) scaleY(1.08) rotate(1.5deg); }
          50%       { transform: scaleX(1.06) scaleY(0.95) rotate(-0.5deg); }
          75%       { transform: scaleX(0.95) scaleY(1.05) rotate(1deg); }
        }
        @keyframes flameFlicker {
          0%, 100% { opacity: 1; }
          45%       { opacity: 0.88; }
          70%       { opacity: 0.96; }
        }
        @keyframes btnPulse {
          0%, 100% {
            box-shadow: 0 4px 18px rgba(184, 151, 88, 0.22), 0 0 0 0 rgba(212, 175, 55, 0.35);
          }
          50% {
            box-shadow: 0 6px 24px rgba(184, 151, 88, 0.35), 0 0 0 6px rgba(212, 175, 55, 0);
          }
        }
        @keyframes subtleBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes diyaGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
      `}</style>

      <div className="w-full max-w-md mx-auto flex flex-col items-center select-none pt-2 pb-2 px-1">
        {/* Prominent High-Affordance Tap to Open Button */}
        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          aria-label="Tap to Open Wedding Invitation"
          className={`group relative w-full flex items-center justify-between gap-3 sm:gap-4 px-4 py-3 sm:py-3.5 rounded-2xl
            border-2 transition-all duration-300 cursor-pointer active:scale-[0.98] overflow-hidden
            ${isLit
              ? 'bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E5] to-[#F7EBD0] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]'
              : 'bg-gradient-to-r from-white via-[#FCFAF6] to-[#FAF5EC] border-[#B89758]/60 hover:border-[#B89758] hover:shadow-[0_8px_25px_rgba(184,151,88,0.28)]'
            }
          `}
          style={{
            animation: isLit ? 'none' : 'btnPulse 2.8s ease-in-out infinite',
          }}
        >
          {/* Subtle shimmering light across button */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#B89758]/15 to-transparent pointer-events-none" />

          {/* Left: Traditional Diya Medallion */}
          <div className="relative shrink-0 flex items-center justify-center">
            {/* Ambient aura behind diya */}
            <div
              className="absolute w-14 h-14 rounded-full"
              style={{
                background: isLit
                  ? 'radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(212,175,55,0.25) 55%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)',
                animation: isLit ? 'diyaGlow 1.6s ease-in-out infinite' : 'none',
              }}
            />

            {/* Circular golden frame */}
            <div
              className={`relative z-10 w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center p-0.5 shadow-sm transition-transform duration-500
                ${isLit
                  ? 'bg-gradient-to-br from-[#FDE68A] via-[#D4AF37] to-[#8C6D52] scale-105'
                  : 'bg-gradient-to-br from-[#F5E1B5] via-[#CBB073] to-[#8C6D52] group-hover:scale-105'
                }
              `}
            >
              {/* Inner bowl container */}
              <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-end justify-center overflow-hidden pb-1 border border-white/80">
                <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none">
                  {/* Diya bowl */}
                  <path
                    d="M6 19.5 C6 24 10 26.5 16 26.5 C22 26.5 26 24 26 19.5 C22 19.5 19 21 16 21 C13 21 10 19.5 6 19.5 Z"
                    fill="#C5A869"
                    stroke="#B89758"
                    strokeWidth="0.7"
                  />
                  {/* Bowl rim */}
                  <path
                    d="M8 19.5 C10 17.5 13 17 16 17 C19 17 22 17.5 24 19.5"
                    stroke="#D4AF37"
                    strokeWidth="0.85"
                    strokeLinecap="round"
                  />
                  {/* Wick */}
                  <line x1="16" y1="17" x2="16" y2="13.5" stroke="#785338" strokeWidth="1" strokeLinecap="round" />

                  {/* Flame */}
                  {isLit ? (
                    <g style={{ animation: 'flameSway 1.6s ease-in-out infinite, flameFlicker 1.2s ease-in-out infinite', transformOrigin: '16px 13.5px' }}>
                      {/* Outer flame */}
                      <path
                        d="M16 3.5 C16 3.5 19.5 8.5 19.5 12 C19.5 14 18 15.5 16 15.5 C14 15.5 12.5 14 12.5 12 C12.5 8.5 16 3.5 16 3.5 Z"
                        fill="#EA580C"
                        opacity="0.85"
                      />
                      {/* Inner glowing flame */}
                      <path
                        d="M16 6 C16 6 18.2 9.5 18.2 12 C18.2 13.2 17.2 14.2 16 14.2 C14.8 14.2 13.8 13.2 13.8 12 C13.8 9.5 16 6 16 6 Z"
                        fill="#FBBF24"
                      />
                      {/* White-hot flame core */}
                      <ellipse cx="16" cy="8" rx="1.2" ry="2.2" fill="#FEF3C7" />
                    </g>
                  ) : (
                    /* Unlit ready wick */
                    <circle cx="16" cy="13.5" r="1" fill="#5A4231" opacity="0.6" />
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Center: Clear, Prominent, Actionable Text */}
          <div className="flex-1 text-left min-w-0">
            {/* Eyebrow badge: Highly visible */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B89758]/15 text-[#8C6D52] font-semibold text-[10px] sm:text-[11px] tracking-wider uppercase">
                <Sparkles className="w-3 h-3 text-[#B89758]" />
                <span>{isLit ? 'Lighting Diya…' : 'Tap to Open'}</span>
              </span>
            </div>

            {/* Primary Action Title */}
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D1E12] tracking-wide leading-snug">
              {isOpening ? 'Opening Invitation…' : isLit ? 'Welcome to Celebration' : 'Open Wedding Invitation'}
            </h3>

            {/* Subtext */}
            <p className="text-[11px] sm:text-xs text-[#6B5445] font-medium truncate mt-0.5">
              {isLit ? 'Revealing schedule & venue…' : 'Touch to light the diya & enter'}
            </p>
          </div>

          {/* Right: Golden Action Arrow Button */}
          <div className="shrink-0 flex items-center justify-center">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${isLit
                  ? 'bg-[#B89758] text-white shadow-sm'
                  : 'bg-[#FAF7F2] text-[#8C6D52] border border-[#B89758]/40 group-hover:bg-[#B89758] group-hover:text-white group-hover:border-[#B89758]'
                }
              `}
              style={{
                animation: isLit ? 'none' : 'subtleBounce 1.8s ease-in-out infinite',
              }}
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
