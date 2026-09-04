'use client'

import { EChart } from '@kbox-labs/react-echarts'
import * as React from 'react'

export interface GaugeDataItem {
	value: number
	name: string
}

interface ChartGaugeProps {
	data: GaugeDataItem[]
	min?: number
	max?: number
	height?: string
	width?: string
	startAngle?: number
	endAngle?: number
	splitNumber?: number
	axisLineColors?: Array<[number, string]>
	showTooltip?: boolean
	showLabel?: boolean
	minimal?: boolean
}

export const Component: React.FC<ChartGaugeProps> = ({
	data,
	min = 0,
	max = 100,
	height = `300px`,
	width = `100%`,
	startAngle = 225,
	endAngle = -45,
	splitNumber = 10,
	axisLineColors,
	showTooltip = true,
	showLabel = true,
	minimal = false,
}) => {
	const defaultAxisLineColors: Array<[number, string]> = [
		[0.3, '#10b981'],
		[0.7, '#f59e0b'],
		[1, '#ef4444'],
	]

	const displayTooltip = minimal ? false : showTooltip
	const displayLabel = minimal ? false : showLabel

	return (
		<EChart
			renderer={`svg`}
			style={{
				height,
				width,
				padding: 0,
				margin: 0,
			}}
			tooltip={displayTooltip ? { trigger: 'item' } : { show: false }}
			series={[
				{
					name: 'Gauge',
					type: 'gauge',
					min,
					max,
					startAngle,
					endAngle,
					splitNumber,
					axisLine: {
						lineStyle: {
							width: 30,
							color: axisLineColors || defaultAxisLineColors,
						},
					},
					pointer: {
						itemStyle: {
							color: 'auto',
						},
					},
					axisTick: {
						distance: -30,
						length: 8,
						lineStyle: {
							color: '#fff',
							width: 2,
						},
						show: displayLabel,
					},
					splitLine: {
						distance: -30,
						length: 30,
						lineStyle: {
							color: '#fff',
							width: 4,
						},
						show: displayLabel,
					},
					axisLabel: {
						color: 'inherit',
						distance: 40,
						fontSize: 12,
						show: displayLabel,
					},
					detail: {
						valueAnimation: true,
						formatter: '{value}',
						color: 'inherit',
						fontSize: 24,
						offsetCenter: [0, '70%'],
						show: displayLabel,
					},
					data,
				},
			]}
		/>
	)
}
