import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartPie } from './Component.pie'

const meta = {
	title: 'Charts/Pie',
	component: ChartPie,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		height: {
			control: 'text',
		},
		width: {
			control: 'text',
		},
		showLabel: {
			control: 'boolean',
		},
		showLegend: {
			control: 'boolean',
		},
		showTooltip: {
			control: 'boolean',
		},
		roseType: {
			control: 'select',
			options: [false, 'radius', 'area'],
		},
	},
} satisfies Meta<typeof ChartPie>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		height: '400px',
		width: '500px',
		showLabel: true,
		data: [
			{ value: 335, name: 'Direct Visit' },
			{ value: 310, name: 'Email' },
			{ value: 234, name: 'Advertising' },
			{ value: 135, name: 'Video Ads' },
			{ value: 548, name: 'Search Engine' },
		],
	},
}

export const MarketShare: Story = {
	args: {
		height: '450px',
		width: '600px',
		showLabel: true,
		data: [
			{ value: 1048, name: 'Product A' },
			{ value: 735, name: 'Product B' },
			{ value: 580, name: 'Product C' },
			{ value: 484, name: 'Product D' },
			{ value: 300, name: 'Product E' },
		],
	},
}

export const Donut: Story = {
	args: {
		height: '400px',
		width: '500px',
		radius: ['40%', '70%'],
		showLabel: true,
		data: [
			{ value: 400, name: 'Desktop' },
			{ value: 335, name: 'Mobile' },
			{ value: 310, name: 'Tablet' },
		],
	},
}

export const NightingaleRadius: Story = {
	args: {
		height: '450px',
		width: '550px',
		roseType: 'radius',
		showLabel: true,
		data: [
			{ value: 40, name: 'Category A' },
			{ value: 38, name: 'Category B' },
			{ value: 32, name: 'Category C' },
			{ value: 30, name: 'Category D' },
			{ value: 28, name: 'Category E' },
			{ value: 26, name: 'Category F' },
			{ value: 22, name: 'Category G' },
			{ value: 18, name: 'Category H' },
		],
	},
}

export const NightingaleArea: Story = {
	args: {
		height: '450px',
		width: '550px',
		roseType: 'area',
		radius: ['30%', '75%'],
		showLabel: false,
		data: [
			{ value: 30, name: 'Spring' },
			{ value: 28, name: 'Summer' },
			{ value: 26, name: 'Autumn' },
			{ value: 24, name: 'Winter' },
		],
	},
}

export const CustomColors: Story = {
	args: {
		height: '400px',
		width: '500px',
		showLabel: true,
		colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
		data: [
			{ value: 300, name: 'Revenue' },
			{ value: 200, name: 'Costs' },
			{ value: 150, name: 'Marketing' },
			{ value: 100, name: 'Operations' },
			{ value: 50, name: 'Other' },
		],
	},
}

export const SimpleThree: Story = {
	args: {
		height: '350px',
		width: '450px',
		showLabel: true,
		data: [
			{ value: 60, name: 'Completed' },
			{ value: 25, name: 'In Progress' },
			{ value: 15, name: 'Pending' },
		],
	},
}

export const NoLabels: Story = {
	args: {
		height: '400px',
		width: '500px',
		showLabel: false,
		showLegend: true,
		showTooltip: true,
		data: [
			{ value: 400, name: 'Desktop' },
			{ value: 335, name: 'Mobile' },
			{ value: 310, name: 'Tablet' },
			{ value: 200, name: 'Smart TV' },
		],
	},
}

export const NoLegend: Story = {
	args: {
		height: '400px',
		width: '500px',
		showLabel: true,
		showLegend: false,
		showTooltip: true,
		data: [
			{ value: 400, name: 'Q1' },
			{ value: 335, name: 'Q2' },
			{ value: 310, name: 'Q3' },
			{ value: 280, name: 'Q4' },
		],
	},
}

export const MinimalClean: Story = {
	args: {
		height: '300px',
		width: '300px',
		showLabel: false,
		showLegend: false,
		showTooltip: true,
		radius: '80%',
		data: [
			{ value: 70, name: 'Completed' },
			{ value: 30, name: 'Remaining' },
		],
		colors: ['#10b981', '#e5e7eb'],
	},
}
