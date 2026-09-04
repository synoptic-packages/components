import type { Preview } from '@storybook/react-vite'
import React, { useEffect } from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from '../src/context/provider-config'
import { setBrandColors } from '../src/theme/colors'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

// Default brand (the package is brand-agnostic; consumers set their own via
// <Provider brand={...}> or setBrandColors).
setBrandColors({})

/**
 * Wraps every story in the package's own Provider. The toolbar's `theme` global
 * drives the Provider `mode` prop (light/dark), and the optional `brand` global
 * demonstrates brand colour injection.
 */
const ThemedProvider = ({ children, context }: { children: React.ReactNode; context: any }) => {
	const theme = context.globals.theme
	const brand = context.globals.brand

	const mode = theme === 'light' ? 'light' : 'dark'
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', mode)
	}, [mode])

	const brandProp =
		brand === 'synotech'
			? undefined
			: brand === 'krugergold'
				? { brand_color: '#B8860B', brand_color_accent: '#fee600' }
				: brand === 'ventry'
					? { brand_color: '#c800c8', brand_color_accent: '#ff75ff' }
					: brand === 'yaya'
						? { brand_color: '#C2410C', brand_color_accent: '#FDBA74' }
						: undefined

	return (
		<MemoryRouter>
			{/* Router context: Header/Menu/Status/Form use useNavigate/useLocation */}
			<Provider mode={mode} brand={brandProp}>
				{children}
			</Provider>
		</MemoryRouter>
	)
}

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			options: INITIAL_VIEWPORTS,
		},
		backgrounds: { disabled: true },
	},
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'light', icon: 'circlehollow', title: 'Light' },
					{ value: 'dark', icon: 'circle', title: 'Dark' },
				],
				dynamicTitle: true,
			},
		},
		brand: {
			description: 'Brand colour set (demonstrates <Provider brand=...>)',
			toolbar: {
				title: 'Brand',
				icon: 'paintbrush',
				items: [
					{ value: 'synotech', title: 'Synotech (default)' },
					{ value: 'krugergold', title: 'Kruger Gold' },
					{ value: 'ventry', title: 'Ventry' },
					{ value: 'yaya', title: 'Yaya' },
				],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		(Story, context) => (
			<ThemedProvider context={context}>
				<Story />
			</ThemedProvider>
		),
	],
}

export default preview
