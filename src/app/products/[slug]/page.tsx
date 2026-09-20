import { notFound } from 'next/navigation';
import { getSiteContent, getProductBySlug, getAllProductSlugs } from '@/lib/content';
import { getSanitySiteSettings } from '@/lib/sanity';
import ProductDetailsView from '@/components/ProductDetailsView';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | The Blossom Valley',
    };
  }

  return {
    title: `${product.name.en} (${product.name.ar}) — The Blossom Valley`,
    description: product.description.en,
    openGraph: {
      title: `${product.name.en} | ${product.name.ar}`,
      description: product.description.en,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [content, sanitySettings] = await Promise.all([
    getSiteContent(),
    getSanitySiteSettings(),
  ]);

  return (
    <ProductDetailsView
      product={product}
      content={content}
      allProducts={content.productsSection.allProducts}
      whatsAppNumber={sanitySettings?.whatsAppNumber}
    />
  );
}
