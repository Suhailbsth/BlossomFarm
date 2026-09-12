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
      className="py-24 sm:py-32 px-5 sm:px-8 bg-[#F4EFE7] relative"
    >
      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 reveal-child">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C65A3D]/10 text-[#C65A3D] text-xs font-bold uppercase tracking-[0.15em] mb-4 font-arabic">
            {t(content.tomatoesSection.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3826] font-arabic leading-[1.15]">
            {t(content.tomatoesSection.title)}
          </h2>
          <ArabesqueDivider variant="terracotta" size="md" className="my-5" />
          <p className="text-sm sm:text-base text-[#5C6E61] max-w-lg mx-auto">
            {t(content.tomatoesSection.description)}
          </p>
        </div>

        {/* Tomato Cards Grid — Clean, Image-Forward with Sheen and 3D Hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {tomatoes.map((item) => (
            <div
              key={item.id}
              className="reveal-child card-premium card-sheen rounded-3xl overflow-hidden bg-white border border-[#E5DACB] hover:border-[#C9A043] shadow-sm hover:shadow-xl group transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#F4EFE7]">
                <Image
                  src={item.image}
                  alt={item.name.en}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Soft gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                
                {/* Season badge */}
                {item.inSeason && (
                  <div className="absolute top-3 end-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C65A3D] text-white text-[10px] font-bold shadow-md tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      {language === 'ar' ? 'متوفر' : 'In Season'}
                    </span>
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="p-4 text-center bg-white group-hover:bg-[#FAF7F2] transition-colors duration-300">
                <h3 className="text-sm sm:text-base font-bold text-[#1A3826] font-arabic leading-snug group-hover:text-[#C65A3D] transition-colors">
                  {t(item.name)}
                </h3>
                <p className="mt-1 text-[11px] text-[#8A968E] font-medium font-serif-luxury italic">
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
