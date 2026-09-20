const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../../blossomfarm-cms/studio/data.ndjson');

// Uploaded asset IDs from Sanity CDN
const ASSETS = {
  dates: 'image-a78d2e5d99199c70fcafd600f47d933f7e896652-1200x896-jpg',
  datesRoyal: 'image-c5d2fb8b846e744099e353d012daf3f6b0c8d925-1200x896-jpg',
  datesPremium: 'image-b174420cb62073e46fd7e95dcddaf94dd41b773b-1200x896-jpg',
  meat: 'image-221ad7231928a779043d475e817f93759b9fc450-1200x896-jpg',
  pepper: 'image-2cb38f8353664082ac3cad5a24153a60090a0f6a-1200x896-jpg',
  tomatoes: 'image-3a5f8e54412cb3e94197930d8a955cf68898fc46-1200x896-jpg',
  tomatoesQatfa: 'image-58b098120c078f918187d811afcabe843da31edb-1200x896-jpg',
  tomatoesSignature: 'image-8ccc06506bc27f624b1d8a6c622bc432e02655cb-1200x896-jpg',
  farm: 'image-52419a85726510eeef6164cb4ab5a8f1af464a40-1376x768-jpg',
  wadiNawar: 'image-3289afe6440bc9cfdf72314c627ba948ba325ea2-1600x1104-jpg',
  // Recipes
  recipeEdamat: 'image-ce32bd1c5f991c740a40ad11105faede872c225f-1024x1024-jpg',
  recipeDips: 'image-aab6d4197ee893e7c320dd74881d7a41b6114744-1024x1024-jpg',
  recipeKashna: 'image-4857e3ed1e05cffca5eca49573f137da8441a021-1024x1024-jpg',
  recipeSalad: 'image-3db7c9046d9ade796a1b9ad0292a572b4dda5142-1024x1024-jpg',
  recipePasta: 'image-784402429e52d14872bb0c643440ca8615694934-1024x1024-jpg',
  recipeSandwich: 'image-295d34646afca9dfbee9e805f8769052b71b66d3-1024x1024-jpg',
};

function imageRef(assetId) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  };
}

function fileRef(assetId) {
  return {
    _type: 'file',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  };
}

