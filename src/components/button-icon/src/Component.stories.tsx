import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Icon } from '../../icon'
import { Component as IconButton } from './Component'

const meta = {
	title: 'Button/IconButton',
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: ['default', 'inherit', 'primary', 'error', 'info', 'success', 'warning'],
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		disabled: {
			control: 'boolean',
		},
		edge: {
			control: 'select',
			options: [false, 'start', 'end'],
		},
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		color: 'primary',
		children: <Icon name={`Plus`} />,
	},
}

export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
			<IconButton color={`default`}>
				<Icon name={`SyAdd`} />
			</IconButton>
			<IconButton color={`primary`}>
				<Icon name={`SyAdd`} />
			</IconButton>
			<IconButton color={`error`}>
				<Icon name={`SyAdd`} />
			</IconButton>
			<IconButton color={`warning`}>
				<Icon name={`SyAdd`} />
			</IconButton>
			<IconButton color={`success`}>
				<Icon name={`SyAdd`} />
			</IconButton>
		</div>
	),
}

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
			<IconButton size={`small`}>
				<Icon name={`SyAdd`} />
			</IconButton>
			<IconButton size={`medium`}>
				<Icon name={`SyAdd`} />
			</IconButton>
			<IconButton size={`large`}>
				<Icon name={`SyAdd`} />
			</IconButton>
		</div>
	),
}

export const Disabled: Story = {
	args: {
		disabled: true,
		children: <Icon name={`SyAdd`} />,
	},
}

export const EdgePositions: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<IconButton edge={`start`}>
				<Icon name={`SyAdd`} />
			</IconButton>
			<span>Icon at start edge</span>
			<IconButton edge={`end`}>
				<Icon name={`SyAdd`} />
			</IconButton>
		</div>
	),
}

export const CustomStyling: Story = {
	args: {
		children: <Icon name={`SyAdd`} />,
		sx: {
			backgroundColor: 'red',
			color: 'white',
			'&:hover': {
				backgroundColor: 'darkred',
			},
			borderRadius: '4px',
		},
	},
}
