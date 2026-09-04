import { CircularProgress } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Component as Button } from './Component'

const meta = {
	title: 'Button/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['contained', 'outlined', 'text'],
		},
		color: {
			control: 'select',
			options: ['primary', 'success', 'error', 'warning', 'info'],
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		disabled: {
			control: 'boolean',
		},
	},
	args: {
		onClick: fn(),
		children: 'Button',
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		variant: 'contained',
		color: 'primary',
	},
}

export const Loading: Story = {
	args: {
		variant: 'contained',
		color: 'primary',
		disabled: true,
		startIcon: <CircularProgress size={16} color={`inherit`} />,
		children: 'Loading...',
	},
}

export const CustomWhite: Story = {
	args: {
		variant: 'contained',
		children: 'White Button',
		sx: {
			backgroundColor: 'white',
			color: 'text.primary',
			border: '1px solid',
			borderColor: 'grey.300',
			'&:hover': {
				backgroundColor: 'grey.50',
				borderColor: 'grey.400',
			},
		},
	},
}

export const CustomBlack: Story = {
	args: {
		variant: 'contained',
		children: 'Black Button',
		sx: {
			backgroundColor: 'black',
			color: 'white',
			'&:hover': {
				backgroundColor: 'grey.800',
			},
		},
	},
}

export const FullWidth: Story = {
	args: {
		variant: 'contained',
		color: 'primary',
		fullWidth: true,
		size: 'large',
	},
	parameters: {
		layout: 'padded',
	},
}
