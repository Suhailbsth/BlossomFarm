export type Language = 'en' | 'ar';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface TomatoVariety {
  id: string;
  name: BilingualText;
  arabicSubtitle?: string;
  category: BilingualText;
  description: BilingualText;
  tasteNotes: BilingualText[];
  sweetness: number; // 1 to 5
  acidity: number; // 1 to 5
  umami: number; // 1 to 5
  inSeason: boolean;
  image: string;
  bestPairedWith: BilingualText;
}

export interface VideoItem {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  duration: string;
  tag: BilingualText;
  thumbnail: string;
  videoSrc?: string; // Optional actual MP4 or ambient preview loop
  type: 'featured' | 'short';
  description: BilingualText;
}

export interface ValuePillar {
  id: string;
  title: BilingualText;
  description: BilingualText;
  iconName: 'leaf' | 'droplet' | 'sun' | 'heart' | 'sparkles' | 'shieldCheck';
  highlight: BilingualText;
}

export interface FarmStat {
  value: string;
  suffix?: string;
  label: BilingualText;
  sublabel: BilingualText;
}

export interface SiteContent {
  brand: {
    name: BilingualText;
    tagline: BilingualText;
    badge: BilingualText;
    locationShort: BilingualText;
  };
  navigation: {
    story: BilingualText;
    tomatoes: BilingualText;
    videos: BilingualText;
    visit: BilingualText;
    contact: BilingualText;
  };
  hero: {
    welcomeBadge: BilingualText;
    heading: BilingualText;
    subheading: BilingualText;
    description: BilingualText;
    ctaHarvest: BilingualText;
    ctaWhatsApp: BilingualText;
    statsPill: BilingualText;
  };
  about: {
    eyebrow: BilingualText;
    title: BilingualText;
    quote: BilingualText;
    quoteAuthor: BilingualText;
    storyParagraphs: BilingualText[];
    pillarsTitle: BilingualText;
    pillars: ValuePillar[];
    stats: FarmStat[];
  };
  tomatoesSection: {
    eyebrow: BilingualText;
    title: BilingualText;
    description: BilingualText;
    flavorProfileLabel: BilingualText;
    sweetnessLabel: BilingualText;
    acidityLabel: BilingualText;
    umamiLabel: BilingualText;
    pairingLabel: BilingualText;
    inSeasonBadge: BilingualText;
    limitedBadge: BilingualText;
    items: TomatoVariety[];
  };
  videosSection: {
    eyebrow: BilingualText;
    title: BilingualText;
    description: BilingualText;
    featuredLabel: BilingualText;
    shortsLabel: BilingualText;
    playLabel: BilingualText;
    items: VideoItem[];
  };
  footer: {
    badge: BilingualText;
    tagline: BilingualText;
    whatsAppPrompt: BilingualText;
    whatsAppBtn: BilingualText;
    whatsAppNumber: string;
    whatsAppPrefillEn: string;
    whatsAppPrefillAr: string;
    visitingHoursTitle: BilingualText;
    visitingHours: BilingualText;
    locationTitle: BilingualText;
    locationAddress: BilingualText;
    googleMapsUrl: string;
    sharePrompt: BilingualText;
    rights: BilingualText;
  };
}
