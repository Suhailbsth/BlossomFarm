'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, StorageTip } from '@/types/content';
import { Thermometer, Snowflake, Clock, Droplets, Hand, Sun } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface StorageTipsProps {
  content: SiteContent;
}

export default function StorageTips({ content }: StorageTipsProps) {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const getIcon = (name: StorageTip['iconName']) => {
    const cls = 'w-6 h-6';
    switch (name) {
      case 'thermometer':
        return <Thermometer className={`${cls} text-[#C65A3D]`} />;
      case 'snowflake':
        return <Snowflake className={`${cls} text-sky-500`} />;
      case 'clock':
        return <Clock className={`${cls} text-[#C9A043]`} />;
      case 'droplets':
        return <Droplets className={`${cls} text-emerald-600`} />;
      case 'hand':
        return <Hand className={`${cls} text-[#C65A3D]`} />;
      case 'sun':
        return <Sun className={`${cls} text-amber-500`} />;
    }
  };

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8 bg-[#FAF7F2] relative">
      <div
        ref={sectionRef}
        className={`max-w-4xl mx-auto relative z-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14 reveal-child">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B3B2B]/8 text-[#1B3B2B] text-xs font-bold uppercase tracking-[0.15em] mb-3.5 font-arabic">
            {t(content.storageTipsSection.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-[1.15]">
            {t(content.storageTipsSection.title)}
          </h2>
          <ArabesqueDivider variant="green" size="md" className="my-4" />
        </div>

        {/* Streamlined 3-Tip Essentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {content.storageTipsSection.items.slice(0, 3).map((tip) => (
            <div
              key={tip.id}
              className="reveal-child p-6 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#C85A32] shadow-sm text-center flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon Circle */}
              <div className="w-13 h-13 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center">
                {getIcon(tip.iconName)}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#1B3B2B] font-arabic leading-snug">
                {t(tip.title)}
              </h3>

              {/* Tip Description */}
              <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed font-arabic">
                {t(tip.tip)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
