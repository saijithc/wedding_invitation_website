'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';

export default function CardDownloadSection() {
  const [downloading, setDownloading] = useState(false);

  const cardImageSrc = '/assets/vaishnav_manju.jpg';

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(cardImageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Vaishnav_Manju_Wedding_Invitation.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      // Fallback
      window.open(cardImageSrc, '_blank');
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-2xl border border-[#B89758]/30 bg-white/75 backdrop-blur-md p-4 sm:p-5 shadow-sm text-center">
        <h4 className="font-serif font-semibold text-lg text-[#3D2A1D] mb-1">
          Wedding Invitation Card
        </h4>
        <p className="text-xs text-[#7D5D42] mb-3">
          Download the official invitation card
        </p>

        {/* Framed Card Image Preview */}
        <div
          className="relative mx-auto max-w-[260px] sm:max-w-[280px] rounded-xl overflow-hidden border-2 border-[#B89758]/40 shadow-md bg-[#FAF7F2] p-1.5 mb-4 group cursor-pointer"
          onClick={() => window.open(cardImageSrc, '_blank')}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={cardImageSrc}
              alt="Vaishnav & Dr. Manju Official Wedding Invitation"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 260px, 280px"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center max-w-sm mx-auto">
          <button
            onClick={handleDownload}
            disabled={downloading}
            type="button"
            className="w-full sm:w-auto min-w-[200px] py-2.5 px-4 rounded-xl bg-[#5A4231] text-white hover:bg-[#3D2A1D] text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5 text-[#E6CF9B]" />
            <span>{downloading ? 'Downloading…' : 'Download Card'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
