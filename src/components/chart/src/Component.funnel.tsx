'use client'

import { EChart } from '@kbox-labs/react-echarts'
import * as React from 'react'

export interface FunnelDataItem {
	value: number
	name: string
}

interface ChartFunnelProps {
	data: FunnelDataItem[]
	height?: string
	width?: string
	sort?: 'ascending' | 'descending' | 'none'
	align?: 'left' | 'center' | 'right'
	gap?: number
	funnelAlign?: 'left' | 'center' | 'right'
	minSize?: string
	maxSize?: string
	showLabel?: boolean
	showLegend?: boolean
	showTooltip?: boolean
	colors?: string[]
	minimal?: boolean
}

export const Component: React.FC<ChartFunnelProps> = ({
	data,
	height = `400px`,
	width = `100%`,
	sort = 'descending',
	align = 'center',
	gap = 0,
	funnelAlign = 'center',
	minSize = '0%',
	maxSize = '100%',
	showLabel = true,
	showLegend = true,
	showTooltip = true,
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
							data: data.map((item) => item.name),
						}
					: { show: false }
			}
			series={[
				{
					name: 'Funnel',
					type: 'funnel',
					left: align === 'left' ? '10%' : align === 'right' ? '40%' : '25%',
					width: '50%',
					sort,
					gap,
					funnelAlign,
					minSize,
					maxSize,
					label: {
						show: displayLabel,
						position: 'inside',
						formatter: '{b}: {c}',
					},
					labelLine: {
						show: displayLabel,
						length: 10,
						lineStyle: {
							width: 1,
							type: 'solid',
						},
					},
					itemStyle: {
						borderColor: '#fff',
						borderWidth: 1,
					},
					emphasis: {
						label: {
							fontSize: 16,
							fontWeight: 'bold',
						},
					},
					data,
				},
			]}
		/>
	)
}
