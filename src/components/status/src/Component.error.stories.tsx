import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Component as StatusError } from './Component.error'

const meta = {
	title: 'Status/StatusError',
	component: StatusError,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Main title displayed on the error status page',
		},
		subTitle: {
			control: 'text',
			description: 'Subtitle or description text',
		},
		objectNumber: {
			control: 'text',
			description: 'Optional object number or reference ID',
		},
		actions: {
			control: 'object',
			description: 'Array of action buttons to display',
		},
	},
} satisfies Meta<typeof StatusError>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: 'Something went wrong',
		subTitle: 'An error occurred while processing your request',
	},
}

export const WithObjectNumber: Story = {
	args: {
		title: 'Payment Failed',
		subTitle: 'We could not process your payment. Please try again.',
		objectNumber: 'TXN-45678',
	},
}

export const WithCustomActions: Story = {
	args: {
		title: 'Upload Failed',
		subTitle: 'The file could not be uploaded due to a network error',
		actions: [
			{
				label: 'Retry Upload',
				variant: 'contained',
				color: 'error',
				onClick: fn(),
			},
			{
				label: 'Choose Different File',
				variant: 'outlined',
				color: 'primary',
				onClick: fn(),
			},
		],
	},
}

export const MinimalError: Story = {
	args: {
		title: 'Error',
	},
}

export const DetailedError: Story = {
	args: {
		title: 'Authentication Failed',
		subTitle: 'Your session has expired. Please log in again to continue.',
		objectNumber: 'ERR-AUTH-001',
		actions: [
			{
				label: 'Log In Again',
				variant: 'contained',
				color: 'error',
				path: '/login',
			},
			{
				label: 'Go to Home',
				variant: 'outlined',
				color: 'primary',
				path: '/',
			},
		],
	},
}

export const NetworkError: Story = {
	args: {
		title: 'Connection Lost',
		subTitle: 'Unable to reach the server. Please check your internet connection and try again.',
		objectNumber: 'NET-500',
		actions: [
			{
				label: 'Retry',
				variant: 'contained',
				color: 'error',
				onClick: fn(),
			},
		],
	},
}
