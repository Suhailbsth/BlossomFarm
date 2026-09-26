'use client';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { MessageCircle, MapPin } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { EmblemIcon } from './BrandLogo';

interface FooterProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

// Custom crisp SVGs for all social platforms
function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p === 'instagram') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }
  if (p === 'youtube') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (p === 'x' || p === 'twitter') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (p === 'tiktok') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.95-4.5V8.62a8.28 8.28 0 0 0 4.82 1.54V6.69z" />
      </svg>
    );
  }
  if (p === 'snapchat') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.003 2c-3.593 0-5.834 2.766-5.834 5.378 0 1.344.542 2.37 1.096 3.16.126.18.204.385.144.577-.076.242-.375.408-.85.492-.472.083-1.46.287-1.892.834-.33.418-.266.924-.13 1.25.325.782 1.405 1.066 2.067 1.2.342.07.502.268.498.487-.01.53-.787 1.638-2.31 1.777-.525.048-.795.344-.81.603-.027.464.492.765.864.93.948.423 2.188.46 3.324.238.653-.127 1.15-.028 1.488.156.495.27 1.08.798 2.355.798 1.272 0 1.865-.528 2.36-.798.337-.184.834-.283 1.487-.156 1.136.222 2.376.185 3.324-.238.372-.165.89-.466.864-.93-.015-.26-.285-.555-.81-.603-1.523-.14-2.3-1.247-2.31-1.777-.004-.22.156-.417.498-.487.662-.134 1.742-.418 2.067-1.2.136-.326.2-.832-.13-1.25-.432-.547-1.42-.75-1.892-.834-.475-.084-.774-.25-.85-.492-.06-.192.018-.397.144-.577.554-.79 1.096-1.816 1.096-3.16C17.837 4.766 15.596 2 12.003 2z" />
      </svg>
    );
  }
  return <MessageCircle size={18} />;
}

export default function Footer({ content, whatsAppNumber }: FooterProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const defaultMsg =
    content?.footer?.whatsAppPrefillAr && isAr
      ? content.footer.whatsAppPrefillAr
      : content?.footer?.whatsAppPrefillEn && !isAr
        ? content.footer.whatsAppPrefillEn
        : isAr
          ? 'مرحباً وادي النوار! أود الاستفسار عن حجز وطلب منتجات المزرعة.'
          : 'Hello The Blossom Valley! I would like to inquire about ordering your farm harvest products.';

  const activeNumber = whatsAppNumber || content?.footer?.whatsAppNumber;
  const whatsAppLink = buildWhatsAppLink(defaultMsg, activeNumber);

  const closingTagline = content?.footer?.closingTagline
    ? t(content.footer.closingTagline)
    : isAr
      ? 'وادي النوار – بلوسوم فالي / من أرضنا… إلى مائدتكم'
      : 'The Blossom Valley — From our land… to your table.';

  const locationText = content?.footer?.locationAddress
    ? t(content.footer.locationAddress)
    : "";

  const copyrightText = content?.footer?.copyrightText
    ? t(content.footer.copyrightText)
    : isAr
      ? 'جميع الحقوق محفوظة © 2026 مزارع وادي النوار'
      : 'All rights reserved © 2026 The Blossom Valley Farms';

  const socialLinks = content?.footer?.socialLinks || [];

  return (
    <footer id="site-footer" className="bg-footer-bg px-6 sm:px-10 lg:px-16 2xl:px-20 pt-16 pb-10 text-white border-t border-white/10">
      {/* Main Footer Grid: Brand + Nav + CTA */}
      <div className="mx-auto grid max-w-[1440px] gap-12 sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_auto] lg:items-start">
        {/* Left: Brand Emblem Badge + Brand Name & Closing Tagline */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-2xl bg-[#005A52] p-2 grid place-items-center shadow-md border border-[#0A6860] shrink-0">
              <EmblemIcon theme="cream" className="w-full h-full" />
            </div>
            <div>
              <p className="font-arabic text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                {content?.brand?.name ? t(content.brand.name) : (isAr ? 'وادي النوار' : 'The Blossom Valley')}
              </p>
              <p className="font-display text-xs font-semibold text-[#F8EBDB]/80 tracking-wide mt-1">
                The Blossom&apos;s valley • Farm &amp; Resort
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/75 leading-relaxed">
            {closingTagline}
          </p>

          {/* Location / Google Maps */}
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <MapPin size={13} className="text-primary shrink-0" />
            {content?.footer?.googleMapsUrl ? (
              <a
                href={content.footer.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors underline-offset-2 hover:underline"
              >
                {locationText}
              </a>
            ) : (
              <span>{locationText}</span>
            )}
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.platform}
                  className="size-11 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <SocialIcon platform={item.platform} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Center: Quick Navigation */}
        <nav className="hidden lg:flex flex-col gap-2.5 text-xs font-medium text-white/60">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">
            {isAr ? 'روابط سريعة' : 'Quick links'}
          </p>
          {[
            { href: '#livestock', ar: 'خرفان النعيمي', en: 'Naimi Sheep' },
            { href: '#farm', ar: 'عن المزرعة', en: 'Our Farm' },
            { href: '#varieties', ar: 'المنتجات', en: 'Products' },
            { href: '#storage', ar: 'إرشادات الحفظ', en: 'Storage Tips' },
            { href: '#recipes', ar: 'الوصفات', en: 'Recipes' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-emerald-400 transition-colors"
            >
              {isAr ? link.ar : link.en}
            </a>
          ))}
        </nav>

        {/* Right: WhatsApp CTA */}
        <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noreferrer"
            className="btn-primary h-12 px-6 font-bold shrink-0 text-sm"
          >
            <MessageCircle size={18} />
            <span>{isAr ? 'تواصل معنا' : 'Chat with us'}</span>
            <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Commercial License */}
      <div className="mx-auto max-w-[1440px] mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <p>{copyrightText}</p>
        {content?.footer?.commercialRegistration && (
          <p className="font-mono">
            {isAr
              ? `سجل تجاري: ${content.footer.commercialRegistration}`
              : `CR: ${content.footer.commercialRegistration}`}
          </p>
        )}
      </div>
    </footer>
  );
}
