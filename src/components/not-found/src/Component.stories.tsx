import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppContext } from '../../../context/provider-config'
import { colorsLight } from '../../../theme/colors'
import { Component as NotFound } from './Component'

const mockContextValue = {
	setSnackbar: () => {},
	setDialog: () => {},
	isMobile: false,
	isSmall: false,
	isLarge: true,
	loading: false,
	setLoading: () => {},
	isDark: false,
	colors: colorsLight,
}

const meta = {
	title: 'Components/NotFound',
	component: NotFound,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<AppContext.Provider value={mockContextValue}>
				<Story />
			</AppContext.Provider>
		),
	],
	argTypes: {
		where: {
			control: 'text',
			description: 'The resource path that was not found',
		},
		title: {
			control: 'text',
			description: 'Custom title for the not found page',
		},
		description: {
			control: 'text',
			description: 'Custom description text',
		},
		homeUrl: {
			control: 'text',
			description: 'URL for the home button',
		},
		homeButtonText: {
			control: 'text',
			description: 'Text for the home button',
		},
		imageUrl: {
			control: 'text',
			description: 'URL for the not found image',
		},
		imageAlt: {
			control: 'text',
			description: 'Alt text for the image',
		},
		imageWidth: {
			control: 'number',
			description: 'Width of the image',
		},
		imageHeight: {
			control: 'number',
			description: 'Height of the image',
		},
	},
} satisfies Meta<typeof NotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const WithResourcePath: Story = {
	args: {
		where: '/api/users/123',
	},
}

export const CustomTitle: Story = {
	args: {
		title: '404 - Page Not Found',
		where: '/dashboard/settings',
	},
}

export const CustomDescription: Story = {
	args: {
		title: 'Oops!',
		description: 'The page you are looking for seems to have vanished into thin air.',
	},
}

export const CustomButton: Story = {
	args: {
		homeButtonText: 'Go to Dashboard',
		homeUrl: '/dashboard',
		where: '/admin/panel',
	},
}

export const MinimalDescription: Story = {
	args: {
		title: 'Lost?',
		description: 'This page does not exist.',
		homeButtonText: 'Take Me Home',
	},
}

export const WithCustomStyling: Story = {
	args: {
		where: '/products/out-of-stock',
		sx: {
			bgcolor: 'background.paper',
			boxShadow: 3,
		},
	},
}
