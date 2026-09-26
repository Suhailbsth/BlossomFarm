export type Language = 'en' | 'ar';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface CulinaryIdea {
  title: BilingualText;
  prepTime?: string;
  description: BilingualText;
  servingSuggestion?: BilingualText;
}

export interface ProductVarietyItem {
  id: string;
  name: BilingualText;
  subtitle?: BilingualText;
  arabicSubtitle?: string;
  badge?: BilingualText;
  description: BilingualText;
  tasteNotes?: BilingualText[];
  image?: string;
}

export interface ProductItem {
  id: string; // Dynamic slug used in /products/[slug]
  categoryKey: 'dates' | 'meat' | 'pepper' | 'dried-tomatoes' | string;
  name: BilingualText;
  subtitle?: BilingualText;
  arabicSubtitle?: string;
  category: BilingualText;
  tagline?: BilingualText;
  badge?: BilingualText;
  icon?: string;
  accentColor?: string;
  description: BilingualText;
  story?: BilingualText;
  image: string;
  gallery?: string[];
  inSeason: boolean;
  highlights?: BilingualText[];
  specs?: {
    label: BilingualText;
    value: BilingualText;
  }[];
  varieties?: ProductVarietyItem[];
  seasonalFlavors?: BilingualText[];
  bestPairedWith?: BilingualText;
  culinaryUses?: CulinaryIdea[];
  storageSpecific?: BilingualText;
}

export interface ValuePillar {
  id: string;
  title: BilingualText;
  description: BilingualText;
  iconName?: 'leaf' | 'droplet' | 'sun' | 'heart' | 'sparkles' | 'shieldCheck' | string;
  highlight?: BilingualText;
}

export interface FarmStat {
  value: string;
  suffix?: string;
  label: BilingualText;
  sublabel: BilingualText;
}

export interface HowToUseItem {
  id: string;
  name: BilingualText;
  category: 'classic' | 'saudi';
  iconName: string;
  description?: BilingualText;
}

export interface RecipeItem {
  id: string;
  number: string;
  title: BilingualText;
  subtitle: BilingualText;
  image: string;
  videoUrl?: string;
  videoFileUrl?: string;
  displayOrder?: number;
  prepTime?: BilingualText;
  servings?: BilingualText;
  ingredients?: BilingualText[];
  steps?: BilingualText[];
  chefTip?: BilingualText;
  audioUrl?: string;
}

export interface NaimiSectionContent {
  eyebrow: BilingualText;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  badge: BilingualText;
  imageUrl: string;
  images?: string[];
  gallery?: string[];
  videoUrl?: string;
  videoFileUrl?: string;
  highlights?: BilingualText[];
  specs?: { label: BilingualText; value: BilingualText }[];
  ctaWhatsApp: BilingualText;
  ctaSecondaryText: BilingualText;
}

export interface RecipesSection {
  eyebrow?: BilingualText;
  title?: BilingualText;
  videoInstruction?: BilingualText;
  journalTag?: BilingualText;
  items: RecipeItem[];
}

export interface StorageStep {
  stepNumber: number;
  title: BilingualText;
  description: BilingualText;
  iconName?: 'snowflake' | 'droplets' | 'spoon' | 'shieldAlert' | 'clock' | string;
}

export interface DynamicCategoryItem {
  id: string;
  slug: string;
  title: BilingualText;
  badge?: BilingualText;
  description?: BilingualText;
  image?: string;
  icon?: string;
  showOnHome: boolean;
  homeOrder?: number;
  displayMode?: 'editorial' | 'swatches' | 'grid' | string;
  gridColumns?: 'auto' | '1' | '2' | '3' | '4' | string;
  homeLayoutStyle?: string;
  featuredProducts?: ProductItem[];
  allCategoryProducts?: ProductItem[];
  seasonalFlavors?: BilingualText[];
}

export interface HeroSlide {
  src: string;
  alt: string;
  caption: string;
  captionBilingual?: BilingualText;
}

