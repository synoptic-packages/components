import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as LocaleSwitcher } from './Component'
import { LanguageDemo } from './Component.demo'

const meta = {
	title: 'Components/LocaleSwitcher',
	component: LocaleSwitcher,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'LocaleSwitcher component allows users to switch between 12 supported languages. It displays the current language code and flag, and opens a modal dialog with all available languages when clicked.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		onLocaleChange: {
			action: 'localeChanged',
			description: 'Callback function triggered when user selects a new language',
		},
		showNativeNames: {
			control: 'boolean',
			description: 'Show language names in their native language instead of the current language',
		},
	},
} satisfies Meta<typeof LocaleSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'Default locale switcher showing the current language (English) with flag icon. Language names are displayed in the current language.',
			},
		},
	},
}

export const WithNativeNames: Story = {
	args: {
		showNativeNames: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Locale switcher showing language names in their native language (e.g., Français, Español, 日本語). This makes it easier for users to identify their language.',
			},
		},
	},
}

export const WithCallback: Story = {
	args: {
		onLocaleChange: (locale: string) => {
			console.log(`Language changed to: ${locale}`)
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Locale switcher with a custom callback function that triggers when language changes.',
			},
		},
	},
}

export const TranslationDemo: StoryObj = {
	render: () => <LanguageDemo />,
	parameters: {
		docs: {
			description: {
				story: 'Interactive demo showing translation in action. Click the language buttons to see translations change in real-time.',
			},
		},
	},
}
