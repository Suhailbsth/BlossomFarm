'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { Sprout, Menu, X, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface HeaderProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

export default function Header({ content, whatsAppNumber }: HeaderProps) {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  // Close mobile menu on escape key or resize
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

  const navLinks = [
    { href: '#farm', labelAr: 'عن المزرعة', labelEn: 'Our farm' },
    { href: '#varieties', labelAr: 'المنتجات', labelEn: 'Products' },
    { href: '#storage', labelAr: 'إرشادات الحفظ', labelEn: 'Storage' },
    { href: '#recipes', labelAr: 'طرق الاستخدام', labelEn: 'Recipes' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Brand Logo Link */}
        <Link
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-semibold text-primary sm:text-xl shrink-0"
        >
          <Sprout size={18} strokeWidth={1.75} className="shrink-0 text-primary" />
          <span className={isRTL ? 'font-arabic font-bold' : 'font-display'}>
            {isRTL ? 'وادي النوار' : 'The Blossom Valley'}
          </span>
        </Link>

        {/* Desktop Navigation Links (>= md) */}
        <nav className="hidden items-center gap-7 text-xs font-semibold md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary py-2 text-foreground/85 hover:text-primary"
            >
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Right Controls: Language Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="rounded-full border border-foreground bg-transparent px-3.5 py-1.5 text-xs font-semibold shadow-none transition-colors hover:bg-muted cursor-pointer min-h-[36px] flex items-center justify-center"
          >
            {isRTL ? 'EN' : 'عربي'}
          </button>

          {/* Mobile Menu Hamburger Button (< md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden grid size-9 place-items-center rounded-full border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-xl px-5 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between py-3.5 px-3 rounded-lg text-sm font-semibold text-ink hover:bg-paper/70 transition-colors"
              >
                <span>{isAr ? link.labelAr : link.labelEn}</span>
                <span className="text-xs text-primary font-bold">→</span>
              </a>
            ))}
          </nav>

          {/* Mobile WhatsApp Quick Action */}
          <div className="mt-5 pt-4 border-t border-border">
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
              className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-harvest-gold text-ink text-xs font-bold shadow-xs hover:bg-harvest-gold/90 transition-transform active:scale-[0.98]"
            >
              <MessageCircle size={16} className="fill-current" />
              <span>{isAr ? 'طلب واستفسار عبر واتساب' : 'Order via WhatsApp'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
