'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function MarqueeTicker() {
  const { language } = useLanguage();

  const items = [
    { ar: 'طازج يومياً من بيوتنا المحمية', en: 'Fresh Daily From Our Greenhouses' },
    { ar: 'وادي النوار — العمارية، الرياض', en: 'Wadi Nawar — Al-Ammariyah, Riyadh' },
    { ar: 'قطاف الصباح الباكر', en: 'Harvested at Dawn' },
    { ar: 'عضوي ١٠٠٪ ومروي بمياه عذبة نقية', en: '100% Organic & Pure Well Water' },
    { ar: 'أصناف طماطم إرثية فاخرة', en: 'Artisanal Heirloom Varieties' },
    { ar: 'طبيعة مستدامة وجودة استثنائية', en: 'Sustainable Farming & Peak Flavor' },
  ];

  // We render the sequence twice to guarantee an unbroken infinite loop
  const sequence = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-[#122419] text-[#FAF7F2] border-y border-[#C9A043]/30 py-3.5 select-none shadow-inner">
      {/* Subtle edge fades for luxury depth */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#122419] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#122419] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center gap-6 sm:gap-10">
        {sequence.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 sm:gap-4 shrink-0 px-2 group cursor-default"
          >
            {/* Elegant Arabesque Diamond / Star Motif */}
            <span className="text-[#C9A043] text-xs sm:text-sm animate-pulse transition-transform group-hover:scale-125">
              ✦
            </span>

            {/* Bilingual or Context-first Text */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-bold font-arabic tracking-wide text-white/95 group-hover:text-[#C9A043] transition-colors">
                {language === 'ar' ? item.ar : item.en}
              </span>
              <span className="text-[10px] sm:text-xs font-serif-luxury italic text-[#C9A043]/70">
                ({language === 'ar' ? item.en : item.ar})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
