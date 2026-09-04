'use client'

import { EChart } from '@kbox-labs/react-echarts'
import * as React from 'react'

export interface ScatterDataItem {
	value: [number, number]
	name?: string
}

interface ChartScatterProps {
	data: ScatterDataItem[]
	xAxisName?: string
	yAxisName?: string
	height?: string
	width?: string
	symbolSize?: number | ((value: [number, number]) => number)
	color?: string
	showGrid?: boolean
	showTooltip?: boolean
	showAxisLabels?: boolean
	minimal?: boolean
}

export const Component: React.FC<ChartScatterProps> = ({
	data,
	xAxisName = 'X Axis',
	yAxisName = 'Y Axis',
	height = `400px`,
	width = `100%`,
	symbolSize = 10,
	color = '#3b82f6',
	showGrid = true,
	showTooltip = true,
	showAxisLabels = true,
	minimal = false,
}) => {
	const displayGrid = minimal ? false : showGrid
	const displayTooltip = minimal ? false : showTooltip
	const displayAxisLabels = minimal ? false : showAxisLabels
	return (
		<EChart
			renderer={`svg`}
			style={{
				height,
				width,
				padding: 0,
				margin: 0,
			}}
			tooltip={
				displayTooltip
					? {
							trigger: 'item',
							formatter: (params: any) => {
								const { name, value } = params
								return `${name || 'Point'}<br/>X: ${value[0]}<br/>Y: ${value[1]}`
							},
						}
					: { show: false }
			}
			grid={{
				left: '10%',
				right: '10%',
				bottom: '15%',
				top: '10%',
				containLabel: true,
			}}
			xAxis={{
				name: displayAxisLabels ? xAxisName : '',
				nameLocation: 'middle',
				nameGap: 30,
				splitLine: {
					show: displayGrid,
					lineStyle: {
						type: 'dashed',
						color: 'rgba(211, 211, 211, 0.3)',
					},
				},
			}}
			yAxis={{
				name: displayAxisLabels ? yAxisName : '',
				nameLocation: 'middle',
				nameGap: 40,
				splitLine: {
					show: displayGrid,
					lineStyle: {
						type: 'dashed',
						color: 'rgba(211, 211, 211, 0.3)',
					},
				},
			}}
			series={[
				{
					name: 'Data Points',
					type: 'scatter',
					symbolSize,
					data: data.map((item) => ({
						value: item.value,
						name: item.name,
					})),
					itemStyle: {
						color,
					},
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
				},
			]}
		/>
	)
}
