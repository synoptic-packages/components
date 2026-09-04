import { EChart } from '@kbox-labs/react-echarts'
import * as React from 'react'

export interface PolarDataItem {
	value: number
	name: string
}

interface ChartPolarProps {
	data: PolarDataItem[]
	height?: string
	width?: string
	radiusMax?: number
	barWidth?: number | string
	showLabel?: boolean
	showLegend?: boolean
	showTooltip?: boolean
	colors?: string[]
	minimal?: boolean
}

export const Component: React.FC<ChartPolarProps> = ({
	data,
	height = `400px`,
	width = `100%`,
	radiusMax,
	barWidth = 15,
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

	const maxValue = radiusMax || Math.max(...data.map((item) => item.value))

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
							formatter: '{a} <br/>{b}: {c}',
						}
					: { show: false }
			}
			legend={
				displayLegend
					? {
							show: true,
							data: data.map((item) => item.name),
							bottom: 0,
						}
					: { show: false }
			}
			polar={{
				radius: '75%',
			}}
			angleAxis={{
				max: maxValue,
				startAngle: 90,
				show: displayLabel,
			}}
			radiusAxis={{
				type: 'category',
				data: data.map((item) => item.name),
				z: 10,
				axisLabel: {
					show: displayLabel,
				},
				axisLine: {
					show: displayLabel,
				},
			}}
			series={[
				{
					name: 'Polar Bar',
					type: 'bar',
					data: data.map((item) => item.value),
					coordinateSystem: 'polar',
					barWidth,
					label: {
						show: displayLabel,
						position: 'middle',
						formatter: '{c}',
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
