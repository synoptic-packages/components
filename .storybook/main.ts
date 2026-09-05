import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-docs', '@storybook/addon-onboarding', '@storybook/addon-themes'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal: async (viteConfig) => {
		// Storybook (unlike the app's Vite build) does not inject these compile-time
		// globals. Components/constants read them at module load — an undefined value
		// can throw at module-eval and kill the whole preview (leaving every story
		// stuck on "preparing"). Define them the same way the wallet-ui storybook does.
		viteConfig.define = {
			...viteConfig.define,
			__DEV__: true,
			__PRODUCTION__: false,
			'process.env.NODE_ENV': JSON.stringify('development'),
			'import.meta.env.STORYBOOK': JSON.stringify('true'),
		}

		// React 19 removed the `act` export from `react`, but @storybook/react 10.4
		// still calls React.act(...) via react-dom/test-utils, leaving every story stuck
		// on "preparing" with "React.act is not a function". Alias react-dom/test-utils
		// to a shim that exports a working `act` (the dep's act forwards to React.act,
		// which no longer exists).
		viteConfig.resolve = {
			...viteConfig.resolve,
			alias: [
				...(viteConfig.resolve?.alias || []),
				{ find: /^react-dom\/test-utils$/, replacement: new URL('./react-dom-test-utils-shim.ts', import.meta.url).pathname },
				{ find: /^react-dom\/test-utils\.js$/, replacement: new URL('./react-dom-test-utils-shim.ts', import.meta.url).pathname },
			],
		}
		viteConfig.optimizeDeps = {
			...viteConfig.optimizeDeps,
			exclude: [...(viteConfig.optimizeDeps?.exclude || []), 'react-dom/test-utils'],
		}

		return viteConfig
	},
	docs: {
		autodocs: 'tag',
	},
}
export default config
