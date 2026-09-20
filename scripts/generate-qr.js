/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

async function generateQRCodes() {
  const targetUrl = 'https://blossomvalley.sa';
  const outDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. High-Res PNG (2048 x 2048 px at 300 DPI)
  const pngPath = path.join(outDir, 'qr-code.png');
  await QRCode.toFile(pngPath, targetUrl, {
    width: 2048,
    margin: 2,
    color: {
      dark: '#1B3B2B', // Deep Palm Green
      light: '#FAF7F2', // Warm Sand Linen
    },
    errorCorrectionLevel: 'H',
  });
  console.log('✓ Generated high-res PNG:', pngPath);

  // 2. Pure Vector SVG QR Code
  const svgString = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#1B3B2B',
      light: '#FAF7F2',
    },
    errorCorrectionLevel: 'H',
  });
  const svgPath = path.join(outDir, 'qr-code.svg');
  fs.writeFileSync(svgPath, svgString);
  console.log('✓ Generated vector SVG:', svgPath);

  // 3. Ready-To-Print Boutique Packaging Sticker (SVG vector)
  const qrInnerSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 0,
    color: {
      dark: '#1B3B2B',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H',
  });

  const pathMatch = qrInnerSvg.match(/<path[^>]*\/>/g);
  const qrPathTag = pathMatch ? pathMatch.join('\n') : '';

  const stickerSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="topCurve" d="M 180, 600 A 420, 420 0 0, 1 1020, 600" />
    <path id="bottomCurve" d="M 1020, 600 A 420, 420 0 0, 1 180, 600" />

    <radialGradient id="sandGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="85%" stop-color="#FAF7F2"/>
      <stop offset="100%" stop-color="#F2EAE0"/>
    </radialGradient>
    
    <filter id="stickerShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#1B3B2B" flood-opacity="0.12"/>
    </filter>
  </defs>

  <circle cx="600" cy="600" r="560" fill="url(#sandGlow)" stroke="#E8DFD1" stroke-width="4" filter="url(#stickerShadow)" />
  <circle cx="600" cy="600" r="530" fill="none" stroke="#C5A059" stroke-width="3" stroke-dasharray="14 7"/>
  <circle cx="600" cy="600" r="510" fill="none" stroke="#1B3B2B" stroke-width="5"/>
  <circle cx="600" cy="600" r="498" fill="none" stroke="#C5A059" stroke-width="1.5"/>

  <text x="140" y="612" font-size="28" fill="#C5A059" text-anchor="middle">✦</text>
  <text x="1060" y="612" font-size="28" fill="#C5A059" text-anchor="middle">✦</text>

  <text fill="#1B3B2B" font-family="'Tajawal', 'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="900" letter-spacing="1">
    <textPath href="#topCurve" startOffset="50%" text-anchor="middle">
      وادي النوار • THE BLOSSOM VALLEY • شقراء
    </textPath>
  </text>

  <text fill="#C85A32" font-family="'Tajawal', 'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" letter-spacing="2">
    <textPath href="#bottomCurve" startOffset="50%" text-anchor="middle">
      من أرضنا… إلى مائدتكم • FROM OUR LAND TO YOUR TABLE
    </textPath>
  </text>

  <rect x="330" y="330" width="540" height="540" rx="36" fill="#FFFFFF" stroke="#E8DFD1" stroke-width="4" />
  <rect x="342" y="342" width="516" height="516" rx="28" fill="none" stroke="#C5A059" stroke-width="2" stroke-opacity="0.5"/>

  <g transform="translate(370, 370) scale(13.9)">
    ${qrPathTag}
  </g>

  <circle cx="600" cy="600" r="52" fill="#FAF7F2" stroke="#C5A059" stroke-width="3"/>
  <circle cx="600" cy="600" r="44" fill="#1B3B2B"/>
  
  <g transform="translate(586, 586) scale(1.15)">
    <path d="M12 2C12 2 14 6 14 9C14 10.5 13 12 12 12C11 12 10 10.5 10 9C10 6 12 2 12 2Z" fill="#C5A059"/>
    <path d="M12 22C12 22 10 18 10 15C10 13.5 11 12 12 12C13 12 14 13.5 14 15C14 18 12 22 12 22Z" fill="#C5A059"/>
    <path d="M2 12C2 12 6 10 9 10C10.5 10 12 11 12 12C12 13 10.5 14 9 14C6 14 2 12 2 12Z" fill="#C5A059"/>
    <path d="M22 12C22 12 18 14 15 14C13.5 14 12 13 12 12C12 11 13.5 10 15 10C18 10 22 12 22 12Z" fill="#C5A059"/>
    <circle cx="12" cy="12" r="2.5" fill="#FAF7F2"/>
  </g>

  <g transform="translate(600, 290)">
    <rect x="-140" y="-18" width="280" height="36" rx="18" fill="#1B3B2B" stroke="#C5A059" stroke-width="2"/>
    <text x="0" y="6" text-anchor="middle" fill="#FAF7F2" font-family="'Tajawal', sans-serif" font-size="16" font-weight="700">
      إنتاج طبيعي متقن • SHAQRA VALLEY
    </text>
  </g>

  <g transform="translate(600, 915)">
    <rect x="-160" y="-18" width="320" height="36" rx="18" fill="#C85A32" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="0" y="6" text-anchor="middle" fill="#FFFFFF" font-family="'Tajawal', sans-serif" font-size="15" font-weight="700">
      من أرضنا إلى مائدتكم • NATURAL HARVEST
    </text>
  </g>
</svg>`;

  const stickerPath = path.join(outDir, 'blossom-farm-product-sticker.svg');
  fs.writeFileSync(stickerPath, stickerSvg);
  console.log('✓ Generated ready-to-print product sticker SVG:', stickerPath);
}

generateQRCodes().catch(console.error);
