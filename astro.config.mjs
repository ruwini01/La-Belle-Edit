import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config.js';

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: {
    // Cap the work Sharp does per image. Nothing on this site is displayed
    // wider than a 3-column desktop grid, so anything above 1200px is waste.
    layout: 'constrained',
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'always',
    assets: '_assets',
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
