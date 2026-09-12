'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import ArabesqueDivider from './ArabesqueDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface TomatoShowcaseProps {
  content: SiteContent;
}

export default function TomatoShowcase({ content }: TomatoShowcaseProps) {
  const { language, t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const tomatoes = content.tomatoesSection.items;
  const signatureTomato = tomatoes[0]; // Heirloom Crimson Pearl
  const artisanalTomatoes = tomatoes.slice(1);

  // Detect when landing on an anchor from Product Details back click
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#variety-', '');
      if (hash) {
        setHighlightedId(hash);
        const timer = setTimeout(() => setHighlightedId(null), 3500);
        return () => clearTimeout(timer);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <section
      id="tomatoes"
      className="py-24 sm:py-32 px-5 sm:px-8 bg-warm-canvas relative overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Organic ambient light accent */}
      <div className="absolute top-1/4 -start-24 w-96 h-96 rounded-full bg-[#C85A32]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -end-24 w-96 h-96 rounded-full bg-[#C5A059]/6 blur-3xl pointer-events-none" />

      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto relative z-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Asymmetric Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 reveal-child">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-[0.12em] mb-3.5 font-arabic">
              <Sparkles className="w-3.5 h-3.5" />
              {t(content.tomatoesSection.eyebrow)}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-[1.2]">
              {t(content.tomatoesSection.title)}
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-3.5">
            <p className="text-sm text-[#4E5E52] leading-relaxed font-arabic md:text-end max-w-sm">
              {t(content.tomatoesSection.description)}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B3B2B] hover:bg-[#C85A32] text-white text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 group self-start md:self-end"
            >
              <span className="font-arabic">
                {language === 'ar' ? 'عرض المزيد من المنتجات' : 'View More Products'}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. Signature Variety Feature Card (Asymmetric Spotlight)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {signatureTomato && (
          <div
            id={`variety-${signatureTomato.id}`}
            className="mb-12 sm:mb-16 reveal-child scroll-mt-24 sm:scroll-mt-28"
          >
            <Link
              href={`/products/${signatureTomato.id}`}
              className={`group block relative rounded-organic-1 bg-white border border-[#E8DFD1] hover:border-[#C85A32]/70 shadow-organic-md shadow-organic-hover overflow-hidden transition-all duration-500 ${
                highlightedId === signatureTomato.id
                  ? 'ring-4 ring-[#C5A059] ring-offset-4 ring-offset-[#FAF7F2] scale-[1.01]'
                  : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Photo Column */}
                <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src={signatureTomato.image}
                    alt={signatureTomato.name.en}
                    fill
                    quality={95}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  
                  {/* Signature Ribbon Seal */}
                  <div className="absolute top-4 start-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C85A32] text-white text-xs font-bold shadow-sm font-arabic">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {language === 'ar' ? 'درة تاج المحصول • الأكثر طلباً' : 'Signature Variety • Harvest Favorite'}
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between bg-white">
                  <div>
                    {/* Category & Botanical Name */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider font-arabic">
                        {t(signatureTomato.category)}
                      </span>
                      <span className="text-[11px] font-serif-luxury italic text-[#7A8A7E]">
                        Solanum lycopersicum
                      </span>
                    </div>

                    {/* Variety Main Titles */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B3B2B] font-arabic mb-1 group-hover:text-[#C85A32] transition-colors leading-tight">
                      {t(signatureTomato.name)}
                    </h3>
                    <p className="text-xs sm:text-sm font-serif-luxury italic text-[#7A8A7E] mb-4">
                      {language === 'ar' ? signatureTomato.name.en : signatureTomato.name.ar}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[#4E5E52] leading-relaxed font-arabic mb-6">
                      {t(signatureTomato.description)}
                    </p>

                    {/* Tasting Notes Chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {signatureTomato.tasteNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFD1] text-[#1B3B2B] text-xs font-semibold font-arabic"
                        >
                          ✦ {t(note)}
                        </span>
                      ))}
                    </div>

                    {/* Sensory Indicators */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] mb-6">
                      <div className="text-center">
                        <span className="block text-[10px] uppercase font-bold text-[#7A8A7E] font-arabic">
                          {language === 'ar' ? 'الحلاوة' : 'Sweetness'}
                        </span>
                        <span className="text-sm font-bold text-[#C85A32]">
                          {'●'.repeat(signatureTomato.sweetness)}{'○'.repeat(5 - signatureTomato.sweetness)}
                        </span>
                      </div>
                      <div className="text-center border-x border-[#E8DFD1]">
                        <span className="block text-[10px] uppercase font-bold text-[#7A8A7E] font-arabic">
                          {language === 'ar' ? 'الحموضة' : 'Acidity'}
                        </span>
                        <span className="text-sm font-bold text-[#1B3B2B]">
                          {'●'.repeat(signatureTomato.acidity)}{'○'.repeat(5 - signatureTomato.acidity)}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[10px] uppercase font-bold text-[#7A8A7E] font-arabic">
                          {language === 'ar' ? 'الأومامي' : 'Umami'}
                        </span>
                        <span className="text-sm font-bold text-[#C5A059]">
                          {'●'.repeat(signatureTomato.umami)}{'○'.repeat(5 - signatureTomato.umami)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Explore Variety Details Link Action */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#E8DFD1]">
                    <span className="text-xs text-[#5C6E61] font-arabic">
                      {language === 'ar' ? 'وصفات الطهي • نصائح الحفظ • حجز مباشر' : 'Recipes • Storage • Direct WhatsApp Reservation'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C85A32] group-hover:underline">
                      <span className="font-arabic">{language === 'ar' ? 'تفاصيل الصنف' : 'View Variety'}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. Other Rare Heirloom Varieties Grid (Staggered Organic Rhythm)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {artisanalTomatoes.map((item, index) => {
            // Alternate subtle rotation angles for organic feel
            const rotationClass = index % 2 === 0 ? 'hover:rotate-[-0.5deg]' : 'hover:rotate-[0.5deg]';
            const cornerClass = index % 2 === 0 ? 'rounded-organic-card' : 'rounded-organic-2';
            const isHighlighted = highlightedId === item.id;

            return (
              <div
                key={item.id}
                id={`variety-${item.id}`}
                className="scroll-mt-24 sm:scroll-mt-28"
              >
                <Link
                  href={`/products/${item.id}`}
                  className={`reveal-child group block bg-white border border-[#E8DFD1] hover:border-[#C85A32] shadow-organic-sm shadow-organic-hover overflow-hidden transition-all duration-500 ${cornerClass} ${rotationClass} ${
                    isHighlighted
                      ? 'ring-4 ring-[#C5A059] ring-offset-4 ring-offset-[#FAF7F2] scale-[1.02]'
                      : ''
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                    <Image
                      src={item.image}
                      alt={item.name.en}
                      fill
                      quality={90}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                    {/* Seasonal badge */}
                    <div className="absolute top-2.5 end-2.5 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 text-[#1B3B2B] text-[10px] font-bold shadow-xs border border-[#E8DFD1]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {language === 'ar' ? 'محصول اليوم' : 'Fresh Harvest'}
                      </span>
                    </div>

                    {/* Category Chip */}
                    <div className="absolute bottom-2.5 start-3 z-10">
                      <span className="text-[10px] font-bold text-white/95 bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-md font-arabic">
                        {t(item.category)}
                      </span>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1B3B2B] font-arabic leading-snug group-hover:text-[#C85A32] transition-colors mb-0.5">
                        {t(item.name)}
                      </h3>
                      <p className="text-[11px] text-[#7A8A7E] font-serif-luxury italic mb-3">
                        {language === 'ar' ? item.name.en : item.name.ar}
                      </p>

                      {/* Tasting note pill */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tasteNotes.slice(0, 2).map((note, nIdx) => (
                          <span
                            key={nIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#4E5E52] border border-[#E8DFD1]/80 font-arabic font-medium"
                          >
                            {t(note)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="pt-2 border-t border-[#E8DFD1]/60 flex items-center justify-between text-xs font-bold text-[#C85A32]">
                      <span className="font-arabic">{language === 'ar' ? 'عرض تفاصيل الصنف' : 'View Details'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Explore Full Harvest Catalogue / View More Products Banner */}
        <div className="mt-14 sm:mt-16 reveal-child">
          <div className="rounded-organic-1 bg-white border border-[#E8DFD1] shadow-organic-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 end-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="text-center md:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFD1] text-[11px] font-bold text-[#C85A32] uppercase tracking-wider mb-2 font-arabic">
                <Sparkles className="w-3 h-3" />
                {language === 'ar' ? 'المزيد من المحاصيل الإرثية' : 'Full Seasonal Produce List'}
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-[#1B3B2B] font-arabic leading-snug">
                {language === 'ar'
                  ? 'هل ترغب في استعراض القائمة الكاملة لجميع المحاصيل؟'
                  : 'Looking to explore our complete harvest catalogue?'}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-[#5C6E61] font-arabic max-w-xl">
                {language === 'ar'
                  ? 'لدينا أصناف متوارثة إضافية وخلطات موسمية خاصة ومقاييس حلاوة متعددة تناسب كبار الطهاة وعشاق المذاق الأصيل.'
                  : 'Discover additional rare heirloom varieties, tasting profiles, and custom chef crates in our complete harvest index.'}
              </p>
            </div>

            <Link
              href="/products"
              className="shrink-0 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#C85A32] hover:bg-[#B34D28] text-white font-bold text-sm sm:text-base shadow-md transition-all duration-300 hover:scale-[1.03] group"
            >
              <span className="font-arabic">
                {language === 'ar' ? 'عرض المزيد من المنتجات' : 'View More Products'}
              </span>
              <ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
