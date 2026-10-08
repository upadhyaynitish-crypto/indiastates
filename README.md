# IndiaStates

A free, independent guide to India's 28 states and 8 union territories. Static Astro site, deployable to Cloudflare Pages.

> Independent informational site, not affiliated with the Government of India or any state government.

## Commands

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm install`     | Install dependencies                                  |
| `npm run dev`     | Dev server at `localhost:4321` (search not available) |
| `npm run build`   | Build to `dist/` and generate the Pagefind index      |
| `npm run preview` | Serve the built site                                  |
| `npm run check`   | Type-check `.astro` and `.ts` files                   |

## Adding a state

1. Create `src/content/states/<slug>.md`. Copy the structure of `goa.md`; the schema in `src/content.config.ts` validates it at build time.
2. Add photos to `src/assets/states/<slug>/` (Wikimedia Commons, Unsplash or your own only) with `credit`, `license` and `source_url`.
3. Add the boundary to `src/data/geo/<slug>.geojson` and record its source in `src/data/geo/README.md`.
4. Every statistic needs a year and a source in `sources`. Anything unconfirmed goes in `needs_verification` (it is shown publicly as "Still being checked").

## Layout

- `src/pages/states/[slug].astro`: state page template. Markdown sections are split on `##` headings so spot cards, festivals, food and the universities table can be placed inside the matching section.
- `src/components/`: `QuickFacts`, `MapView` (Leaflet, lazy-loaded), `SpotCard`, `UniversitiesTable`, `SourceList`, `TableOfContents`, `StateNav`, `Nav`, `Footer`.
- `src/site.ts`: site name, disclaimer and the corrections URL.
