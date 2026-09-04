import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartPolar } from './Component.polar'

const meta = {
	title: 'Charts/Polar',
	component: ChartPolar,
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
		barWidth: {
			control: 'number',
		},
		radiusMax: {
			control: 'number',
		},
	},
} satisfies Meta<typeof ChartPolar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		height: '500px',
		width: '500px',
		data: [
			{ name: 'Mon', value: 20 },
			{ name: 'Tue', value: 15 },
			{ name: 'Wed', value: 25 },
			{ name: 'Thu', value: 18 },
			{ name: 'Fri', value: 30 },
			{ name: 'Sat', value: 22 },
			{ name: 'Sun', value: 10 },
		],
	},
}

export const WeeklySales: Story = {
	args: {
		height: '500px',
		width: '500px',
		data: [
			{ name: 'Monday', value: 120 },
			{ name: 'Tuesday', value: 132 },
			{ name: 'Wednesday', value: 101 },
			{ name: 'Thursday', value: 134 },
			{ name: 'Friday', value: 190 },
			{ name: 'Saturday', value: 230 },
			{ name: 'Sunday', value: 210 },
		],
		showTooltip: true,
	},
}

export const MonthlyMetrics: Story = {
	args: {
		height: '600px',
		width: '600px',
		barWidth: 20,
		data: [
			{ name: 'Jan', value: 85 },
			{ name: 'Feb', value: 92 },
			{ name: 'Mar', value: 78 },
			{ name: 'Apr', value: 95 },
			{ name: 'May', value: 88 },
			{ name: 'Jun', value: 105 },
			{ name: 'Jul', value: 110 },
			{ name: 'Aug', value: 98 },
			{ name: 'Sep', value: 102 },
			{ name: 'Oct', value: 115 },
			{ name: 'Nov', value: 108 },
			{ name: 'Dec', value: 120 },
		],
	},
}

export const SkillsRadial: Story = {
	args: {
		height: '500px',
		width: '500px',
		radiusMax: 100,
		data: [
			{ name: 'JavaScript', value: 90 },
			{ name: 'TypeScript', value: 85 },
			{ name: 'React', value: 95 },
			{ name: 'Node.js', value: 80 },
			{ name: 'CSS', value: 88 },
			{ name: 'Design', value: 70 },
		],
	},
}

export const DepartmentBudget: Story = {
	args: {
		height: '550px',
		width: '550px',
		barWidth: 25,
		data: [
			{ name: 'Engineering', value: 5000 },
			{ name: 'Marketing', value: 3000 },
			{ name: 'Sales', value: 4000 },
			{ name: 'HR', value: 1500 },
			{ name: 'Operations', value: 2500 },
			{ name: 'Finance', value: 2000 },
		],
		showTooltip: true,
	},
}

export const Compact: Story = {
	args: {
		height: '350px',
		width: '350px',
		barWidth: 10,
		data: [
			{ name: 'Q1', value: 45 },
			{ name: 'Q2', value: 52 },
			{ name: 'Q3', value: 48 },
			{ name: 'Q4', value: 58 },
		],
	},
}

export const Minimal: Story = {
	args: {
		height: '400px',
		width: '400px',
		data: [
			{ name: 'A', value: 30 },
			{ name: 'B', value: 45 },
			{ name: 'C', value: 60 },
			{ name: 'D', value: 40 },
			{ name: 'E', value: 55 },
		],
		minimal: true,
	},
}
