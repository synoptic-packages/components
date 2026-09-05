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
		return viteConfig
	},
	docs: {
		autodocs: 'tag',
	},
}
export default config
