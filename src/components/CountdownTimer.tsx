'use client';

import React, { useEffect, useState } from 'react';

// Target Wedding Reception date: Monday 26 October 2026, 4:00 PM IST
const TARGET_DATE = new Date('2026-10-26T16:00:00+05:30').getTime();

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const totalSecs = Math.floor(diff / 1000);
      const days = Math.floor(totalSecs / 86400);
      const hours = Math.floor((totalSecs % 86400) / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);
      const seconds = totalSecs % 60;

      setTimeLeft({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 my-2">
      {timeUnits.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/40 backdrop-blur-xl border border-[#B89758]/35 shadow-sm flex items-center justify-center">
              <span className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#3D2A1D] tracking-tight">
                {unit.value}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7D5D42] mt-1.5 font-medium">
              {unit.label}
            </span>
          </div>

          {idx < timeUnits.length - 1 && (
            <div className="text-[#B89758]/60 text-lg font-serif mb-5 select-none">
              :
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
