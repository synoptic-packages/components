import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ComponentBadge as Badge } from './Component'

const meta = {
	title: 'Badge/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'outlined'],
		},
		color: {
			control: 'select',
			options: ['default', 'primary', 'error', 'info', 'success', 'warning'],
		},
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
		clickable: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
	args: {
		onClick: fn(),
		label: 'Badge',
	},
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		color: 'primary',
	},
}

export const Small: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		size: 'small',
		label: 'Small Badge',
	},
}

export const Medium: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		size: 'medium',
		label: 'Medium Badge',
	},
}

export const Outlined: Story = {
	args: {
		variant: 'outlined',
		color: 'primary',
		label: 'Outlined Badge',
	},
}

export const OutlinedSmall: Story = {
	args: {
		variant: 'outlined',
		color: 'primary',
		size: 'small',
		label: 'Outlined Small',
	},
}

export const Clickable: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		clickable: true,
		label: 'Clickable Badge',
	},
}

export const Disabled: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		disabled: true,
		label: 'Disabled Badge',
	},
}

export const WithDeleteIcon: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		label: 'Deletable',
		onDelete: fn(),
	},
}

export const WithDeleteIconSmall: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		size: 'small',
		label: 'Deletable',
		onDelete: fn(),
	},
}

export const ColorVariants: Story = {
	render: () => (
		<Stack direction={`row`} spacing={1} flexWrap={`wrap`} useFlexGap>
			<Badge label={`Default`} color={`default`} />
			<Badge label={`Primary`} color={`primary`} />
			<Badge label={`Error`} color={`error`} />
			<Badge label={`Warning`} color={`warning`} />
			<Badge label={`Info`} color={`info`} />
			<Badge label={`Success`} color={`success`} />
		</Stack>
	),
}

export const SizeComparison: Story = {
	render: () => (
		<Stack direction={`row`} spacing={1} alignItems={`center`}>
			<Badge label={`Small`} color={`primary`} size={`small`} />
			<Badge label={`Medium`} color={`primary`} size={`medium`} />
		</Stack>
	),
}
