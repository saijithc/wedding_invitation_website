'use client';

import React, { useState } from 'react';
import { Plane, Train, Bus, ChevronDown } from 'lucide-react';

interface TransportOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: { label: string; value: string; highlight?: boolean }[];
}

const transportData: TransportOption[] = [
  {
    id: 'air',
    icon: <Plane className="w-4 h-4 text-[#B89758]" />,
    title: 'By Air',
    items: [
      {
        label: 'Nearest for Reception (Manjeri):',
        value: 'Calicut International Airport (CCJ) — 24 km (~35 min drive)',
        highlight: true,
      },
      {
        label: 'Nearest for Ceremony (Palakkad):',
        value: 'Coimbatore Airport (CJB) — 75 km | Cochin Airport (COK) — 105 km',
      },
      {
        label: 'Transport:',
        value: 'Pre-paid airport taxis and app cabs readily available from terminals.',
      },
    ],
  },
  {
    id: 'train',
    icon: <Train className="w-4 h-4 text-[#B89758]" />,
    title: 'By Train',
    items: [
      {
        label: 'For Reception (Manjeri):',
        value: 'Angadippuram (AAM) — 21 km | Tirur (TIR) — 44 km | Parappanangadi (PGI) — 38 km',
        highlight: true,
      },
      {
        label: 'For Marriage (Palakkad):',
        value: 'Palakkad Junction (PGT) — 18 km (~30 min drive to Kuthanur)',
        highlight: true,
      },
      {
        label: 'Transport:',
        value: 'Frequent connecting buses, autos, and taxis available at station gates.',
      },
    ],
  },
  {
    id: 'bus',
    icon: <Bus className="w-4 h-4 text-[#B89758]" />,
    title: 'By Bus & Road',
    items: [
      {
        label: 'Manjeri Reception Route:',
        value: 'Royal Convention Centre is situated in Karakkunnu on the Manjeri – Pandikkad / Wandoor road (approx. 4 km from Manjeri town).',
        highlight: true,
      },
      {
        label: 'Kuthanur Ceremony Route:',
        value: 'Sree Chithira Auditorium is located in Kuthanur, easily reachable via Kuzhalmannam junction on NH 544.',
      },
      {
        label: 'Parking:',
        value: 'Spacious dedicated valet & guest parking available at both venues.',
      },
    ],
  },
];

export default function TransportAccordion() {
  const [openId, setOpenId] = useState<string | null>('air');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-2.5">
      {transportData.map((t) => {
        const isOpen = openId === t.id;
        return (
          <div
            key={t.id}
            className="rounded-xl border border-[#B89758]/25 bg-white/70 backdrop-blur-sm overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => toggle(t.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left hover:bg-[#F5EFE6]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#B89758]/30 flex items-center justify-center">
                  {t.icon}
                </div>
                <span className="font-serif font-medium text-sm sm:text-base text-[#3D2A1D] tracking-wide">
                  {t.title}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#8C6D52] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-xs sm:text-[13px] text-[#5A4231] border-t border-[#B89758]/15 bg-[#FAF7F2]/50">
                <ul className="space-y-2.5 pt-2">
                  {t.items.map((item, idx) => (
                    <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                      <span className="font-medium text-[#7D5D42] text-[11px] sm:text-xs">
                        {item.label}
                      </span>
                      <span
                        className={`${
                          item.highlight ? 'text-[#3D2A1D] font-medium' : 'text-[#6B5445]'
                        }`}
                      >
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
