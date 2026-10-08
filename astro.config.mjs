// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real production domain before launch.
  site: 'https://indiastates.pages.dev',
  // `file` + `never` gives clean URLs on Cloudflare Pages: /states/goa (no trailing slash, no .html).
  build: { format: 'file' },
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap({ filter: (page) => !page.endsWith('/search') })],
});
