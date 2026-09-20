'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function MarqueeTicker() {
  const { language } = useLanguage();

  const items = [
    { ar: 'وادي النوار — محافظة شقراء', en: 'The Blossom Valley — Shaqra City' },
    { ar: 'مكنوز تمر الخلاص الفاخر من نخيلنا', en: 'Maknooz Khalas Dates From Our Own Palms' },
    { ar: 'ذبائح خرفان نعيمي بتغذية البرسيم الأخضر', en: 'Farm-Raised Naimi Sheep Fed on Green Alfalfa' },
    { ar: 'فلفل حار مجروش — من مزرعتنا إلى طبقك', en: 'Crushed Hot Pepper — From Our Farm to Your Plate' },
    { ar: 'طماطم مجففة بزيت الزيتون والبهارات الحصرية', en: 'Artisanal Dried Tomatoes in Olive Oil' },
    { ar: 'من أرضنا… إلى مائدتكم', en: 'From Our Land… To Your Table' },
  ];

  // We render the sequence twice to guarantee an unbroken infinite loop
  const sequence = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-[#122419] text-[#FAF7F2] border-y border-[#C5A059]/30 py-3.5 select-none shadow-inner">
      {/* Subtle edge fades for luxury depth */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#122419] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#122419] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center gap-6 sm:gap-10">
        {sequence.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 sm:gap-4 shrink-0 px-2 group cursor-default"
          >
            {/* Elegant Arabesque Star Motif */}
            <span className="text-[#C5A059] text-xs sm:text-sm animate-pulse transition-transform group-hover:scale-125">
              ✦
            </span>

            {/* Bilingual or Context-first Text */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-bold font-arabic tracking-wide text-white/95 group-hover:text-[#D8B878] transition-colors">
                {language === 'ar' ? item.ar : item.en}
              </span>
              <span className="text-[10px] sm:text-xs font-serif-luxury italic text-[#C5A059]/70">
                ({language === 'ar' ? item.en : item.ar})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
