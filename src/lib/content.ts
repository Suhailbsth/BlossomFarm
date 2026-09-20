import { SiteContent, ProductItem, DynamicCategoryItem } from '@/types/content';
import staticContent from '@/data/content.json';
import {
  getSanitySiteSettings,
  getSanityCategories,
  getSanityAllProducts,
  getSanityProductBySlug,
  getSanityHomeSections,
} from './sanity';
import { SanityProduct, SanityCategory } from '@/sanity/queries';

const fallbackContent: SiteContent = staticContent as unknown as SiteContent;

/**
 * Maps a Sanity product record into the standard ProductItem interface.
 */
function mapSanityProduct(sp: SanityProduct, categoryTitle?: { ar: string; en: string }): ProductItem {
  const imgUrl = sp.imageUrl || '';
  const gallery = sp.galleryUrls && sp.galleryUrls.length > 0 ? sp.galleryUrls : (imgUrl ? [imgUrl] : []);

  return {
    id: sp.slug,
    categoryKey: sp.categorySlug || 'dates',
    name: sp.name,
    arabicSubtitle: sp.arabicSubtitle,
    category: categoryTitle || { ar: 'منتجات المزرعة', en: 'Farm Harvest' },
    tagline: sp.tagline,
    badge: sp.badge,
    icon: sp.icon || '✦',
    accentColor: sp.accentColor || 'gold',
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
  // Deep clone fallback content to prevent accidental mutation
  const content: SiteContent = JSON.parse(JSON.stringify(fallbackContent));

  try {
    const [sanitySettings, sanityCategories, sanityProducts, sanityHome] = await Promise.all([
      getSanitySiteSettings(),
      getSanityCategories(),
      getSanityAllProducts(),
      getSanityHomeSections(),
    ]);

    // 1. Site Settings & WhatsApp
    if (sanitySettings) {
      if (sanitySettings.whatsAppNumber) {
        content.footer.whatsAppNumber = sanitySettings.whatsAppNumber;
      }
      if (sanitySettings.whatsAppDefaultMessageAr) {
        content.footer.whatsAppPrefillAr = sanitySettings.whatsAppDefaultMessageAr;
      }
      if (sanitySettings.whatsAppDefaultMessageEn) {
        content.footer.whatsAppPrefillEn = sanitySettings.whatsAppDefaultMessageEn;
      }
      if (sanitySettings.farmLocation) {
        content.footer.locationAddress = {
          ar: sanitySettings.farmLocation,
          en: sanitySettings.farmLocation,
        };
      }
      if (sanitySettings.googleMapsUrl) {
        content.footer.googleMapsUrl = sanitySettings.googleMapsUrl;
      }
      if (sanitySettings.brandClosingTagline) {
        content.footer.closingTagline = sanitySettings.brandClosingTagline;
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
      if (h.ctaDiscover) content.hero.ctaProducts = h.ctaDiscover;
      if (h.harvestBadge) content.hero.statsPill = h.harvestBadge;
      if (h.heroImageUrl) content.hero.heroImageUrl = h.heroImageUrl;
    }

    // 3. About Section
    if (sanityHome?.about) {
      const a = sanityHome.about;
      if (a.eyebrow) content.about.eyebrow = a.eyebrow;
      if (a.title) content.about.title = a.title;
      if (a.quote) content.about.quote = a.quote;
      if (a.imageUrl) content.about.imageUrl = a.imageUrl;
      if (a.storyParagraphs && a.storyParagraphs.length > 0) {
        content.about.storyParagraphs = a.storyParagraphs;
      }
      if (a.videoSubtitle) {
        content.about.videoPlaceholder.subtitle = a.videoSubtitle;
      }
      if (a.videoFileUrl) {
        content.about.videoFileUrl = a.videoFileUrl;
      }
      if (a.videoUrl) {
        content.about.videoUrl = a.videoUrl;
      }
      if (a.pillars && a.pillars.length > 0) {
        content.about.pillars = a.pillars.map((p, idx) => ({
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
      if (ps.catalogCta) content.productsSection.catalogCta = ps.catalogCta;
    }

    // 5. Storage Tips
    if (sanityHome?.storage) {
      const st = sanityHome.storage;
      if (st.eyebrow) content.storagePracticeSection.eyebrow = st.eyebrow;
      if (st.title) content.storagePracticeSection.title = st.title;
      if (st.description) content.storagePracticeSection.subtitle = st.description;
      if (st.items && st.items.length > 0) {
        content.storagePracticeSection.items = st.items.map((item, idx) => ({
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
      content.recipesSection = {
        eyebrow: rSec?.eyebrow || { ar: 'من مطبخنا · ٠٤', en: 'From our kitchen · 04' },
        title: rSec?.title || { ar: 'طرق الاستخدام والتقديم', en: 'Ways to savour' },
        videoInstruction: rSec?.videoInstruction,
        journalTag: rSec?.journalTag,
        items: sanityHome.recipes.map((r, idx) => ({
          id: r._id || `recipe-${idx + 1}`,
          number: r.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`),
          title: r.title || { ar: '', en: '' },
          subtitle: r.subtitle || { ar: '', en: '' },
          image: r.imageUrl || '',
          videoFileUrl: r.videoFileUrl,
          videoUrl: r.videoUrl,
          displayOrder: r.displayOrder || idx + 1,
        })),
      };
    }

    // 5. Dynamic Categories & Products
    if (sanityCategories && sanityCategories.length > 0) {
      const dynamicCats: DynamicCategoryItem[] = sanityCategories.map((cat) => {
        const catFeatured = (cat.featuredProducts || []).map((p) => mapSanityProduct(p, cat.title));
        const catAll = (cat.products || []).map((p) => mapSanityProduct(p, cat.title));

        return {
          id: cat.slug,
          slug: cat.slug,
          title: cat.title,
          badge: cat.badge,
          description: cat.description,
          image: cat.imageUrl,
          showOnHome: cat.showOnHome !== false,
          homeOrder: cat.homeOrder || 1,
          displayMode: cat.displayMode || (
            cat.homeLayoutStyle === 'editorialCard' || cat.slug === 'meat' || cat.slug === 'pepper'
              ? 'editorial'
              : cat.homeLayoutStyle === 'flavorCards' || cat.slug === 'dried-tomatoes'
              ? 'grid'
              : 'swatches'
          ),
          gridColumns: cat.gridColumns || 'auto',
          homeLayoutStyle: cat.homeLayoutStyle,
          featuredProducts: catFeatured,
          allCategoryProducts: catAll,
          seasonalFlavors: cat.seasonalFlavors,
        };
      });

      content.productsSection.dynamicCategories = dynamicCats;
    }

    // 6. Set Sanity products as allProducts (Single Source of Truth)
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
  // 1. Try Sanity directly for the most up-to-date document
  try {
    const sp = await getSanityProductBySlug(slug);
    if (sp) {
      return mapSanityProduct(sp);
    }
  } catch {
    // Continue to content fallback
  }

  // 2. Check full merged content
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