export interface SiteContent {
  brand: {
    name: BilingualText;
    tagline: BilingualText;
    closingTagline: BilingualText;
    badge: BilingualText;
    locationShort: BilingualText;
    siteLogoUrl?: string;
    siteFaviconUrl?: string;
  };
  navigation: {
    about: BilingualText;
    products: BilingualText;
    dates: BilingualText;
    meat: BilingualText;
    pepper: BilingualText;
    driedTomatoes: BilingualText;
    howToUse: BilingualText;
    storage: BilingualText;
    contact: BilingualText;
  };
  hero: {
    welcomeBadge: BilingualText;
    heading: BilingualText;
    subheading: BilingualText;
    description: BilingualText;
    ctaProducts: BilingualText;
    ctaWhatsApp: BilingualText;
    ctaSecondaryText: BilingualText;
    statsPill: BilingualText;
    heroImageUrl?: string;
    heroImages?: string[];
    slides?: HeroSlide[];
    videoUrl?: string;
    videoFileUrl?: string;
    posterImageUrl?: string;
    whatsAppNumber?: string;
  };
  naimiSection?: NaimiSectionContent;
  about: {
    eyebrow: BilingualText;
    title: BilingualText;
    quote: BilingualText;
    quoteAuthor?: BilingualText;
    storyParagraphs: BilingualText[];
    imageUrl?: string;
    images?: string[];
    gallery?: string[];
    videoPlaceholder: {
      title: BilingualText;
      subtitle: BilingualText;
      poster: string;
      tag: BilingualText;
      note: BilingualText;
    };
    videoFileUrl?: string;
    videoUrl?: string;
    pillarsTitle?: BilingualText;
    pillars: ValuePillar[];
    stats?: FarmStat[];
  };
  productsSection: {
    eyebrow: BilingualText;
    title: BilingualText;
    description: BilingualText;
    catalogCta: BilingualText;
    dynamicCategories?: DynamicCategoryItem[];
    categories: {
      dates: {
        id: string;
        title: BilingualText;
        badge: BilingualText;
        description: BilingualText;
        image: string;
        varieties: ProductVarietyItem[];
      };
      meat: {
        id: string;
        title: BilingualText;
        badge: BilingualText;
        description: BilingualText;
        feedHighlight: BilingualText;
        image: string;
        points: BilingualText[];
      };
      pepper: {
        id: string;
        title: BilingualText;
        tagline: BilingualText;
        badge: BilingualText;
        description: BilingualText;
        image: string;
        points: BilingualText[];
      };
      driedTomatoes: {
        id: string;
        title: BilingualText;
        badge: BilingualText;
        description: BilingualText;
        image: string;
        flavors: ProductVarietyItem[];
        seasonalTitle: BilingualText;
        seasonalSubtitle: BilingualText;
        seasonalFlavors: BilingualText[];
      };
    };
    allProducts: ProductItem[];
  };
  howToUseSection: {
    eyebrow: BilingualText;
    title: BilingualText;
    description: BilingualText;
    classicSectionTitle: BilingualText;
    saudiSectionTitle: BilingualText;
    items: HowToUseItem[];
  };
  recipesSection?: RecipesSection;
  storagePracticeSection: {
    eyebrow: BilingualText;
    title: BilingualText;
    subtitle: BilingualText;
    bannerNote: BilingualText;
    items: StorageStep[];
  };
  footer: {
    badge: BilingualText;
    closingTagline: BilingualText;
    closingTaglineMeaning: BilingualText;
    whatsAppPrompt: BilingualText;
    whatsAppBtn: BilingualText;
    whatsAppNumber: string;
    whatsAppPrefillEn: string;
    whatsAppPrefillAr: string;
    whatsAppFloatingButtonText?: BilingualText;
    locationTitle: BilingualText;
    locationAddress: BilingualText;
    googleMapsUrl: string;
    sharePrompt: BilingualText;
    rights: BilingualText;
    commercialRegistration?: string;
    copyrightText?: BilingualText;
    socialLinks?: { platform: string; url: string }[];
  };
}
