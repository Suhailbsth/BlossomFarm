import { SiteContent, ProductItem, DynamicCategoryItem, ValuePillar, StorageStep, HeroSlide } from '@/types/content';
import {
  getSanitySiteSettings,
  getSanityCategories,
  getSanityAllProducts,
  getSanityProductBySlug,
  getSanityHomeSections,
} from './sanity';
import { SanityProduct, SanityCategory } from '@/sanity/queries';

// 1. Remove: import staticContent from '@/data/content.json';
// 2. Remove: const fallbackContent = ...

function createEmptySiteContent(): SiteContent {
  return {
    brand: {
      name: { ar: '', en: '' },
      tagline: { ar: '', en: '' },
      closingTagline: { ar: '', en: '' },
      badge: { ar: '', en: '' },
      locationShort: { ar: '', en: '' },
    },
    navigation: {
      about: { ar: 'عن المزرعة', en: 'Our farm' },
      products: { ar: 'المنتجات', en: 'Products' },
      dates: { ar: 'تمور', en: 'Dates' },
      meat: { ar: 'مواشي النعيمي', en: 'Naimi Sheep' },
      pepper: { ar: 'فلفل شقراء', en: 'Shaqra Pepper' },
      driedTomatoes: { ar: 'طماطم مجففة', en: 'Dried Tomatoes' },
      howToUse: { ar: 'طرق الاستخدام', en: 'Recipes' },
      storage: { ar: 'إرشادات الحفظ', en: 'Storage' },
      contact: { ar: 'تواصل معنا', en: 'Contact' },
    },
    hero: {
      welcomeBadge: { ar: '', en: '' },
      heading: { ar: '', en: '' },
      subheading: { ar: '', en: '' },
      description: { ar: '', en: '' },
      ctaProducts: { ar: '', en: '' },
      ctaWhatsApp: { ar: '', en: '' },
      ctaSecondaryText: { ar: '', en: '' },
      statsPill: { ar: '', en: '' },
      heroImages: [],
      slides: [],
    },
    naimiSection: {
      eyebrow: { ar: '', en: '' },
      title: { ar: '', en: '' },
      subtitle: { ar: '', en: '' },
      description: { ar: '', en: '' },
      badge: { ar: '', en: '' },
      imageUrl: '',
      images: [],
      gallery: [],
      ctaWhatsApp: { ar: '', en: '' },
      ctaSecondaryText: { ar: '', en: '' },
    },
    about: {
      eyebrow: { ar: '', en: '' },
      title: { ar: '', en: '' },
      quote: { ar: '', en: '' },
      storyParagraphs: [],
      imageUrl: '',
      images: [],
      gallery: [],
      videoPlaceholder: {
        title: { ar: '', en: '' },
        subtitle: { ar: '', en: '' },
        poster: '',
        tag: { ar: '', en: '' },
        note: { ar: '', en: '' },
      },
      pillars: [],
      stats: [],
    },
    productsSection: {
      eyebrow: { ar: '', en: '' },
      title: { ar: '', en: '' },
      description: { ar: '', en: '' },
      catalogCta: { ar: '', en: '' },
      dynamicCategories: [],
      categories: {} as any,
      allProducts: [],
    },
    recipesSection: {
      eyebrow: { ar: '', en: '' },
      title: { ar: '', en: '' },
      items: [],
    },
    howToUseSection: {
      eyebrow: { ar: '', en: '' },
      title: { ar: '', en: '' },
      description: { ar: '', en: '' },
      classicSectionTitle: { ar: '', en: '' },
      saudiSectionTitle: { ar: '', en: '' },
      items: [],
    },
    storagePracticeSection: {
      eyebrow: { ar: '', en: '' },
      title: { ar: '', en: '' },
      subtitle: { ar: '', en: '' },
      bannerNote: { ar: '', en: '' },
      items: [],
    },
    footer: {
      badge: { ar: '', en: '' },
      closingTagline: { ar: '', en: '' },
      closingTaglineMeaning: { ar: '', en: '' },
      whatsAppPrompt: { ar: '', en: '' },
      whatsAppBtn: { ar: '', en: '' },
      whatsAppNumber: '',
      whatsAppPrefillEn: '',
      whatsAppPrefillAr: '',
      locationTitle: { ar: '', en: '' },
      locationAddress: { ar: '', en: '' },
      googleMapsUrl: '',
      sharePrompt: { ar: '', en: '' },
      rights: { ar: '', en: '' },
      copyrightText: { ar: '', en: '' },
      socialLinks: [],
    },
  };
}

