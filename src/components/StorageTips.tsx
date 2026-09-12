'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, StorageTip } from '@/types/content';
import { Thermometer, Snowflake, Clock, Droplets, Hand, Sun, Sparkles } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface StorageTipsProps {
  content: SiteContent;
}

export default function StorageTips({ content }: StorageTipsProps) {
  const { language, t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const getIcon = (name: StorageTip['iconName']) => {
    const cls = 'w-5 h-5';
    switch (name) {
      case 'thermometer':
        return <Thermometer className={`${cls} text-[#C85A32]`} />;
      case 'snowflake':
        return <Snowflake className={`${cls} text-sky-600`} />;
      case 'clock':
        return <Clock className={`${cls} text-[#C5A059]`} />;
      case 'droplets':
        return <Droplets className={`${cls} text-emerald-600`} />;
      case 'hand':
        return <Hand className={`${cls} text-[#C85A32]`} />;
      case 'sun':
        return <Sun className={`${cls} text-amber-500`} />;
    }
  };

  const arabicNumerals = ['٠١', '٠٢', '٠٣'];
  const latinNumerals = ['01', '02', '03'];

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8 bg-[#FAF7F2] relative overflow-hidden">
      <div
        ref={sectionRef}
        className={`max-w-5xl mx-auto relative z-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 reveal-child">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1B3B2B]/8 text-[#1B3B2B] text-xs font-bold uppercase tracking-[0.12em] mb-3.5 font-arabic">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            {t(content.storageTipsSection.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-[1.2]">
            {t(content.storageTipsSection.title)}
          </h2>
          <ArabesqueDivider variant="green" size="md" className="my-4" />
        </div>

        {/* Artisanal 3-Pillar Care Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {content.storageTipsSection.items.slice(0, 3).map((tip, idx) => (
            <div
              key={tip.id}
              className="reveal-child relative p-6 sm:p-7 rounded-organic-card bg-white border border-[#E8DFD1] hover:border-[#C85A32] shadow-organic-sm shadow-organic-hover flex flex-col justify-between overflow-hidden"
            >
              {/* Decorative Subtle Background Numeral */}
              <span className="absolute top-2 end-4 text-5xl font-serif-luxury font-extrabold text-[#C5A059]/15 select-none pointer-events-none">
                {language === 'ar' ? arabicNumerals[idx] : latinNumerals[idx]}
              </span>

              <div>
                {/* Icon Container with subtle organic border */}
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center mb-5">
                  {getIcon(tip.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#1B3B2B] font-arabic leading-snug mb-2">
                  {t(tip.title)}
                </h3>

                {/* Tip Body */}
                <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed font-arabic">
                  {t(tip.tip)}
                </p>
              </div>

              {/* Bottom Subtle Accent Line */}
              <div className="mt-5 pt-3 border-t border-[#E8DFD1]/50 flex items-center justify-between text-[10px] text-[#7A8A7E] font-arabic">
                <span>{language === 'ar' ? 'وصية الحقل' : 'Farm Guidance'}</span>
                <span className="text-[#C5A059]">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
