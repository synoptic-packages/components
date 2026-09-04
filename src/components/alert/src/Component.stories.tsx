import type { Meta } from '@storybook/react-vite'
import { Component as Alert } from './Component'

const meta = {
	title: 'Components/Alert',
	component: Alert,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		severity: {
			control: 'select',
			options: ['success', 'warning', 'error', 'info'],
		},
		variant: {
			control: 'select',
			options: ['outlined', 'standard', 'filled'],
		},
		message: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Alert>

export default meta

export const Default = {
	args: {
		severity: 'info',
		variant: 'outlined',
		message: 'This is an info alert with custom icons',
	},
}

export const SeverityVariants = {
	render: () => (
		<div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Alert severity={`success`} message={`This is a success alert`} />
			<Alert severity={`info`} message={`This is an info alert`} />
			<Alert severity={`warning`} message={`This is a warning alert`} />
			<Alert severity={`error`} message={`This is an error alert`} />
		</div>
	),
}

export const VariantTypes = {
	render: () => (
		<div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<div>
				<h4>Outlined Variants</h4>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<Alert severity={`success`} variant={`outlined`} message={`Success outlined alert`} />
					<Alert severity={`warning`} variant={`outlined`} message={`Warning outlined alert`} />
					<Alert severity={`error`} variant={`outlined`} message={`Error outlined alert`} />
					<Alert severity={`info`} variant={`outlined`} message={`Info outlined alert`} />
				</div>
			</div>
			<div>
				<h4>Filled Variants</h4>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<Alert severity={`success`} variant={`filled`} message={`Success filled alert`} />
					<Alert severity={`warning`} variant={`filled`} message={`Warning filled alert`} />
					<Alert severity={`error`} variant={`filled`} message={`Error filled alert`} />
					<Alert severity={`info`} variant={`filled`} message={`Info filled alert`} />
				</div>
			</div>
		</div>
	),
}

export const LongMessages = {
	render: () => (
		<div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Alert
				severity={`info`}
				message={`This is a longer info message that demonstrates how the alert component handles multiple lines of text and maintains proper spacing and readability.`}
			/>
			<Alert
				severity={`warning`}
				message={`This warning alert contains important information that users should be aware of. It shows how the component handles longer text content while maintaining visual hierarchy.`}
			/>
			<Alert
				severity={`error`}
				message={`This error message provides detailed information about what went wrong and potentially how to fix it. Error messages often need more space to provide context and actionable guidance to users.`}
			/>
		</div>
	),
}
