import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Icon } from '../../icon'
import { Component as Chip } from './Component'

const meta = {
	title: 'Badge/Chip',
	component: Chip,
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
		label: 'Chip',
	},
} satisfies Meta<typeof Chip>

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
		label: 'Small Chip',
	},
}

export const Medium: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		size: 'medium',
		label: 'Medium Chip',
	},
}

export const Outlined: Story = {
	args: {
		variant: 'outlined',
		color: 'primary',
		label: 'Outlined Chip',
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
		label: 'Clickable Chip',
	},
}

export const Disabled: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		disabled: true,
		label: 'Disabled Chip',
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

export const WithIcon: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		label: 'Icon Chip',
		icon: <Icon name={`User`} />,
	},
}

export const ColorVariants: Story = {
	render: () => (
		<Stack direction={`row`} spacing={1} flexWrap={`wrap`} useFlexGap>
			<Chip label={`Default`} color={`default`} />
			<Chip label={`Primary`} color={`primary`} />
			<Chip label={`Error`} color={`error`} />
			<Chip label={`Warning`} color={`warning`} />
			<Chip label={`Info`} color={`info`} />
			<Chip label={`Success`} color={`success`} />
		</Stack>
	),
}

export const SizeComparison: Story = {
	render: () => (
		<Stack direction={`row`} spacing={1} alignItems={`center`}>
			<Chip label={`Small`} color={`primary`} size={`small`} />
			<Chip label={`Medium`} color={`primary`} size={`medium`} />
		</Stack>
	),
}
