import { BilingualText } from '@/types/content';

/**
 * GROQ Queries for Sanity CMS
 */

// 1. Query site settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  title,
  whatsAppNumber,
  whatsAppDefaultMessageAr,
  whatsAppDefaultMessageEn,
  farmLocation,
  googleMapsUrl,
  "ogImageUrl": ogImage.asset->url,
  metaDescription,
  brandClosingTagline,
  commercialRegistration,
  copyrightText,
  socialLinks
}`;

// 2. Query categories with both their featured example products and all child products
export const categoriesWithProductsQuery = `*[_type == "category"] | order(homeOrder asc, _createdAt asc) {
  _id,
  title,
  "slug": slug.current,
  badge,
  description,
  showOnHome,
  homeOrder,
  displayMode,
  gridColumns,
  seasonalFlavors,
  "imageUrl": image.asset->url,
  "featuredProducts": featuredProducts[]-> {
    _id,
    name,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    arabicSubtitle,
    badge,
    icon,
    accentColor,
    tagline,
    description,
    story,
    inSeason,
    isFeaturedOnHome,
    displayOrder,
    tasteNotes,
    highlights,
    specs,
    bestPairedWith,
    storageSpecific,
    "imageUrl": image.asset->url,
    "galleryUrls": gallery[].asset->url
  },
  "products": *[_type == "product" && references(^._id)] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    arabicSubtitle,
    badge,
    icon,
    accentColor,
    tagline,
    description,
    story,
    inSeason,
    isFeaturedOnHome,
    displayOrder,
    tasteNotes,
    highlights,
    specs,
    bestPairedWith,
    storageSpecific,
    "imageUrl": image.asset->url,
    "galleryUrls": gallery[].asset->url
  }
}`;

// 3. Query all published products
export const allProductsQuery = `*[_type == "product"] | order(displayOrder asc, _createdAt asc) {
  _id,
  name,
  "slug": slug.current,
  "categorySlug": category->slug.current,
  arabicSubtitle,
  badge,
  icon,
  accentColor,
  tagline,
  description,
  story,
  inSeason,
  isFeaturedOnHome,
  displayOrder,
  tasteNotes,
  highlights,
  specs,
  bestPairedWith,
  storageSpecific,
  "imageUrl": image.asset->url,
  "galleryUrls": gallery[].asset->url
}`;

// 4. Query single product by slug
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  "categorySlug": category->slug.current,
  arabicSubtitle,
  badge,
  icon,
  accentColor,
  tagline,
  description,
  story,
  inSeason,
  isFeaturedOnHome,
  displayOrder,
  tasteNotes,
  highlights,
  specs,
  bestPairedWith,
  storageSpecific,
  "imageUrl": image.asset->url,
  "galleryUrls": gallery[].asset->url
}`;

// 5. Query homepage sections (Hero, Naimi, About, Storage, Recipes, Products Section)
export const homeSectionsQuery = `{
  "hero": *[_type == "heroSection"][0]{
    ...,
    "heroImageUrl": heroImage.asset->url,
    "videoFileUrl": videoFile.asset->url,
    "posterImageUrl": posterImage.asset->url
  },
  "naimi": *[_type == "naimiSection"][0]{
    ...,
    "imageUrl": image.asset->url,
    "videoFileUrl": videoFile.asset->url
  },
  "about": *[_type == "aboutSection"][0]{
    ...,
    "imageUrl": image.asset->url,
    "videoFileUrl": videoFile.asset->url
  },
  "productsSection": *[_type == "productsSection"][0],
  "recipesSection": *[_type == "recipesSection"][0],
  "storage": *[_type == "storageTips"][0],
  "recipes": *[_type == "recipeItem"] | order(displayOrder asc) {
    _id,
    number,
    title,
    subtitle,
    displayOrder,
    prepTime,
    servings,
    ingredients,
    steps,
    chefTip,
    audioUrl,
    videoUrl,
    "imageUrl": image.asset->url,
    "videoFileUrl": videoFile.asset->url,
    "audioFileUrl": audioFile.asset->url
  }
}`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TypeScript Interfaces for Sanity Data
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface SanitySocialLink {
  platform: 'instagram' | 'x' | 'snapchat' | 'tiktok' | 'youtube' | string;
  url: string;
}

