'use client';

import React from 'react';
import Image from 'next/image';

export interface BrandLogoProps {
  /**
   * 'emblem': Palm & field icon only (great for compact headers, tabs, badges)
   * 'full': Complete vertical badge matching the original sign/logo lockup
   * 'horizontal': Emblem icon side-by-side with bilingual brand typography
   */
  variant?: 'emblem' | 'full' | 'horizontal';
  /**
   * Color theme:
   * 'dark': Deep green badge / background with warm cream emblem and text (official primary)
   * 'light': Transparent background with deep green emblem and text
   * 'cream': Transparent background with cream emblem and text (for dark bars/hero)
   */
  theme?: 'dark' | 'light' | 'cream';
  /**
   * Width/size in px or Tailwind size class
   */
  size?: number | string;
  className?: string;
  showSubtitle?: boolean;
}

/**
 * Enhanced Official Logo of The Blossom Valley (وادي النوار)
 * Features the signature stylized desert date palm, agricultural furrow field,
 * flowing contour horizon arch, and official Arabic + English calligraphy lockup.
 */
export default function BrandLogo({
  variant = 'horizontal',
  theme = 'dark',
  size,
  className = '',
  showSubtitle = true,
}: BrandLogoProps) {
  // If rendering the full official badge lockup
  if (variant === 'full') {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center rounded-2xl bg-[#005A52] p-5 shadow-lg border border-[#0A6860] text-center select-none ${className}`}
        style={{ width: size || 'auto' }}
      >
        {/* Emblem SVG */}
        <EmblemIcon theme="cream" className="size-20 sm:size-24 mb-3" />

        {/* Official Arabic Calligraphy */}
        <span className="font-arabic text-2xl sm:text-3xl font-bold tracking-normal text-[#F6EDE2] drop-shadow-xs">
          وادي الـــــــــــنوار
        </span>

        {/* English Brand & Resort Title */}
        <div className="mt-2 text-center">
          <span className="block font-display text-sm sm:text-base font-bold text-[#F6EDE2] tracking-wide">
            The Blossom&apos;s valley
          </span>
          {showSubtitle && (
            <span className="block text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F6EDE2]/80 mt-0.5">
              FARM & RESORT
            </span>
          )}
        </div>
      </div>
    );
  }

  // If rendering the emblem icon only
  if (variant === 'emblem') {
    return (
      <div
        className={`relative inline-grid place-items-center select-none ${className}`}
        style={{ width: size, height: size }}
      >
        <EmblemIcon theme={theme} className="w-full h-full" />
      </div>
    );
  }

  // Variant: horizontal (Emblem + Typography Lockup)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Emblem Badge Icon */}
      <div className="shrink-0 size-9 sm:size-10 rounded-xl bg-[#005A52] p-1.5 grid place-items-center shadow-xs border border-[#0A6860]">
        <EmblemIcon theme="cream" className="w-full h-full" />
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="font-arabic font-bold text-base sm:text-lg leading-none text-current">
            وادي النوار
          </span>
          <span className="text-[10px] text-primary/70 font-display">·</span>
          <span className="font-display font-semibold text-xs sm:text-sm leading-none text-current opacity-90 hidden sm:inline">
            The Blossom&apos;s Valley
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[9px] tracking-wider uppercase text-muted-foreground font-semibold mt-0.5">
            Farm & Resort • Shaqra
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Scalable Vector SVG of the Official Palm & Furrow Field Emblem
 * Sourced directly from public/wadi_al_nawwar_mark.svg
 */
export function EmblemIcon({
  theme = 'cream',
  className = 'size-8',
}: {
  theme?: 'dark' | 'light' | 'cream' | 'current';
  className?: string;
}) {
  const fillColor =
    theme === 'cream'
      ? '#F6EDE2'
      : theme === 'light'
      ? '#005A52'
      : theme === 'current'
      ? 'currentColor'
      : '#F6EDE2';

  return (
    <svg
      viewBox="0 0 950 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Wadi Al Nawwar emblem"
    >
      <g fill={fillColor} fillRule="evenodd">
        <path d="M 155.0,223.0 L 155.0,237.0 L 175.0,237.0 L 183.0,208.0 L 197.0,178.0 L 207.0,162.0 L 216.0,151.0 L 239.0,130.0 L 257.0,117.0 L 262.0,116.0 L 278.0,106.0 L 300.0,101.0 L 311.0,96.0 L 371.0,96.0 L 399.0,103.0 L 421.0,113.0 L 441.0,125.0 L 475.0,158.0 L 484.0,171.0 L 499.0,199.0 L 508.0,229.0 L 509.0,244.0 L 524.0,294.0 L 529.0,299.0 L 534.0,311.0 L 557.0,342.0 L 581.0,364.0 L 612.0,384.0 L 626.0,390.0 L 633.0,391.0 L 639.0,395.0 L 662.0,400.0 L 694.0,404.0 L 715.0,403.0 L 758.0,395.0 L 788.0,382.0 L 813.0,366.0 L 843.0,337.0 L 861.0,313.0 L 875.0,286.0 L 886.0,250.0 L 885.0,237.0 L 866.0,236.0 L 864.0,238.0 L 862.0,253.0 L 854.0,272.0 L 853.0,279.0 L 833.0,313.0 L 805.0,342.0 L 793.0,351.0 L 787.0,353.0 L 767.0,366.0 L 730.0,378.0 L 714.0,379.0 L 671.0,378.0 L 643.0,371.0 L 618.0,360.0 L 593.0,343.0 L 577.0,329.0 L 554.0,299.0 L 547.0,286.0 L 536.0,257.0 L 535.0,244.0 L 532.0,238.0 L 530.0,222.0 L 520.0,189.0 L 506.0,162.0 L 491.0,140.0 L 460.0,110.0 L 456.0,109.0 L 450.0,103.0 L 431.0,92.0 L 400.0,79.0 L 382.0,74.0 L 356.0,71.0 L 328.0,71.0 L 303.0,74.0 L 262.0,88.0 L 252.0,93.0 L 248.0,97.0 L 241.0,99.0 L 225.0,111.0 L 200.0,134.0 L 183.0,156.0 L 171.0,177.0 L 159.0,204.0 L 158.0,215.0 Z" />
        <path d="M 286.0,186.0 L 313.0,215.0 L 313.0,217.0 L 309.0,221.0 L 298.0,221.0 L 278.0,226.0 L 266.0,235.0 L 261.0,244.0 L 263.0,247.0 L 296.0,248.0 L 303.0,252.0 L 303.0,254.0 L 294.0,262.0 L 282.0,282.0 L 280.0,290.0 L 280.0,302.0 L 282.0,309.0 L 287.0,307.0 L 334.0,261.0 L 340.0,258.0 L 340.0,266.0 L 326.0,288.0 L 326.0,298.0 L 339.0,316.0 L 341.0,323.0 L 344.0,325.0 L 348.0,324.0 L 367.0,292.0 L 354.0,271.0 L 351.0,262.0 L 345.0,257.0 L 346.0,254.0 L 351.0,255.0 L 359.0,261.0 L 399.0,301.0 L 409.0,308.0 L 409.0,279.0 L 402.0,267.0 L 388.0,254.0 L 388.0,251.0 L 393.0,248.0 L 425.0,248.0 L 430.0,247.0 L 431.0,243.0 L 427.0,237.0 L 413.0,226.0 L 395.0,221.0 L 381.0,221.0 L 379.0,219.0 L 379.0,215.0 L 391.0,204.0 L 394.0,199.0 L 398.0,197.0 L 405.0,187.0 L 404.0,185.0 L 377.0,185.0 L 367.0,190.0 L 347.0,211.0 L 341.0,208.0 L 328.0,194.0 L 316.0,185.0 L 290.0,184.0 Z" />
        <path d="M 522.0,371.0 L 520.0,367.0 L 505.0,363.0 L 397.0,360.0 L 311.0,363.0 L 291.0,367.0 L 268.0,368.0 L 224.0,377.0 L 209.0,378.0 L 200.0,382.0 L 190.0,383.0 L 158.0,392.0 L 153.0,395.0 L 152.0,419.0 L 154.0,443.0 L 157.0,449.0 L 159.0,463.0 L 166.0,476.0 L 166.0,479.0 L 168.0,481.0 L 174.0,481.0 L 213.0,462.0 L 219.0,461.0 L 258.0,443.0 L 323.0,421.0 L 332.0,420.0 L 341.0,415.0 L 346.0,415.0 L 360.0,410.0 L 367.0,410.0 L 375.0,406.0 L 386.0,405.0 L 395.0,401.0 L 410.0,399.0 L 418.0,396.0 L 433.0,395.0 L 450.0,390.0 L 464.0,390.0 L 480.0,385.0 L 502.0,384.0 L 520.0,380.0 L 522.0,377.0 Z" />
        <path d="M 516.0,415.0 L 513.0,411.0 L 487.0,413.0 L 469.0,418.0 L 450.0,419.0 L 437.0,423.0 L 424.0,424.0 L 414.0,428.0 L 403.0,429.0 L 392.0,433.0 L 380.0,434.0 L 372.0,438.0 L 365.0,438.0 L 350.0,444.0 L 327.0,449.0 L 303.0,459.0 L 296.0,460.0 L 243.0,480.0 L 229.0,488.0 L 220.0,490.0 L 194.0,504.0 L 188.0,505.0 L 185.0,513.0 L 197.0,530.0 L 219.0,552.0 L 242.0,568.0 L 247.0,569.0 L 293.0,536.0 L 302.0,532.0 L 332.0,511.0 L 345.0,506.0 L 362.0,495.0 L 373.0,491.0 L 376.0,488.0 L 413.0,470.0 L 429.0,465.0 L 457.0,452.0 L 467.0,451.0 L 486.0,443.0 L 515.0,435.0 Z" />
        <path d="M 513.0,468.0 L 502.0,469.0 L 440.0,490.0 L 384.0,516.0 L 332.0,545.0 L 318.0,556.0 L 307.0,561.0 L 282.0,579.0 L 280.0,584.0 L 283.0,587.0 L 302.0,592.0 L 354.0,594.0 L 376.0,592.0 L 383.0,589.0 L 393.0,588.0 L 420.0,577.0 L 447.0,562.0 L 460.0,552.0 L 481.0,531.0 L 501.0,503.0 L 512.0,480.0 L 514.0,473.0 Z" />
      </g>
    </svg>
  );
}
