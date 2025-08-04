// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import netlify from '@astrojs/netlify';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://serverlessworkflow.io/',
  integrations: [
    sitemap(), 
    starlight({
      title: 'Serverless Workflow Docs',
      logo: {
        src: './public/icons/logo.svg'
      },
      favicon: '/icons/favicon-32x32.png',
      customCss: [
        './src/styles/docs.css',
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/serverlessworkflow/specification' },
      ],
			editLink: {
				baseUrl: 'https://github.com/serverlessworkflow/serverlessworkflow.github.io/edit/main/',
			},
			lastUpdated: true,
      sidebar: [
        { label: 'Introduction', slug : 'docs' },
        { label: 'Workflow Definition Examples', slug : 'docs/workflow-definition-examples' },
        {
          label: 'Core Concepts',
          autogenerate: { directory: 'docs/core-concepts' },
          /* Or manually -- probably preferred, easy to insert item/modify order:
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'docs/guides/example' },
          ],
          */
        },
        {
          label: 'Control Flow',
          autogenerate: { directory: 'docs/control-flow' },
        },
        { label: 'Wait', slug : 'docs/wait' },
        { label: 'Set', slug : 'docs/set' },
        {
          label: 'Error Handling',
          autogenerate: { directory: 'docs/error-handling' },
        },
        {
          label: 'Call Tasks',
          autogenerate: { directory: 'docs/call-tasks' },
        },
        {
          label: 'Run Tasks',
          autogenerate: { directory: 'docs/run-tasks' },
        },
        {
          label: 'Event Tasks',
          autogenerate: { directory: 'docs/event-tasks' },
        },
        {
          label: 'Resources & Configuration',
          autogenerate: { directory: 'docs/resources-configuration' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'docs/reference' },
        },
      ],
      components: {
        ThemeSelect: './src/overrides/ThemeSelect.astro'
      },
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/webcomponents/version-select/version-select.js',
            defer: true
          }
        }
      ]
    }),
    mdx(), 
  ],
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