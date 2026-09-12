'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { Globe, Menu, X, MessageCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  content: SiteContent;
}

export default function Header({ content }: HeaderProps) {
  const { language, setLanguage, toggleLanguage, isRTL, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#story', label: content.navigation.story },
    { href: '/products', label: { en: 'All Harvest', ar: 'جميع المحاصيل' } },
    { href: '/#tomatoes', label: content.navigation.tomatoes },
    { href: '/#videos', label: content.navigation.videos },
    { href: '/#visit', label: content.navigation.visit },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm border-b border-[#E5DACB]/60 py-3'
          : 'bg-gradient-to-b from-[#122419]/70 via-[#122419]/30 to-transparent py-4 sm:py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Emblem & Dual Typography */}
        <a
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="The Blossom's Farm - مزرعة النوار"
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${
              scrolled
                ? 'bg-[#1B3B2B] text-[#C5A059] border-[#C5A059]/40'
                : 'bg-[#FAF7F2]/20 backdrop-blur-md text-[#F4EFE7] border-white/30'
            }`}
          >
            {/* Elegant Floral Motif Emblem */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C12 2 14 6 14 9C14 10.5 13 12 12 12C11 12 10 10.5 10 9C10 6 12 2 12 2Z" />
              <path d="M12 22C12 22 10 18 10 15C10 13.5 11 12 12 12C13 12 14 13.5 14 15C14 18 12 22 12 22Z" />
              <path d="M2 12C2 12 6 10 9 10C10.5 10 12 11 12 12C12 13 10.5 14 9 14C6 14 2 12 2 12Z" />
              <path d="M22 12C22 12 18 14 15 14C13.5 14 12 13 12 12C12 11 13.5 10 15 10C18 10 22 12 22 12Z" />
              <circle cx="12" cy="12" r="2.5" className="fill-[#C5A059]" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span
              className={`text-base sm:text-lg font-bold tracking-tight font-arabic leading-tight ${
                scrolled ? 'text-[#1B3B2B]' : 'text-white drop-shadow-sm'
              }`}
            >
              مزرعة النوار
            </span>
            <span
              className={`text-[10px] sm:text-xs tracking-wider uppercase font-medium ${
                scrolled ? 'text-[#C85A32]' : 'text-[#E8DFD1]'
              }`}
            >
              The Blossom&apos;s Farm
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#C85A32] ${
                scrolled ? 'text-[#2D3B31]' : 'text-white/90 hover:text-white'
              }`}
            >
              {t(link.label)}
            </a>
          ))}
        </nav>

        {/* Right Actions: Language Switcher & WhatsApp CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <div
            className={`flex items-center p-1 rounded-full border text-xs font-semibold transition-all ${
              scrolled
                ? 'bg-[#F5EFE6] border-[#E8DFD1] text-[#1B3B2B]'
                : 'bg-black/30 backdrop-blur-md border-white/20 text-white'
            }`}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-[#1B3B2B] text-white shadow-xs'
                  : 'hover:text-[#C85A32]'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded-full transition-all font-arabic ${
                language === 'ar'
                  ? 'bg-[#1B3B2B] text-white shadow-xs'
                  : 'hover:text-[#C85A32]'
              }`}
              aria-label="التبديل إلى العربية"
            >
              العربية
            </button>
          </div>

          {/* Quick WhatsApp Link Button (Desktop & Mobile) */}
          <a
            href={`https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              language === 'ar'
                ? content.footer.whatsAppPrefillAr
                : content.footer.whatsAppPrefillEn
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-102 ${
              scrolled
                ? 'bg-[#1E5E3A] text-white border-emerald-500/30 hover:bg-[#174C2E]'
                : 'bg-[#1E5E3A]/90 hover:bg-[#1E5E3A] text-white border-emerald-400/40'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t(content.navigation.contact)}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-[#1B3B2B] hover:bg-black/5' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DFD1] px-4 pt-3 pb-6 shadow-xl text-[#1B3B2B] animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-base font-semibold hover:bg-[#F5EFE6] transition-colors border-b border-[#E8DFD1]/40 last:border-b-0"
              >
                {t(link.label)}
              </a>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#5C6E61] font-medium">
                {language === 'ar' ? 'اللغة' : 'Language'}
              </span>
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-xs font-bold text-[#1B3B2B] bg-[#E8DFD1]/60 px-3 py-1.5 rounded-full"
              >
                <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
                {language === 'ar' ? 'English (EN)' : 'العربية (AR)'}
              </button>
            </div>

            <a
              href={`https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                language === 'ar'
                  ? content.footer.whatsAppPrefillAr
                  : content.footer.whatsAppPrefillEn
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-3 bg-[#1E5E3A] hover:bg-[#174C2E] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md border border-emerald-400/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              {t(content.hero.ctaWhatsApp)}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
