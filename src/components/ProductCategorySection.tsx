'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, DynamicCategoryItem, ProductItem } from '@/types/content';
import Reveal from './Reveal';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface ProductCategorySectionProps {
  content?: SiteContent;
}

export default function ProductCategorySection({ content }: ProductCategorySectionProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  // Helper to extract display products for a category (respecting isFeaturedOnHome toggle)
  const getCategoryProducts = (cat: DynamicCategoryItem): ProductItem[] => {
    const prodsMap = new Map<string, ProductItem>();
    (cat.featuredProducts || []).forEach((p) => prodsMap.set(p.id, p));
    (cat.allCategoryProducts || []).forEach((p) => prodsMap.set(p.id, p));
    const list = Array.from(prodsMap.values());
    return list.filter((p) => p.isFeaturedOnHome !== false);
  };

  const dynamicCategories = content?.productsSection?.dynamicCategories;
  const hasDynamicCategories = dynamicCategories && dynamicCategories.length > 0;
  const homeCategories = hasDynamicCategories
    ? dynamicCategories
      .filter((c) => c.showOnHome !== false && getCategoryProducts(c).length > 0)
      .sort((a, b) => (a.homeOrder || 1) - (b.homeOrder || 1))
    : [];

  // Helper to calculate responsive grid column classes
  const getGridColsClass = (requestedCols: string | undefined, count: number): string => {
    if (requestedCols === '1') return 'grid-cols-1';
    if (requestedCols === '2') return 'grid sm:grid-cols-2';
    if (requestedCols === '3') return 'grid sm:grid-cols-2 lg:grid-cols-3';
    if (requestedCols === '4') return 'grid sm:grid-cols-2 lg:grid-cols-4';

    // Auto density
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid sm:grid-cols-2';
    if (count === 3) return 'grid sm:grid-cols-2 lg:grid-cols-3';
    return 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  // Group adjacent single-item editorial categories to render side-by-side (like Meat & Pepper)
  type CategoryBlock =
    | { type: 'single'; category: DynamicCategoryItem; index: number }
    | { type: 'paired-editorial'; categories: [DynamicCategoryItem, DynamicCategoryItem]; indices: [number, number] };

  const blocks: CategoryBlock[] = [];
  let i = 0;
  while (i < homeCategories.length) {
    const current = homeCategories[i];
    const next = homeCategories[i + 1];
    const currentMode = current.displayMode || (current.homeLayoutStyle === 'editorialCard' ? 'editorial' : 'swatches');
    const currentProds = getCategoryProducts(current);

    const isCurrentSingleEditorial = currentMode === 'editorial' && currentProds.length <= 1;

    if (isCurrentSingleEditorial && next) {
      const nextMode = next.displayMode || (next.homeLayoutStyle === 'editorialCard' ? 'editorial' : 'swatches');
      const nextProds = getCategoryProducts(next);
      const isNextSingleEditorial = nextMode === 'editorial' && nextProds.length <= 1;

      if (isNextSingleEditorial) {
        blocks.push({
          type: 'paired-editorial',
          categories: [current, next],
          indices: [i, i + 1],
        });
        i += 2;
        continue;
      }
    }

    blocks.push({
      type: 'single',
      category: current,
      index: i,
    });
    i += 1;
  }

  // Render a single editorial card (for single-item or multi-item editorial sections)
  const renderEditorialCard = (
    cat: DynamicCategoryItem,
    prod: ProductItem | undefined,
    catIndex: number,
    prodIndex: number = 0,
    options?: { hideKicker?: boolean }
  ) => {
    const title = prod ? t(prod.name) : t(cat.title);
    const desc = prod ? t(prod.description) : (cat.description ? t(cat.description) : '');
    const imgSrc = prod?.image || cat.image || '';
    const linkHref = prod ? `/products/${prod.id}` : '/products';
    const stepNum = catIndex < 9 ? `0${catIndex + 1}` : `${catIndex + 1}`;
    const stepNumAr = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦', '٠٧', '٠٨', '٠٩', '١٠'][catIndex] || `${catIndex + 1}`;

    const catProds = getCategoryProducts(cat);
    const isSingleProduct = catProds.length <= 1;
    const isSameName = Boolean(
      prod &&
      ((prod.name?.ar && cat.title?.ar && prod.name.ar.trim() === cat.title.ar.trim()) ||
        (prod.name?.en && cat.title?.en && prod.name.en.trim().toLowerCase() === cat.title.en.trim().toLowerCase()) ||
        (t(prod.name).trim().toLowerCase() === t(cat.title).trim().toLowerCase()))
    );
    const hideDuplicateProductName = isSingleProduct && isSameName;
    const subtitleText = isAr ? prod?.arabicSubtitle : (prod?.subtitle ? t(prod.subtitle) : '');

    const isPepper =
      cat.slug === 'pepper' ||
      cat.id === 'pepper' ||
      cat.id === 'category-pepper' ||
      prod?.id === 'crushed-hot-pepper';

    const pepperWhatsAppHref = buildWhatsAppLink(
      isAr ? 'أرغب في طلب فلفل شقراء' : 'I would like to order Shaqra hot pepper',
      content?.footer?.whatsAppNumber || '+966500000000'
    );

    return (
      <div
        key={prod?.id || `${cat.id}-${prodIndex}`}
        className="group block card-standard p-6 sm:p-8 transition-all hover:border-primary hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="editorial-kicker text-primary font-bold">
            {options?.hideKicker
              ? (cat.badge ? t(cat.badge) : '')
              : (isAr ? `${stepNumAr}. ${t(cat.title)}` : `${stepNum} · ${t(cat.title)}`)}
          </span>
          <Link href={linkHref} aria-label={title}>
            <ArrowUpRight
              size={18}
              className="text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {imgSrc && (
          <Link href={linkHref} className="block relative aspect-[16/10] w-full overflow-hidden bg-paper mb-5 rounded-xl border border-border/40">
            <Image
              src={imgSrc}
              alt={title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Link>
        )}

        {isPepper ? (
          <div>
            <Link href={linkHref} className="block">
              <h3 className="font-display text-xl font-bold sm:text-2xl group-hover:text-primary transition-colors text-ink">
                {title || (isAr ? 'فلفل شقراء' : 'Shaqra Pepper')}
              </h3>
            </Link>
            {(subtitleText || (isAr ? 'نكهة محلية بطابع أصيل' : 'Local flavor with an authentic touch')) && (
              <p className="font-display text-sm sm:text-base font-semibold text-primary mt-1">
                {subtitleText || (isAr ? 'نكهة محلية بطابع أصيل' : 'Local flavor with an authentic touch')}
              </p>
            )}

            {/* C8: Full description from CMS without truncation, formatted with whitespace-pre-line */}
            <div className="mt-3.5 editorial-copy text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {desc ? (
                desc
              ) : (
                <div className="space-y-2">
                  <p>
                    {isAr
                      ? 'فلفل حار من شقراء، مجفف ومجروش ليمنح الأطباق حرارة واضحة ونكهة مميزة.'
                      : 'Sun-dried Shaqra hot pepper coarsely crushed to give dishes vibrant heat and distinctive character.'}
                  </p>
                  <p className="font-medium text-ink">
                    {isAr
                      ? 'قليل منه… يصنع فرقاً كبيراً في الطبق.'
                      : 'A little bit… makes a big difference in the dish.'}
                  </p>
                  <p>
                    {isAr
                      ? 'مناسب للإيدامات، والبيض، والشوربات، والكبسة، والتتبيلات.'
                      : 'Ideal for Saudi stews, eggs, soups, kabsa, and marinades.'}
                  </p>
                </div>
              )}
            </div>

            {/* C8: [اطلب الآن] Button opening WhatsApp */}
            <div className="mt-5 pt-2 flex items-center gap-3 flex-wrap">
              <a
                href={pepperWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full inline-flex items-center shadow-xs"
              >
                <MessageCircle size={16} />
                <span>{isAr ? 'اطلب الآن' : 'Order Now'}</span>
                <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
              </a>
              <Link
                href={linkHref}
                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 py-2"
              >
                <span>{isAr ? 'تفاصيل المنتج' : 'Product Details'}</span>
                <span className="text-xs transition-transform rtl:rotate-180">→</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Link href={linkHref} className="block">
              {!hideDuplicateProductName ? (
                <h3 className="font-display text-xl font-semibold sm:text-2xl group-hover:text-primary transition-colors">
                  {title}
                </h3>
              ) : subtitleText ? (
                <h3 className="font-display text-lg font-semibold sm:text-xl text-ink group-hover:text-primary transition-colors">
                  {subtitleText}
                </h3>
              ) : null}
            </Link>

            {desc && (
              <p className="editorial-copy mt-2 text-sm line-clamp-3">
                {desc}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="varieties" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 2xl:px-20 py-16 sm:py-24">
      <Reveal className="mx-auto max-w-[1440px]">
        {/* Header matching reference site */}
        <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="editorial-kicker">
              {content?.productsSection?.eyebrow
                ? t(content.productsSection.eyebrow)
                : isAr
                  ? 'قطفناها للتو · ٠٢'
                  : 'Freshly picked · 02'}
            </p>
            <h2 className="editorial-title">
              {content?.productsSection?.title
                ? t(content.productsSection.title)
                : isAr
                  ? 'محاصيلنا، بطعم الكمال.'
                  : 'The harvest, perfected.'}
            </h2>
          </div>
          <div className="md:justify-self-end flex flex-col items-start md:items-end gap-3">
            <p className="editorial-copy">
              {content?.productsSection?.description
                ? t(content.productsSection.description)
                : isAr
                  ? 'طبيعية، غنية بالنكهة، ومزروعة بعناية في محافظة شقراء.'
                  : 'Naturally vibrant. Full of flavour. Grown close to home in Shaqra.'}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>
                {content?.productsSection?.catalogCta
                  ? t(content.productsSection.catalogCta)
                  : isAr
                    ? 'عرض كامل قائمة المنتجات'
                    : 'Browse full pantry catalog'}
              </span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>

        {homeCategories.length > 0 ? (
          <div className="space-y-16 mt-12">
            {blocks.map((block, bIdx) => {
              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              // Case 1: Paired Single-Item Editorial Cards (Side by side)
              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              if (block.type === 'paired-editorial') {
                const cat1 = block.categories[0];
                const cat2 = block.categories[1];
                const prod1 = getCategoryProducts(cat1)[0];
                const prod2 = getCategoryProducts(cat2)[0];

                return (
                  <div key={`paired-${bIdx}`} className="grid gap-6 md:grid-cols-2">
                    {renderEditorialCard(cat1, prod1, block.indices[0])}
                    {renderEditorialCard(cat2, prod2, block.indices[1])}
                  </div>
                );
              }

              // Single category block
              const cat = block.category;
              const catIndex = block.index;
              const displayProducts = getCategoryProducts(cat);
              const stepNum = catIndex < 9 ? `0${catIndex + 1}` : `${catIndex + 1}`;
              const stepNumAr = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦', '٠٧', '٠٨', '٠٩', '١٠'][catIndex] || `${catIndex + 1}`;

              // Determine display mode with smart fallback
              const mode =
                cat.displayMode ||
                (cat.homeLayoutStyle === 'editorialCard'
                  ? 'editorial'
                  : cat.homeLayoutStyle === 'flavorCards' || cat.homeLayoutStyle === 'productGrid'
                    ? 'grid'
                    : 'swatches');

              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              // Mode A: Editorial Showcase Cards
              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              if (mode === 'editorial') {
                const colsClass = getGridColsClass(cat.gridColumns, displayProducts.length);

                return (
                  <div key={cat.id} className="pt-2">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="editorial-kicker text-primary font-bold">
                        {isAr ? `${stepNumAr}. ${t(cat.title)}` : `${stepNum} · ${t(cat.title)}`}
                      </span>
                      {cat.badge && (
                        <span className="text-xs text-muted-foreground">{t(cat.badge)}</span>
                      )}
                    </div>
                    {cat.description && (
                      <p className="text-sm text-muted-foreground max-w-2xl mb-6">
                        {t(cat.description)}
                      </p>
                    )}

                    <div className={`gap-6 ${colsClass}`}>
                      {displayProducts.map((prod, pIdx) =>
                        renderEditorialCard(cat, prod, catIndex, pIdx, { hideKicker: displayProducts.length <= 1 })
                      )}
                    </div>
                  </div>
                );
              }

              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              // Mode B: Boutique List & Swatches (e.g. Dates, single or multi-grade)
              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              if (mode === 'swatches') {
                const colsClass = getGridColsClass(cat.gridColumns, displayProducts.length);
                const isDatesCategory = cat.slug === 'dates' || cat.id === 'category-dates' || cat.id === 'dates';

                // Dates category title directly from CMS
                const categoryGroupTitle = t(cat.title) || (isAr ? 'التمور المتوفرة' : 'Available Dates');

                const datesWhatsAppPrefill = isAr
                  ? 'أرغب في طلب تمور الخلاص'
                  : 'I would like to order Khalas dates';
                const datesWhatsAppHref = buildWhatsAppLink(
                  datesWhatsAppPrefill,
                  content?.footer?.whatsAppNumber || '+966500000000'
                );

                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="editorial-kicker text-primary font-bold">
                        {isAr ? `${stepNumAr}. ${categoryGroupTitle}` : `${stepNum} · ${categoryGroupTitle}`}
                      </span>
                      {cat.badge && (
                        <span className="text-xs text-muted-foreground">{t(cat.badge)}</span>
                      )}
                    </div>

                    {/* C7: New intro block replacing the old description paragraph */}
                    {isDatesCategory ? (
                      <div className="mb-8 p-6 sm:p-8 bg-paper/60 rounded-2xl border border-border/50 max-w-3xl space-y-6">
                        {/* Part 1: تمور الخلاص */}
                        <div className="space-y-3">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                            {isAr ? 'تمور الخلاص' : 'Khalas Dates'}
                          </h3>
                          <p className="editorial-copy text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {isAr
                              ? 'من نخيل مزرعتنا في شقراء، نقطف تمور الخلاص في موسمها، ونعتني بها حتى تصل إلى مائدتكم بالجودة التي تليق بها.'
                              : 'From our palm trees in Shaqra, we harvest Khalas dates in their prime season, caring for them until they arrive at your table with true distinction.'}
                          </p>
                          <blockquote className="font-display font-semibold text-primary italic text-base sm:text-lg">
                            {isAr ? '"من النخلة… إليك."' : '"From the palm tree… to you."'}
                          </blockquote>
                          <div className="pt-1">
                            <a
                              href={datesWhatsAppHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary gap-2 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full inline-flex items-center"
                            >
                              <MessageCircle size={16} />
                              <span>{isAr ? 'اطلب الآن' : 'Order Now'}</span>
                              <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
                            </a>
                          </div>
                        </div>

                        {/* Thin Divider */}
                        <hr className="border-border/60" />

                        {/* Part 2: مكنوز وادي النوار */}
                        <div className="space-y-2">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                            {isAr ? 'مكنوز وادي النوار' : 'Maknooz Wadi Al-Nawwar'}
                          </h3>
                          <p className="editorial-copy text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {isAr
                              ? 'تمر خلاص مختار بعناية، مُجهّز ومحفوظ بطريقة تحافظ على طعمه دائماً.'
                              : 'Hand-selected Khalas dates, cured and preserved to sustain their quintessential taste.'}
                          </p>
                          <p className="editorial-copy text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {isAr
                              ? 'منتج سعودي من حصاد مزرعتنا، مناسب للضيافة، والتقديم مع القهوة، والهدايا.'
                              : 'An authentic Saudi harvest from our farm, ideal for noble hospitality, serving with coffee, and heartfelt gifting.'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      cat.description && (
                        <p className="text-sm text-muted-foreground max-w-2xl mb-6">
                          {t(cat.description)}
                        </p>
                      )
                    )}

                    <div className={`gap-0 border-y border-border/50 ${colsClass}`}>
                      {displayProducts.map((prod, pIdx) => {
                        const swatches = ['swatch-2', 'swatch-1', 'swatch-3', 'swatch-4'];
                        const swatchClass = swatches[pIdx % swatches.length];
                        const iconSymbol = prod.icon || '✦';

                        // C6: Royal Khalas real photos check
                        const isRoyalKhalas = prod.id === 'royal-khalas';
                        const thumbSrc = isRoyalKhalas ? '/images/royal-khalas-1.jpg' : prod.image;

                        // A3: Royal Khalas subtitle
                        const subtitleText = isRoyalKhalas
                          ? (isAr ? 'حبة فاخرة، حجم كبير ومذاق غني' : (prod.subtitle ? t(prod.subtitle) : 'Handpicked Jumbo Reserve, Rich Flavor'))
                          : (isAr ? (prod.arabicSubtitle || (prod.subtitle ? t(prod.subtitle) : '')) : (prod.subtitle ? t(prod.subtitle) : ''));

                        return (
                          <div
                            key={prod.id}
                            className="border-b border-border/50 py-6 last:border-b-0 sm:border-b-0 sm:border-e sm:border-border/50 sm:px-6 sm:first:ps-0 sm:last:border-e-0 transition-colors hover:bg-paper/40 flex flex-col justify-between"
                          >
                            <Link
                              href={`/products/${prod.id}`}
                              className="group flex items-start justify-between gap-4"
                            >
                              <div className="flex items-start gap-4">
                                {thumbSrc ? (
                                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border/50 shadow-2xs bg-paper mt-0.5">
                                    <Image
                                      src={thumbSrc}
                                      alt={t(prod.name)}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform"
                                      sizes="48px"
                                    />
                                  </div>
                                ) : (
                                  <span className={`size-12 shrink-0 rounded-full ${swatchClass} flex items-center justify-center text-xs font-bold shadow-2xs mt-0.5`}>
                                    {iconSymbol}
                                  </span>
                                )}
                                <div>
                                  <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                                    {t(prod.name)}
                                  </h3>
                                  {subtitleText && (
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                      {subtitleText}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <ArrowUpRight
                                size={16}
                                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-60 group-hover:opacity-100 shrink-0 mt-1"
                              />
                            </Link>

                            {/* C6: Small 3 real photos gallery row under Royal Khalas text */}
                            {isRoyalKhalas && (
                              <div className="mt-4 pt-2 border-t border-border/40">
                                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 max-w-full">
                                  {[
                                    '/images/royal-khalas-1.jpg',
                                    '/images/royal-khalas-2.jpg',
                                    '/images/royal-khalas-3.jpg',
                                  ].map((photoUrl, photoIdx) => (
                                    <div
                                      key={photoIdx}
                                      className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-paper shadow-2xs"
                                    >
                                      <Image
                                        src={photoUrl}
                                        alt={isAr ? `الخلاص الملكي صورة ${photoIdx + 1}` : `Royal Khalas photo ${photoIdx + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 64px, 80px"
                                        className="object-cover hover:scale-105 transition-transform"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              // Mode C: Artisanal Product Grid (e.g. Tomatoes, Jars, Multi-products)
              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              const colsClass = getGridColsClass(cat.gridColumns, displayProducts.length);
              const isTomatoesCategory = cat.slug === 'dried-tomatoes' || cat.id === 'category-dried-tomatoes' || cat.id === 'dried-tomatoes';

              const tomatoesWhatsAppHref = buildWhatsAppLink(
                isAr ? 'أرغب في طلب طماطم وادي النوار المجففة' : 'I would like to order Wadi Al-Nawwar dried tomatoes',
                content?.footer?.whatsAppNumber || '+966500000000'
              );

              // Helper for C9 flavor title: derives from CMS product names
              const getFlavorTitle = (prod: ProductItem): string => {
                if (isTomatoesCategory && prod.name?.ar && prod.name?.en) {
                  return isAr
                    ? `${prod.name.ar} | ${prod.name.en.toUpperCase()}`
                    : `${prod.name.en.toUpperCase()} | ${prod.name.ar}`;
                }
                return t(prod.name);
              };

              return (
                <div key={cat.id} className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="editorial-kicker text-primary font-bold">
                      {isAr ? `${stepNumAr}. ${t(cat.title)}` : `${stepNum} · ${t(cat.title)}`}
                    </span>
                    {/* Badge directly from CMS */}
                    {cat.badge && (
                      <span className="text-xs text-muted-foreground">{t(cat.badge)}</span>
                    )}
                  </div>

                  {/* C9: Dried Tomatoes Intro block (Appendix A6) */}
                  {isTomatoesCategory ? (
                    <div className="mb-8 max-w-3xl space-y-3">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                        {isAr ? 'طماطم وادي النوار المجففة' : 'Wadi Al-Nawwar Sun-Dried Tomatoes'}
                      </h3>
                      <p className="font-display text-sm sm:text-base font-semibold text-primary">
                        {isAr
                          ? 'ليست مجرد طماطم مجففة… بل نكهات لها شخصيتها'
                          : 'Not just dried tomatoes… but distinct, flavorful personalities'}
                      </p>
                      <div className="space-y-2 editorial-copy text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                        <p>
                          {isAr
                            ? 'شرائح طماطم مجففة، ننسقها مع إضافات مختارة ونحفظها بزيت الزيتون لنقدم مجموعة من النكهات، لكل واحدة منها طابع واستخدام مختلف.'
                            : 'Sun-concentrated ripe tomato slices paired with select herbs and submerged in extra virgin olive oil to deliver a collection of rich flavors.'}
                        </p>
                        <p>
                          {isAr
                            ? 'من الفطور إلى المقبلات، ومن السلطات إلى الأطباق الرئيسية…'
                            : 'From breakfast toasts to salads, pasta, and main dishes…'}
                        </p>
                        <p className="font-semibold text-ink">
                          {isAr
                            ? 'برطمان واحد يفتح لك أكثر من فكرة'
                            : 'One jar opens endless culinary possibilities'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    cat.description && (
                      <p className="text-sm text-muted-foreground max-w-2xl mb-6">
                        {t(cat.description)}
                      </p>
                    )
                  )}

                  <div className={`gap-6 ${colsClass}`}>
                    {displayProducts.map((prod) => {
                      const iconSymbol = prod.icon || '✦';
                      const flavorHeading = getFlavorTitle(prod);

                      // Descriptions from CMS, with Appendix A7 fallback only if CMS description is empty
                      let flavorDesc = t(prod.description);
                      if (!flavorDesc && isTomatoesCategory) {
                        if (prod.id === 'dried-tomato-qatfa') {
                          flavorDesc = isAr
                            ? 'نكهة عشبية عطرية تجمع الطماطم المجففة مع الشبت وإكليل الجبل. رائعة مع الأومليت، الأجبان، الساندويتشات والسلطات.'
                            : 'Aromatic herbal flavor pairing sun-dried tomatoes with fresh garden dill and rosemary.';
                        } else if (prod.id === 'dried-tomato-lahab') {
                          flavorDesc = isAr
                            ? 'للذين يحبون النكهة الحارة. طماطم مجففة مع فلفل شقراء الحار، تضيف حرارة ونكهة للأطباق. رائعة مع الشكشوكة، البيض، البيتزا والمكرونة.'
                            : 'For spicy lovers: sun-dried tomatoes infused with fiery Shaqra crushed chili flakes.';
                        } else if (prod.id === 'dried-tomato-signature') {
                          flavorDesc = isAr
                            ? 'خلطة وادي النوار الخاصة. طماطم مجففة بتوليفة من البهارات المختارة لنكهة أغنى ومختلفة.'
                            : "Wadi Al-Nawwar's proprietary reserve blend: marinated in roasted spices and golden garlic.";
                        }
                      }

                      return (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.id}`}
                          className="group block card-standard p-5 transition-all hover:border-primary hover:shadow-md relative"
                        >
                          {prod.image ? (
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper mb-4 rounded-xl border border-border/40">
                              <Image
                                src={prod.image}
                                alt={flavorHeading}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              {prod.badge && (
                                <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold border border-white/20">
                                  {t(prod.badge)}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="aspect-[4/3] w-full bg-paper mb-4 flex items-center justify-center text-2xl border border-border/50 rounded-xl">
                              {iconSymbol}
                            </div>
                          )}

                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-display text-lg font-bold group-hover:text-primary transition-colors text-ink">
                                {flavorHeading}
                              </h4>
                              {flavorDesc && (
                                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-3">
                                  {flavorDesc}
                                </p>
                              )}
                            </div>
                            <ArrowUpRight
                              size={16}
                              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* C9: Two buttons at the end of the tomatoes section */}
                  {isTomatoesCategory && (
                    <div className="mt-10 pt-6 border-t border-border/50 flex flex-wrap items-center gap-4">
                      <Link
                        href="/products"
                        className="btn-secondary px-6 py-2.5 text-xs sm:text-sm font-bold rounded-full inline-flex items-center gap-2 border border-border hover:border-primary transition-all"
                      >
                        <span>{isAr ? 'اكتشف التشكيلة' : 'Discover the Full Range'}</span>
                        <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
                      </Link>

                      <a
                        href={tomatoesWhatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold rounded-full inline-flex items-center gap-2 shadow-xs"
                      >
                        <MessageCircle size={17} />
                        <span>{isAr ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
                        <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
                      </a>
                    </div>
                  )}

                  {/* Seasonal / Special Flavors Callout (if present on category) */}
                  {cat.seasonalFlavors && cat.seasonalFlavors.length > 0 && (
                    <div className="mt-8 p-6 bg-paper/60 border border-border/60 rounded-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          {isAr ? 'نكهات موسمية خاصة (حسب الموسم):' : 'Seasonal & Special Flavors (Rotating):'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {isAr ? 'إصدارات محدودة' : 'Limited seasonal batches'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        {cat.seasonalFlavors.map((flavor, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-3.5 py-1.5 bg-card border border-border/60 rounded-full text-foreground/90"
                          >
                            {t(flavor)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-sm text-muted-foreground bg-paper/30 border border-dashed border-border mt-12 rounded-lg">
            {isAr
              ? 'لا توجد أقسام مفعلة للعرض في الصفحة الرئيسية حالياً. يمكنك تفعيل الأقسام وإضافة المنتجات عبر Sanity Studio.'
              : 'No categories available'}
          </div>
        )}
      </Reveal>
    </section>
  );
}
