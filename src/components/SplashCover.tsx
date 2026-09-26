'use client';

import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import TraditionalSealOpener from './TraditionalSealOpener';

interface SplashCoverProps {
  onOpen: () => void;
  isOpened: boolean;
}

export default function SplashCover({ onOpen, isOpened }: SplashCoverProps) {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center px-7 py-8 sm:py-10 gap-6 z-10 select-none overflow-x-hidden">
      {/* Decorative Outer Border Frame */}
      <div className="absolute inset-3 sm:inset-5 border border-[#B89758]/35 pointer-events-none rounded-2xl z-0" />
      <div className="absolute inset-4 sm:inset-6 border border-[#B89758]/20 pointer-events-none rounded-xl z-0" />

      {/* Ornate Corner Accents */}
      <svg className="corner-accent corner-tl text-[#B89758]/50" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 36 V12 C4 7.57 7.57 4 12 4 H36" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
      </svg>
      <svg className="corner-accent corner-tr text-[#B89758]/50" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 36 V12 C4 7.57 7.57 4 12 4 H36" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
      </svg>
      <svg className="corner-accent corner-bl text-[#B89758]/50" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 36 V12 C4 7.57 7.57 4 12 4 H36" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
      </svg>
      <svg className="corner-accent corner-br text-[#B89758]/50" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 36 V12 C4 7.57 7.57 4 12 4 H36" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
      </svg>

      {/* Subtle Botanical Dried Flower Motif */}
      <div className="absolute right-0 bottom-12 w-48 sm:w-64 opacity-25 pointer-events-none z-0">
        <svg viewBox="0 0 200 350" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 350 C90 280 130 220 120 150 C110 80 135 40 140 0" stroke="#8C6D52" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="145" cy="240" rx="35" ry="25" fill="#C5A869" opacity="0.5" />
          <ellipse cx="125" cy="225" rx="30" ry="20" fill="#8C6D52" opacity="0.6" />
          <ellipse cx="160" cy="255" rx="25" ry="18" fill="#B89758" opacity="0.4" />
          <ellipse cx="105" cy="160" rx="22" ry="14" fill="#A65B44" opacity="0.4" />
          <ellipse cx="135" cy="140" rx="28" ry="18" fill="#8C6D52" opacity="0.5" />
          <ellipse cx="130" cy="70" rx="26" ry="18" fill="#C5A869" opacity="0.5" />
          <ellipse cx="150" cy="85" rx="22" ry="15" fill="#8C6D52" opacity="0.4" />
        </svg>
      </div>

      {/* Main Couple Names Section */}
      <div className="w-full max-w-lg mx-auto text-center z-10">
        <div className="flex flex-col items-center gap-1">
          <h1
            style={{ fontFamily: "'Kugile', serif", fontSize: 'clamp(38px, 10vw, 52px)', lineHeight: '1.1', letterSpacing: '-0.01em' }}
            className="text-[#3D2A1D] hover:scale-[1.02] transition-transform duration-500"
          >
            Vaishnav
          </h1>
          <div className="flex items-center justify-center gap-3 my-0.5">
            <span className="h-[1px] w-8 bg-[#B89758]/40" />
            <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl sm:text-3xl text-[#8C6D52] italic">
              &amp;
            </span>
            <span className="h-[1px] w-8 bg-[#B89758]/40" />
          </div>
          <h1
            style={{ fontFamily: "'Kugile', serif", fontSize: 'clamp(38px, 10vw, 52px)', lineHeight: '1.1', letterSpacing: '-0.01em' }}
            className="text-[#3D2A1D] hover:scale-[1.02] transition-transform duration-500"
          >
            Dr. Manju
          </h1>
        </div>

        {/* Date, Time & Venue Info */}
        <div className="w-full mt-4 text-[#5A4231] text-xs space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="h-11 flex items-center justify-center gap-2 px-3 rounded-xl bg-white/40 backdrop-blur-xl border border-[#B89758]/30 shadow-xs">
              <Calendar className="w-4 h-4 text-[#B89758] shrink-0" />
              <span className="font-medium">Mon, 26 Oct 2026</span>
            </div>
            <div className="h-11 flex items-center justify-center gap-2 px-3 rounded-xl bg-white/40 backdrop-blur-xl border border-[#B89758]/30 shadow-xs">
              <Clock className="w-4 h-4 text-[#B89758] shrink-0" />
              <span className="font-medium">4:00 PM – 8:00 PM</span>
            </div>
          </div>
          <div className="h-11 flex items-center justify-center gap-2 px-3 rounded-xl bg-white/40 backdrop-blur-xl border border-[#B89758]/30 shadow-xs">
            <MapPin className="w-4 h-4 text-[#B89758] shrink-0" />
            <span className="font-medium">Royal Convention Centre, Karakkunnu, Manjeri</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Countdown & Traditional Seal Opener */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2.5 z-10">
        <CountdownTimer />
        <TraditionalSealOpener onComplete={onOpen} isOpened={isOpened} />
      </div>
    </section>
  );
}
