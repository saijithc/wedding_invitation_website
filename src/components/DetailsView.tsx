'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Navigation, Heart, Phone } from 'lucide-react';

import TransportAccordion from './TransportAccordion';
import CardDownloadSection from './CardDownloadSection';

export default function DetailsView() {
  const handleAddToCalendar = () => {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (typeof navigator !== 'undefined' &&
        navigator.platform === 'MacIntel' &&
        navigator.maxTouchPoints > 1);

    if (isIOS) {
      // Generate .ics for Apple Calendar
      const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Vaishnav & Dr. Manju//Wedding Reception//EN',
        'BEGIN:VEVENT',
        'UID:vaishnav-manju-wedding-20261026',
        'DTSTAMP:20260920T000000Z',
        'DTSTART:20261026T103000Z', // 4:00 PM IST is 10:30 UTC
        'DTEND:20261026T143000Z',   // 8:00 PM IST is 14:30 UTC
        'SUMMARY:Vaishnav & Dr. Manju — Wedding Reception',
        'DESCRIPTION:You are cordially invited to celebrate the Wedding Reception of Vaishnav and Dr. Manju.',
        'LOCATION:Royal Convention Centre, Karakkunnu, Manjeri, Malappuram, Kerala',
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n');

      const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vaishnav-manju-reception.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Google Calendar Render URL
      const title = encodeURIComponent('Vaishnav & Dr. Manju — Wedding Reception');
      const dates = '20261026T103000Z/20261026T143000Z';
      const details = encodeURIComponent(
        'With warm regards, Mr. Surendran C. & Mrs. Preethi K.V. cordially invite you and your family to the Wedding Reception of Vaishnav with Dr. Manju.'
      );
      const location = encodeURIComponent('Royal Convention Centre, Karakkunnu, Manjeri - 3, Malappuram');
      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(googleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full min-h-[100dvh] pb-16 pt-12 px-4 sm:px-6 max-w-xl mx-auto z-20 relative">
      {/* Top Banner with Couple Names */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <span className="h-[1px] w-12 bg-[#B89758]/50" />
          <span className="text-sm text-[#B89758]">✦</span>
          <span className="h-[1px] w-12 bg-[#B89758]/50" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <h1
            style={{ fontFamily: "'Kugile', serif", fontSize: 'clamp(40px, 11vw, 54px)', lineHeight: '1.1', letterSpacing: '-0.01em' }}
            className="text-[#3D2A1D]"
          >
            Vaishnav
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#B89758]/40" />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-2xl text-[#8C6D52] italic"
            >
              &amp;
            </span>
            <span className="h-[1px] w-8 bg-[#B89758]/40" />
          </div>
          <h1
            style={{ fontFamily: "'Kugile', serif", fontSize: 'clamp(40px, 11vw, 54px)', lineHeight: '1.1', letterSpacing: '-0.01em' }}
            className="text-[#3D2A1D]"
          >
            Dr. Manju
          </h1>
        </div>
      </div>

      {/* ── Parents & Lineage Card ── */}
      <div className="rounded-2xl border border-[#B89758]/35 bg-white/80 backdrop-blur-md p-5 sm:p-6 shadow-sm mb-6 text-center card-inner-frame">
        {/* Groom Family */}
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-widest text-[#B89758] font-semibold">
            Groom
          </p>
          <h3 className="font-display text-2xl sm:text-3xl text-[#3D2A1D] font-bold">
            VAISHNAV
          </h3>
          <p className="text-xs sm:text-sm text-[#5A4231] font-medium">
            S/o Mr. Surendran C. &amp; Mrs. Preethi K.V.
          </p>
          <div className="flex items-center justify-center gap-3 pt-1 text-xs">
            <a
              href="tel:9489139121"
              className="inline-flex items-center gap-1 text-[#5A4231] hover:text-[#B89758] font-medium"
            >
              <Phone className="w-3 h-3 text-[#B89758]" /> 9489139121
            </a>
            <span className="text-[#B89758]/40">·</span>
            <a
              href="tel:8606589055"
              className="inline-flex items-center gap-1 text-[#5A4231] hover:text-[#B89758] font-medium"
            >
              <Phone className="w-3 h-3 text-[#B89758]" /> 8606589055
            </a>
          </div>
        </div>

        {/* Delicate divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-14 bg-[#B89758]/30" />
          <Heart className="w-3 h-3 text-[#B89758] fill-[#B89758]" />
          <span className="h-[1px] w-14 bg-[#B89758]/30" />
        </div>

        {/* Bride Family */}
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-widest text-[#B89758] font-semibold">
            Bride
          </p>
          <h3 className="font-display text-2xl sm:text-3xl text-[#3D2A1D] font-bold">
            DR. MANJU
          </h3>
          <p className="text-xs sm:text-sm text-[#5A4231] font-medium">
            D/o Mr. Appukuttan (Late) &amp; Mrs. Sreekala
          </p>
        </div>
      </div>

      {/* ── Save the Date & Calendar Pill ── */}
      <div className="rounded-2xl border border-[#B89758]/35 bg-white/80 backdrop-blur-md p-5 text-center shadow-sm mb-6">
        <p className="text-[11px] uppercase tracking-widest text-[#7D5D42] font-medium mb-1">
          Mark Your Calendar
        </p>
        <h3 className="font-cormorant text-2xl sm:text-3xl text-[#3D2A1D] font-bold">
          Monday, 26 October 2026
        </h3>
        <p className="text-xs sm:text-sm text-[#8C6D52] font-medium mt-0.5">
          Reception from 4:00 PM to 8:00 PM
        </p>

        <button
          onClick={handleAddToCalendar}
          type="button"
          className="mt-3.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A4231] text-white hover:bg-[#3D2A1D] text-xs font-medium tracking-wide shadow-sm transition-all active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E6CF9B]" />
          <span>Add to Calendar</span>
        </button>
      </div>

      {/* ── Event Locations (Two Events) ── */}
      <div className="space-y-4 mb-6">
        <div className="text-center mb-1">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#3D2A1D]">
            Wedding Celebrations
          </h3>
          <p className="text-xs text-[#7D5D42]">
            Schedule and venue details for our ceremonies
          </p>
        </div>

        {/* Card 1: Reception (Primary Celebration) */}
        <div className="rounded-2xl border border-[#B89758]/35 bg-white/80 backdrop-blur-md p-5 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#B89758] text-[#FCFAF6] text-[10px] uppercase tracking-wider font-semibold">
                Grand Reception
              </span>
              <h4 className="font-serif text-lg font-bold text-[#3D2A1D] mt-2">
                Royal Convention Centre
              </h4>
              <p className="text-xs text-[#6B5445]">
                Karakkunnu, Manjeri - 3, Malappuram, Kerala
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#B89758]/30 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#B89758]" />
            </div>
          </div>

          <div className="pt-2 border-t border-[#B89758]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5A4231]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B89758]" />
              <span className="font-medium">4:00 PM to 8:00 PM · Monday 26 Oct 2026</span>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Royal+Convention+Centre+Karakkunnu+Manjeri"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-[#FAF7F2] border border-[#B89758]/40 hover:bg-white text-[#3D2A1D] text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Navigation className="w-3.5 h-3.5 text-[#B89758]" />
            <span>Get Directions (Google Maps)</span>
          </a>
        </div>


      </div>

      {/* ── How to Reach Guide ── */}
      <div className="mb-6">
        <div className="text-center mb-3">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#3D2A1D]">
            How to Reach
          </h3>
          <p className="text-xs text-[#7D5D42]">
            Directions and transit info for out-of-town guests
          </p>
        </div>
        <TransportAccordion />
      </div>

      {/* ── Card Download & Share ── */}
        <CardDownloadSection />





      {/* ── Classical Footer ── */}
      <footer className="text-center pt-6 pb-4 border-t border-[#B89758]/25 space-y-2">
        <p className="font-cormorant italic text-sm text-[#7D5D42]">
          &ldquo;Two lives, two hearts, joined together in friendship, united forever in love.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-2 py-1">
          <span className="h-[1px] w-8 bg-[#B89758]/35" />
          <span className="text-xs text-[#B89758]">✦</span>
          <span className="h-[1px] w-8 bg-[#B89758]/35" />
        </div>
        <p className="font-serif text-sm font-semibold text-[#3D2A1D] tracking-wide">
          Sharing the Happiness: Friends &amp; Relatives
        </p>
        <p className="text-[11px] text-[#8C6D52]">
          With warm regards, Mr. Surendran C. &amp; Mrs. Preethi K.V. and Family
        </p>
      </footer>
    </div>
  );
}
