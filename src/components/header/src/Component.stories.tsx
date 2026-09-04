import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as Header } from './Component'

const mockUser = {
	first_name: 'John',
	last_name: 'Doe',
	email: 'john.doe@example.com',
}

const mockMenuItems = [
	{ label: 'Dashboard', path: '/dashboard', icon: 'House' },
	{ label: 'Profile', path: '/profile', icon: 'User' },
	{ label: 'Settings', path: '/settings', icon: 'Settings' },
	{ label: 'Notifications', path: '/notifications', icon: 'Bell' },
]

const meta = {
	title: 'Layout/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'The Header component provides a responsive top navigation bar with branding, user actions, and mobile menu. It adapts to mobile screens by showing a hamburger menu and brand icon instead of the full logo.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		user: {
			control: 'object',
			description: 'User object containing user information. When provided, shows authenticated user menu.',
		},
		onLogout: {
			action: 'logout',
			description: 'Callback function triggered when user clicks logout',
		},
		onNavigate: {
			action: 'navigate',
			description: 'Callback function triggered when user navigates to a different route',
		},
		menuItems: {
			control: 'object',
			description: 'Array of menu items to display. Uses default items if not provided.',
		},
		onThemeToggle: {
			action: 'themeToggle',
			description: 'Callback function triggered when user toggles theme (dark/light mode)',
		},
		onLocaleChange: {
			action: 'localeChange',
			description: 'Callback function triggered when user changes language',
		},
		showThemeSwitcher: {
			control: 'boolean',
			description: 'Show or hide the theme switcher button',
		},
		showLocaleSwitcher: {
			control: 'boolean',
			description: 'Show or hide the language/locale switcher button',
		},
	},
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'Default header without a logged-in user. Shows login and create account options.',
			},
		},
	},
}

export const WithUser: Story = {
	args: {
		user: mockUser,
	},
	parameters: {
		docs: {
			description: {
				story: 'Header with a logged-in user. Shows user greeting, notifications, and profile menu with dropdown.',
			},
		},
	},
}

export const WithUserAndCustomMenu: Story = {
	args: {
		user: mockUser,
		menuItems: mockMenuItems,
	},
	parameters: {
		docs: {
			description: {
				story: 'Header with custom menu items. Useful for providing navigation specific to your application.',
			},
		},
	},
}

export const GuestWithCustomMenu: Story = {
	args: {
		menuItems: [
			{ label: 'Features', path: '/features', icon: 'Sparkles' },
			{ label: 'Pricing', path: '/pricing', icon: 'DollarSign' },
			{ label: 'About', path: '/about', icon: 'Info' },
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Header for guest users with custom navigation items.',
			},
		},
	},
}

export const WithNavigationLinks: Story = {
	args: {
		user: mockUser,
		menuItems: [
			{ label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
			{ label: 'Projects', path: '/projects', icon: 'FolderOpen' },
			{ label: 'Team', path: '/team', icon: 'Users' },
			{ label: 'Reports', path: '/reports', icon: 'ChartColumn' },
			{ label: 'Settings', path: '/settings', icon: 'Settings' },
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Header with multiple navigation links visible on desktop. Shows how the header can be used with a full navigation menu.',
			},
		},
	},
}

export const GuestWithMultipleLinks: Story = {
	args: {
		menuItems: [
			{ label: 'Home', path: '/', icon: 'House' },
			{ label: 'Products', path: '/products', icon: 'Package' },
			{ label: 'Solutions', path: '/solutions', icon: 'Lightbulb' },
			{ label: 'Resources', path: '/resources', icon: 'BookOpen' },
			{ label: 'Pricing', path: '/pricing', icon: 'CreditCard' },
			{ label: 'Contact', path: '/contact', icon: 'Mail' },
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Guest header with multiple navigation links, demonstrating a full marketing site navigation.',
			},
		},
	},
}

export const WithThemeSwitcher: Story = {
	args: {
		user: mockUser,
		showThemeSwitcher: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Header with theme switcher enabled. Users can toggle between light and dark mode.',
			},
		},
	},
}

export const WithLocaleSwitcher: Story = {
	args: {
		user: mockUser,
		showLocaleSwitcher: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Header with locale switcher enabled. Users can change the language from 12 supported languages.',
			},
		},
	},
}

export const WithBothSwitchers: Story = {
	args: {
		user: mockUser,
		menuItems: mockMenuItems,
		showThemeSwitcher: true,
		showLocaleSwitcher: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Header with both theme and locale switchers enabled, along with custom menu items.',
			},
		},
	},
}
