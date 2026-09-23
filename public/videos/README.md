# Hero Background Video

Place your promotional video file here:

- **Primary:**  `hero-promo.mp4`  (H.264, ≤5MB, 1920×1080, 10–15 sec loop)
- **WebM fallback:** `hero-promo.webm`  (VP9, same duration, smaller size)

## Encoding recommendations

```bash
# H.264 MP4 — primary
ffmpeg -i input.mov \
  -vf "scale=1920:-2" \
  -c:v libx264 -crf 26 -preset slow \
  -profile:v high -level 4.1 \
  -movflags +faststart \
  -an \
  -t 12 \
  hero-promo.mp4

# WebM — smaller, for modern browsers
ffmpeg -i input.mov \
  -vf "scale=1920:-2" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -an \
  -t 12 \
  hero-promo.webm
```

## Poster image

The fallback static image is sourced from `/images/farm/farm-sand-dunes-wide.jpg`
(or overridden via Sanity CMS → Hero Section → Poster Image).

If the video file is missing, the component gracefully falls back
to the poster image — no broken UI.
