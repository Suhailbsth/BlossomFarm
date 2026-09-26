import { BilingualText } from '@/types/content';

/**
 * GROQ Queries for Sanity CMS
 */

// 1. Query site settings & branding
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  brandName,
  brandTagline,
  whatsAppFloatingButtonText,
  whatsAppNumber,
  whatsAppDefaultMessage,
  whatsAppDefaultMessageAr,
  whatsAppDefaultMessageEn,
  contactPhone,
  contactEmail,
  farmLocation,
  googleMapsUrl,
  seoTitle,
  seoDescription,
  "siteLogoUrl": siteLogo.asset->url,
  "siteFaviconUrl": siteFavicon.asset->url,
  "ogImageUrl": ogImage.asset->url,
  commercialRegistration,
  copyrightText,
  socialLinks,
  // Legacy fallbacks
  title,
  brandClosingTagline,
  metaDescription
}`;

// 2. Query categories with their child products
export const categoriesWithProductsQuery = `*[_type == "category"] | order(coalesce(displayOrder, homeOrder) asc, _createdAt asc) {
  _id,
  "name": coalesce(name, title),
  "title": coalesce(name, title),
  "slug": slug.current,
  badge,
  "description": coalesce(shortDescription, description),
  "shortDescription": coalesce(shortDescription, description),
  "showOnHome": coalesce(showOnHome, true),
  "displayOrder": coalesce(displayOrder, homeOrder, 1),
  "homeOrder": coalesce(displayOrder, homeOrder, 1),
  icon,
  "imageUrl": image.asset->url,
  "featuredProducts": featuredProducts[]-> {
    _id,
    name,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    subtitle,
    arabicSubtitle,
    badge,
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
    subtitle,
    arabicSubtitle,
    badge,
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
  subtitle,
  arabicSubtitle,
  badge,
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
  subtitle,
  arabicSubtitle,
  badge,
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
    welcomeBadge,
    heading,
    subheading,
    ctaDiscoverText,
    ctaDiscover,
    harvestBadge,
    "slides": slides[]{
      "imageUrl": image.asset->url,
      caption,
      altText
    },
    "heroImageUrl": heroImage.asset->url
  },
  "naimi": *[_type == "naimiSection"][0]{
    eyebrow,
    title,
    subtitle,
    description,
    badge,
    ctaWhatsAppText,
    ctaWhatsApp,
    "images": images[].asset->url,
    "imageUrl": image.asset->url
  },
  "about": *[_type == "aboutSection"][0]{
    eyebrow,
    title,
    quote,
    storyParagraphs,
    "imageUrl": image.asset->url,
    "images": images[].asset->url,
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    pillars
  },
  "productsSection": *[_type == "productsSection"][0]{
    eyebrow,
    title,
    description,
    catalogCtaText,
    catalogCta
  },
  "recipesSection": *[_type == "recipesSection"][0]{
    eyebrow,
    title,
    videoInstruction,
    journalTag
  },
  "storage": *[_type == "storageTips"][0]{
    eyebrow,
    title,
    description,
    "steps": coalesce(steps, items)
  },
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

/* ─────────────────────────────────────────────────────────────
   TypeScript Interfaces for Sanity Data
   ───────────────────────────────────────────────────────────── */

export interface SanitySocialLink {
  platform: 'instagram' | 'x' | 'snapchat' | 'tiktok' | 'youtube' | string;
  url: string;
}

export interface SanitySiteSettings {
  _id?: string;
  brandName?: BilingualText;
  brandTagline?: BilingualText;
  siteLogoUrl?: string;
  siteFaviconUrl?: string;
  whatsAppFloatingButtonText?: BilingualText;
  whatsAppNumber?: string;
  whatsAppDefaultMessage?: BilingualText;
  whatsAppDefaultMessageAr?: string;
  whatsAppDefaultMessageEn?: string;
  contactPhone?: string;
  contactEmail?: string;
  farmLocation?: BilingualText | string;
  googleMapsUrl?: string;
  seoTitle?: BilingualText;
  seoDescription?: BilingualText;
  ogImageUrl?: string;
  commercialRegistration?: string;
  copyrightText?: BilingualText;
  socialLinks?: SanitySocialLink[];
  // Legacy
  title?: string;
  brandClosingTagline?: BilingualText;
  metaDescription?: BilingualText;
}

export interface SanityProduct {
  _id: string;
  name: BilingualText;
  slug: string;
  categorySlug?: string;
  subtitle?: BilingualText;
  arabicSubtitle?: string;
  badge?: BilingualText;
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
  name?: BilingualText;
  title: BilingualText;
  slug: string;
  badge?: BilingualText;
  description?: BilingualText;
  shortDescription?: BilingualText;
  showOnHome?: boolean;
  displayOrder?: number;
  homeOrder?: number;
  icon?: string;
  imageUrl?: string;
  featuredProducts?: SanityProduct[];
  products?: SanityProduct[];
}

export interface SanityHeroSlide {
  imageUrl?: string;
  caption?: BilingualText;
  altText?: BilingualText;
}

export interface SanityHeroSection {
  welcomeBadge?: BilingualText;
  heading?: BilingualText;
  subheading?: BilingualText;
  ctaDiscoverText?: BilingualText;
  ctaDiscover?: BilingualText;
  harvestBadge?: BilingualText;
  slides?: SanityHeroSlide[];
  heroImageUrl?: string;
}

export interface SanityNaimiSection {
  eyebrow?: BilingualText;
  title?: BilingualText;
  subtitle?: BilingualText;
  description?: BilingualText;
  badge?: BilingualText;
  images?: string[];
  imageUrl?: string;
  ctaWhatsAppText?: BilingualText;
  ctaWhatsApp?: BilingualText;
}

export interface SanityAboutSection {
  eyebrow?: BilingualText;
  title?: BilingualText;
  quote?: BilingualText;
  storyParagraphs?: BilingualText[];
  imageUrl?: string;
  images?: string[];
  videoFileUrl?: string;
  videoUrl?: string;
  pillars?: { title: BilingualText; desc: BilingualText }[];
}

export interface SanityProductsSectionHeader {
  eyebrow?: BilingualText;
  title?: BilingualText;
  description?: BilingualText;
  catalogCtaText?: BilingualText;
  catalogCta?: BilingualText;
}

export interface SanityRecipesSectionHeader {
  eyebrow?: BilingualText;
  title?: BilingualText;
  videoInstruction?: BilingualText;
  journalTag?: BilingualText;
}

export interface SanityStorageStep {
  stepNumber?: string;
  title?: BilingualText;
  desc?: BilingualText;
}

export interface SanityStorageTips {
  eyebrow?: BilingualText;
  title?: BilingualText;
  description?: BilingualText;
  steps?: SanityStorageStep[];
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
