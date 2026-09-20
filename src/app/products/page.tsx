import { getSiteContent } from '@/lib/content';
import ProductCatalogView from '@/components/ProductCatalogView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products Catalogue | كتالوج منتجات وادي النوار — The Blossom Valley',
  description: 'Explore our farm harvest from Shaqra: Maknooz Khalas Dates, Naimi Sheep Meat, Crushed Hot Pepper, and Artisanal Dried Tomatoes.',
  openGraph: {
    title: 'Products Catalogue | وادي النوار',
    description: 'Full catalogue of farm products from Shaqra: Khalas dates, Naimi sheep meat, crushed hot pepper, and dried tomatoes.',
    images: [{ url: 'https://cdn.sanity.io/images/tokh7kkd/production/52419a85726510eeef6164cb4ab5a8f1af464a40-1376x768.jpg' }],
  },
};

export default async function ProductsCataloguePage() {
  const content = await getSiteContent();
  return <ProductCatalogView content={content} />;
}
