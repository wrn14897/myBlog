import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site: 'https://warrencodes.com',
  integrations: [mdx(), sitemap()],
  output: "server",
  adapter: netlify()
});