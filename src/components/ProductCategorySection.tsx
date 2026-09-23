'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, DynamicCategoryItem, ProductItem } from '@/types/content';
import Reveal from './Reveal';
import { ArrowUpRight } from 'lucide-react';

interface ProductCategorySectionProps {
  content?: SiteContent;
}

export default function ProductCategorySection({ content }: ProductCategorySectionProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const dynamicCategories = content?.productsSection?.dynamicCategories;
  const hasDynamicCategories = dynamicCategories && dynamicCategories.length > 0;
  const homeCategories = hasDynamicCategories
    ? dynamicCategories
        .filter((c) => c.showOnHome !== false)
        .sort((a, b) => (a.homeOrder || 1) - (b.homeOrder || 1))
    : [];

  // Helper to extract display products for a category
  const getCategoryProducts = (cat: DynamicCategoryItem): ProductItem[] => {
    if (cat.featuredProducts && cat.featuredProducts.length > 0) {
      return cat.featuredProducts;
    }
    if (cat.allCategoryProducts && cat.allCategoryProducts.length > 0) {
      return cat.allCategoryProducts;
    }
    return [];
  };

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
    prodIndex: number = 0
  ) => {
    const title = prod ? t(prod.name) : t(cat.title);
    const desc = prod ? t(prod.description) : (cat.description ? t(cat.description) : '');
    const imgSrc = prod?.image || cat.image || '';
    const linkHref = prod ? `/products/${prod.id}` : '/products';
    const stepNum = catIndex < 9 ? `0${catIndex + 1}` : `${catIndex + 1}`;
    const stepNumAr = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦', '٠٧', '٠٨', '٠٩', '١٠'][catIndex] || `${catIndex + 1}`;

    return (
      <Link
        key={prod?.id || `${cat.id}-${prodIndex}`}
        href={linkHref}
        className="group block card-standard p-6 sm:p-8 transition-all hover:border-primary hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="editorial-kicker text-primary font-bold">
            {isAr ? `${stepNumAr}. ${t(cat.title)}` : `${stepNum} · ${t(cat.title)}`}
          </span>
          <ArrowUpRight
            size={18}
            className="text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        {imgSrc && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper mb-5 rounded-xl border border-border/40">
            <Image
              src={imgSrc}
              alt={title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        <h3 className="font-display text-xl font-semibold sm:text-2xl group-hover:text-primary transition-colors">
          {title}
        </h3>
        {desc && (
          <p className="editorial-copy mt-2 text-sm line-clamp-3">
            {desc}
          </p>
        )}
      </Link>
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
                        renderEditorialCard(cat, prod, catIndex, pIdx)
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

                return (
                  <div key={cat.id}>
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

                    <div className={`gap-0 border-y border-border/50 ${colsClass}`}>
                      {displayProducts.map((prod, pIdx) => {
                        const swatches = ['swatch-2', 'swatch-1', 'swatch-3', 'swatch-4'];
                        const swatchClass = swatches[pIdx % swatches.length];
                        const iconSymbol = prod.icon || '✦';

                        return (
                          <Link
                            key={prod.id}
                            href={`/products/${prod.id}`}
                            className="group flex items-center justify-between border-b border-border/50 py-6 last:border-b-0 sm:border-b-0 sm:border-e sm:border-border/50 sm:px-6 sm:first:ps-0 sm:last:border-e-0 transition-colors hover:bg-paper/40"
                          >
                            <div className="flex items-center gap-4">
                              {prod.image ? (
                                <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-border/50 shadow-2xs bg-paper">
                                  <Image
                                    src={prod.image}
                                    alt={t(prod.name)}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform"
                                    sizes="44px"
                                  />
                                </div>
                              ) : (
                                <span className={`size-10 shrink-0 rounded-full ${swatchClass} flex items-center justify-center text-xs font-bold shadow-2xs`}>
                                  {iconSymbol}
                                </span>
                              )}
                              <div>
                                <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                                  {t(prod.name)}
                                </h3>
                                {prod.arabicSubtitle && (
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {prod.arabicSubtitle}
                                  </p>
                                )}
                              </div>
                            </div>
                            <ArrowUpRight
                              size={16}
                              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-60 group-hover:opacity-100"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              // Mode C: Artisanal Product Grid (e.g. Tomatoes, Jars, Multi-products)
              // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              const colsClass = getGridColsClass(cat.gridColumns, displayProducts.length);

              return (
                <div key={cat.id} className="pt-4 border-t border-border/50">
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
                    {displayProducts.map((prod, pIdx) => {
                      const iconSymbol = prod.icon || '✦';

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
                                alt={t(prod.name)}
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

                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <h4 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                                {t(prod.name)}
                              </h4>
                              {prod.arabicSubtitle && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {prod.arabicSubtitle}
                                </p>
                              )}
                            </div>
                            <ArrowUpRight
                              size={16}
                              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>

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
              : 'No categories currently enabled for the homepage. Enable categories and add products via Sanity Studio.'}
          </div>
        )}
      </Reveal>
    </section>
  );
}
