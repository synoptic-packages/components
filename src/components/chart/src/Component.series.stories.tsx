import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartSeries } from './Component.series'

const meta = {
	title: 'Charts/Series',
	component: ChartSeries,
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
} satisfies Meta<typeof ChartSeries>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		name: 'Growth Trend',
		color: '#3b82f6',
		height: '200px',
		width: '400px',
		xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		seriesData: [820, 932, 901, 934, 1290, 1330],
		borderWidth: 3,
	},
}

export const StockPrice: Story = {
	args: {
		name: 'Stock Performance',
		color: '#10b981',
		height: '250px',
		width: '600px',
		xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		seriesData: [150, 230, 224, 218, 135, 147, 260],
		borderWidth: 4,
	},
}

export const Temperature: Story = {
	args: {
		name: 'Temperature',
		color: '#f59e0b',
		height: '180px',
		width: '500px',
		xAxisData: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
		seriesData: [18, 22, 28, 32, 29, 24],
		borderWidth: 2,
	},
}

export const UserGrowth: Story = {
	args: {
		name: 'User Growth',
		color: '#8b5cf6',
		height: '220px',
		width: '700px',
		xAxisData: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
		seriesData: [1200, 1850, 2100, 2680, 3200, 3890],
		borderWidth: 3,
	},
}

export const YearlyRevenue: Story = {
	args: {
		name: 'Annual Revenue',
		color: '#06b6d4',
		height: '300px',
		width: '900px',
		xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		seriesData: [32000, 34000, 38000, 42000, 45000, 48000, 52000, 55000, 58000, 61000, 65000, 70000],
		borderWidth: 2,
	},
}

export const Compact: Story = {
	args: {
		name: 'Mini Sparkline',
		color: '#ec4899',
		height: '80px',
		width: '200px',
		xAxisData: ['1', '2', '3', '4', '5'],
		seriesData: [23, 45, 32, 67, 54],
		borderWidth: 2,
	},
}

export const WithTooltip: Story = {
	args: {
		name: 'Interactive Series',
		color: '#8b5cf6',
		height: '200px',
		width: '500px',
		xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		seriesData: [120, 145, 180, 210, 195, 230, 260],
		borderWidth: 3,
		showTooltip: true,
	},
}

export const Minimal: Story = {
	args: {
		name: 'Clean Line',
		color: '#10b981',
		height: '150px',
		width: '400px',
		xAxisData: ['A', 'B', 'C', 'D', 'E'],
		seriesData: [45, 75, 60, 90, 80],
		borderWidth: 3,
		minimal: true,
	},
}

export const WithAxisLabels: Story = {
	args: {
		name: 'Sales Trend',
		color: '#3b82f6',
		height: '350px',
		width: '700px',
		xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
		seriesData: [120, 200, 150, 280, 250, 340, 320, 400],
		borderWidth: 3,
		showAxisLabels: true,
		showGrid: true,
		xAxisName: 'Month',
		yAxisName: 'Revenue ($1000)',
	},
}

export const MultipleSeriesComparison: Story = {
	args: {
		height: '400px',
		width: '800px',
		xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		multipleSeries: [
			{
				name: 'Product A',
				data: [320, 302, 301, 334, 390, 330, 320],
				color: '#3b82f6',
				type: 'line',
				smooth: true,
				areaStyle: true,
			},
			{
				name: 'Product B',
				data: [220, 182, 191, 234, 290, 330, 310],
				color: '#10b981',
				type: 'line',
				smooth: true,
				areaStyle: true,
			},
			{
				name: 'Product C',
				data: [150, 232, 201, 154, 190, 330, 410],
				color: '#f59e0b',
				type: 'line',
				smooth: true,
				areaStyle: true,
			},
		],
		showLegend: true,
		showAxisLabels: true,
		showGrid: true,
		showTooltip: true,
		xAxisName: 'Day of Week',
		yAxisName: 'Sales',
	},
}

export const MultipleSeriesMixed: Story = {
	args: {
		height: '400px',
		width: '800px',
		xAxisData: ['Q1', 'Q2', 'Q3', 'Q4'],
		multipleSeries: [
			{
				name: 'Revenue',
				data: [45000, 52000, 48000, 58000],
				color: '#3b82f6',
				type: 'bar',
			},
			{
				name: 'Target',
				data: [50000, 50000, 50000, 50000],
				color: '#ef4444',
				type: 'line',
				smooth: false,
			},
			{
				name: 'Forecast',
				data: [46000, 54000, 51000, 62000],
				color: '#10b981',
				type: 'line',
				smooth: true,
			},
		],
		showLegend: true,
		showAxisLabels: true,
		showGrid: true,
		showTooltip: true,
		xAxisName: 'Quarter',
		yAxisName: 'Amount ($)',
	},
}

export const DetailedLineChart: Story = {
	args: {
		name: 'Website Traffic',
		color: '#8b5cf6',
		height: '350px',
		width: '900px',
		xAxisData: [
			'00:00',
			'02:00',
			'04:00',
			'06:00',
			'08:00',
			'10:00',
			'12:00',
			'14:00',
			'16:00',
			'18:00',
			'20:00',
			'22:00',
		],
		seriesData: [120, 132, 101, 134, 290, 530, 810, 932, 901, 934, 1290, 1330],
		borderWidth: 3,
		showTooltip: true,
		showAxisLabels: true,
		showGrid: true,
		xAxisName: 'Time',
		yAxisName: 'Visitors',
	},
}

export const PerformanceMetrics: Story = {
	args: {
		height: '400px',
		width: '900px',
		xAxisData: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
		multipleSeries: [
			{
				name: 'CPU Usage',
				data: [45, 52, 48, 61, 58, 65],
				color: '#ef4444',
				type: 'line',
				smooth: true,
			},
			{
				name: 'Memory Usage',
				data: [38, 42, 45, 47, 50, 53],
				color: '#f59e0b',
				type: 'line',
				smooth: true,
			},
			{
				name: 'Disk Usage',
				data: [28, 30, 32, 35, 38, 42],
				color: '#10b981',
				type: 'line',
				smooth: true,
			},
		],
		showLegend: true,
		showAxisLabels: true,
		showGrid: true,
		showTooltip: true,
		xAxisName: 'Time Period',
		yAxisName: 'Usage (%)',
	},
}

export const AnnualComparison: Story = {
	args: {
		height: '450px',
		width: '1000px',
		xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		multipleSeries: [
			{
				name: '2023',
				data: [2200, 2400, 2800, 3100, 3300, 3500, 3800, 4000, 3900, 4200, 4500, 4800],
				color: '#06b6d4',
				type: 'line',
				smooth: true,
				areaStyle: false,
			},
			{
				name: '2024',
				data: [2500, 2800, 3200, 3600, 3900, 4200, 4500, 4800, 5000, 5200, 5500, 5800],
				color: '#3b82f6',
				type: 'line',
				smooth: true,
				areaStyle: false,
			},
		],
		showLegend: true,
		showAxisLabels: true,
		showGrid: true,
		showTooltip: true,
		xAxisName: 'Month',
		yAxisName: 'Revenue ($)',
	},
}
