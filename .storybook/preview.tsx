import type { Preview } from '@storybook/react-vite'
import React, { useEffect } from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from '../src/context/provider-config'
import { setBrandColors } from '../src/theme/colors'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

// Default brand (the package is brand-agnostic; setBrandColors overrides).
setBrandColors({})

const ThemeSync = ({ children, context }: { children: React.ReactNode; context: any }) => {
	const theme = context.globals.theme
	useEffect(() => {
		if (theme === 'light' || theme === 'dark') {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}, [theme])
	return <React.Fragment>{children}</React.Fragment>
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
	},
	decorators: [
		(Story, context) => (
			<ThemeSync context={context}>
				{/* Router context: Header/Menu/Status/Form use useNavigate/useLocation */}
				<MemoryRouter>
					<Provider>
						<Story />
					</Provider>
				</MemoryRouter>
			</ThemeSync>
		),
	],
}

export default preview
