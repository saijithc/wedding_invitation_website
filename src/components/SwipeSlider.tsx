'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SwipeSliderProps {
  onComplete: () => void;
}

export default function SwipeSlider({ onComplete }: SwipeSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const triggerCelebration = useCallback(() => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#B89758', '#E6CF9B', '#8C6D52', '#F7F3EB'],
    });
  }, []);

  const getMaxTravel = useCallback(() => {
    if (!trackRef.current || !thumbRef.current) return 0;
    const trackW = trackRef.current.offsetWidth;
    const thumbW = thumbRef.current.offsetWidth;
    return Math.max(0, trackW - thumbW - 8); // 4px padding on each side
  }, []);

  const completeSwipe = useCallback(() => {
    const max = getMaxTravel();
    setCurrentX(max);
    setIsDone(true);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }

    triggerCelebration();

    setTimeout(() => {
      onComplete();
    }, 550);
  }, [getMaxTravel, onComplete, triggerCelebration]);

  const snapBack = () => {
    setCurrentX(0);
  };

  const onDragStart = (clientX: number) => {
    if (isDone) return;
    setIsDragging(true);
    setStartX(clientX - currentX);
  };

  const onDragMove = useCallback((clientX: number) => {
    if (!isDragging || isDone) return;
    const max = getMaxTravel();
    const newX = Math.max(0, Math.min(clientX - startX, max));
    setCurrentX(newX);
  }, [isDragging, isDone, getMaxTravel, startX]);

  const onDragEnd = useCallback(() => {
    if (!isDragging || isDone) return;
    setIsDragging(false);
    const max = getMaxTravel();

    if (max > 0 && currentX / max >= 0.72) {
      completeSwipe();
    } else {
      snapBack();
    }
  }, [isDragging, isDone, getMaxTravel, currentX, completeSwipe]);

  // Global touch / mouse listeners while dragging
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        onDragMove(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      if (isDragging) onDragEnd();
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) onDragMove(e.clientX);
    };
    const handleMouseUp = () => {
      if (isDragging) onDragEnd();
    };

    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDragMove, onDragEnd]);

  const maxTravel = getMaxTravel();
  const progress = maxTravel > 0 ? Math.min(1, currentX / maxTravel) : 0;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none">
      <div
        ref={trackRef}
        className="relative w-full h-14 rounded-full bg-white/75 backdrop-blur-md border border-[#B89758]/40 shadow-md p-1 flex items-center overflow-hidden transition-colors duration-300"
      >
        {/* Dynamic progress fill */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#FAF7F2] via-[#E6CF9B]/50 to-[#B89758]/40 rounded-full transition-all duration-75"
          style={{ width: `${Math.max(progress * 100, isDone ? 100 : 0)}%` }}
        />

        {/* Center label */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
          style={{ opacity: isDone ? 0 : Math.max(0, 1 - progress * 2.2) }}
        >
          <span className="text-[13px] sm:text-sm font-medium tracking-wide text-[#5A4231] flex items-center gap-1.5 pl-8">
            Kindly Confirm Your Attendance
            <Heart className="w-3.5 h-3.5 text-[#B89758] fill-[#B89758] inline" />
          </span>
        </div>

        {/* Done label */}
        {isDone && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-in">
            <span className="text-sm font-semibold tracking-wider text-[#3D2A1D] uppercase">
              Welcome! ✨
            </span>
          </div>
        )}

        {/* Draggable thumb */}
        <div
          ref={thumbRef}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onMouseDown={(e) => onDragStart(e.clientX)}
          style={{
            transform: `translateX(${currentX}px)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
          className={`relative z-10 w-12 h-12 rounded-full bg-[#5A4231] text-[#FCFAF6] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md border border-[#B89758]/50 hover:bg-[#3D2A1D] transition-colors`}
        >
          <ChevronRight className="w-6 h-6 text-[#E6CF9B] animate-pulse" />
        </div>
      </div>

      {/* Accessible alternative tap button */}
      <button
        onClick={completeSwipe}
        type="button"
        className="mt-2.5 text-[11px] uppercase tracking-widest text-[#7D5D42] hover:text-[#3D2A1D] transition-colors underline underline-offset-4 decoration-[#B89758]/40"
      >
        or tap here to open invitation
      </button>
    </div>
  );
}
