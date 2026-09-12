'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { MessageCircle } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FooterProps {
  content: SiteContent;
}

export default function Footer({ content }: FooterProps) {
  const { language, t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const whatsAppLink = `https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    language === 'ar' ? content.footer.whatsAppPrefillAr : content.footer.whatsAppPrefillEn
  )}`;

  return (
    <footer className="bg-[#122419] text-[#FAF7F2] relative overflow-hidden">
      {/* Arabesque pattern */}
      <div className="absolute inset-0 bg-arabesque-oasis opacity-8 pointer-events-none" />

      <div
        ref={sectionRef}
        className={`relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Brand Emblem */}
        <div className="reveal-child mb-6">
          <div className="w-16 h-16 rounded-full bg-[#1A3826] border-2 border-[#C9A043]/50 mx-auto flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-[#C9A043]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 14 6 14 9C14 10.5 13 12 12 12C11 12 10 10.5 10 9C10 6 12 2 12 2Z" />
              <path d="M12 22C12 22 10 18 10 15C10 13.5 11 12 12 12C13 12 14 13.5 14 15C14 18 12 22 12 22Z" />
              <path d="M2 12C2 12 6 10 9 10C10.5 10 12 11 12 12C12 13 10.5 14 9 14C6 14 2 12 2 12Z" />
              <path d="M22 12C22 12 18 14 15 14C13.5 14 12 13 12 12C12 11 13.5 10 15 10C18 10 22 12 22 12Z" />
              <circle cx="12" cy="12" r="2.5" className="fill-[#C9A043]" />
            </svg>
          </div>

          {/* Bilingual Name */}
          <h3 className="text-3xl sm:text-4xl font-extrabold font-arabic text-white">
            مزرعة النوار
          </h3>
          <p className="mt-2 text-base sm:text-lg font-serif-luxury text-[#E5DACB] italic tracking-wide">
            The Blossom&apos;s Farm
          </p>
        </div>

        <ArabesqueDivider variant="gold" size="md" className="my-6 reveal-child" />

        {/* One-line prompt */}
        <p className="text-sm sm:text-base text-[#E5DACB]/80 font-arabic mb-8 reveal-child">
          {t(content.footer.tagline)}
        </p>

        {/* WhatsApp CTA in Brand Botanical Emerald */}
        <div className="reveal-child mb-12">
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-3.5 rounded-full bg-[#1E5E3A] hover:bg-[#174C2E] text-white font-bold text-base sm:text-lg shadow-xl transition-all duration-300 hover:scale-[1.02] border border-emerald-400/30"
          >
            <MessageCircle className="w-5 h-5 fill-current text-emerald-300" />
            <span className="font-arabic">{t(content.footer.whatsAppBtn)}</span>
          </a>
        </div>

        {/* Minimal Bottom */}
        <div className="reveal-child pt-8 border-t border-white/10 text-xs text-[#8A9B8F] font-arabic">
          <p>{t(content.footer.rights)}</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span>🇸🇦</span>
            <span>{t(content.brand.locationShort)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
