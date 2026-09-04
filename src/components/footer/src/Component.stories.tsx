import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as Footer } from './Component'

const sampleMenuItems = [
	{ label: 'Privacy Policy', href: '/privacy' },
	{ label: 'Terms of Service', href: '/terms' },
	{ label: 'Contact Us', href: '/contact' },
	{ label: 'Help Center', href: '/help' },
	{ label: 'About', href: '/about' },
	{ label: 'External Site', href: 'https://www.example.com', external: true },
]

const meta = {
	title: 'Layout/Footer',
	component: Footer,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'The Footer component provides bottom navigation and copyright information. It includes responsive menu items that wrap on smaller screens with vertical dividers between them.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'The copyright/title text displayed in the footer',
		},
		description: {
			control: 'text',
			description: 'Optional description text displayed below the menu',
		},
		menuItems: {
			control: 'object',
			description: 'Array of menu items with label, href, and optional external properties',
		},
	},
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'Default footer with only the copyright text.',
			},
		},
	},
}

export const WithMenuItems: Story = {
	args: {
		menuItems: sampleMenuItems,
	},
	parameters: {
		docs: {
			description: {
				story: 'Footer with navigation menu items separated by vertical dividers.',
			},
		},
	},
}

export const WithDescription: Story = {
	args: {
		menuItems: sampleMenuItems,
		description: 'This is a sample description that appears below the menu items.',
	},
	parameters: {
		docs: {
			description: {
				story: 'Footer with menu items and additional description text.',
			},
		},
	},
}

export const CustomTitle: Story = {
	args: {
		title: '© 2025 Custom Company. All rights reserved.',
		menuItems: sampleMenuItems.slice(0, 3),
		description: 'Custom footer with shorter title and fewer menu items.',
	},
	parameters: {
		docs: {
			description: {
				story: 'Footer with custom title text.',
			},
		},
	},
}

export const ManyMenuItems: Story = {
	args: {
		menuItems: [
			...sampleMenuItems,
			{ label: 'Careers', href: '/careers' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Press', href: '/press' },
			{ label: 'Investor Relations', href: '/investors' },
			{ label: 'Sustainability', href: '/sustainability' },
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Footer with many menu items to demonstrate responsive wrapping behavior.',
			},
		},
	},
}
