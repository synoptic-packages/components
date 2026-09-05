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

		// The dep optimizer pre-bundles React; in production mode `act()` throws
		// ("act(...) is not supported in production builds of React"). The
		// dev-server in-app define above is not applied to pre-bundled deps,
		// so set NODE_ENV=development at the dependency-optimization stage too.
		// NOTE: Vite 8 deprecates `esbuildOptions` in favour of
		// `optimizeDeps.rolldownOptions`, but the rolldown input options accept
		// no `define` key (it warns "Invalid key"), so the deprecated key stays
		// until Vite provides a replacement for optimizer defines.
		viteConfig.optimizeDeps = {
			...viteConfig.optimizeDeps,
			esbuildOptions: {
				...(viteConfig.optimizeDeps?.esbuildOptions || {}),
				define: {
					...(viteConfig.optimizeDeps?.esbuildOptions?.define || {}),
					'process.env.NODE_ENV': JSON.stringify('development'),
				},
			},
		}

		return viteConfig
	},
	docs: {
		autodocs: 'tag',
	},
}
export default config
