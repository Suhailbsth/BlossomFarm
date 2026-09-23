'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import Reveal from './Reveal';

interface StorageTipsProps {
  content?: SiteContent;
}

export default function StorageTips({ content }: StorageTipsProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const dynamicItems = content?.storagePracticeSection?.items;
  const tips = (dynamicItems || []).map((item, idx) => {
    const arNums = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦', '٠٧', '٠٨', '٠٩', '١٠'];
    const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
    const numAr = arNums[idx] || `${idx + 1}`;
    return {
      num: isAr ? numAr : numStr,
      title: t(item.title),
      desc: t(item.description),
    };
  });

  if (tips.length === 0) return null;

  return (
    <section id="storage" className="scroll-mt-24 bg-dark-band px-6 sm:px-10 lg:px-16 2xl:px-20 py-16 sm:py-24 text-white">
      <Reveal className="mx-auto max-w-[1440px]">
        <p className="editorial-kicker text-emerald-400">
          {content?.storagePracticeSection?.eyebrow
            ? t(content.storagePracticeSection.eyebrow)
            : isAr
            ? 'ملاحظات الحقل · ٠٣'
            : 'Field notes · 03'}
        </p>

        <h2 className="editorial-title max-w-2xl text-white">
          {content?.storagePracticeSection?.title
            ? t(content.storagePracticeSection.title)
            : isAr
            ? 'لأفضل استخدام للطماطم المجففة 🍅'
            : 'Keep the goodness longer'}
        </h2>

        {/* Numbered Storage List matching reference layout */}
        <div className="mt-10 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, idx) => (
            <article
              key={tip.num}
              className={`border-b border-white/15 py-8 sm:px-8 sm:first:ps-0 ${
                (idx + 1) % 3 !== 0 ? 'lg:border-e lg:border-white/15' : ''
              } ${(idx + 1) % 2 !== 0 ? 'sm:border-e sm:border-white/15 lg:border-e-0' : ''}`}
            >
              <span className="block font-display text-4xl sm:text-5xl font-bold text-emerald-400 leading-none tabular-nums">{tip.num}</span>
              <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold text-white leading-snug">
                {tip.title}
              </h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                {tip.desc}
              </p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
