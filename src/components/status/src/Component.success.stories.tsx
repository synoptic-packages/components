import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Component as StatusSuccess } from './Component.success'

const meta = {
	title: 'Status/StatusSuccess',
	component: StatusSuccess,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Main title displayed on the success status page',
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
} satisfies Meta<typeof StatusSuccess>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: 'Success!',
		subTitle: 'Your action was completed successfully',
	},
}

export const WithObjectNumber: Story = {
	args: {
		title: 'Order Placed',
		subTitle: 'Your order has been successfully placed',
		objectNumber: 'ORD-12345',
	},
}

export const WithCustomActions: Story = {
	args: {
		title: 'Payment Successful',
		subTitle: 'Your payment has been processed',
		objectNumber: 'TXN-98765',
		actions: [
			{
				label: 'View Receipt',
				variant: 'contained',
				color: 'success',
				onClick: fn(),
			},
			{
				label: 'Continue Shopping',
				variant: 'outlined',
				color: 'primary',
				onClick: fn(),
			},
		],
	},
}

export const MinimalSuccess: Story = {
	args: {
		title: 'Done!',
	},
}

export const AccountCreated: Story = {
	args: {
		title: 'Account Created',
		subTitle: 'Welcome! Your account has been successfully created.',
		objectNumber: 'USR-54321',
		actions: [
			{
				label: 'Get Started',
				variant: 'contained',
				color: 'success',
				path: '/dashboard',
			},
			{
				label: 'Complete Profile',
				variant: 'outlined',
				color: 'primary',
				path: '/profile',
			},
		],
	},
}

export const FileUploaded: Story = {
	args: {
		title: 'Upload Complete',
		subTitle: 'Your file has been uploaded and is now processing',
		objectNumber: 'FILE-2024-001',
		actions: [
			{
				label: 'View Files',
				variant: 'contained',
				color: 'success',
				onClick: fn(),
			},
			{
				label: 'Upload Another',
				variant: 'outlined',
				color: 'primary',
				onClick: fn(),
			},
		],
	},
}

export const MultipleActions: Story = {
	args: {
		title: 'Submission Received',
		subTitle: 'We have received your application and will review it shortly',
		objectNumber: 'APP-2024-789',
		actions: [
			{
				label: 'Track Status',
				variant: 'contained',
				color: 'success',
				path: '/status',
			},
			{
				label: 'View Details',
				variant: 'outlined',
				color: 'primary',
				path: '/details',
			},
			{
				label: 'Back to Home',
				variant: 'text',
				color: 'primary',
				path: '/',
			},
		],
	},
}
