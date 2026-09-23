'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { Sprout, Menu, X, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { EmblemIcon } from './BrandLogo';

interface HeaderProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

export default function Header({ content, whatsAppNumber }: HeaderProps) {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  // Close mobile menu on escape key, resize, and handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#livestock', labelAr: 'مواشي النعيمي', labelEn: 'Naimi Sheep' },
    { href: '#farm', labelAr: 'عن المزرعة', labelEn: 'Our farm' },
    { href: '#varieties', labelAr: 'المنتجات', labelEn: 'Products' },
    { href: '#storage', labelAr: 'إرشادات الحفظ', labelEn: 'Storage' },
    { href: '#recipes', labelAr: 'طرق الاستخدام', labelEn: 'Recipes' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-16 2xl:px-20 gap-3">
        {/* Brand Logo Link with Official Emblem */}
        <Link
          href="#top"
          className="flex items-center gap-2 sm:gap-2.5 min-w-0 group hover:opacity-90 transition-opacity"
          aria-label={isAr ? 'وادي النوار - الصفحة الرئيسية' : "The Blossom's Valley Home"}
        >
          <div className="shrink-0 size-8 sm:size-10 rounded-xl bg-[#005A52] p-1 sm:p-1.5 grid place-items-center shadow-xs border border-[#0A6860]">
            <EmblemIcon theme="cream" className="w-full h-full" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-arabic font-bold text-sm sm:text-base lg:text-lg leading-tight text-primary truncate">
              {isRTL ? 'وادي النوار' : "The Blossom's Valley"}
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-wider uppercase text-muted-foreground font-semibold truncate">
              {isAr ? 'مزرعة ومنتجع · شقراء' : 'Farm & Resort · Shaqra'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (>= md) */}
        <nav className="hidden items-center gap-4 lg:gap-7 text-xs font-semibold md:flex">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-all py-1.5 hover:text-primary ${idx === 0
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-foreground/80 hover:text-primary'
                }`}
            >
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Right Controls: Language Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="rounded-full border border-foreground/80 bg-transparent px-3 sm:px-4 py-1.5 text-xs font-semibold shadow-none transition-colors hover:bg-muted cursor-pointer min-h-[38px] sm:min-h-[44px] min-w-[38px] sm:min-w-[44px] flex items-center justify-center"
          >
            {isRTL ? 'EN' : 'عربي'}
          </button>

          {/* Mobile Menu Hamburger Button (< md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden grid size-10 sm:size-11 place-items-center rounded-full border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-xl px-4 sm:px-5 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between py-3.5 px-3 rounded-lg text-sm font-semibold text-ink hover:bg-paper/70 transition-colors"
              >
                <span>{isAr ? link.labelAr : link.labelEn}</span>
                <span className="text-xs text-primary font-bold transition-transform rtl:rotate-180">→</span>
              </a>
            ))}
          </nav>

          {/* Mobile WhatsApp Quick Action */}
          <div className="mt-5 pt-4 border-t border-border/50">
            <a
              href={buildWhatsAppLink(
                isAr
                  ? 'السلام عليكم وادي النوار، أود الاستفسار عن حجز وطلب المنتجات.'
                  : 'Hello The Blossom Valley, I would like to inquire about ordering farm harvest products.',
                whatsAppNumber || content?.footer?.whatsAppNumber
              )}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="btn-primary w-full h-11 text-xs"
            >
              <MessageCircle size={16} />
              <span>{isAr ? 'طلب واستفسار عبر واتساب' : 'Order via WhatsApp'}</span>
              <span className="text-xs transition-transform rtl:rotate-180">→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
