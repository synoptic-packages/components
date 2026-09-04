import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ThemeSwitcher } from './Component'

const meta = {
	title: 'Components/ThemeSwitcher',
	component: ThemeSwitcher,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'ThemeSwitcher component allows users to toggle between light and dark themes. It displays a sun icon in dark mode and a moon icon in light mode.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		onThemeToggle: {
			action: 'themeToggled',
			description: 'Callback function triggered when user clicks the theme toggle button',
		},
	},
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'Default theme switcher showing the appropriate icon based on the current theme mode.',
			},
		},
	},
}

export const WithCallback: Story = {
	args: {
		onThemeToggle: () => {
			console.log('Theme toggled')
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Theme switcher with a custom callback function that triggers when theme is toggled.',
			},
		},
	},
}
