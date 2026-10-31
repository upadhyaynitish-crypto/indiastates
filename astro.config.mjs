// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The live address. Change this one line when a custom domain is added.
  site: 'https://indiastates.upadhyayn691.workers.dev',
  // `file` + `never` gives clean URLs on Cloudflare (see wrangler.jsonc): /states/goa (no trailing slash, no .html).
  build: { format: 'file' },
  trailingSlash: 'never',

  // Self-hosted at build time (no requests to Google or other font CDNs).
  fonts: [
    {
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      provider: fontProviders.fontsource(),
      weights: [600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    // The map imports Leaflet lazily, so the dev server only discovers it on first use and then
    // serves a stale copy ("504 Outdated Optimize Dep"). Pre-bundling it at startup avoids that.
    optimizeDeps: { include: ['leaflet'] },
  },

  integrations: [sitemap({ filter: (page) => !page.endsWith('/search') })],
});
