'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, ValuePillar } from '@/types/content';
import { Leaf, Droplet, Sun, Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';

interface AboutSectionProps {
  content: SiteContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { language, t } = useLanguage();

  const getPillarIcon = (name: ValuePillar['iconName']) => {
    switch (name) {
      case 'leaf':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'droplet':
        return <Droplet className="w-5 h-5 text-sky-600" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-[#C65A3D]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C9A043]" />;
    }
  };

  return (
    <section id="story" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] relative overflow-hidden bg-arabesque-star">
      {/* Soft Background Accents */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5DACB]/50 text-[#C65A3D] text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5" />
            <span>{t(content.about.eyebrow)}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3826] font-arabic leading-tight">
            {t(content.about.title)}
          </h2>

          <ArabesqueDivider variant="terracotta" size="md" className="my-4" />

          <p className="text-base sm:text-lg text-[#5C6E61] leading-relaxed">
            {language === 'ar'
              ? 'رحلة شغف بدأت من حب أرض نجد ورعاية بذور الطماطم النادرة بأيدي عائلة سعودية.'
              : 'A boutique farm journey rooted in love for the Arabian oasis and rare heirloom seeds.'}
          </p>
        </div>

        {/* Narrative & Supporting Farm Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">
          {/* Visual Column (Terracotta Framed Artisanal Photography) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Terracotta Offset Backdrop */}
              <div className="absolute -inset-2 sm:-inset-3 bg-[#C65A3D]/15 rounded-3xl transform -rotate-1 sm:-rotate-2 transition-transform duration-500 group-hover:rotate-0" />
              
              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E5DACB] bg-white aspect-[4/3] sm:aspect-auto sm:h-[450px]">
                <Image
                  src="/images/about-farm.jpg"
                  alt="Harvesting fresh heirloom tomatoes at The Blossom's Farm"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                
                {/* Subtle Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Bottom Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#C9A043]/40 shadow-lg text-xs sm:text-sm text-[#1A3826] font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold font-arabic">
                      {language === 'ar' ? 'قطاف يدوي يومي طازج' : 'Daily Vine-Fresh Harvest'}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#C65A3D] font-bold">
                    {language === 'ar' ? 'العمارية' : 'Al-Ammariyah'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Quote Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            {/* Artisanal Quote Callout */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-[#F4EFE7] border-s-4 border-[#C9A043] shadow-xs">
              <p className="text-lg sm:text-xl font-medium text-[#1A3826] italic leading-relaxed font-arabic">
                &ldquo;{t(content.about.quote)}&rdquo;
              </p>
              <div className="mt-3 text-xs sm:text-sm font-bold text-[#C65A3D] uppercase tracking-wider">
                — {t(content.about.quoteAuthor)}
              </div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#48564D] leading-relaxed">
              {content.about.storyParagraphs.map((para, index) => (
                <p key={index}>{t(para)}</p>
              ))}
            </div>

            {/* Quick Commitments Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-[#1A3826]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A043] shrink-0" />
                <span>{language === 'ar' ? 'بذور متوارثة غير معدلة وراثياً' : 'Non-GMO Heritage Seeds'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A043] shrink-0" />
                <span>{language === 'ar' ? 'مياه آبار جوفية عذبة مفحوصة' : 'Mineral-Rich Oasis Well Water'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A043] shrink-0" />
                <span>{language === 'ar' ? 'تسميد حيوي عضوي محلي' : 'Native Probiotic Date Compost'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A043] shrink-0" />
                <span>{language === 'ar' ? 'منافذ بيع مباشرة بدون وسطاء' : 'Direct Farm Gate Exclusivity'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Value Pillars Cards */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A3826] font-arabic">
              {t(content.about.pillarsTitle)}
            </h3>
            <ArabesqueDivider variant="gold" size="sm" className="my-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.about.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-6 rounded-2xl bg-white border border-[#E5DACB] hover:border-[#C9A043] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E5DACB] flex items-center justify-center mb-4 transition-colors group-hover:bg-[#1A3826] group-hover:border-[#1A3826]">
                    <div className="group-hover:text-white transition-colors">
                      {getPillarIcon(pillar.iconName)}
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[#1A3826] mb-2 font-arabic">
                    {t(pillar.title)}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed">
                    {t(pillar.description)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DACB]/50 flex items-center justify-between text-[11px] font-bold text-[#C65A3D]">
                  <span>{t(pillar.highlight)}</span>
                  <span className="text-[#C9A043]">✦</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className="rounded-3xl bg-[#1A3826] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Subtle Arabesque Background overlay in dark card */}
          <div className="absolute inset-0 bg-arabesque-oasis opacity-10 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#2E5840]">
            {content.about.stats.map((stat, i) => (
              <div key={i} className={`${i > 0 ? 'pt-4 sm:pt-0' : ''}`}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#C9A043] font-serif-luxury tracking-tight">
                  {stat.value}{stat.suffix}
                </div>
                <div className="mt-1 text-sm sm:text-base font-bold font-arabic text-[#FAF7F2]">
                  {t(stat.label)}
                </div>
                <div className="text-[11px] sm:text-xs text-[#E5DACB]/70 font-medium">
                  {t(stat.sublabel)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
