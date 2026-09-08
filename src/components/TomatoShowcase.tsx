'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, TomatoVariety } from '@/types/content';
import { Sparkles, MessageCircle, Heart, Info, ArrowUpRight } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';

interface TomatoShowcaseProps {
  content: SiteContent;
}

export default function TomatoShowcase({ content }: TomatoShowcaseProps) {
  const { language, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cherry' | 'heritage' | 'plum'>('all');
  const [activeVariety, setActiveVariety] = useState<string | null>(null);

  const tomatoes = content.tomatoesSection.items;

  const renderMeter = (val: number, max: number = 5, colorClass: string) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: max }).map((_, idx) => (
          <span
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx < val ? colorClass : 'bg-[#E5DACB]/50'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="tomatoes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C65A3D]/10 text-[#C65A3D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A043]" />
            <span>{t(content.tomatoesSection.eyebrow)}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3826] font-arabic leading-tight">
            {t(content.tomatoesSection.title)}
          </h2>

          <ArabesqueDivider variant="gold" size="md" className="my-4" />

          <p className="text-base sm:text-lg text-[#5C6E61] leading-relaxed">
            {t(content.tomatoesSection.description)}
          </p>
        </div>

        {/* Product Cards Grid - Mobile First Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {tomatoes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E5DACB] hover:border-[#C9A043] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Image Area */}
              <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-[#F4EFE7]">
                <Image
                  src={item.image}
                  alt={item.name.en}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badges Over Image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-[#1A3826]/85 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                    {t(item.category)}
                  </span>

                  {item.inSeason && (
                    <span className="px-2.5 py-1 rounded-full bg-[#C65A3D] text-white text-[11px] font-bold shadow-md flex items-center gap-1 font-arabic">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      {t(content.tomatoesSection.inSeasonBadge)}
                    </span>
                  )}
                </div>

                {/* Subtle Gradient Shadow at base of photo */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Tomato Dual Name */}
                  <div className="mb-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A3826] font-arabic leading-snug">
                      {t(item.name)}
                    </h3>
                    {item.arabicSubtitle && (
                      <p className="text-xs text-[#C65A3D] font-medium font-arabic mt-0.5">
                        {item.arabicSubtitle}
                      </p>
                    )}
                    <p className="text-xs text-[#8A968E] font-medium font-serif-luxury italic mt-0.5">
                      {language === 'ar' ? item.name.en : item.name.ar}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#48564D] leading-relaxed mt-2.5 mb-4">
                    {t(item.description)}
                  </p>

                  {/* Flavor Profile Bars */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACB]/80 space-y-2 mb-4 text-xs">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#1A3826] flex items-center justify-between border-b border-[#E5DACB]/60 pb-1.5 font-arabic">
                      <span>{t(content.tomatoesSection.flavorProfileLabel)}</span>
                      <span className="text-[#C9A043]">★</span>
                    </div>

                    <div className="flex items-center justify-between text-[#5C6E61]">
                      <span className="font-medium font-arabic">{t(content.tomatoesSection.sweetnessLabel)}</span>
                      {renderMeter(item.sweetness, 5, 'bg-[#C65A3D]')}
                    </div>

                    <div className="flex items-center justify-between text-[#5C6E61]">
                      <span className="font-medium font-arabic">{t(content.tomatoesSection.acidityLabel)}</span>
                      {renderMeter(item.acidity, 5, 'bg-amber-500')}
                    </div>

                    <div className="flex items-center justify-between text-[#5C6E61]">
                      <span className="font-medium font-arabic">{t(content.tomatoesSection.umamiLabel)}</span>
                      {renderMeter(item.umami, 5, 'bg-[#1A3826]')}
                    </div>
                  </div>

                  {/* Tasting Notes Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tasteNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#F4EFE7] text-[#1A3826] text-[11px] font-semibold border border-[#E5DACB]/70"
                      >
                        {t(note)}
                      </span>
                    ))}
                  </div>

                  {/* Recommended Pairing */}
                  <div className="text-xs text-[#5C6E61] pt-3 border-t border-[#E5DACB]/50 leading-relaxed">
                    <span className="font-bold text-[#1A3826] font-arabic">
                      {t(content.tomatoesSection.pairingLabel)}:{' '}
                    </span>
                    <span>{t(item.bestPairedWith)}</span>
                  </div>
                </div>

                {/* Specific WhatsApp Order Button */}
                <div className="mt-5 pt-4 border-t border-[#E5DACB]/60">
                  <a
                    href={`https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      language === 'ar'
                        ? `مرحباً مزرعة النوار، أود الاستفسار عن توفر صنف: ${item.name.ar} (${item.name.en}) وحجز كمية طازجة.`
                        : `Hello Blossom's Farm, I would like to inquire about today's availability of ${item.name.en} (${item.name.ar}) and reserve a harvest basket.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#1A3826] text-[#1A3826] hover:text-white font-semibold text-xs sm:text-sm border border-[#E5DACB] hover:border-[#1A3826] transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover/btn:text-white transition-colors" />
                    <span>
                      {language === 'ar' ? 'طلب الصنف عبر واتساب' : 'Inquire on WhatsApp'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
