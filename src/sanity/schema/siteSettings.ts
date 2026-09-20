/**
 * Sanity Studio Schema: siteSettings
 * 
 * You can copy/import this schema directly into your Sanity Studio:
 * `export const schemaTypes = [siteSettings, ...]`
 */
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings & Contact',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'The Blossom Valley | وادي النوار',
    },
    {
      name: 'whatsAppNumber',
      title: 'WhatsApp Contact Number',
      type: 'string',
      description: 'The official WhatsApp phone number for customer orders and inquiries (e.g., +966500000000 or 0500000000).',
      validation: (Rule: any) =>
        Rule.regex(
          /^\+?[0-9\s\-()]{8,20}$/,
          {
            name: 'phone number',
            invert: false,
          }
        ).warning('Please enter a valid international or Saudi local phone number (e.g., +966 50 123 4567 or 0501234567)'),
    },
    {
      name: 'whatsAppDefaultMessageAr',
      title: 'Default WhatsApp Message (Arabic)',
      type: 'text',
      rows: 3,
      description: 'Default text when an Arabic customer clicks the WhatsApp button.',
      initialValue: 'السلام عليكم وادي النوار، أود الاستفسار عن المنتجات وحجز طلب.',
    },
    {
      name: 'whatsAppDefaultMessageEn',
      title: 'Default WhatsApp Message (English)',
      type: 'text',
      rows: 3,
      description: 'Default text when an English customer clicks the WhatsApp button.',
      initialValue: 'Hello The Blossom Valley, I would like to inquire about ordering your farm harvest.',
    },
    {
      name: 'ogImage',
      title: 'Social Share / OpenGraph Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'localeText',
    },
    {
      name: 'brandClosingTagline',
      title: 'Brand Slogan & Tagline',
      type: 'localeString',
    },
    {
      name: 'commercialRegistration',
      title: 'Commercial Registration / License',
      type: 'string',
    },
    {
      name: 'copyrightText',
      title: 'Copyright Statement',
      type: 'localeString',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Channels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'Profile URL', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'farmLocation',
      title: 'Farm Location Description',
      type: 'string',
      initialValue: 'محافظة شقراء، المملكة العربية السعودية',
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'whatsAppNumber',
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle ? `WhatsApp: ${subtitle}` : 'No phone set',
      };
    },
  },
};

export default siteSettingsSchema;
