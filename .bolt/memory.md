# Project memory

## Product intent & audience

- LAVEN: women's fashion e-commerce demo site with premium catalog presentation
- Bilingual Arabic + English with RTL/LTR direction switching
- Product catalog across categories: dresses, blouses/tops, pants, bags, shoes, accessories
- Functional shopping cart, search, and category filtering

## Brand personality & voice

- Premium, minimalist fashion catalog aesthetic — "global fashion store" feel
- Elegant, soft, refined tone; not cartoonish or playful

## Visual design & UX direction

- Minimalist palette: ivory, beige, white, light gray backgrounds; soft studio lighting
- Product imagery: professional photographs mixing model shots and standalone product shots; no illustrations, low-quality, or cartoon images
- Category-specific image guidance:
  - Dresses: models wearing elegant dresses
  - Blouses/shirts: fabric and design detail
  - Pants: full-length piece visibility
  - Bags/shoes: clean professional product photos
  - Accessories: close-up detail shots
- Product images: ~800×1067px, compressed, lazy-loaded
- `ProductPhoto` component renders real photo with graceful fallback to `ProductArt` illustration if URL fails (no broken image icon)
- Layout, colors, fonts, section order are stable — not to be changed during image/content updates

## Decisions, constraints & rationale

- 14 products total; each mapped to a real photographic URL verified with HTTP 200
- Product names, prices, descriptions are authoritative — never modify during image updates
- Existing functionality (cart, search, categories, bilingual/RTL) must be preserved across all changes
- Image source pattern: `img` helper builds URLs; fallback illustration layer ensures resilience
- `ProductPhoto` used in product card, cart drawer, and product modal — single render path
- Stack: vite-react, Tailwind CSS, Lucide React icons, `@/` path alias → `src/`; no extra UI/icon packages
- `.bolt/prompt` holds global design and coding instructions — referenced, not restated here

## Open questions & assumptions

- Image URLs are remote third-party; stability depends on external host — fallback layer mitigates breakage
- "Demo" scope: no real checkout/payment integration assumed yet
- Product catalog content (14 items, prices) is static data, not from a backend