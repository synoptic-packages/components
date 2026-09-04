import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as BrandIcon } from './Component.icon'

const meta = {
	title: 'Components/Brand/Icon',
	component: BrandIcon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'number',
		},
		variant: {
			control: 'select',
			options: ['light', 'dark'],
		},
		className: {
			control: 'text',
		},
	},
} satisfies Meta<typeof BrandIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		size: 54,
	},
}

export const Light: Story = {
	args: {
		size: 54,
		variant: 'light',
	},
	globals: {
		backgrounds: {
			value: 'dark',
		},
	},
}

export const Dark: Story = {
	args: {
		size: 54,
		variant: 'dark',
	},
}

export const Small: Story = {
	args: {
		size: 32,
	},
}

export const Medium: Story = {
	args: {
		size: 54,
	},
}

export const Large: Story = {
	args: {
		size: 96,
	},
}

export const Sizes: Story = {
	render: () => (
		<Stack direction={`row`} spacing={3} alignItems={`center`}>
			<BrandIcon size={24} />
			<BrandIcon size={32} />
			<BrandIcon size={54} />
			<BrandIcon size={72} />
			<BrandIcon size={96} />
		</Stack>
	),
}

export const Variants: Story = {
	render: () => (
		<Stack direction={`row`} spacing={4} alignItems={`center`}>
			<Stack spacing={1} alignItems={`center`}>
				<BrandIcon size={54} variant={`dark`} />
			</Stack>
			<Stack spacing={1} alignItems={`center`}>
				<BrandIcon size={54} variant={`light`} />
			</Stack>
		</Stack>
	),
}
