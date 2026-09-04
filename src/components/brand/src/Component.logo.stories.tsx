import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as BrandLogo } from './Component.logo'

const meta = {
	title: 'Components/Brand/Logo',
	component: BrandLogo,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		variant: {
			control: 'select',
			options: ['light', 'dark'],
		},
		className: {
			control: 'text',
		},
	},
} satisfies Meta<typeof BrandLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		size: 'large',
	},
}

export const Light: Story = {
	args: {
		size: 'large',
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
		size: 'large',
		variant: 'dark',
	},
}

export const Small: Story = {
	args: {
		size: 'small',
	},
}

export const Medium: Story = {
	args: {
		size: 'medium',
	},
}

export const Large: Story = {
	args: {
		size: 'large',
	},
}

export const Sizes: Story = {
	render: () => (
		<Stack spacing={3} alignItems={`flex-start`}>
			<BrandLogo size={`small`} />
			<BrandLogo size={`medium`} />
			<BrandLogo size={`large`} />
		</Stack>
	),
}

export const Variants: Story = {
	render: () => (
		<Stack spacing={4} alignItems={`flex-start`}>
			<Stack spacing={1}>
				<BrandLogo size={`large`} variant={`dark`} />
			</Stack>
			<Stack spacing={1}>
				<BrandLogo size={`large`} variant={`light`} />
			</Stack>
		</Stack>
	),
}

export const AllCombinations: Story = {
	render: () => (
		<Stack spacing={4}>
			<Stack spacing={2}>
				<Stack spacing={2} alignItems={`flex-start`}>
					<BrandLogo size={`small`} variant={`dark`} />
					<BrandLogo size={`medium`} variant={`dark`} />
					<BrandLogo size={`large`} variant={`dark`} />
				</Stack>
			</Stack>
			<Stack spacing={2}>
				<Stack spacing={2} alignItems={`flex-start`}>
					<BrandLogo size={`small`} variant={`light`} />
					<BrandLogo size={`medium`} variant={`light`} />
					<BrandLogo size={`large`} variant={`light`} />
				</Stack>
			</Stack>
		</Stack>
	),
}
