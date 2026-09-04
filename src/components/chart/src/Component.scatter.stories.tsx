import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartScatter } from './Component.scatter'

const meta = {
	title: 'Charts/Scatter',
	component: ChartScatter,
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
		symbolSize: {
			control: 'number',
		},
		color: {
			control: 'color',
		},
		showGrid: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof ChartScatter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		height: '400px',
		width: '600px',
		xAxisName: 'X Axis',
		yAxisName: 'Y Axis',
		data: [
			{ value: [10, 20] },
			{ value: [15, 35] },
			{ value: [20, 28] },
			{ value: [25, 42] },
			{ value: [30, 38] },
			{ value: [35, 55] },
			{ value: [40, 48] },
			{ value: [45, 62] },
			{ value: [50, 58] },
			{ value: [55, 70] },
		],
	},
}

export const Correlation: Story = {
	args: {
		height: '450px',
		width: '650px',
		xAxisName: 'Study Hours',
		yAxisName: 'Test Score',
		color: '#10b981',
		symbolSize: 12,
		data: Array.from({ length: 50 }, () => {
			const x = Math.random() * 10
			const y = x * 8 + Math.random() * 15 + 10
			return { value: [Math.round(x * 10) / 10, Math.round(y * 10) / 10] }
		}),
	},
}

export const TemperatureHumidity: Story = {
	args: {
		height: '450px',
		width: '650px',
		xAxisName: 'Temperature (°C)',
		yAxisName: 'Humidity (%)',
		color: '#f59e0b',
		symbolSize: 10,
		data: [
			{ value: [22, 45], name: 'Morning' },
			{ value: [28, 38], name: 'Noon' },
			{ value: [25, 42], name: 'Afternoon' },
			{ value: [20, 55], name: 'Evening' },
			{ value: [18, 60], name: 'Night' },
			{ value: [23, 48], name: 'Morning' },
			{ value: [29, 35], name: 'Noon' },
			{ value: [26, 40], name: 'Afternoon' },
		],
	},
}

export const PriceQuantity: Story = {
	args: {
		height: '450px',
		width: '650px',
		xAxisName: 'Price ($)',
		yAxisName: 'Quantity Sold',
		color: '#8b5cf6',
		symbolSize: 14,
		showGrid: true,
		data: [
			{ value: [10, 180], name: 'Product A' },
			{ value: [15, 150], name: 'Product B' },
			{ value: [20, 120], name: 'Product C' },
			{ value: [25, 100], name: 'Product D' },
			{ value: [30, 85], name: 'Product E' },
			{ value: [35, 70], name: 'Product F' },
			{ value: [40, 60], name: 'Product G' },
			{ value: [45, 50], name: 'Product H' },
		],
	},
}

export const VariableSize: Story = {
	args: {
		height: '450px',
		width: '650px',
		xAxisName: 'Investment ($1000s)',
		yAxisName: 'ROI (%)',
		color: '#ef4444',
		symbolSize: (value: [number, number]) => {
			return value[0] / 2
		},
		data: [
			{ value: [10, 15], name: 'Startup A' },
			{ value: [20, 25], name: 'Startup B' },
			{ value: [30, 22], name: 'Startup C' },
			{ value: [40, 35], name: 'Startup D' },
			{ value: [50, 30], name: 'Startup E' },
			{ value: [60, 42], name: 'Startup F' },
			{ value: [70, 38], name: 'Startup G' },
		],
	},
}

export const Random100Points: Story = {
	args: {
		height: '500px',
		width: '700px',
		xAxisName: 'Feature X',
		yAxisName: 'Feature Y',
		color: '#06b6d4',
		symbolSize: 8,
		data: Array.from({ length: 100 }, (_, i) => ({
			value: [Math.random() * 100, Math.random() * 100],
			name: `Point ${i + 1}`,
		})),
	},
}

export const AgeIncome: Story = {
	args: {
		height: '450px',
		width: '650px',
		xAxisName: 'Age (years)',
		yAxisName: 'Income ($1000s)',
		color: '#10b981',
		symbolSize: 11,
		data: [
			{ value: [25, 35] },
			{ value: [28, 42] },
			{ value: [32, 55] },
			{ value: [35, 62] },
			{ value: [38, 70] },
			{ value: [42, 85] },
			{ value: [45, 95] },
			{ value: [48, 105] },
			{ value: [52, 115] },
			{ value: [55, 125] },
			{ value: [58, 130] },
		],
	},
}

export const Minimal: Story = {
	args: {
		height: '300px',
		width: '500px',
		color: '#8b5cf6',
		symbolSize: 15,
		data: [{ value: [20, 30] }, { value: [40, 50] }, { value: [60, 70] }, { value: [80, 90] }, { value: [50, 60] }],
		minimal: true,
	},
}