const docs = [
  // 1. Site Settings
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'The Blossom Valley | وادي النوار',
    ogImage: imageRef('image-3289afe6440bc9cfdf72314c627ba948ba325ea2-1600x1104-jpg'),
    metaDescription: {
      ar: 'منتجات طبيعية غنية بالنكهة، مزروعة بعناية فائقة في وادي النوار بمحافظة شقراء. تمور خلاص، لحم نعيمي، فلفل حار، وطماطم مجففة فاخرة.',
      en: 'Naturally vibrant products, grown with care in Wadi Al-Nawar, Shaqra. Khalas Dates, Naimi Sheep, Hot Pepper, and Artisanal Dried Tomatoes.',
    },
    brandClosingTagline: {
      ar: 'وادي النوار – بلوسوم فالي / من أرضنا… إلى مائدتكم',
      en: 'The Blossom Valley — From our land… to your table.',
    },
    commercialRegistration: '',
    copyrightText: {
      ar: 'جميع الحقوق محفوظة © 2026 مزارع وادي النوار',
      en: 'All rights reserved © 2026 The Blossom Valley Farms',
    },
    socialLinks: [
      { _key: 'soc-1', platform: 'instagram', url: 'https://instagram.com' },
      { _key: 'soc-2', platform: 'x', url: 'https://x.com' },
    ],
    whatsAppNumber: '+966500000000',
    whatsAppDefaultMessageAr: 'مرحباً وادي النوار! أود الاستفسار عن حجز وطلب منتجات المزرعة (تمر الخلاص المكنوز، ذبائح النعيمي، الفلفل المجروش، أو الطماطم المجففة).',
    whatsAppDefaultMessageEn: 'Hello The Blossom Valley! I would like to inquire about ordering your farm harvest (Khalas dates, Naimi meat, crushed pepper, or dried tomatoes).',
    farmLocation: 'محافظة شقراء، المملكة العربية السعودية',
    googleMapsUrl: 'https://maps.google.com/?q=Shaqra+Saudi+Arabia',
  },

  // 1.5 Products Section Header
  {
    _id: 'productsSection',
    _type: 'productsSection',
    eyebrow: {
      ar: 'قطفناها للتو · ٠٢',
      en: 'Freshly picked · 02',
    },
    title: {
      ar: 'محاصيلنا، بطعم الكمال.',
      en: 'The harvest, perfected.',
    },
    description: {
      ar: 'طبيعية، غنية بالنكهة، ومزروعة بعناية في محافظة شقراء.',
      en: 'Naturally vibrant. Full of flavour. Grown close to home in Shaqra.',
    },
    catalogCta: {
      ar: 'عرض كامل قائمة المنتجات',
      en: 'Browse full pantry catalog',
    },
  },

  // 1.6 Recipes Section Header
  {
    _id: 'recipesSection',
    _type: 'recipesSection',
    eyebrow: {
      ar: 'من مطبخنا · ٠٤',
      en: 'From our kitchen · 04',
    },
    title: {
      ar: 'طرق الاستخدام والتقديم',
      en: 'Ways to savour',
    },
    videoInstruction: {
      ar: 'انقر على أي طريقة لمشاهدة الفيديو',
      en: 'Click any dish to watch video',
    },
    journalTag: {
      ar: 'THE FARM JOURNAL / 2026',
      en: 'THE FARM JOURNAL / 2026',
    },
  },

  // 2. Hero Section
  {
    _id: 'heroSection',
    _type: 'heroSection',
    welcomeBadge: {
      ar: 'السلام عليكم · وادي النوار',
      en: 'Assalamu Alaikum · Wadi Al-Nawar',
    },
    heading: {
      ar: 'وادي النوار',
      en: 'The Blossom Valley',
    },
    subheading: {
      ar: 'أرض سعودية، وشمس دافئة، ومنتجات نزرعها ونرعاها بكل عناية في محافظة شقراء.',
      en: 'Saudi soil, generous sun, and products grown with thoughtful care in Shaqra.',
    },
    ctaDiscover: {
      ar: 'اكتشف خيرات المزرعة',
      en: 'Discover the harvest',
    },
    harvestBadge: {
      ar: 'محصول رقم ٠١',
      en: 'Harvest No. 01',
    },
    heroImage: imageRef(ASSETS.tomatoes),
  },

  // 3. About Section
  {
    _id: 'aboutSection',
    _type: 'aboutSection',
    eyebrow: {
      ar: 'موطننا · ٠١',
      en: 'Our home · 01',
    },
    title: {
      ar: 'وادي النوار',
      en: 'Wadi Nawar',
    },
    quote: {
      ar: 'وادٍ أخضر حيث تجتمع الشمس والتربة والرعاية لتنبض كل مواسم الحصاد بالحياة.',
      en: 'A green valley where sun, soil and care bring every harvest to life.',
    },
    storyParagraphs: [
      {
        ar: 'تقع مزرعتنا في محافظة شقراء؛ بيئة زراعية هادئة حيث تُدار كل مرحلة — من الزراعة وتربية الماشية، إلى إعداد المنتجات وتوصيلها — بعناية فائقة. نركز دوماً على الجودة والاهتمام الصادق بأدق التفاصيل لتقديم أنقى خيرات الأرض.',
        en: 'Located in Shaqra city, a peaceful farm environment where every stage — from farming and raising animals, to preparing and delivering products — is carefully managed with unwavering focus on quality and attention to small details.',
      },
    ],
    image: imageRef('image-3289afe6440bc9cfdf72314c627ba948ba325ea2-1600x1104-jpg'),
    videoBadge: {
      ar: 'فيديو حصري من المزرعة',
      en: 'Farm Video Feature',
    },
    videoSubtitle: {
      ar: 'مشاهد حية توثق عنايتنا اليومية بالمحاصيل والمواشي في شقراء',
      en: 'Authentic moments documenting our daily care in Shaqra',
    },
    videoFile: fileRef('file-7e7dc11bba88d2d8a1b5cb52a947d5ea2b13eda1-mp4'),
    pillars: [
      {
        _key: 'pil-1',
        title: { ar: 'محافظة شقراء', en: 'Shaqra Terroir' },
        desc: { ar: 'أرض نجد الأصيلة وشمسها الدافئة', en: 'Pure soil, generous sunlight' },
      },
      {
        _key: 'pil-2',
        title: { ar: 'عناية متكاملة', en: 'End-to-End Care' },
        desc: { ar: 'من البذرة والتربية حتى مائدتك', en: 'From seedling & herd to table' },
      },
      {
        _key: 'pil-3',
        title: { ar: 'جودة نقية', en: 'Natural Purity' },
        desc: { ar: 'برسيم أخضر ورعاية فائقة', en: 'Farm-grown feed & high standards' },
      },
    ],
  },

  // 4. Storage Guidelines
  {
    _id: 'storageTips',
    _type: 'storageTips',
    eyebrow: { ar: 'ملاحظات الحقل · ٠٣', en: 'Field notes · 03' },
    title: {
      ar: 'إرشادات حفظ الطماطم المجففة',
      en: 'Preserving our dried tomatoes',
    },
    description: {
      ar: 'للحفاظ على جودة النكهة والقوام لأطول فترة ممكنة، نوصي باتباع الخطوات التالية:',
      en: 'To maintain the best texture, fragrance, and longevity, follow these five field rules:',
    },
    items: [
      {
        _key: 'st-1',
        stepNumber: '01',
        title: { ar: 'يحفظ في الثلاجة بعد الفتح', en: 'Store in the fridge after opening' },
        desc: { ar: 'احرص على حفظ البرطمان في الثلاجة مباشرة بعد فتحه لضمان سلامة الطماطم وزيت الزيتون.', en: 'Always place the jar in the refrigerator once opened to maintain optimal freshness.' },
      },
      {
        _key: 'st-2',
        stepNumber: '02',
        title: { ar: 'غمر الطماطم بالكامل في زيت الزيتون', en: 'Keep fully submerged in olive oil' },
        desc: { ar: 'يعمل زيت الزيتون كطبقة حماية طبيعية تمنع دخول الهواء، فتأكد دائماً من تغطية جميع الحبات بالزيت.', en: 'Ensure tomatoes remain completely covered by extra virgin olive oil to prevent air contact.' },
      },
      {
        _key: 'st-3',
        stepNumber: '03',
        title: { ar: 'ملعقة نظيفة وجافة تماماً', en: 'Use a clean, dry spoon' },
        desc: { ar: 'استخدم دائماً ملعقة نظيفة وجافة تماماً عند إخراج الطماطم لتجنب أي تلوث.', en: 'Always use a thoroughly clean and dry spoon or utensil when removing tomatoes from the jar.' },
      },
      {
        _key: 'st-4',
        stepNumber: '04',
        title: { ar: 'تجنب دخول أي قطرة ماء أو رطوبة', en: 'Never let water or moisture into jar' },
        desc: { ar: 'الرطوبة وقطرات الماء تضر بحفظ المنتجات الطبيعية؛ احرص على بقاء البرطمان جافاً تماماً.', en: 'Moisture compromise preservation. Never allow water drops or damp utensils inside.' },
      },
      {
        _key: 'st-5',
        stepNumber: '05',
        title: { ar: 'أخذ الكمية المطلوبة وإعادتها فوراً', en: 'Take needed amount, return immediately' },
        desc: { ar: 'خذ فقط الكمية التي ستحتاجها للطهي أو التقديم، ثم أعد البرطمان فوراً إلى الثلاجة.', en: 'Remove only what you plan to enjoy, then promptly return the sealed jar back to the fridge.' },
      },
    ],
  },

  // 5. Recipe / Culinary Ideas
  {
    _id: 'recipe-01',
    _type: 'recipeItem',
    number: '01',
    displayOrder: 1,
    title: { ar: 'الإيدامات السعودية', en: 'Saudi Stews (Edamat)' },
    subtitle: { ar: 'تُضاف مع تسبك الإيدام لتعطي قواماً غنياً ولوناً عميقاً وحلاوة طبيعية ترفع طعم الخضار واللحم.', en: 'Simmered in meat or vegetable stews to impart natural umami sweetness and rich color.' },
    image: imageRef(ASSETS.recipeEdamat),
  },
  {
    _id: 'recipe-02',
    _type: 'recipeItem',
    number: '02',
    displayOrder: 2,
    title: { ar: 'التغميسات المبتكرة', en: 'Artisan Dips & Spreads' },
    subtitle: { ar: 'تُخلط مع اللبنة، أو جبنة الفيتا، أو الطحينة بالثوم لابتكار أروع تغميسة للمائدة والضيافة.', en: 'Blended with labneh, creamy feta, or garlic tahini for irresistible mezze dips.' },
    image: imageRef(ASSETS.recipeDips),
  },
  {
    _id: 'recipe-03',
    _type: 'recipeItem',
    number: '03',
    displayOrder: 3,
    title: { ar: 'كشنة الجريش والكبسة', en: 'Kashna for Jareesh & Kabsa' },
    subtitle: { ar: 'تُشوح مع البصل والسمن البري واللومي ككشنة فاخرة تتوج طبق الجريش النجدي والكبسة الشهية.', en: 'Lightly sautéed with ghee and black lemon as an aromatic topping for Jareesh & Kabsa.' },
    image: imageRef(ASSETS.recipeKashna),
  },
  {
    _id: 'recipe-04',
    _type: 'recipeItem',
    number: '04',
    displayOrder: 4,
    title: { ar: 'السلطات وجبن البوراتا', en: 'Salads & Burrata' },
    subtitle: { ar: 'تُخلط مع أوراق الجرجير، وجبنة البوراتا الطازجة، أو الكينوا مع قطرات من زيت التتبيلة.', en: 'Tossed with wild baby arugula, creamy burrata, or artisan mozzarella.' },
    image: imageRef(ASSETS.recipeSalad),
  },
  {
    _id: 'recipe-05',
    _type: 'recipeItem',
    number: '05',
    displayOrder: 5,
    title: { ar: 'المكرونة والبيتزا الحرفية', en: 'Pasta & Sourdough Pizza' },
    subtitle: { ar: 'تُقلب مع المكرونة الساخنة وزيت الزيتون، أو فوق فطائر البيتزا والفوكاتشيا.', en: 'Folded into warm fettuccine or scattered over sourdough flatbreads and pizzas.' },
    image: imageRef(ASSETS.recipePasta),
  },
  {
    _id: 'recipe-06',
    _type: 'recipeItem',
    number: '06',
    displayOrder: 6,
    title: { ar: 'الساندويتشات والأجبان والخبز الساخن', en: 'Sandwiches, Cheese & Bread' },
    subtitle: { ar: 'مع الحلوم المشوي، والديك الرومي، وأطباق المقبلات والخبز المحمص الساخن.', en: 'Layered with grilled halloumi, roasted turkey, artisan cheeses, and warm crusty bread.' },
    image: imageRef(ASSETS.recipeSandwich),
  },

  // 6. Categories (Taxonomy)
  {
    _id: 'category-dates',
    _type: 'category',
    title: { ar: 'مكنوز — تمر الخلاص', en: 'Maknooz — Khalas Dates' },
    slug: { _type: 'slug', current: 'dates' },
    badge: { ar: 'من نخيل المزرعة بشقراء', en: 'From Our Own Palms in Shaqra' },
    description: {
      ar: 'تمر خلاص فاخر من نخيل المزرعة بشقراء، مقطوف ومفروز ومكنوز بعناية تامة وبطرق زراعية طبيعية وبأقل قدر من المبيدات.',
      en: 'Khalas dates harvested from the farm palm trees in Shaqra, carefully harvested, sorted, and packed using natural farming methods with minimal pesticides.',
    },
    image: imageRef(ASSETS.dates),
    showOnHome: true,
    homeOrder: 1,
    displayMode: 'swatches',
    gridColumns: '3',
    featuredProducts: [
      { _type: 'reference', _ref: 'product-royal-khalas', _key: 'fp-1' },
      { _type: 'reference', _ref: 'product-premium-khalas', _key: 'fp-2' },
      { _type: 'reference', _ref: 'product-classic-khalas', _key: 'fp-3' },
    ],
  },
  {
    _id: 'category-meat',
    _type: 'category',
    title: { ar: 'ذبائح الخرفان النعيمي', en: 'Naimi Sheep Meat' },
    slug: { _type: 'slug', current: 'meat' },
    badge: { ar: 'تربية مزرعة • علف برسيم طازج', en: 'Farm-Raised • Fresh Alfalfa Fed' },
    description: {
      ar: 'خرفان نعيمي أصيلة مرباة في بيئة المزرعة الهادئة، تتغذى يومياً على البرسيم الأخضر الطازج المزروع في أرضنا، برعاية صحية وبيطرية متكاملة تضمن طيب اللحم وطراوته.',
      en: 'Farm-raised Naimi sheep, fed exclusively on farm-grown fresh green alfalfa, carefully managed for supreme tenderness and wholesome quality.',
    },
    image: imageRef(ASSETS.meat),
    showOnHome: true,
    homeOrder: 2,
    displayMode: 'editorial',
    gridColumns: '1',
    featuredProducts: [
      { _type: 'reference', _ref: 'product-naimi-sheep', _key: 'fp-4' },
    ],
  },
  {
    _id: 'category-pepper',
    _type: 'category',
    title: { ar: 'فلفل حار مجروش', en: 'Crushed Hot Pepper' },
    slug: { _type: 'slug', current: 'pepper' },
    badge: { ar: 'فلفل شقراء الأصيل', en: 'Shaqra Heirloom Chili' },
    description: {
      ar: 'فلفل حار منتقى من محاصيلنا في شقراء، مجفف بعناية ومجروش بدرجة مثالية ليعطي لوناً أحمر فاقعاً ونكهة حارة عطرية مميزة تضيف حياة لأطباقك.',
      en: 'Sun-dried Shaqra peppers crushed to perfection, retaining their fiery kick, vibrant crimson color, and smoky aromatic warmth.',
    },
    image: imageRef(ASSETS.pepper),
    showOnHome: true,
    homeOrder: 3,
    displayMode: 'editorial',
    gridColumns: '1',
    featuredProducts: [
      { _type: 'reference', _ref: 'product-crushed-hot-pepper', _key: 'fp-5' },
    ],
  },
  {
    _id: 'category-dried-tomatoes',
    _type: 'category',
    title: { ar: 'الطماطم المجففة', en: 'Dried Tomatoes' },
    slug: { _type: 'slug', current: 'dried-tomatoes' },
    badge: { ar: 'المنتج المميز والأكثر تفصيلاً', en: 'Flagship Artisan Product' },
    description: {
      ar: 'طماطم مختارة بعناية فائقة، مجففة ببطء للحفاظ على تركيز النكهة الطبيعية وقوامها الطري، ومغمورة بزيت زيتون بكر ممتاز وتتبيلات حرفية خاصة.',
      en: 'Selected farm tomatoes, carefully dried to preserve concentrated umami, natural sweetness, and supple texture. Submerged in premium extra virgin olive oil with bespoke herb blends.',
    },
    image: imageRef(ASSETS.tomatoes),
    showOnHome: true,
    homeOrder: 4,
    displayMode: 'grid',
    gridColumns: '3',
    featuredProducts: [
      { _type: 'reference', _ref: 'product-dried-tomato-qatfa', _key: 'fp-6' },
      { _type: 'reference', _ref: 'product-dried-tomato-signature', _key: 'fp-7' },
      { _type: 'reference', _ref: 'product-dried-tomato-lahab', _key: 'fp-8' },
    ],
    seasonalFlavors: [
      { ar: 'التين', en: 'Fig' },
      { ar: 'الرمان', en: 'Pomegranate' },
      { ar: 'الكاكا', en: 'Persimmon' },
      { ar: 'الليمون الأسود (اللومي)', en: 'Black Lemon' },
      { ar: 'ليمون أبو زهيرة', en: 'Abu Zahirah Lemon' },
      { ar: 'الريحان', en: 'Fresh Basil' },
      { ar: 'المكسرات المحمصة', en: 'Roasted Nuts' },
    ],
  },

  // 7. Products with uploaded Sanity image assets
  {
    _id: 'product-royal-khalas',
    _type: 'product',
    icon: '✦',
    accentColor: 'gold',
    name: { ar: 'الخلاص الملكي', en: 'Royal Khalas' },
    slug: { _type: 'slug', current: 'royal-khalas' },
    category: { _type: 'reference', _ref: 'category-dates' },
    arabicSubtitle: 'حبة فاخرة، حجم استثنائي ومذاق غني',
    badge: { ar: 'انتقاء ملكي خاص', en: 'Royal Reserve' },
    tagline: { ar: 'أعلى درجات الحجم والمذاق من نخيل وادي النوار بشقراء.', en: 'Top size and majestic flavor from our own palms in Shaqra.' },
    description: {
      ar: 'الدرجة الأولى الاستثنائية من تمر الخلاص المكنوز. تم جنيه من أفضل نخيل مزرعتنا في شقراء، وفُرز يدوياً لضمان حجم الحبة الكبير وامتلائها بالدبس الطبيعي الذهبي ومذاق الكراميل الفاخر.',
      en: 'Our highest grade of Maknooz Khalas dates. Harvested only from our oldest, most generous palm trees in Shaqra, carefully hand-sorted to ensure every date is large, translucent with golden date syrup, and rich in delicate caramel notes.',
    },
    story: {
      ar: 'تغذت النخيل على مياه شقراء العذبة وشمس نجد الدافئة، ونضجت ببطء دون أي مسرعات كيميائية، ثم كُنزت بطريقة تقليدية نقية تحفظ رحيقها الطبيعي لأطول فترة.',
      en: 'Nurtured by the deep aquifers of Shaqra and the golden desert sun, our dates ripen without chemical accelerators. Once picked at full maturity, they are cleaned, pressed naturally, and aged until the date honey glistens through every fruit.',
    },
    image: imageRef(ASSETS.datesRoyal),
    gallery: [imageRef(ASSETS.datesRoyal), imageRef(ASSETS.dates)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 1,
    bestPairedWith: { ar: 'القهوة السعودية الشقراء بالهيل والزعفران', en: 'Hot Saudi coffee infused with cardamom and saffron' },
    storageSpecific: { ar: 'يحفظ في مكان بارد وجاف أو في الثلاجة.', en: 'Store in a cool, dry pantry or in the refrigerator.' },
    tasteNotes: [
      { ar: 'دبس كراميلي نقي', en: 'Caramel Nectar' },
      { ar: 'حبة كبيرة ممتلئة', en: 'Jumbo Size' },
      { ar: 'قوام مخملي يذوب', en: 'Melt-in-mouth' },
    ],
    highlights: [
      { ar: 'قطاف يدوي من نخيل المزرعة بشقراء', en: 'Handpicked from Shaqra farm palms' },
      { ar: 'خالٍ تماماً من أي سكر أو عسل صناعي', en: 'Zero glucose or artificial syrups added' },
      { ar: 'تغليف محكم يحفظ الطراوة والنكهة لأشهر', en: 'Natural vacuum packing keeps it fresh for months' },
    ],
  },
  {
    _id: 'product-premium-khalas',
    _type: 'product',
    icon: '✦',
    accentColor: 'gold',
    name: { ar: 'الخلاص الفاخر', en: 'Premium Khalas' },
    slug: { _type: 'slug', current: 'premium-khalas' },
    category: { _type: 'reference', _ref: 'category-dates' },
    arabicSubtitle: 'مختار بعناية فائقة ونكهة عميقة',
    badge: { ar: 'درجة فاخرة', en: 'Selected Grade' },
    tagline: { ar: 'مفروز بعناية لضمان تجانس اللون الذهبي والنكهة الغنية.', en: 'Carefully selected for uniform golden color and deep flavor.' },
    description: {
      ar: 'حبات متجانسة في اللون، متوازنة الحلاوة، وطازجة الدبس. فُرزت بدقة متناهية لتكون الخيار المثالي للإهداء والضيافة الراقية.',
      en: 'Uniform in color, soft in texture, and richly balanced in natural sweetness. Selected diligently from our Shaqra harvest to offer consistently outstanding quality.',
    },
    image: imageRef(ASSETS.datesPremium),
    gallery: [imageRef(ASSETS.datesPremium), imageRef(ASSETS.dates)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 2,
    bestPairedWith: { ar: 'قهوة الهيل والقشطة الطازجة', en: 'Cardamom Gahwa and artisanal cream' },
    tasteNotes: [
      { ar: 'لون عنبري متجانس', en: 'Rich Amber' },
      { ar: 'حلاوة موزونة', en: 'Balanced Sweetness' },
      { ar: 'طراوة محكمة', en: 'Tender Texture' },
    ],
  },
  {
    _id: 'product-classic-khalas',
    _type: 'product',
    icon: '✦',
    accentColor: 'gold',
    name: { ar: 'الخلاص', en: 'Khalas' },
    slug: { _type: 'slug', current: 'classic-khalas' },
    category: { _type: 'reference', _ref: 'category-dates' },
    arabicSubtitle: 'المذاق الأصيل لكل يوم مع القهوة السعودية',
    badge: { ar: 'أصيل يومي', en: 'Everyday Authentic' },
    tagline: { ar: 'طعم خلاص نجد الأصيل الذي لا تمل منه المائدة اليومية.', en: 'The everyday quintessential taste of Najd.' },
    description: {
      ar: 'طعم خلاص نجد الأصيل الذي لا تمل منه المائدة اليومية. مكنوز بأسلوب طبيعي يحفظ نضارته وطراوته.',
      en: 'The everyday quintessential taste of Najd. Packed naturally to keep its tender bite and honeyed core, ideal for daily family tables.',
    },
    image: imageRef(ASSETS.dates),
    gallery: [imageRef(ASSETS.dates)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 3,
    bestPairedWith: { ar: 'القهوة اليومية', en: 'Daily Saudi coffee' },
    tasteNotes: [
      { ar: 'نكهة الخلاص الأصيلة', en: 'Traditional Taste' },
      { ar: 'دبس طبيعي', en: 'Natural Syrup' },
      { ar: 'مثالي للمائدة اليومية', en: 'Daily Table' },
    ],
  },
  {
    _id: 'product-naimi-sheep',
    _type: 'product',
    icon: '🥩',
    accentColor: 'terracotta',
    name: { ar: 'ذبائح الخرفان النعيمي', en: 'Naimi Sheep Meat' },
    slug: { _type: 'slug', current: 'naimi-sheep' },
    category: { _type: 'reference', _ref: 'category-meat' },
    arabicSubtitle: 'تربية مزرعة شقراء على البرسيم الأخضر الطازج',
    badge: { ar: 'إنتاج مزرعتنا', en: '100% Farm Raised' },
    tagline: { ar: 'تربية خاصة في بيئة مزرعتنا بشقراء وتغذية طبيعية على البرسيم الأخضر.', en: 'Farm-raised on our own green alfalfa pastures in Shaqra.' },
    description: {
      ar: 'خرفان نعيمية سعودية أصيلة، نربيها في بيئة مزرعتنا الهادئة بشقراء وسط عناية بيطرية وصحية فائقة. تتغذى يومياً على البرسيم الأخضر الطازج الذي نزرعه بأنفسنا في حقولنا، مما يمنح اللحم طراوة استثنائية ونكهة طيبة ونظيفة تخلو تماماً من أي زفرة.',
      en: 'Authentic purebred Saudi Naimi sheep raised with utmost care in our peaceful farm environment in Shaqra. Fed exclusively on fresh green alfalfa grown in our own fields, resulting in supremely tender, sweet meat with clean aroma and zero undesirable odors.',
    },
    story: {
      ar: 'نؤمن بأن طيب اللحم يبدأ من طيب المرعى وراحة الحيوان. ترعى خرافنا بحرية، وتشرب من مياه الآبار العذبة، وتتغذى على محصول البرسيم اليومي الطازج دون أي مخصبات أو هرمونات اصطناعية.',
      en: 'We believe humane care and pure nutrition make all the difference. Our sheep graze peacefully, drink clean sweet water, and eat fresh green alfalfa harvested daily from our farm plots, with absolutely no synthetic growth boosters or commercial fattening additives.',
    },
    image: imageRef(ASSETS.meat),
    gallery: [imageRef(ASSETS.meat), imageRef(ASSETS.farm)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 4,
    highlights: [
      { ar: 'تغذية طبيعية على برسيم المزرعة الأخضر الطازج', en: 'Fed on 100% farm-grown green alfalfa' },
      { ar: 'حظائر واسعة ونظيفة في بيئة شقراء الهادئة', en: 'Raised in peaceful, spacious farm pens in Shaqra' },
      { ar: 'ذبح حسب الطلب في مسالخ معتمدة ونظيفة', en: 'Butchered to order under certified hygienic standards' },
      { ar: 'تقطيع وتغليف محكم ونقل مبرد لباب بيتك', en: 'Cut, vacuum-packed, and chilled directly to your kitchen' },
    ],
  },
  {
    _id: 'product-crushed-hot-pepper',
    _type: 'product',
    icon: '🌶️',
    accentColor: 'terracotta',
    name: { ar: 'فلفل حار مجروش', en: 'Crushed Hot Pepper' },
    slug: { _type: 'slug', current: 'crushed-hot-pepper' },
    category: { _type: 'reference', _ref: 'category-pepper' },
    arabicSubtitle: 'من مزرعتنا إلى طبقك — فلفل شقراء الحار',
    badge: { ar: 'محصول المزرعة', en: 'Farm Harvest' },
    tagline: { ar: 'من مزرعتنا إلى طبقك', en: 'From our farm to your plate.' },
    description: {
      ar: 'زُرع في حقول وادي النوار بشقراء، وجُفف تحت أشعة الشمس وجُرش بعناية مع بذوره العطرية. يمنح أطباقك نفحة حارة دافئة ولوناً قاني الجمال لا مثيل له.',
      en: 'Grown in our Shaqra farm fields, sun-cured, and coarsely crushed with its aromatic seeds. A burst of vibrant red warmth that elevates every soup, stew, grill, and breakfast spread.',
    },
    image: imageRef(ASSETS.pepper),
    gallery: [imageRef(ASSETS.pepper)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 5,
    highlights: [
      { ar: 'رقائق فلفل شقراء النقية ١٠٠٪', en: '100% Pure Shaqra crushed chili flakes' },
      { ar: 'خالٍ تماماً من الملونات أو الأملاح المضافة', en: 'Zero artificial colorants, salt, or fillers' },
      { ar: 'معبأ في برطمانات زجاجية صحية محكمة الإغلاق', en: 'Sealed in food-grade glass jars with wooden lids' },
    ],
  },
  {
    _id: 'product-dried-tomato-qatfa',
    _type: 'product',
    icon: '🌿',
    accentColor: 'olive',
    name: { ar: 'قطفة — طماطم مجففة', en: 'Qatfa — Dried Tomatoes' },
    slug: { _type: 'slug', current: 'dried-tomato-qatfa' },
    category: { _type: 'reference', _ref: 'category-dried-tomatoes' },
    arabicSubtitle: 'شبت + إكليل الجبل (نكهة عشبية عطرية)',
    badge: { ar: 'نكهة عشبية', en: 'Herbal Specialty' },
    tagline: { ar: 'نكهة عشبية فواحة بالشبت والروزماري وزيت الزيتون.', en: 'Herbal, aromatic, and steeped in golden olive oil.' },
    description: {
      ar: 'طماطم مختارة ومجففة بعناية، مغمورة في زيت الزيتون البكر مع الشبت الأخضر وإكليل الجبل (الروزماري). تعطي لمسة عشبية منعشة ومذاقاً متناغماً يبهج الحواس.',
      en: 'Sun-concentrated ripe tomatoes steeped in virgin olive oil with fresh garden dill and aromatic rosemary sprigs. Elegant, bright, and deeply herbal.',
    },
    image: imageRef(ASSETS.tomatoesQatfa),
    gallery: [imageRef(ASSETS.tomatoesQatfa), imageRef(ASSETS.tomatoes)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 6,
    tasteNotes: [
      { ar: 'شبت طازج فواح', en: 'Garden Dill' },
      { ar: 'إكليل جبل بري', en: 'Wild Rosemary' },
      { ar: 'نكهة عشبية متوازنة', en: 'Herbaceous Umami' },
    ],
  },
  {
    _id: 'product-dried-tomato-signature',
    _type: 'product',
    icon: '⭐',
    accentColor: 'gold',
    name: { ar: 'المميز — طماطم مجففة', en: 'Signature — Dried Tomatoes' },
    slug: { _type: 'slug', current: 'dried-tomato-signature' },
    category: { _type: 'reference', _ref: 'category-dried-tomatoes' },
    arabicSubtitle: 'بهارات وادي النوار الخاصة',
    badge: { ar: 'الوصفة الحصرية', en: 'Flagship Recipe' },
    tagline: { ar: 'خلطة توابل وادي النوار الحصرية والثوم المشوي الفاخر.', en: 'Our proprietary spice blend crafted exclusively in Shaqra.' },
    description: {
      ar: 'وصفة وادي النوار الخاصة والمبتكرة. طماطم مجففة متوجة بفصوص الثوم المشوي وخلطة توابل وادي النوار السرية المحمصة. عمق ونكهة غنية لا تقاوم.',
      en: "The Blossom Valley's proprietary recipe. Dried tomatoes marinated in golden olive oil, roasted garlic cloves, and our secret roasted spice blend. Deep, complex, and intensely savory.",
    },
    image: imageRef(ASSETS.tomatoesSignature),
    gallery: [imageRef(ASSETS.tomatoesSignature), imageRef(ASSETS.tomatoes)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 7,
    tasteNotes: [
      { ar: 'توابل وادي النوار السرية', en: 'Proprietary Spices' },
      { ar: 'ثوم مشوي ناعم', en: 'Roasted Garlic' },
      { ar: 'غنى وعمق في المذاق', en: 'Deep Umami' },
    ],
  },
  {
    _id: 'product-dried-tomato-lahab',
    _type: 'product',
    icon: '🔥',
    accentColor: 'terracotta',
    name: { ar: 'لهب — طماطم مجففة', en: 'Lahab — Dried Tomatoes' },
    slug: { _type: 'slug', current: 'dried-tomato-lahab' },
    category: { _type: 'reference', _ref: 'category-dried-tomatoes' },
    arabicSubtitle: 'طماطم مجففة + فلفل شقراء الحار (نكهة جريئة)',
    badge: { ar: 'حار وجريء', en: 'Bold & Spicy' },
    tagline: { ar: 'حرارة فلفل شقراء تلتقي بحلاوة الطماطم المجففة المركزة.', en: 'Bold heat meets sweet sun-dried tomatoes.' },
    description: {
      ar: 'ابتكار جريء يجمع بين حلاوة الطماطم المجففة وحرارة فلفل شقراء الشهير، مغمورة في زيت الزيتون لتقدم لك تجربة استثنائية لعشاق الأطباق الحارة المتقنة.',
      en: 'A daring creation combining sweet sun-dried tomatoes with our fiery Shaqra crushed hot pepper and olive oil. Perfect for spice lovers seeking bold, memorable depth.',
    },
    image: imageRef(ASSETS.tomatoesLahab),
    gallery: [imageRef(ASSETS.pepper), imageRef(ASSETS.tomatoes)],
    inSeason: true,
    isFeaturedOnHome: true,
    displayOrder: 8,
    tasteNotes: [
      { ar: 'فلفل شقراء الحار', en: 'Shaqra Chili' },
      { ar: 'حرارة متوازنة ممتعة', en: 'Bold Heat' },
      { ar: 'تباين الحلاوة والحرارة', en: 'Sweet-Smoky Contrast' },
    ],
  },
];

// Write NDJSON format
const ndjsonContent = docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
fs.writeFileSync(outputPath, ndjsonContent, 'utf8');

console.log(`Successfully generated NDJSON with ${docs.length} documents (with image assets) at: ${outputPath}`);
