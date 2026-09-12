import { SiteContent } from '@/types/content';
import staticContent from '@/data/content.json';

// ─────────────────────────────────────────────────
// Static Fallback Content (loaded from JSON)
// ─────────────────────────────────────────────────
// The JSON shape maps 1:1 to SiteContent type.
// Every BilingualText field is { en: string, ar: string }.
// When you set up Sanity, each top-level key becomes a
// Sanity document type (e.g. "brand", "tomatoesSection").
//
const fallbackContent: SiteContent = staticContent as SiteContent;

// ─────────────────────────────────────────────────
// CMS-Ready Data Fetcher
// ─────────────────────────────────────────────────
// CURRENT: Returns typed static JSON content.
//
// TO CONNECT SANITY:
// 1. Install: npm i next-sanity @sanity/image-url
// 2. Create src/lib/sanity.client.ts with your project config
// 3. Replace the body of this function with a GROQ query:
//
//    import { client } from './sanity.client';
//
//    export async function getSiteContent(): Promise<SiteContent> {
//      const data = await client.fetch(`{
//        "brand": *[_type == "brand"][0],
//        "hero": *[_type == "hero"][0],
//        "about": *[_type == "about"][0],
//        "tomatoesSection": *[_type == "tomatoesSection"][0]{
//          ...,
//          items[]{ ..., "image": image.asset->url }
//        },
//        "videosSection": *[_type == "videosSection"][0]{
//          ...,
//          items[]{ ..., "thumbnail": thumbnail.asset->url }
//        },
//        "storageTipsSection": *[_type == "storageTipsSection"][0],
//        "recipeVideosSection": *[_type == "recipeVideosSection"][0]{
//          ...,
//          items[]{ ..., "thumbnail": thumbnail.asset->url }
//        },
//        "footer": *[_type == "footer"][0],
//        "navigation": *[_type == "navigation"][0],
//      }`);
//      return data as SiteContent;
//    }
//
// That's it. Components don't change at all.
// ─────────────────────────────────────────────────

export async function getSiteContent(): Promise<SiteContent> {
  return fallbackContent;
}
