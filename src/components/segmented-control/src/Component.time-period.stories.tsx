import { Box } from '@mui/material'
import type { Meta } from '@storybook/react-vite'
import { useState } from 'react'
import { Component as TimePeriodSpan } from './Component.time-period'
import type { PeriodSpanType } from './types'

const meta = {
	title: 'Controls/TimePeriodSpan',
	component: TimePeriodSpan,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		periodSpan: {
			control: 'select',
			options: ['day', 'week', 'month', 'year'],
			description: 'Currently selected time period',
		},
		onPeriodChange: {
			action: 'period changed',
			description: 'Callback when period is changed',
		},
	},
} satisfies Meta<typeof TimePeriodSpan>

export default meta

export const Default = {
	render: () => {
		const [period, setPeriod] = useState<PeriodSpanType>('week')
		return (
			<Box sx={{ width: '300px' }}>
				<TimePeriodSpan periodSpan={period} onPeriodChange={setPeriod} />
			</Box>
		)
	},
}

export const DaySelected = {
	render: () => {
		const [period, setPeriod] = useState<PeriodSpanType>('day')
		return (
			<Box sx={{ width: '300px' }}>
				<TimePeriodSpan periodSpan={period} onPeriodChange={setPeriod} />
			</Box>
		)
	},
}

export const MonthSelected = {
	render: () => {
		const [period, setPeriod] = useState<PeriodSpanType>('month')
		return (
			<Box sx={{ width: '300px' }}>
				<TimePeriodSpan periodSpan={period} onPeriodChange={setPeriod} />
			</Box>
		)
	},
}

export const YearSelected = {
	render: () => {
		const [period, setPeriod] = useState<PeriodSpanType>('year')
		return (
			<Box sx={{ width: '300px' }}>
				<TimePeriodSpan periodSpan={period} onPeriodChange={setPeriod} />
			</Box>
		)
	},
}
