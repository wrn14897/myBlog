import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercelEdge from '@astrojs/vercel/edge';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://warrencodes.com',
  integrations: [mdx(), sitemap(), react()],
  output: 'server',
  adapter: vercelEdge(),
});
