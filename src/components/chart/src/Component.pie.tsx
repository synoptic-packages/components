'use client'

import { EChart } from '@kbox-labs/react-echarts'
import * as React from 'react'

export interface PieDataItem {
	value: number
	name: string
}

interface ChartPieProps {
	data: PieDataItem[]
	radius?: string | [string, string]
	height?: string
	width?: string
	showLabel?: boolean
	showLegend?: boolean
	showTooltip?: boolean
	roseType?: 'radius' | 'area' | false
	colors?: string[]
	minimal?: boolean
}

export const Component: React.FC<ChartPieProps> = ({
	data,
	radius = '70%',
	height = `300px`,
	width = `100%`,
	showLabel = true,
	showLegend = true,
	showTooltip = true,
	roseType = false,
	colors,
	minimal = false,
}) => {
	const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6']

	const displayLabel = minimal ? false : showLabel
	const displayLegend = minimal ? false : showLegend
	const displayTooltip = minimal ? false : showTooltip

	return (
		<EChart
			renderer={`svg`}
			style={{
				height,
				width,
				padding: 0,
				margin: 0,
			}}
			color={colors || defaultColors}
			tooltip={
				displayTooltip
					? {
							trigger: 'item',
							formatter: '{a} <br/>{b}: {c} ({d}%)',
						}
					: { show: false }
			}
			legend={
				displayLegend
					? {
							show: true,
							orient: 'vertical',
							left: 'left',
							textStyle: {
								fontSize: 12,
							},
						}
					: { show: false }
			}
			series={[
				{
					name: 'Data',
					type: 'pie',
					radius,
					data,
					roseType: roseType || undefined,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
					label: {
						show: displayLabel,
						formatter: '{b}: {d}%',
					},
					labelLine: {
						show: displayLabel,
						smooth: true,
					},
				},
			]}
		/>
	)
}
