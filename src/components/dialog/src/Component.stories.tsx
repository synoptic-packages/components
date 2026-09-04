import type { Meta } from '@storybook/react-vite'
import React from 'react'
import Component from './Component'

const meta = {
	title: 'Components/Dialog',
	component: Component,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['success', 'warning', 'error', 'info'],
		},
		open: {
			control: 'boolean',
		},
		title: {
			control: 'text',
		},
		description: {
			control: 'text',
		},
		confirmTitle: {
			control: 'text',
		},
		hideCancel: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Component>

export default meta

export const Default = {
	args: {
		open: true,
		title: 'Confirm Action',
		description: 'Are you sure you want to proceed with this action?',
		confirmTitle: 'Confirm',
		variant: 'info',
		hideCancel: false,
		setDialog: () => {},
		onConfirm: () => console.log('Confirmed!'),
	},
}

export const VariantTypes = {
	render: () => {
		const [openDialog, setOpenDialog] = React.useState<string | null>(null)

		const dialogs = [
			{
				variant: 'success' as const,
				title: 'Success Dialog',
				description: 'Your action was completed successfully!',
				confirmTitle: 'Great!',
			},
			{
				variant: 'warning' as const,
				title: 'Warning Dialog',
				description: 'This action may have unintended consequences. Are you sure?',
				confirmTitle: 'Proceed',
			},
			{
				variant: 'error' as const,
				title: 'Error Dialog',
				description: 'An error occurred while processing your request.',
				confirmTitle: 'Try Again',
			},
			{
				variant: 'info' as const,
				title: 'Info Dialog',
				description: 'Here is some important information you should know.',
				confirmTitle: 'Got it',
			},
		]

		return (
			<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
				{dialogs.map((dialog) => (
					<button
						key={dialog.variant}
						onClick={() => setOpenDialog(dialog.variant)}
						style={{
							padding: '12px 24px',
							fontSize: '14px',
							backgroundColor: '#2196f3',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							textTransform: 'capitalize',
						}}>
						{dialog.variant} Dialog
					</button>
				))}

				{dialogs.map((dialog) => (
					<Component
						key={dialog.variant}
						open={openDialog === dialog.variant}
						variant={dialog.variant}
						title={dialog.title}
						description={dialog.description}
						confirmTitle={dialog.confirmTitle}
						setDialog={() => setOpenDialog(null)}
						onConfirm={() => {
							console.log(`${dialog.variant} confirmed!`)
							setOpenDialog(null)
						}}
					/>
				))}
			</div>
		)
	},
}

export const WithoutCancel = {
	render: () => {
		const [open, setOpen] = React.useState(false)

		return (
			<div>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: '12px 24px',
						fontSize: '16px',
						backgroundColor: '#2196f3',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}>
					Open Dialog (No Cancel)
				</button>

				<Component
					open={open}
					variant={`warning`}
					title={`Important Notice`}
					description={`This action cannot be undone. Please acknowledge that you understand.`}
					confirmTitle={`I Understand`}
					hideCancel={true}
					setDialog={() => setOpen(false)}
					onConfirm={() => {
						console.log('Acknowledged!')
						setOpen(false)
					}}
				/>
			</div>
		)
	},
}

export const LongContent = {
	render: () => {
		const [open, setOpen] = React.useState(false)

		return (
			<div>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: '12px 24px',
						fontSize: '16px',
						backgroundColor: '#2196f3',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}>
					Open Dialog (Long Content)
				</button>

				<Component
					open={open}
					variant={`error`}
					title={`Delete Account Permanently`}
					description={`This action will permanently delete your account and all associated data. This includes your profile, posts, comments, and any other content you have created. This action cannot be undone and your data cannot be recovered once deleted.`}
					confirmTitle={`Delete Forever`}
					setDialog={() => setOpen(false)}
					onConfirm={() => {
						console.log('Account deleted!')
						setOpen(false)
					}}
				/>
			</div>
		)
	},
}
