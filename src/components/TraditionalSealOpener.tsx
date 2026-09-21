'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronUp } from 'lucide-react';

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
      {/* Keyframe styles */}
      <style>{`
        @keyframes flameSway {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(-1deg); }
          25%       { transform: scaleX(0.93) scaleY(1.07) rotate(1.5deg); }
          50%       { transform: scaleX(1.05) scaleY(0.96) rotate(-0.5deg); }
          75%       { transform: scaleX(0.96) scaleY(1.04) rotate(1deg); }
        }
        @keyframes warmGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.6;  transform: scale(1.08); }
        }
        @keyframes warmGlowLit {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.12); }
        }
        @keyframes outerGlowLit {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.15); }
        }
        @keyframes flameFlicker {
          0%, 100% { opacity: 1; }
          45%       { opacity: 0.88; }
          70%       { opacity: 0.95; }
        }
      `}</style>

      <div className="w-full max-w-xs mx-auto flex flex-col items-center select-none pt-2 pb-1">

        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          aria-label="Open Wedding Invitation"
          className="group relative flex flex-col items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {/* Diya + glow stack */}
          <div className="relative flex items-center justify-center w-28 h-28">

            {/* Outermost warm ambient glow — only when lit */}
            {isLit && (
              <div
                className="absolute w-28 h-28 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
                  animation: 'outerGlowLit 2.4s ease-in-out infinite',
                }}
              />
            )}

            {/* Inner warm halo — breathes gently like candlelight */}
            <div
              className="absolute w-20 h-20 rounded-full"
              style={{
                background: isLit
                  ? 'radial-gradient(circle, rgba(247,223,148,0.45) 0%, rgba(212,175,55,0.2) 50%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(184,151,88,0.18) 0%, transparent 70%)',
                animation: isLit ? 'warmGlowLit 1.8s ease-in-out infinite' : 'warmGlow 3s ease-in-out infinite',
              }}
            />

            {/* Gold diya base circle */}
            <div
              className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all duration-700
                ${isLit
                  ? 'shadow-[0_0_20px_6px_rgba(212,175,55,0.35)]'
                  : 'group-hover:shadow-[0_0_14px_4px_rgba(184,151,88,0.25)]'
                }
              `}
              style={{
                background: isLit
                  ? 'radial-gradient(circle at 40% 35%, #F7DF94, #D4AF37 50%, #8C6D52)'
                  : 'radial-gradient(circle at 40% 35%, #E6CF9B, #B89758 55%, #7A5C38)',
              }}
            >
              {/* Inner diya body */}
              <div className="w-11 h-11 rounded-full bg-[#FAF7F2] flex items-end justify-center overflow-hidden pb-1">

                {/* Diya SVG — flame + bowl */}
                <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none">

                  {/* Diya bowl */}
                  <path
                    d="M6 19 C6 24 10 26.5 16 26.5 C22 26.5 26 24 26 19 C22 19 19 20.5 16 20.5 C13 20.5 10 19 6 19 Z"
                    fill="#C5A869"
                    stroke="#B89758"
                    strokeWidth="0.6"
                  />
                  {/* Bowl rim */}
                  <path
                    d="M8 19 C10 17 13 16.5 16 16.5 C19 16.5 22 17 24 19"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  {/* Wick */}
                  <line x1="16" y1="16.5" x2="16" y2="13.5" stroke="#8C6D52" strokeWidth="0.9" strokeLinecap="round" />

                  {/* Flame — only shown when lit or hovered */}
                  {isLit ? (
                    <g style={{ animation: 'flameSway 1.6s ease-in-out infinite, flameFlicker 1.2s ease-in-out infinite', transformOrigin: '16px 13.5px' }}>
                      {/* Outer flame */}
                      <path
                        d="M16 4 C16 4 19 9 19 12 C19 13.7 17.7 15 16 15 C14.3 15 13 13.7 13 12 C13 9 16 4 16 4 Z"
                        fill="#F97316"
                        opacity="0.7"
                      />
                      {/* Inner bright flame */}
                      <path
                        d="M16 6.5 C16 6.5 17.8 10 17.8 12 C17.8 13.0 17.0 13.8 16 13.8 C15.0 13.8 14.2 13.0 14.2 12 C14.2 10 16 6.5 16 6.5 Z"
                        fill="#FCD34D"
                      />
                      {/* Flame tip glow */}
                      <ellipse cx="16" cy="8" rx="1.2" ry="2" fill="#FEF3C7" opacity="0.85" />
                    </g>
                  ) : (
                    /* Unlit wick tip */
                    <circle cx="16" cy="13.2" r="0.9" fill="#5A4231" opacity="0.5" />
                  )}
                </svg>

              </div>
            </div>
          </div>

          {/* Highly Visible CTA */}
          <div className="text-center w-full mt-2">
            {!isLit ? (
              <div className="flex flex-col items-center animate-bounce">
                <ChevronUp className="w-5 h-5 text-[#B89758] mb-1" />
                <span className="inline-block px-5 py-2.5 rounded-full bg-[#B89758] text-white text-xs font-bold tracking-[0.2em] uppercase shadow-md border border-[#D4AF37]/50 group-hover:bg-[#a38346] transition-colors">
                  Tap to Open
                </span>
              </div>
            ) : (
              <p className="font-serif font-semibold text-lg tracking-wide text-[#8C6D52] animate-pulse">
                {isOpening ? 'Opening…' : 'Lighting the way…'}
              </p>
            )}
          </div>
        </button>

      </div>
    </>
  );
}

