import {
  siteSettingsQuery,
  categoriesWithProductsQuery,
  allProductsQuery,
  productBySlugQuery,
  homeSectionsQuery,
  SanitySiteSettings,
  SanityCategory,
  SanityProduct,
  SanityHeroSection,
  SanityAboutSection,
  SanityStorageTips,
  SanityRecipeItem,
  SanityHomeSections,
} from '@/sanity/queries';

/**
 * Sanity Project Configuration
 */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

/**
 * Checks whether Sanity is configured with an active project ID.
 */
export function isSanityConfigured(): boolean {
  return Boolean(sanityConfig.projectId && sanityConfig.projectId.trim().length > 0);
}

/**
 * Generic fetcher to execute GROQ queries against the Sanity CDN API with ISR caching.
 */
export async function sanityFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  try {
    let url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;

    if (params) {
      for (const [key, val] of Object.entries(params)) {
        url += `&$${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(val))}`;
      }
    }

    const response = await fetch(url, {
      next: {
        revalidate: 60, // ISR revalidation every 60 seconds
        tags: ['sanity'],
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.result || null;
  } catch (error) {
    console.warn('[Sanity] Error executing query:', error);
    return null;
  }
}

/**
 * Fetches site settings (including WhatsApp number and messages).
 */
export async function getSanitySiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityFetch<SanitySiteSettings>(siteSettingsQuery);
}

/**
 * Fetches all categories with their featured products and child products.
 */
export async function getSanityCategories(): Promise<SanityCategory[] | null> {
  return sanityFetch<SanityCategory[]>(categoriesWithProductsQuery);
}

/**
 * Fetches all published products from Sanity.
 */
export async function getSanityAllProducts(): Promise<SanityProduct[] | null> {
  return sanityFetch<SanityProduct[]>(allProductsQuery);
}

/**
 * Fetches a single product by its URL slug.
 */
export async function getSanityProductBySlug(slug: string): Promise<SanityProduct | null> {
  return sanityFetch<SanityProduct>(productBySlugQuery, { slug });
}
/**
 * Fetches all homepage sections (Hero, About, Storage, Recipes, Products Section).
 */
export async function getSanityHomeSections(): Promise<SanityHomeSections | null> {
  return sanityFetch<SanityHomeSections>(homeSectionsQuery);
}

/**
 * Convenience helper to get the active WhatsApp number taking Sanity CMS into account.
 */
export async function resolveWhatsAppNumberAsync(): Promise<string> {
  const sanitySettings = await getSanitySiteSettings();
  if (sanitySettings?.whatsAppNumber) {
    return sanitySettings.whatsAppNumber;
  }
  return ""
}
