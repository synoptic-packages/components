import { Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Component as Link } from './Component'

const meta = {
	title: 'Components/Link',
	component: Link,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		text: {
			control: 'text',
			description: 'Text content of the link',
		},
		to: {
			control: 'text',
			description: 'Internal navigation path',
		},
		href: {
			control: 'text',
			description: 'Alias for "to" prop',
		},
		external: {
			control: 'boolean',
			description: 'Force link to be treated as external',
		},
		bold: {
			control: 'boolean',
			description: 'Makes the link text bold',
		},
		underline: {
			control: 'boolean',
			description: 'Adds underline to the link',
		},
		target: {
			control: 'select',
			options: ['_self', '_blank', '_parent', '_top'],
			description: 'Specifies where to open the linked document',
		},
	},
	args: {
		onClick: fn(),
		text: 'Click me',
	},
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		to: '/dashboard',
		text: 'Navigate to Dashboard',
	},
}

export const Bold: Story = {
	args: {
		to: '/profile',
		text: 'Bold Link',
		bold: true,
	},
}

export const Underlined: Story = {
	args: {
		to: '/settings',
		text: 'Underlined Link',
		underline: true,
	},
}

export const BoldAndUnderlined: Story = {
	args: {
		to: '/help',
		text: 'Bold and Underlined Link',
		bold: true,
		underline: true,
	},
}

export const ExternalLink: Story = {
	args: {
		to: 'https://www.example.com',
		text: 'Visit Example.com',
		target: '_blank',
	},
}

export const ExternalLinkForced: Story = {
	args: {
		to: '/external-page',
		text: 'Forced External Link',
		external: true,
		target: '_blank',
	},
}

export const CustomStyled: Story = {
	args: {
		to: '/custom',
		text: 'Custom Styled Link',
		sx: {
			color: 'error.main',
			fontSize: '1.2rem',
			'&:hover': {
				color: 'error.dark',
			},
		},
	},
}

export const WithChildren: Story = {
	args: {
		to: '/children',
		children: (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<span>🔗</span>
				<span>Link with Icon</span>
			</Box>
		),
	},
}

export const LongText: Story = {
	args: {
		to: '/long',
		text: 'This is a very long link text that demonstrates how the component handles longer content and wrapping behavior',
		underline: true,
	},
	parameters: {
		layout: 'padded',
	},
}
