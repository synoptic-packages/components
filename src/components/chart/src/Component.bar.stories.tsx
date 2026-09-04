import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartBar } from './Component.bar'

const meta = {
	title: 'Charts/Bar',
	component: ChartBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'color',
		},
		height: {
			control: 'text',
		},
		width: {
			control: 'text',
		},
		borderWidth: {
			control: 'number',
		},
		showTooltip: {
			control: 'boolean',
		},
		showLegend: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof ChartBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		name: 'Sales Data',
		color: '#3b82f6',
		height: '200px',
		width: '400px',
		xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		seriesData: [120, 200, 150, 80, 70, 110, 130],
		borderWidth: 3,
	},
}

export const Revenue: Story = {
	args: {
		name: 'Monthly Revenue',
		color: '#10b981',
		height: '250px',
		width: '500px',
		xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		seriesData: [28000, 31000, 29000, 35000, 42000, 38000],
		borderWidth: 2,
	},
}

export const Traffic: Story = {
	args: {
		name: 'Website Traffic',
		color: '#f59e0b',
		height: '180px',
		width: '600px',
		xAxisData: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
		seriesData: [4500, 5200, 4800, 6100],
		borderWidth: 4,
	},
}

export const Compact: Story = {
	args: {
		name: 'Compact Chart',
		color: '#8b5cf6',
		height: '100px',
		width: '300px',
		xAxisData: ['Q1', 'Q2', 'Q3', 'Q4'],
		seriesData: [45, 67, 52, 78],
		borderWidth: 2,
	},
}

export const HighVolume: Story = {
	args: {
		name: 'Daily Transactions',
		color: '#ef4444',
		height: '300px',
		width: '800px',
		xAxisData: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
		seriesData: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
		borderWidth: 1,
	},
}

export const WithTooltip: Story = {
	args: {
		name: 'Interactive Chart',
		color: '#06b6d4',
		height: '200px',
		width: '400px',
		xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
		seriesData: [120, 200, 150, 220, 180],
		borderWidth: 3,
		showTooltip: true,
	},
}

export const Minimal: Story = {
	args: {
		name: 'Clean Chart',
		color: '#10b981',
		height: '150px',
		width: '350px',
		xAxisData: ['A', 'B', 'C', 'D'],
		seriesData: [85, 110, 95, 125],
		borderWidth: 2,
		minimal: true,
	},
}
