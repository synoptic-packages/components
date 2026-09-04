import { Box } from '@mui/material'
import { Text } from '../../text'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as Accordion } from './Component'

const meta = {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'The Accordion component provides an expandable/collapsible content area. It supports single or multiple panel expansion and can contain any React content.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		items: {
			control: 'object',
			description: 'Array of accordion items with id, title, content, and optional disabled state',
		},
		multiple: {
			control: 'boolean',
			description: 'Allow multiple panels to be expanded simultaneously',
		},
		initialExpanded: {
			control: 'object',
			description: 'Initial expanded panel(s) - string for single, array for multiple',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable all accordion panels',
		},
	},
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const basicItems = [
	{
		id: 'panel1',
		title: 'General Information',
		content: 'This is the general information section with basic details about the topic.',
	},
	{
		id: 'panel2',
		title: 'Technical Details',
		content: 'Here you can find technical specifications and implementation details.',
	},
	{
		id: 'panel3',
		title: 'FAQ',
		content: 'Frequently asked questions and their answers are listed in this section.',
	},
]

const richContentItems = [
	{
		id: 'rich1',
		title: 'Rich Content Example',
		content: (
			<Box>
				<Text variant={`normal`} gutterBottom>
					This accordion panel contains rich content including:
				</Text>
				<ul>
					<li>Formatted text</li>
					<li>Lists and bullet points</li>
					<li>Custom components</li>
				</ul>
				<Text variant={`small`}>You can include any React component as content.</Text>
			</Box>
		),
	},
	{
		id: 'rich2',
		title: 'Another Rich Panel',
		content: (
			<Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
				<Text variant={`medium`} color={`primary`}>
					Styled Content Area
				</Text>
				<Text variant={`normal`}>This content has custom styling applied through the sx prop.</Text>
			</Box>
		),
	},
]

export const Default: Story = {
	args: {
		items: basicItems,
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic accordion with simple text content. Only one panel can be expanded at a time.',
			},
		},
	},
}

export const MultipleExpansion: Story = {
	args: {
		items: basicItems,
		multiple: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Accordion allowing multiple panels to be expanded simultaneously.',
			},
		},
	},
}

export const InitialExpanded: Story = {
	args: {
		items: basicItems,
		initialExpanded: 'panel1',
	},
	parameters: {
		docs: {
			description: {
				story: 'Accordion with the first panel expanded initially.',
			},
		},
	},
}

export const MultipleInitialExpanded: Story = {
	args: {
		items: basicItems,
		multiple: true,
		initialExpanded: ['panel1', 'panel3'],
	},
	parameters: {
		docs: {
			description: {
				story: 'Accordion with multiple panels expanded initially when multiple expansion is enabled.',
			},
		},
	},
}

export const WithDisabledPanel: Story = {
	args: {
		items: [
			...basicItems.slice(0, 2),
			{
				id: 'panel3',
				title: 'Disabled Panel',
				content: 'This panel is disabled and cannot be expanded.',
				disabled: true,
			},
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Accordion with one disabled panel that cannot be expanded.',
			},
		},
	},
}

export const RichContent: Story = {
	args: {
		items: richContentItems,
		multiple: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Accordion panels containing rich content including custom components and styling.',
			},
		},
	},
}

export const SingleItem: Story = {
	args: {
		items: [
			{
				id: 'single',
				title: 'Single Accordion Item',
				content: 'This accordion contains only one expandable item.',
			},
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Accordion with a single expandable item.',
			},
		},
	},
}
