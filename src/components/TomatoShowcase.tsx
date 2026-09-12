'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import ArabesqueDivider from './ArabesqueDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TomatoShowcaseProps {
  content: SiteContent;
}

export default function TomatoShowcase({ content }: TomatoShowcaseProps) {
  const { language, t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const tomatoes = content.tomatoesSection.items;

  return (
    <section
      id="tomatoes"
      className="py-20 sm:py-28 px-5 sm:px-8 bg-[#F5EFE6] relative"
    >
      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-child">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-[0.15em] mb-3.5 font-arabic">
            {t(content.tomatoesSection.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-[1.15]">
            {t(content.tomatoesSection.title)}
          </h2>
          <ArabesqueDivider variant="terracotta" size="md" className="my-4" />
          <p className="text-sm sm:text-base text-[#4E5E52] max-w-lg mx-auto font-arabic">
            {t(content.tomatoesSection.description)}
          </p>
        </div>

        {/* Tomato Cards Grid — Clean, Image-Forward with Crisp Rendering */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {tomatoes.map((item) => (
            <div
              key={item.id}
              className="reveal-child rounded-2xl overflow-hidden bg-white border border-[#E8DFD1] hover:border-[#C85A32] shadow-sm hover:shadow-xl group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                <Image
                  src={item.image}
                  alt={item.name.en}
                  fill
                  quality={90}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Soft gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                
                {/* Season badge */}
                {item.inSeason && (
                  <div className="absolute top-2.5 end-2.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C85A32] text-white text-[10px] font-bold shadow-sm tracking-wider">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                      </span>
                      {language === 'ar' ? 'متوفر' : 'In Season'}
                    </span>
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="p-3.5 text-center bg-white group-hover:bg-[#FAF7F2] transition-colors duration-200">
                <h3 className="text-sm sm:text-base font-bold text-[#1B3B2B] font-arabic leading-snug group-hover:text-[#C85A32] transition-colors">
                  {t(item.name)}
                </h3>
                <p className="mt-1 text-[11px] text-[#7A8A7E] font-medium font-serif-luxury italic">
                  {language === 'ar' ? item.name.en : item.name.ar}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
