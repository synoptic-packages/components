import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartRadar } from './Component.radar'

const meta = {
	title: 'Charts/Radar',
	component: ChartRadar,
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
		shape: {
			control: 'select',
			options: ['polygon', 'circle'],
		},
	},
} satisfies Meta<typeof ChartRadar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		height: '500px',
		width: '600px',
		indicator: [
			{ name: 'Sales', max: 6500 },
			{ name: 'Administration', max: 16000 },
			{ name: 'Information Technology', max: 30000 },
			{ name: 'Customer Support', max: 38000 },
			{ name: 'Development', max: 52000 },
			{ name: 'Marketing', max: 25000 },
		],
		data: [
			{
				value: [4300, 10000, 28000, 35000, 50000, 19000],
				name: 'Allocated Budget',
			},
			{
				value: [5000, 14000, 28000, 31000, 42000, 21000],
				name: 'Actual Spending',
			},
		],
	},
}

export const Skills: Story = {
	args: {
		height: '500px',
		width: '600px',
		shape: 'circle',
		indicator: [
			{ name: 'JavaScript', max: 100 },
			{ name: 'TypeScript', max: 100 },
			{ name: 'React', max: 100 },
			{ name: 'Node.js', max: 100 },
			{ name: 'CSS', max: 100 },
			{ name: 'Design', max: 100 },
		],
		data: [
			{
				value: [90, 85, 95, 80, 88, 70],
				name: 'Developer A',
			},
			{
				value: [70, 75, 85, 90, 65, 85],
				name: 'Developer B',
			},
		],
	},
}

export const Performance: Story = {
	args: {
		height: '500px',
		width: '600px',
		indicator: [
			{ name: 'Speed', max: 100 },
			{ name: 'Reliability', max: 100 },
			{ name: 'Efficiency', max: 100 },
			{ name: 'Quality', max: 100 },
			{ name: 'Innovation', max: 100 },
		],
		data: [
			{
				value: [85, 92, 78, 88, 75],
				name: 'Q1',
			},
			{
				value: [90, 88, 85, 92, 82],
				name: 'Q2',
			},
			{
				value: [88, 95, 90, 95, 88],
				name: 'Q3',
			},
		],
	},
}

export const ProductComparison: Story = {
	args: {
		height: '500px',
		width: '600px',
		indicator: [
			{ name: 'Features', max: 10 },
			{ name: 'Price', max: 10 },
			{ name: 'Support', max: 10 },
			{ name: 'Performance', max: 10 },
			{ name: 'UX', max: 10 },
			{ name: 'Reliability', max: 10 },
		],
		data: [
			{
				value: [8, 7, 9, 8, 9, 8],
				name: 'Product A',
			},
			{
				value: [7, 9, 7, 9, 7, 9],
				name: 'Product B',
			},
		],
		colors: ['#3b82f6', '#10b981'],
	} as any,
}

export const HealthMetrics: Story = {
	args: {
		height: '500px',
		width: '600px',
		shape: 'circle',
		indicator: [
			{ name: 'Heart Rate', max: 100 },
			{ name: 'Blood Pressure', max: 100 },
			{ name: 'Sleep Quality', max: 100 },
			{ name: 'Exercise', max: 100 },
			{ name: 'Nutrition', max: 100 },
			{ name: 'Stress Level', max: 100 },
		],
		data: [
			{
				value: [75, 80, 70, 85, 78, 65],
				name: 'Current Week',
			},
		],
		colors: ['#10b981'],
	} as any,
}

export const TeamCapabilities: Story = {
	args: {
		height: '500px',
		width: '600px',
		indicator: [
			{ name: 'Communication', max: 100 },
			{ name: 'Problem Solving', max: 100 },
			{ name: 'Leadership', max: 100 },
			{ name: 'Creativity', max: 100 },
			{ name: 'Technical', max: 100 },
		],
		data: [
			{
				value: [88, 85, 78, 92, 90],
				name: 'Team Alpha',
			},
			{
				value: [75, 90, 85, 80, 88],
				name: 'Team Beta',
			},
			{
				value: [82, 78, 92, 85, 75],
				name: 'Team Gamma',
			},
		],
		colors: ['#3b82f6', '#10b981', '#f59e0b'],
	} as any,
}

export const MarketAnalysis: Story = {
	args: {
		height: '500px',
		width: '600px',
		shape: 'polygon',
		indicator: [
			{ name: 'Brand Awareness', max: 100 },
			{ name: 'Market Share', max: 100 },
			{ name: 'Customer Satisfaction', max: 100 },
			{ name: 'Innovation', max: 100 },
			{ name: 'Price Competitiveness', max: 100 },
			{ name: 'Distribution', max: 100 },
		],
		data: [
			{
				value: [85, 70, 90, 75, 80, 85],
				name: 'Our Company',
			},
			{
				value: [75, 80, 75, 85, 75, 80],
				name: 'Competitor A',
			},
		],
		colors: ['#8b5cf6', '#ef4444'],
	} as any,
}

export const Minimal: Story = {
	args: {
		height: '400px',
		width: '500px',
		indicator: [
			{ name: 'Speed', max: 100 },
			{ name: 'Power', max: 100 },
			{ name: 'Defense', max: 100 },
			{ name: 'Attack', max: 100 },
			{ name: 'Agility', max: 100 },
		],
		data: [
			{
				value: [85, 90, 70, 95, 80],
				name: 'Hero A',
			},
		],
		minimal: true,
	},
}
