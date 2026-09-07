import type { Meta, StoryObj } from '@storybook/react-vite'

import { Component as PasskeyEnrollment } from './Component'
import type { PasskeyClient } from './types'

const mockClient: PasskeyClient = {
	listUserPasskeys: async () => ({
		data: [
			{ id: `pk-1`, name: `Work laptop`, createdAt: `2026-08-01T10:00:00.000Z`, backedUp: true },
			{ id: `pk-2`, name: null, createdAt: null, backedUp: false },
		],
	}),
	addPasskey: async () => ({ data: { id: `pk-3` } }),
	deletePasskey: async () => ({ data: {} }),
	updatePasskey: async () => ({ data: {} }),
}

const meta = {
	title: 'Security/Passkey Enrollment',
	component: PasskeyEnrollment,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof PasskeyEnrollment>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => <PasskeyEnrollment client={mockClient} testId={`id-passkey-enrollment-story`} />,
}

export const Empty: Story = {
	render: () => (
		<PasskeyEnrollment
			client={{ ...mockClient, listUserPasskeys: async () => ({ data: [] }) }}
			testId={`id-passkey-enrollment-empty`}
		/>
	),
}

export const LoadError: Story = {
	render: () => (
		<PasskeyEnrollment
			client={{ ...mockClient, listUserPasskeys: async () => ({ error: new Error(`offline`) }) }}
			testId={`id-passkey-enrollment-error`}
		/>
	),
}