/**
 * Maps a Sanity product record into the standard ProductItem interface.
 */
function mapSanityProduct(sp: SanityProduct, categoryTitle?: { ar: string; en: string }): ProductItem {

  const imgUrl = sp.imageUrl || '';
  const gallery = sp.galleryUrls && sp.galleryUrls.length > 0
    ? sp.galleryUrls
    : (imgUrl ? [imgUrl] : []);

  return {
    id: sp.slug,
    categoryKey: sp.categorySlug || 'dates',
    name: sp.name,
    subtitle: sp.subtitle,
    arabicSubtitle: sp.arabicSubtitle || (typeof sp.subtitle === 'object' ? sp.subtitle.ar : undefined),
    category: categoryTitle || { ar: 'منتجات المزرعة', en: 'Farm Harvest' },
    tagline: sp.tagline,
    badge: sp.badge,
    description: sp.description || { ar: '', en: '' },
    story: sp.story,
    image: imgUrl,
    gallery,
    inSeason: sp.inSeason !== false,
    highlights: sp.highlights,
    specs: sp.specs,
    bestPairedWith: sp.bestPairedWith,
    storageSpecific: sp.storageSpecific,
  };
}

/**
 * Retrieves the full site content, merging Sanity CMS data over static fallback content.
 */
export async function getSiteContent(): Promise<SiteContent> {
  const content = createEmptySiteContent();

  try {
    const [sanitySettings, sanityCategories, sanityProducts, sanityHome] = await Promise.all([
      getSanitySiteSettings(),
      getSanityCategories(),
      getSanityAllProducts(),
      getSanityHomeSections(),
    ]);

    // 1. Site Settings & Branding
    if (sanitySettings) {
      if (sanitySettings.brandName) {
        content.brand.name = sanitySettings.brandName;
      }
      if (sanitySettings.brandTagline) {
        content.brand.tagline = sanitySettings.brandTagline;
        content.brand.closingTagline = sanitySettings.brandTagline;
        content.footer.closingTagline = sanitySettings.brandTagline;
      } else if (sanitySettings.brandClosingTagline) {
        content.footer.closingTagline = sanitySettings.brandClosingTagline;
      }

      if (sanitySettings.siteLogoUrl) {
        content.brand.siteLogoUrl = sanitySettings.siteLogoUrl;
      }
      if (sanitySettings.siteFaviconUrl) {
        content.brand.siteFaviconUrl = sanitySettings.siteFaviconUrl;
      }

      if (sanitySettings.whatsAppNumber) {
        content.footer.whatsAppNumber = sanitySettings.whatsAppNumber;
      }
      if (sanitySettings.whatsAppFloatingButtonText) {
        content.footer.whatsAppFloatingButtonText = sanitySettings.whatsAppFloatingButtonText;
      }

      const defaultMsgAr = sanitySettings.whatsAppDefaultMessage?.ar || sanitySettings.whatsAppDefaultMessageAr;
      const defaultMsgEn = sanitySettings.whatsAppDefaultMessage?.en || sanitySettings.whatsAppDefaultMessageEn;
      if (defaultMsgAr) content.footer.whatsAppPrefillAr = defaultMsgAr;
      if (defaultMsgEn) content.footer.whatsAppPrefillEn = defaultMsgEn;

      if (sanitySettings.farmLocation) {
        content.footer.locationAddress = typeof sanitySettings.farmLocation === 'string'
          ? { ar: sanitySettings.farmLocation, en: sanitySettings.farmLocation }
          : sanitySettings.farmLocation;
      }
      if (sanitySettings.googleMapsUrl) {
        content.footer.googleMapsUrl = sanitySettings.googleMapsUrl;
      }
      if (sanitySettings.commercialRegistration) {
        content.footer.commercialRegistration = sanitySettings.commercialRegistration;
      }
      if (sanitySettings.copyrightText) {
        content.footer.copyrightText = sanitySettings.copyrightText;
      }
      if (sanitySettings.socialLinks && sanitySettings.socialLinks.length > 0) {
        content.footer.socialLinks = sanitySettings.socialLinks;
      }
    }

    // 2. Hero Section
    if (sanityHome?.hero) {
      const h = sanityHome.hero;
      if (h.welcomeBadge) content.hero.welcomeBadge = h.welcomeBadge;
      if (h.heading) content.hero.heading = h.heading;
      if (h.subheading) content.hero.description = h.subheading;
      if (h.ctaWhatsApp) content.hero.ctaWhatsApp = h.ctaWhatsApp;
      if (h.ctaSecondaryText) (content.hero as any).ctaSecondaryText = h.ctaSecondaryText;
      if (h.harvestBadge) content.hero.statsPill = h.harvestBadge;
      if (h.heroImageUrl) content.hero.heroImageUrl = h.heroImageUrl;

      // Slideshow photos
      if (h.slides && h.slides.length > 0) {
        const validSlides: HeroSlide[] = h.slides
          .filter((s) => Boolean(s.imageUrl))
          .map((s, idx) => ({
            src: s.imageUrl!,
            alt: s.altText?.ar || s.altText?.en || s.caption?.ar || s.caption?.en || `Wadi Al-Nawar Slide ${idx + 1}`,
            caption: s.caption?.ar || s.caption?.en || '',
            captionBilingual: s.caption,
          }));

        if (validSlides.length > 0) {
          content.hero.slides = validSlides;
        }
      }
    }

    // 2.5 Naimi Sheep Pastures Section
    if (sanityHome?.naimi) {
      const n = sanityHome.naimi;
      if (content.naimiSection) {
        if (n.eyebrow) content.naimiSection.eyebrow = n.eyebrow;
        if (n.title) content.naimiSection.title = n.title;
        if (n.subtitle) content.naimiSection.subtitle = n.subtitle;
        if (n.description) content.naimiSection.description = n.description;
        if (n.badge) content.naimiSection.badge = n.badge;
        if (n.imageUrl) content.naimiSection.imageUrl = n.imageUrl;
        if (n.images && n.images.length > 0) {
          content.naimiSection.images = n.images;
        }
        if (n.ctaWhatsAppText || n.ctaWhatsApp) {
          content.naimiSection.ctaWhatsApp = (n.ctaWhatsAppText || n.ctaWhatsApp)!;
        }
      }
    }

    // 3. About Section
    if (sanityHome?.about) {
      const a = sanityHome.about;
      if (a.eyebrow) content.about.eyebrow = a.eyebrow;
      if (a.title) content.about.title = a.title;
      if (a.quote) content.about.quote = a.quote;
      if (a.imageUrl) content.about.imageUrl = a.imageUrl;
      if (a.images && a.images.length > 0) {
        content.about.images = a.images;
      }
      if (a.storyParagraphs && a.storyParagraphs.length > 0) {
        content.about.storyParagraphs = a.storyParagraphs;
      }
      if (a.videoFileUrl) {
        content.about.videoFileUrl = a.videoFileUrl;
      }
      if (a.videoUrl) {
        content.about.videoUrl = a.videoUrl;
      }
      if (a.pillars && a.pillars.length > 0) {
        content.about.pillars = a.pillars.map((p, idx): ValuePillar => ({
          id: `pillar-${idx}`,
          title: p.title,
          description: p.desc,
          iconName: 'leaf',
          highlight: p.title,
        }));
      }
    }

    // 4. Products Section Header
    if (sanityHome?.productsSection) {
      const ps = sanityHome.productsSection;
      if (ps.eyebrow) content.productsSection.eyebrow = ps.eyebrow;
      if (ps.title) content.productsSection.title = ps.title;
      if (ps.description) content.productsSection.description = ps.description;
      if (ps.catalogCtaText || ps.catalogCta) {
        content.productsSection.catalogCta = (ps.catalogCtaText || ps.catalogCta)!;
      }
    }

    // 5. Storage Tips
    if (sanityHome?.storage) {
      const st = sanityHome.storage;
      if (st.eyebrow) content.storagePracticeSection.eyebrow = st.eyebrow;
      if (st.title) content.storagePracticeSection.title = st.title;
      if (st.description) content.storagePracticeSection.subtitle = st.description;
      if (st.steps && st.steps.length > 0) {
        content.storagePracticeSection.items = st.steps.map((item, idx): StorageStep => ({
          stepNumber: parseInt(item.stepNumber || `${idx + 1}`, 10) || idx + 1,
          title: item.title || { ar: '', en: '' },
          description: item.desc || { ar: '', en: '' },
          iconName: 'snowflake',
        }));
      }
    }

    // 6. Culinary Uses & Recipes
    if (sanityHome?.recipes && sanityHome.recipes.length > 0) {
      const rSec = sanityHome.recipesSection;
      const defaultItems = content.recipesSection?.items || [];
      content.recipesSection = {
        eyebrow: rSec?.eyebrow || content.recipesSection?.eyebrow || { ar: 'من مطبخنا · ٠٤', en: 'From our kitchen · 04' },
        title: rSec?.title || content.recipesSection?.title || { ar: 'طرق الاستخدام والتقديم', en: 'Ways to savour' },
        videoInstruction: rSec?.videoInstruction || content.recipesSection?.videoInstruction,
        journalTag: rSec?.journalTag || content.recipesSection?.journalTag,
        items: (sanityHome?.recipes || []).map((r, idx) => ({
          id: r._id || `recipe-${idx + 1}`,
          number: r.number || `${idx + 1}`,
          title: r.title || { ar: '', en: '' },
          subtitle: r.subtitle || { ar: '', en: '' },
          image: r.imageUrl || '',
          videoFileUrl: r.videoFileUrl,
          videoUrl: r.videoUrl,
          displayOrder: r.displayOrder || idx + 1,
          prepTime: r.prepTime,
          servings: r.servings,
          ingredients: r.ingredients || [],
          steps: r.steps || [],
          chefTip: r.chefTip,
          audioUrl: r.audioFileUrl || r.audioUrl,
        })),

      };
    }

    // 7. Dynamic Categories & Products
    if (sanityCategories && sanityCategories.length > 0) {
      const dynamicCats: DynamicCategoryItem[] = sanityCategories.map((cat) => {
        const catFeatured = (cat.featuredProducts || []).map((p) => mapSanityProduct(p, cat.title));
        const catAll = (cat.products || []).map((p) => mapSanityProduct(p, cat.title));

        return {
          id: cat.slug,
          slug: cat.slug,
          title: cat.name || cat.title,
          badge: cat.badge,
          description: cat.shortDescription || cat.description,
          image: cat.imageUrl,
          icon: cat.icon,
          showOnHome: cat.showOnHome !== false,
          homeOrder: cat.displayOrder || cat.homeOrder || 1,
          displayMode: cat.slug === 'meat' || cat.slug === 'pepper' ? 'editorial' : 'swatches',
          gridColumns: 'auto',
          featuredProducts: catFeatured.length > 0 ? catFeatured : catAll,
          allCategoryProducts: catAll,
        };
      });

      content.productsSection.dynamicCategories = dynamicCats;
    }

    // 8. Set Sanity products as allProducts
    if (sanityProducts && sanityProducts.length > 0) {
      content.productsSection.allProducts = sanityProducts.map((p) => mapSanityProduct(p));
    }
  } catch (error) {
    console.warn('[Content] Error fetching Sanity content, using fallback:', error);
  }

  return content;
}

/**
 * Retrieves a single product by its URL slug.
 */
export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const sp = await getSanityProductBySlug(slug);
    if (sp) {
      return mapSanityProduct(sp);
    }
  } catch {
    // Continue to content fallback
  }

  const content = await getSiteContent();
  return content.productsSection.allProducts.find((item) => item.id === slug) || null;
}

/**
 * Retrieves all valid product slugs for SSG static path generation.
 */
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const sanityProducts = await getSanityAllProducts();
    if (sanityProducts && sanityProducts.length > 0) {
      return sanityProducts.map((p) => p.slug);
    }
  } catch {
    // Fallback below
  }

  const content = await getSiteContent();
  return content.productsSection.allProducts.map((item) => item.id);
}

/**
 * Retrieves products belonging to a specific category.
 */
export async function getProductsByCategory(categoryKey: string): Promise<ProductItem[]> {
  const content = await getSiteContent();
  return content.productsSection.allProducts.filter((item) => item.categoryKey === categoryKey);
}

// Backward-compatibility aliases
export const getTomatoBySlug = getProductBySlug;
export const getAllTomatoSlugs = getAllProductSlugs;
