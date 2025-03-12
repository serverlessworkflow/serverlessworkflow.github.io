// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://serverlessworkflow.io/',
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  }
});