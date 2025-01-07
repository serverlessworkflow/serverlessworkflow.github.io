import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
    typography,
		daisyui,
	],
	daisyui: {
    themes: [ 
			// default themes
			// 'light',
			// 'dark',
			
			// custom themes
			{
				'light': {
					'color-scheme': 'light',
					'primary': 'oklch(46.2% 0.0713 255.54)', // #3D5A80
					'secondary': 'oklch(78.95% 0.0554 234.08)', // #98C1D9
					'accent': 'oklch(68.35% 0.1676 34.7)', // #EE6C4D
					// from https://github.com/saadeghi/daisyui/blob/9f155d293855ada21dd49a1257113df27b2955b1/src/theming/themes.js#L190
					'neutral': '#293241',
					"neutral": "#2B3440",
					"neutral-content": "#D7DDE4",
					"base-100": "oklch(100% 0 0)",
					"base-200": "#F2F2F2",
					"base-300": "#E5E6E6",
					"base-content": "#1f2937",
				}
			},
			{
				'dark': {
					'color-scheme': 'dark',
					'primary': 'oklch(96.89% 0.0281 199.41)', // #E0FBFC
					'primary-content': '#293241',
					'secondary': 'oklch(78.95% 0.0554 234.08)', // #98C1D9
					'accent': 'oklch(68.35% 0.1676 34.7)', // #EE6C4D
					// from https://github.com/saadeghi/daisyui/blob/9f155d293855ada21dd49a1257113df27b2955b1/src/theming/themes.js#L105
					"neutral": "#293241",
					"neutral-content": "#A6ADBB",
					"base-100": "#1d232a",
					"base-200": "#191e24",
					"base-300": "#15191e",
					"base-content": "#A6ADBB",
				}
			},
		
		],
  }
}
