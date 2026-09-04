import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as BrandName } from './Component.name'

const meta = {
	title: 'Components/Brand/Name',
	component: BrandName,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
		},
		variant: {
			control: 'select',
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'],
		},
		className: {
			control: 'text',
		},
	},
} satisfies Meta<typeof BrandName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		name: 'Infomentor',
	},
}

export const CustomName: Story = {
	args: {
		name: 'Custom Brand',
		variant: 'h3',
	},
}

export const Heading1: Story = {
	args: {
		name: 'Infomentor',
		variant: 'h1',
	},
}

export const Heading2: Story = {
	args: {
		name: 'Infomentor',
		variant: 'h2',
	},
}

export const Heading3: Story = {
	args: {
		name: 'Infomentor',
		variant: 'h3',
	},
}

export const Heading4: Story = {
	args: {
		name: 'Infomentor',
		variant: 'h4',
	},
}

export const Heading5: Story = {
	args: {
		name: 'Infomentor',
		variant: 'h5',
	},
}

export const Heading6: Story = {
	args: {
		name: 'Infomentor',
		variant: 'h6',
	},
}

export const Body1: Story = {
	args: {
		name: 'Infomentor',
		variant: 'body1',
	},
}

export const Body2: Story = {
	args: {
		name: 'Infomentor',
		variant: 'body2',
	},
}

export const AllVariants: Story = {
	render: () => (
		<Stack spacing={2} alignItems={`flex-start`}>
			<BrandName name={`Infomentor`} variant={`h1`} />
			<BrandName name={`Infomentor`} variant={`h2`} />
			<BrandName name={`Infomentor`} variant={`h3`} />
			<BrandName name={`Infomentor`} variant={`h4`} />
			<BrandName name={`Infomentor`} variant={`h5`} />
			<BrandName name={`Infomentor`} variant={`h6`} />
			<BrandName name={`Infomentor`} variant={`body1`} />
			<BrandName name={`Infomentor`} variant={`body2`} />
		</Stack>
	),
}
