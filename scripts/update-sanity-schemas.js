const fs = require('fs');
const path = require('path');

const studioDir = path.resolve(__dirname, '../../blossomfarm-cms/studio');

// 1. Update aboutSection.ts
const aboutSectionPath = path.join(studioDir, 'schemaTypes/aboutSection.ts');
const aboutSectionCode = `import { defineType, defineField } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'Homepage: About Us (عن وادي النوار)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Tag (شارة القسم)',
      type: 'localeString',
      initialValue: {
        ar: 'موطننا · ٠١',
        en: 'Our home · 01',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title (العنوان الرئيسي للقسم)',
      type: 'localeString',
      initialValue: {
        ar: 'وادي النوار',
        en: 'Wadi Nawar',
      },
    }),
    defineField({
      name: 'quote',
      title: 'Highlight Quote (اقتباس المزرعة)',
      type: 'localeText',
      initialValue: {
        ar: 'بيئة زراعية هادئة في محافظة شقراء؛ من الزراعة وتربية المواشي، إلى إعداد المنتجات، بعناية فائقة وإتقان بأدق التفاصيل.',
        en: 'A peaceful farm environment in Shaqra City; from cultivation and livestock to artisan preparation, managed with dedicated care.',
      },
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs (فقرات القصة)',
      type: 'array',
      of: [{ type: 'localeText' }],
    }),
    defineField({
      name: 'image',
      title: 'Farm Photo & Video Poster (صورة المزرعة وغلاف الفيديو)',
      type: 'image',
      options: { hotspot: true },
      description: 'Main photo displayed in the About section and used as thumbnail/poster for the video player.',
    }),
    defineField({
      name: 'videoBadge',
      title: 'Video Box Badge Tag',
      type: 'localeString',
      initialValue: {
        ar: 'فيديو حصري من المزرعة',
        en: 'Farm Video Feature',
      },
    }),
    defineField({
      name: 'videoSubtitle',
      title: 'Video Box Subtitle Text',
      type: 'localeString',
      initialValue: {
        ar: 'مشاهد حية توثق عنايتنا اليومية بالمحاصيل والمواشي في شقراء',
        en: 'Authentic moments documenting our daily care in Shaqra',
      },
    }),
    defineField({
      name: 'videoFile',
      title: 'Farm Video File (ملف فيديو جولة المزرعة - MP4/WebM)',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload the farm tour video directly into Sanity.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Farm Video External URL (رابط فيديو خارجي)',
      type: 'url',
      description: 'Or paste an external video link (e.g., YouTube, Vimeo, CDN).',
    }),
    defineField({
      name: 'pillars',
      title: 'Value Pillars (الركائز والقيم)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Pillar Title', type: 'localeString' },
            { name: 'desc', title: 'Description', type: 'localeString' },
          ],
          preview: {
            select: { title: 'title.ar', subtitle: 'desc.ar' },
            prepare({ title, subtitle }) {
              return { title: title || 'Pillar', subtitle }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.ar', subtitle: 'quote.ar' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'About Section',
        subtitle: subtitle || 'About Wadi Al-Nawar Settings',
      }
    },
  },
})

export default aboutSection
`;
fs.writeFileSync(aboutSectionPath, aboutSectionCode, 'utf8');
console.log('Updated aboutSection.ts');

// 2. Update recipeItem.ts
const recipeItemPath = path.join(studioDir, 'schemaTypes/recipeItem.ts');
const recipeItemCode = `import { defineType, defineField } from 'sanity'

export const recipeItem = defineType({
  name: 'recipeItem',
  title: 'Homepage: Culinary Uses (طرق الاستخدام والوصفات)',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Item Number (e.g. 01, 02)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Recipe / Use Title (عنوان الاستخدام)',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Description (الوصف وطريقة التقديم)',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Dish Photo (صورة الطبق)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoFile',
      title: 'Recipe Video File (ملف فيديو الوصفة - MP4/WebM)',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload a video clip demonstrating this recipe or presentation idea.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Recipe Video External URL (رابط فيديو خارجي)',
      type: 'url',
      description: 'Or paste an external video link (e.g., YouTube, Vimeo, CDN).',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order (ترتيب العرض)',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      num: 'number',
      titleAr: 'title.ar',
      titleEn: 'title.en',
      media: 'image',
    },
    prepare({ num, titleAr, titleEn, media }) {
      return {
        title: \`\${num ? \`\${num} · \` : ''}\${titleAr || titleEn || 'Culinary Use'}\`,
        subtitle: titleEn,
        media,
      }
    },
  },
})

export default recipeItem
`;
fs.writeFileSync(recipeItemPath, recipeItemCode, 'utf8');
console.log('Updated recipeItem.ts');

// 3. Update siteSettings.ts
const siteSettingsPath = path.join(studioDir, 'schemaTypes/siteSettings.ts');
const siteSettingsCode = `import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Contact (وادي النوار)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'The Blossom Valley | وادي النوار',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share / OpenGraph Image (صورة المشاركة في السوشيال ميديا وواتساب)',
      type: 'image',
      options: { hotspot: true },
      description: 'The preview image displayed when sharing the website link on WhatsApp, Twitter, etc.',
    }),
    defineField({
      name: 'whatsAppNumber',
      title: 'WhatsApp Contact Number (رقم الواتساب)',
      type: 'string',
      description: 'The official WhatsApp number for customer orders and inquiries (e.g., +966500000000 or 0500000000).',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\\+?[0-9\\s\\-()]{8,20}$/, {
            name: 'phone number',
            invert: false,
          })
          .error('Please enter a valid phone number (e.g. +966500000000 or 0500000000)'),
    }),
    defineField({
      name: 'whatsAppDefaultMessageAr',
      title: 'Default WhatsApp Message - Arabic (رسالة الطلب بالعربي)',
      type: 'text',
      rows: 3,
      initialValue: 'مرحباً وادي النوار! أود الاستفسار عن حجز وطلب منتجات المزرعة.',
    }),
    defineField({
      name: 'whatsAppDefaultMessageEn',
      title: 'Default WhatsApp Message - English (رسالة الطلب بالإنجليزي)',
      type: 'text',
      rows: 3,
      initialValue: 'Hello The Blossom Valley, I would like to inquire about ordering your farm harvest products.',
    }),
    defineField({
      name: 'farmLocation',
      title: 'Farm Location Text (مقر المزرعة)',
      type: 'string',
      initialValue: 'محافظة شقراء، المملكة العربية السعودية',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link (رابط خرائط جوجل)',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'whatsAppNumber',
      media: 'ogImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle ? \`WhatsApp: \${subtitle}\` : 'No phone set',
        media,
      }
    },
  },
})

export default siteSettings
`;
fs.writeFileSync(siteSettingsPath, siteSettingsCode, 'utf8');
console.log('Updated siteSettings.ts');

