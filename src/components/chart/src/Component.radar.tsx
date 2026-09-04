'use client'

import { EChart } from '@kbox-labs/react-echarts'
import * as React from 'react'

export interface RadarIndicator {
	name: string
	max: number
	min?: number
}

export interface RadarDataItem {
	value: number[]
	name: string
	areaStyle?: {
		opacity?: number
	}
}

interface ChartRadarProps {
	data: RadarDataItem[]
	indicator: RadarIndicator[]
	height?: string
	width?: string
	shape?: 'polygon' | 'circle'
	radius?: string | number
	showLegend?: boolean
	showTooltip?: boolean
	minimal?: boolean
}

export const Component: React.FC<ChartRadarProps> = ({
	data,
	indicator,
	height = `300px`,
	width = `100%`,
	shape = 'polygon',
	radius = 75,
	showLegend = true,
	showTooltip = true,
	minimal = false,
}) => {
	const displayLegend = minimal ? false : showLegend
	const displayTooltip = minimal ? false : showTooltip
	const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

	return (
		<EChart
			renderer={`svg`}
			style={{
				height,
				width,
				padding: 0,
				margin: 0,
			}}
			color={defaultColors}
			tooltip={displayTooltip ? { trigger: 'item' } : { show: false }}
			legend={
				displayLegend
					? {
							show: true,
							data: data.map((item) => item.name),
							bottom: 10,
						}
					: { show: false }
			}
			radar={
				{
					indicator,
					shape,
					radius,
					splitNumber: 5,
					splitArea: {
						areaStyle: {
							color: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
						},
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(211, 211, 211, 0.5)',
						},
					},
				} as any
			}
			series={[
				{
					name: 'Radar Data',
					type: 'radar',
					data: data.map((item) => ({
						...item,
						areaStyle: item.areaStyle || {
							opacity: 0.3,
						},
					})),
				},
			]}
		/>
	)
}
