import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartGauge } from './Component.gauge'

const meta = {
	title: 'Charts/Gauge',
	component: ChartGauge,
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
		min: {
			control: 'number',
		},
		max: {
			control: 'number',
		},
		startAngle: {
			control: 'number',
		},
		endAngle: {
			control: 'number',
		},
		splitNumber: {
			control: 'number',
		},
	},
} satisfies Meta<typeof ChartGauge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		height: '400px',
		width: '400px',
		data: [{ value: 67, name: 'Performance' }],
	},
}

export const CPUUsage: Story = {
	args: {
		height: '400px',
		width: '400px',
		min: 0,
		max: 100,
		data: [{ value: 45, name: 'CPU Usage %' }],
		axisLineColors: [
			[0.5, '#10b981'],
			[0.8, '#f59e0b'],
			[1, '#ef4444'],
		],
	},
}

export const Speed: Story = {
	args: {
		height: '400px',
		width: '400px',
		min: 0,
		max: 200,
		data: [{ value: 125, name: 'Speed (km/h)' }],
		splitNumber: 10,
		axisLineColors: [
			[0.4, '#3b82f6'],
			[0.7, '#f59e0b'],
			[1, '#ef4444'],
		],
	},
}

export const Temperature: Story = {
	args: {
		height: '400px',
		width: '400px',
		min: -20,
		max: 50,
		data: [{ value: 22, name: 'Temperature °C' }],
		axisLineColors: [
			[0.3, '#06b6d4'],
			[0.6, '#10b981'],
			[0.8, '#f59e0b'],
			[1, '#ef4444'],
		],
	},
}

export const Progress: Story = {
	args: {
		height: '350px',
		width: '350px',
		min: 0,
		max: 100,
		data: [{ value: 85, name: 'Progress' }],
		axisLineColors: [
			[0.5, '#ef4444'],
			[0.75, '#f59e0b'],
			[1, '#10b981'],
		],
	},
}

export const Battery: Story = {
	args: {
		height: '350px',
		width: '350px',
		min: 0,
		max: 100,
		data: [{ value: 35, name: 'Battery %' }],
		startAngle: 180,
		endAngle: 0,
		axisLineColors: [
			[0.2, '#ef4444'],
			[0.5, '#f59e0b'],
			[1, '#10b981'],
		],
	},
}

export const Score: Story = {
	args: {
		height: '400px',
		width: '400px',
		min: 0,
		max: 10,
		data: [{ value: 7.5, name: 'Score' }],
		splitNumber: 10,
		axisLineColors: [
			[0.6, '#ef4444'],
			[0.8, '#f59e0b'],
			[1, '#10b981'],
		],
	},
}

export const Pressure: Story = {
	args: {
		height: '400px',
		width: '400px',
		min: 0,
		max: 500,
		data: [{ value: 320, name: 'Pressure (PSI)' }],
		splitNumber: 5,
		axisLineColors: [
			[0.7, '#10b981'],
			[0.9, '#f59e0b'],
			[1, '#ef4444'],
		],
	},
}

export const Minimal: Story = {
	args: {
		height: '300px',
		width: '300px',
		data: [{ value: 75, name: 'Progress' }],
		minimal: true,
	},
}