export interface SanitySiteSettings {
  _id?: string;
  title?: string;
  whatsAppNumber?: string;
  whatsAppDefaultMessageAr?: string;
  whatsAppDefaultMessageEn?: string;
  farmLocation?: string;
  googleMapsUrl?: string;
  ogImageUrl?: string;
  metaDescription?: BilingualText;
  brandClosingTagline?: BilingualText;
  commercialRegistration?: string;
  copyrightText?: BilingualText;
  socialLinks?: SanitySocialLink[];
}

export interface SanityProduct {
  _id: string;
  name: BilingualText;
  slug: string;
  categorySlug?: string;
  arabicSubtitle?: string;
  badge?: BilingualText;
  icon?: string;
  accentColor?: string;
  tagline?: BilingualText;
  description?: BilingualText;
  story?: BilingualText;
  inSeason?: boolean;
  isFeaturedOnHome?: boolean;
  displayOrder?: number;
  tasteNotes?: BilingualText[];
  highlights?: BilingualText[];
  specs?: { label: BilingualText; value: BilingualText }[];
  bestPairedWith?: BilingualText;
  storageSpecific?: BilingualText;
  imageUrl?: string;
  galleryUrls?: string[];
}

export interface SanityCategory {
  _id: string;
  title: BilingualText;
  slug: string;
  badge?: BilingualText;
  description?: BilingualText;
  showOnHome?: boolean;
  homeOrder?: number;
  displayMode?: 'editorial' | 'swatches' | 'grid' | string;
  gridColumns?: 'auto' | '1' | '2' | '3' | '4' | string;
  homeLayoutStyle?: string;
  imageUrl?: string;
  seasonalFlavors?: BilingualText[];
  featuredProducts?: SanityProduct[];
  products?: SanityProduct[];
}

export interface SanityHeroSection {
  welcomeBadge?: BilingualText;
  heading?: BilingualText;
  subheading?: BilingualText;
  ctaDiscover?: BilingualText;
  harvestBadge?: BilingualText;
  heroImageUrl?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  posterImageUrl?: string;
}

export interface SanityNaimiSection {
  eyebrow?: BilingualText;
  title?: BilingualText;
  subtitle?: BilingualText;
  description?: BilingualText;
  badge?: BilingualText;
  imageUrl?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  ctaWhatsApp?: BilingualText;
}

export interface SanityAboutSection {
  eyebrow?: BilingualText;
  title?: BilingualText;
  quote?: BilingualText;
  storyParagraphs?: BilingualText[];
  videoBadge?: BilingualText;
  videoSubtitle?: BilingualText;
  imageUrl?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  pillars?: { title: BilingualText; desc: BilingualText }[];
}

export interface SanityProductsSectionHeader {
  eyebrow?: BilingualText;
  title?: BilingualText;
  description?: BilingualText;
  catalogCta?: BilingualText;
}

export interface SanityRecipesSectionHeader {
  eyebrow?: BilingualText;
  title?: BilingualText;
  videoInstruction?: BilingualText;
  journalTag?: BilingualText;
}

export interface SanityStorageTips {
  eyebrow?: BilingualText;
  title?: BilingualText;
  description?: BilingualText;
  items?: {
    stepNumber?: string;
    title?: BilingualText;
    desc?: BilingualText;
  }[];
}

export interface SanityRecipeItem {
  _id: string;
  number: string;
  title: BilingualText;
  subtitle?: BilingualText;
  imageUrl?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  displayOrder?: number;
  prepTime?: BilingualText;
  servings?: BilingualText;
  ingredients?: BilingualText[];
  steps?: BilingualText[];
  chefTip?: BilingualText;
  audioUrl?: string;
  audioFileUrl?: string;
}

export interface SanityHomeSections {
  hero?: SanityHeroSection;
  naimi?: SanityNaimiSection;
  about?: SanityAboutSection;
  productsSection?: SanityProductsSectionHeader;
  recipesSection?: SanityRecipesSectionHeader;
  storage?: SanityStorageTips;
  recipes?: SanityRecipeItem[];
}
