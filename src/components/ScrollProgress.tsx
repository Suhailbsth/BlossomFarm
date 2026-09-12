'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { isRTL } = useLanguage();

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const scrolled = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setProgress(scrolled);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#C9A043] via-[#E2B755] to-[#C65A3D] transition-[width] duration-75 ease-out shadow-[0_0_10px_rgba(201,160,67,0.65)]"
        style={{
          width: `${progress}%`,
          marginLeft: isRTL ? 'auto' : undefined,
          marginRight: isRTL ? undefined : 'auto',
        }}
      />
    </div>
  );
}
