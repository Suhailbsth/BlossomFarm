'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { MessageCircle, ArrowDown } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';

interface HeroProps {
  content: SiteContent;
}

export default function Hero({ content }: HeroProps) {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-5 sm:px-8 overflow-hidden">
      {/* Full-Bleed Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-garden.jpg"
          alt="The Blossom's Farm Greenhouse Garden"
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Crisp, clean ambient contrast overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_center,rgba(0,0,0,0.35)_0%,transparent_80%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center py-24">
        {/* Greeting Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs sm:text-sm font-medium mb-7 shadow-lg backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="font-arabic">
            {language === 'ar' ? 'السلام عليكم ورحمة الله' : 'Peace be upon you'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        </div>

        {/* Cohesive Bilingual Brand Lockup */}
        {language === 'en' ? (
          <div className="flex flex-col items-center">
            {/* Arabic Heritage Badge */}
            <span className="text-lg sm:text-2xl font-bold font-arabic text-[#D8B878] tracking-wider mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              مزرعة النوار
            </span>
            {/* Main English Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.1] tracking-tight">
              The Blossom&apos;s Farm
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Main Arabic Title */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-arabic text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.1] tracking-tight">
              مزرعة النوار
            </h1>
            {/* Refined English Boutique Subtitle */}
            <div className="mt-3 flex items-center gap-3 text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold text-[#D8B878] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <span className="w-6 h-[1px] bg-[#D8B878]/60" />
              <span>The Blossom&apos;s Farm</span>
              <span className="w-6 h-[1px] bg-[#D8B878]/60" />
            </div>
          </div>
        )}

        {/* Elegant Divider */}
        <ArabesqueDivider variant="gold" size="lg" className="my-5 sm:my-7 text-[#C5A059] drop-shadow-md" />

        {/* One-Line Tagline in High-Contrast Boutique Pill */}
        <div className="px-6 py-2.5 rounded-full bg-black/45 border border-white/20 shadow-xl max-w-xl mx-auto backdrop-blur-sm">
          <p className="text-sm sm:text-base md:text-lg text-white font-medium font-arabic leading-relaxed drop-shadow-sm">
            {t(content.brand.tagline)}
          </p>
        </div>

        {/* Cohesive CTAs matching website colors */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary Action — Ripe Terracotta */}
          <a
            href="#tomatoes"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C85A32] hover:bg-[#B24E2A] text-white font-bold text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2.5 border border-[#C85A32]/60"
          >
            <span>{t(content.hero.ctaHarvest)}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          {/* Secondary Action — WhatsApp in Brand Botanical Emerald */}
          <a
            href={`https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              language === 'ar'
                ? content.footer.whatsAppPrefillAr
                : content.footer.whatsAppPrefillEn
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1E5E3A] hover:bg-[#174C2E] text-white font-bold text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2.5 border border-emerald-400/30"
          >
            <MessageCircle className="w-5 h-5 fill-current text-emerald-300" />
            <span className="font-arabic">{t(content.hero.ctaWhatsApp)}</span>
          </a>
        </div>

        {/* Minimal Trust Badge Pill */}
        <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/45 border border-white/20 text-xs text-white/95 font-medium shadow-md backdrop-blur-sm">
          <span>🇸🇦</span>
          <span>{t(content.brand.locationShort)}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span>{language === 'ar' ? 'عضوي ١٠٠٪' : '100% Organic'}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float-slow">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 rounded-full bg-[#C9A043] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
