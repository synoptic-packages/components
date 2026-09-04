import { Button, Card, CardContent } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '../../text'
import { Component as PageContainer } from './Component'

const meta = {
	title: 'Components/PageContainer',
	component: PageContainer,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'The standard routed-page shell: centered max-width column with uniform responsive padding and an optional title/actions row. Every routed page outside a dedicated layout (arbiter, portal) must use it as its root.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Page heading rendered as h1 in the standard title row',
		},
		maxWidth: {
			control: 'number',
			description: 'Content column max width in pixels (default 920)',
		},
	},
} satisfies Meta<typeof PageContainer>

export default meta
type Story = StoryObj<typeof meta>

const content = (
	<Card>
		<CardContent>
			<Text variant={`body1`}>{`Page content lives inside the centered column.`}</Text>
		</CardContent>
	</Card>
)

export const Default: Story = {
	args: {
		title: 'Page title',
		children: content,
	},
}

export const WithActions: Story = {
	args: {
		title: 'Events',
		actions: <Button variant={`outlined`}>{`Organizer`}</Button>,
		children: content,
	},
}

export const NarrowColumn: Story = {
	args: {
		title: 'Checkout',
		maxWidth: 560,
		children: content,
	},
}
