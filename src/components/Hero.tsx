'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';

interface HeroProps {
  content?: SiteContent;
}

export default function Hero({ content }: HeroProps) {
  const { language, isRTL, t } = useLanguage();

  return (
    <section
      id="top"
      className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1440px] items-center gap-10 lg:gap-14 px-6 sm:px-10 lg:px-16 2xl:px-20 py-12 lg:py-20 lg:grid-cols-[.9fr_1.1fr]"
    >
      {/* Left Column (Text & Editorial Narrative) */}
      <div className="relative z-10 order-2 lg:order-1">
        <p className="editorial-kicker">
          {content?.hero?.welcomeBadge
            ? t(content.hero.welcomeBadge)
            : language === 'ar'
            ? 'السلام عليكم · وادي النوار'
            : 'Assalamu Alaikum · Wadi Al-Nawar'}
        </p>

        <h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-7xl lg:text-8xl">
          {content?.hero?.heading ? (
            <span className={isRTL ? 'font-arabic font-bold' : ''}>
              {t(content.hero.heading)}
              <br />
              <span className="text-primary font-normal leading-none">—</span>
            </span>
          ) : language === 'ar' ? (
            <>
              <span className="font-arabic font-bold">وادي النوار</span>
              <br />
              <span className="text-primary font-normal leading-none">—</span>
            </>
          ) : (
            <>
              The<br />
              Blossom<br />
              Valley<br />
              <span className="text-primary font-normal leading-none">—</span>
            </>
          )}
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          {content?.hero?.description
            ? t(content.hero.description)
            : language === 'ar'
            ? 'أرض سعودية، وشمس دافئة، ومنتجات نزرعها ونرعاها بكل عناية في محافظة شقراء.'
            : 'Saudi soil, generous sun, and products grown with thoughtful care in Shaqra.'}
        </p>

        <a
          href="#farm"
          className="mt-9 inline-flex items-center gap-3 border-b border-primary pb-2 text-sm font-bold text-primary hover:opacity-80 transition-opacity"
        >
          <span>
            {content?.hero?.ctaProducts
              ? t(content.hero.ctaProducts)
              : language === 'ar'
              ? 'اكتشف خيرات المزرعة'
              : 'Discover the harvest'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down"
            aria-hidden="true"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </a>
      </div>

      {/* Right Column (Offset Framed Imagery with Badge) */}
      <div className="relative order-1 lg:order-2 lg:ps-10">
        {/* Offset Editorial Outline Frame */}
        <div className="editorial-frame absolute inset-0 translate-x-4 translate-y-4 pointer-events-none" />

        {/* Primary Harvest Image */}
        <div className="relative aspect-[5/6] w-full overflow-hidden bg-paper sm:aspect-[4/3] lg:aspect-[5/6]">
          <Image
            src={content?.hero?.heroImageUrl || 'https://cdn.sanity.io/images/tokh7kkd/production/3a5f8e54412cb3e94197930d8a955cf68898fc46-1200x896.jpg'}
            alt="The Blossom Valley Harvest in Shaqra"
            fill
            priority
            quality={95}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>

        {/* Bottom Badge */}
        <p className="absolute bottom-4 end-4 bg-background px-4 py-3 text-xs font-bold text-primary shadow-xs">
          {content?.hero?.statsPill
            ? t(content.hero.statsPill)
            : language === 'ar'
            ? 'محصول رقم ٠١'
            : 'Harvest No. 01'}
        </p>
      </div>
    </section>
  );
}
