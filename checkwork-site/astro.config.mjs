import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep this in sync with `site.url` in src/config.ts
export default defineConfig({
  site: 'https://madebycheck.com',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  build: { inlineStylesheets: 'auto' },
});
