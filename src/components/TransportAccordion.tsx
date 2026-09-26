'use client';

import React, { useState } from 'react';
import { Plane, Train, Bus, Car, ChevronDown } from 'lucide-react';

interface TransportSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: { heading?: string; text: string }[];
}

const transportData: TransportSection[] = [
  {
    id: 'air',
    icon: <Plane className="w-4 h-4 text-[#B89758]" />,
    title: 'By Air (Flight)',
    content: [
      {
        heading: 'Calicut International Airport (CCJ / Karipur) — ~25–30 km away',
        text: 'Upon landing at Calicut Airport, hire a prepaid taxi directly to Karakkunnu/Manjeri via the Kondotty – Manjeri route. The journey takes around 45–60 minutes depending on traffic.',
      },
      {
        heading: 'Bus Alternative',
        text: 'Take an auto or taxi from the airport to the nearby Kondotty bus stand, then catch a direct KSRTC or private bus bound for Manjeri/Nilambur.',
      },
    ],
  },
  {
    id: 'train',
    icon: <Train className="w-4 h-4 text-[#B89758]" />,
    title: 'By Train (Railway)',
    content: [
      {
        heading: 'Angadippuram Railway Station (AAM) — ~20 km away',
        text: 'Serves the Nilambur–Shoranur railway line. Convenient for guests traveling via Shoranur Junction. Local buses and taxis to Manjeri/Karakkunnu are readily available outside the station.',
      },
      {
        heading: 'Kozhikode Railway Station (CLT) — ~50 km away',
        text: 'A major railhead connected to all major cities in India. From Kozhikode Railway Station or the nearby KSRTC Bus Stand, take a direct bus toward Manjeri or Nilambur.',
      },
      {
        heading: 'Tirur Railway Station (TIR) — ~40 km away',
        text: 'Another convenient main-line station. Guests can hire a taxi or catch a bus to Malappuram/Manjeri.',
      },
    ],
  },
  {
    id: 'bus',
    icon: <Bus className="w-4 h-4 text-[#B89758]" />,
    title: 'By Bus',
    content: [
      {
        heading: 'From Manjeri Bus Stand (Local Hub)',
        text: 'Manjeri Town is the primary transit hub located about 6–7 km from Karakkunnu. Board any local or private bus heading toward Nilambur, Wandoor, or Karakkunnu, and alight near Karakkunnu. Autorickshaws and taxis are easily available from Manjeri town directly to the venue.',
      },
      {
        heading: 'Intercity / Long-Distance Buses',
        text: 'Out-of-town guests taking overnight sleeper or interstate buses (from Bengaluru, Chennai, Kochi, Coimbatore, etc.) can book tickets directly to Manjeri or Kozhikode/Malappuram.',
      },
    ],
  },
  {
    id: 'road',
    icon: <Car className="w-4 h-4 text-[#B89758]" />,
    title: 'By Road (Car & Private Vehicles)',
    content: [
      {
        heading: 'Route via Manjeri Town',
        text: 'Head toward the Manjeri – Nilambur Road. Proceed for approximately 6 km toward Karakkunnu/Trikkalangode to reach the venue.',
      },
      {
        heading: 'From Calicut / Kozhikode',
        text: 'Travel via the Kozhikode – Kondotty – Manjeri route (SH 28) and continue toward Karakkunnu on the Nilambur route.',
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
            className="rounded-xl liquid-glass-gold overflow-hidden transition-all duration-300"
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
                <ul className="space-y-3 pt-2">
                  {t.content.map((item, idx) => (
                    <li key={idx} className="flex flex-col gap-0.5">
                      {item.heading && (
                        <span className="font-semibold text-[#5A4231] text-[11px] sm:text-xs">
                          {item.heading}
                        </span>
                      )}
                      <span className="text-[#6B5445] leading-relaxed">{item.text}</span>
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
