import { Box } from '@mui/material'
import { Text } from '../../text'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Icon } from '../../icon'
import { Component as SegmentedControl } from './Component'

const meta = {
	title: 'Controls/SegmentedControl',
	component: SegmentedControl,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		selected: {
			control: 'number',
		},
		width: {
			control: 'text',
		},
	},
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		options: [
			{ label: 'First', value: 'first' },
			{ label: 'Second', value: 'second' },
			{ label: 'Third', value: 'third' },
		],
		selected: 0,
		setSelected: fn(),
		onChange: fn(),
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)
		return <SegmentedControl {...args} selected={selected} setSelected={setSelected} />
	},
}

export const WithIcons: Story = {
	args: {
		options: [
			{ label: 'Home', value: 'home', startIcon: <Icon name={`House`} size={16} /> },
			{ label: 'Settings', value: 'settings', startIcon: <Icon name={`Settings`} size={16} /> },
			{ label: 'Profile', value: 'profile', startIcon: <Icon name={`User`} size={16} /> },
		],
		selected: 0,
		setSelected: fn(),
		onChange: fn(),
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)
		return <SegmentedControl {...args} selected={selected} setSelected={setSelected} />
	},
}

export const IconsOnly: Story = {
	args: {
		options: [
			{ label: '', value: 'list', startIcon: <Icon name={`List`} size={20} /> },
			{ label: '', value: 'grid', startIcon: <Icon name={`LayoutPanelLeft`} size={20} /> },
			{ label: '', value: 'columns', startIcon: <Icon name={`BetweenVerticalStart`} size={20} /> },
		],
		selected: 0,
		setSelected: fn(),
		onChange: fn(),
		width: '200px',
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)
		return <SegmentedControl {...args} selected={selected} setSelected={setSelected} />
	},
}

export const TwoOptions: Story = {
	args: {
		options: [
			{ label: 'Yes', value: 'yes' },
			{ label: 'No', value: 'no' },
		],
		selected: 0,
		setSelected: fn(),
		onChange: fn(),
		width: '200px',
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)
		return <SegmentedControl {...args} selected={selected} setSelected={setSelected} />
	},
}

export const FourOptions: Story = {
	args: {
		options: [
			{ label: 'All', value: 'all' },
			{ label: 'Active', value: 'active' },
			{ label: 'Pending', value: 'pending' },
			{ label: 'Archived', value: 'archived' },
		],
		selected: 0,
		setSelected: fn(),
		onChange: fn(),
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)
		return <SegmentedControl {...args} selected={selected} setSelected={setSelected} />
	},
}

export const CustomWidth: Story = {
	args: {
		options: [
			{ label: 'Small', value: 'small' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Large', value: 'large' },
		],
		selected: 1,
		setSelected: fn(),
		onChange: fn(),
		width: '400px',
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)
		return <SegmentedControl {...args} selected={selected} setSelected={setSelected} />
	},
}

export const Interactive: Story = {
	args: {
		options: [
			{ label: 'Daily', value: 'daily' },
			{ label: 'Weekly', value: 'weekly' },
			{ label: 'Monthly', value: 'monthly' },
		],
		selected: 0,
		setSelected: fn(),
		onChange: fn(),
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)

		return (
			<Box sx={{ width: '100%', maxWidth: '500px' }}>
				<SegmentedControl
					{...args}
					selected={selected}
					setSelected={setSelected}
					onChange={({ index, segment }) => {
						console.log('Selected:', { index, segment })
					}}
				/>
				<Text sx={{ marginTop: 2, textAlign: 'center' }}>
					Selected: {args.options[selected].label} (Index: {selected})
				</Text>
			</Box>
		)
	},
}

export const ViewModeSelector: Story = {
	args: {
		options: [
			{ label: 'List', value: 'list', startIcon: <Icon name={`List`} size={16} /> },
			{ label: 'Grid', value: 'grid', startIcon: <Icon name={`LayoutPanelLeft`} size={16} /> },
			{ label: 'Table', value: 'table', startIcon: <Icon name={`Table`} size={16} /> },
		],
		selected: 0,
		setSelected: fn(),
		width: '350px',
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selected)

		return <SegmentedControl {...args} selected={selected} setSelected={setSelected} />
	},
}
