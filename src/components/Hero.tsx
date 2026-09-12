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
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#122419]/75 via-[#122419]/40 to-[#122419]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(18,36,25,0.6)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center py-24">
        {/* Greeting Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-8 animate-float-slow">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A043]" />
          <span className="font-arabic">
            {language === 'ar' ? 'السلام عليكم ورحمة الله' : 'Peace be upon you'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A043]" />
        </div>

        {/* Arabic Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-arabic text-white drop-shadow-lg leading-[1.1] tracking-tight">
          مزرعة النوار
        </h1>

        {/* English Serif Title */}
        <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-serif-luxury text-[#E5DACB] italic tracking-wide">
          The Blossom&apos;s Farm
        </h2>

        {/* Elegant Divider */}
        <ArabesqueDivider variant="gold" size="lg" className="my-6 sm:my-8 text-white/80" />

        {/* One-Line Tagline */}
        <p className="text-base sm:text-lg md:text-xl text-white/85 font-medium font-arabic max-w-xl leading-relaxed">
          {t(content.brand.tagline)}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#tomatoes"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C9A043] hover:bg-[#DFBF73] text-[#122419] font-bold text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2.5"
          >
            <span>{t(content.hero.ctaHarvest)}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={`https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              language === 'ar'
                ? content.footer.whatsAppPrefillAr
                : content.footer.whatsAppPrefillEn
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-semibold text-sm sm:text-base border border-white/25 transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{t(content.hero.ctaWhatsApp)}</span>
          </a>
        </div>

        {/* Minimal Trust */}
        <div className="mt-12 flex items-center gap-3 text-xs text-white/50 font-medium">
          <span>🇸🇦</span>
          <span>{t(content.brand.locationShort)}</span>
          <span className="w-1 h-1 rounded-full bg-[#C9A043]/60" />
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
