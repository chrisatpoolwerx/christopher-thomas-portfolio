# Asset Manifest

This document lists all required assets for the portfolio with optimal sizes and specifications.

---

## Directory Structure

```
public/assets/
├── icons/              # Favicon and app icons
├── og/                 # Open Graph social sharing images
├── profile/            # Personal/about page images
└── projects/           # Project-specific images
    ├── poolchex/
    ├── healthy-pool/
    ├── dominos-global/
    └── ar-pizza/
```

---

## 1. Icons (`/assets/icons/`)

| Filename | Size | Format | Description |
|----------|------|--------|-------------|
| `favicon.ico` | 32x32 | ICO | Browser tab icon (legacy) |
| `favicon.svg` | 32x32 | SVG | Modern browser favicon (scalable) |
| `apple-touch-icon.png` | 180x180 | PNG | iOS home screen icon |
| `icon-192.png` | 192x192 | PNG | Android/PWA icon |
| `icon-512.png` | 512x512 | PNG | PWA splash/install icon |

**Design Notes:**
- Use the brand color (#FF4F00) as accent
- Simple, recognizable mark (initials "CT" or abstract symbol)
- Ensure legibility at 16x16 for smallest favicon render

---

## 2. Open Graph Images (`/assets/og/`)

| Filename | Size | Format | Description |
|----------|------|--------|-------------|
| `og-default.jpg` | 1200x630 | JPG | Default social sharing image |
| `og-about.jpg` | 1200x630 | JPG | About page social card |
| `og-poolchex.jpg` | 1200x630 | JPG | Poolchex project card |
| `og-healthy-pool.jpg` | 1200x630 | JPG | Healthy Pool project card |
| `og-dominos-global.jpg` | 1200x630 | JPG | Domino's project card |
| `og-ar-pizza.jpg` | 1200x630 | JPG | AR Pizza project card |

**Design Notes:**
- Include project title and brief tagline
- Use brand typography (Playfair Display + Inter)
- Maintain 1.91:1 aspect ratio for optimal display on all platforms
- Keep text within safe zone (center 1000x500 area)
- Compress to <300KB for fast loading

---

## 3. Profile Images (`/assets/profile/`)

| Filename | Size | Format | Description |
|----------|------|--------|-------------|
| `headshot.jpg` | 800x800 | JPG | Professional headshot (square crop) |
| `headshot-wide.jpg` | 1200x800 | JPG | Environmental portrait (3:2) |

**Design Notes:**
- Neutral background preferred
- Professional but approachable expression
- High quality, sharp focus on face
- Compress to <150KB

---

## 4. Project Images

### 4.1 Poolchex (`/assets/projects/poolchex/`)

| Filename | Size | Format | Description |
|----------|------|--------|-------------|
| `hero.jpg` | 2000x1250 | JPG | Hero image - iOS app showing water health score or scan flow |
| `craft-1.jpg` | 1200x750 | JPG | Craft section: Card-based hierarchy and clear ranges |
| `craft-2.jpg` | 1200x750 | JPG | Craft section: Scan alignment guidance and motion states |
| `craft-3.jpg` | 1200x750 | JPG | Craft section: On-device AI assistant chat |

**Content Direction:**
- Hero: iOS app interface showing scan-to-score workflow or water health dashboard with score
- Craft 1: Card-based hierarchy, clear metric ranges, restrained typography showing what's out of range
- Craft 2: Scan alignment guidance, matched transitions into metric detail, staged loading for AI summaries
- Craft 3: AI-powered assistant chat with concise, grounded responses (on-device Apple Intelligence)

---

### 4.2 Healthy Pool Plan (`/assets/projects/healthy-pool/`)

| Filename | Size | Format | Description |
|----------|------|--------|-------------|
| `hero.jpg` | 2000x1250 | JPG | Hero image - ecosystem overview or service moment |
| `technician-app.jpg` | 1200x900 | JPG | Side-by-side: Technician mobile assessment interface (4:3) |
| `customer-report.jpg` | 1200x900 | JPG | Side-by-side: Customer-facing health report (4:3) |
| `report-detail.jpg` | 2400x1030 | JPG | Full-width: Detailed view of assessment findings (21:9) |

**Content Direction:**
- Hero: Service ecosystem or pool health journey overview
- Technician App: Mobile assessment interface showing field capture workflow
- Customer Report: Clean report presentation with health scores and recommendations
- Report Detail: Close-up of insights translation - technical data → clear guidance

---

### 4.3 Domino's Global App (`/assets/projects/dominos-global/`)

| Filename | Size | Format | Description |
|----------|------|--------|-------------|
| `hero.jpg` | 2000x1250 | JPG | Hero image - app ordering flow or pizza customization |
| `customization-flow.jpg` | 2400x1030 | JPG | Full-width: Progressive customization interface |
| `multi-market.jpg` | 2000x1125 | JPG | Full-width: Global implementation across markets |
| `craft-hierarchy.jpg` | 1200x750 | JPG | Craft section: Visual hierarchy refinements |
| `craft-motion.jpg` | 1200x750 | JPG | Craft section: Micro-interactions/responsiveness |
| `craft-density.jpg` | 1200x750 | JPG | Craft section: Information density/rapid scanning |

**Content Direction:**
- Hero: Clean ordering interface showing customization or cart
- Customization Flow: Side-by-side or sequential view of the streamlined ordering journey (21:9 ultra-wide for full-width section)
- Multi-Market: Showcase of app across different regional markets (16:9)
- Craft Hierarchy: Before/after showing visual weight and decision-critical emphasis
- Craft Motion: Interaction state sequences showing micro-feedback
- Craft Density: Interface optimized for rapid scanning by repeat customers

---

### 4.4 AR Pizza Chef (`/assets/projects/ar-pizza/`)

| Filename | Size | Format | Description |
|----------|------|--------|-------------|
| `hero.jpg` | 2000x1250 | JPG | Hero image - AR pizza customization in action |
| `ar-mode.jpg` | 1200x900 | JPG | Side-by-side: Full AR mode with pizza placement (4:3) |
| `non-ar-mode.jpg` | 1200x900 | JPG | Side-by-side: Camera-off fallback mode (4:3) |
| `craft-animation.jpg` | 1200x750 | JPG | Craft: Tactile animation showing ingredient motion |
| `craft-delight.jpg` | 1200x750 | JPG | Craft: Easter egg animations for specific ingredients |
| `craft-system.jpg` | 1200x750 | JPG | Craft: Next Gen UI system adapted for AR context |

**Content Direction:**
- Hero: User interacting with AR pizza, showing the spatial customization experience
- AR Mode: Full ARKit experience with pizza placed in real environment
- Non-AR Mode: Graceful fallback with pizza on neutral background
- Craft Animation: Motion sequences showing tactile ingredient feedback
- Craft Delight: Fun Easter egg moments that reward exploration
- Craft System: Card metaphor UI and navigation colour system in AR

---

## Image Specifications

### Formats & Compression

| Use Case | Format | Quality | Max File Size |
|----------|--------|---------|---------------|
| Hero images | JPG or WebP | 80-85% | 300KB |
| Craft images | JPG or WebP | 80-85% | 200KB |
| OG images | JPG | 85% | 300KB |
| Icons | PNG/SVG | Lossless | 50KB |
| Profile | JPG | 85% | 150KB |

### Aspect Ratios

| Image Type | Ratio | Reason |
|------------|-------|--------|
| Hero | 16:10 (1.6:1) | Matches `aspect-video` with room for content |
| Craft | 16:10 (1.6:1) | Consistent with hero proportions |
| OG | 1.91:1 | Social platform standard |
| Profile | 1:1 or 3:2 | Flexible for different layouts |

### Color Profile
- sRGB color space
- Embedded color profile for consistency

### Responsive Considerations
- Provide @2x versions for retina: append `-2x` to filename
- Example: `hero.jpg` (1000x625) + `hero-2x.jpg` (2000x1250)

---

## WebP Optimization (Recommended)

For production, generate WebP versions alongside JPG:

```bash
# Example using cwebp
cwebp -q 85 hero.jpg -o hero.webp
```

Update constants.tsx to use WebP with JPG fallback via `<picture>` element or modern image component.

---

## Checklist

### Icons
- [ ] favicon.ico
- [ ] favicon.svg
- [ ] apple-touch-icon.png
- [ ] icon-192.png
- [ ] icon-512.png

### Open Graph
- [ ] og-default.jpg
- [ ] og-about.jpg
- [ ] og-poolchex.jpg
- [ ] og-healthy-pool.jpg
- [ ] og-dominos-global.jpg
- [ ] og-ar-pizza.jpg

### Profile
- [ ] headshot.jpg
- [ ] headshot-wide.jpg (optional)

### Poolchex
- [ ] hero.jpg
- [ ] craft-1.jpg
- [ ] craft-2.jpg
- [ ] craft-3.jpg

### Healthy Pool Plan
- [ ] hero.jpg
- [ ] technician-app.jpg
- [ ] customer-report.jpg
- [ ] report-detail.jpg

### Domino's Global
- [ ] hero.jpg
- [ ] customization-flow.jpg
- [ ] multi-market.jpg
- [ ] craft-hierarchy.jpg
- [ ] craft-motion.jpg
- [ ] craft-density.jpg

### AR Pizza Chef
- [ ] hero.jpg
- [ ] ar-mode.jpg
- [ ] non-ar-mode.jpg
- [ ] craft-animation.jpg
- [ ] craft-delight.jpg
- [ ] craft-system.jpg

---

## Total Assets Required: 31

| Category | Count |
|----------|-------|
| Icons | 5 |
| Open Graph | 6 |
| Profile | 2 |
| Project Images | 18 |
| **Total** | **31** |

*Optional @2x retina versions would double project/profile images to 51 total.*
