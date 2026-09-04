import { EChart } from '@kbox-labs/react-echarts'
import { useMediaQuery } from '@mui/material'
import * as React from 'react'

export interface SeriesDataset {
	name: string
	data: number[]
	color?: string
	type?: 'line' | 'bar'
	smooth?: boolean
	areaStyle?: boolean
}

interface SeriesChartsProps {
	name?: string
	color?: string
	height?: string
	width?: string
	xAxisData: string[]
	seriesData?: string[] | number[]
	multipleSeries?: SeriesDataset[]
	borderWidth?: number
	showTooltip?: boolean
	showLegend?: boolean
	showAxisLabels?: boolean
	showGrid?: boolean
	xAxisName?: string
	yAxisName?: string
	minimal?: boolean
}

export const Component: React.FC<SeriesChartsProps> = ({
	name = 'Series Chart',
	color = `yellow`,
	height = `100px`,
	width = `100%`,
	xAxisData,
	seriesData,
	multipleSeries,
	borderWidth = 3,
	showTooltip = false,
	showLegend = false,
	showAxisLabels = false,
	showGrid = false,
	xAxisName,
	yAxisName,
	minimal = false,
}) => {
	const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md')) ?? true

	const displayTooltip = minimal ? false : showTooltip
	const displayLegend = minimal ? false : showLegend
	const displayAxisLabels = minimal ? false : showAxisLabels
	const displayGrid = minimal ? false : showGrid

	const linearGradient = (gradientColor: string): any => ({
		type: 'linear',
		x: 0,
		y: 0,
		x2: 0,
		y2: 1,
		colorStops: [
			{
				offset: 0,
				color: gradientColor,
			},
			{
				offset: 1,
				color: gradientColor,
			},
		],
		global: false,
	})

	const isMultiSeries = multipleSeries && multipleSeries.length > 0
	const legendData = isMultiSeries ? multipleSeries.map((s) => s.name) : [name]

	return (
		<EChart
			renderer={'svg'}
			onClick={() => console.log('clicked!')}
			onBrush={() => console.log('onBrush!')}
			onBrushSelected={() => console.log('onBrushSelected!')}
			legend={
				displayLegend
					? {
							show: true,
							data: legendData,
							top: 10,
							left: 'center',
						}
					: { show: false }
			}
			grid={{
				show: false,
				left: displayAxisLabels ? 60 : 0,
				top: displayLegend ? 50 : 0,
				right: displayAxisLabels ? 20 : 0,
				bottom: displayAxisLabels ? 60 : 0,
				containLabel: displayAxisLabels,
			}}
			tooltip={
				displayTooltip
					? {
							trigger: 'axis',
							showContent: true,
							axisPointer: {
								type: 'line',
								snap: true,
								lineStyle: {
									type: 'solid',
									color,
									width: isMobile ? 2 : borderWidth,
								},
								label: {
									show: false,
								},
								shadowStyle: {
									opacity: 0,
								},
							},
							textStyle: {
								textBorderWidth: 0,
								textShadowColor: 'transparent',
							},
						}
					: { show: false }
			}
			style={{
				height,
				width,
				padding: 0,
				margin: 0,
			}}
			xAxis={[
				{
					type: 'category',
					boundaryGap: false,
					name: displayAxisLabels && xAxisName ? xAxisName : '',
					nameLocation: 'middle',
					nameGap: 30,
					splitLine: {
						show: displayGrid,
						lineStyle: {
							type: 'dashed',
							color: 'rgba(211, 211, 211, 0.3)',
						},
					},
					data: xAxisData,
					axisLabel: {
						show: displayAxisLabels,
					},
					axisLine: {
						show: displayAxisLabels,
						lineStyle: {
							color: 'rgba(128, 128, 128, 0.5)',
						},
					},
				},
			]}
			yAxis={[
				{
					type: 'value',
					name: displayAxisLabels && yAxisName ? yAxisName : '',
					nameLocation: 'middle',
					nameGap: 50,
					splitLine: {
						show: displayGrid,
						lineStyle: {
							type: 'dashed',
							color: 'rgba(211, 211, 211, 0.3)',
						},
					},
					axisLabel: {
						show: displayAxisLabels,
					},
					axisLine: {
						show: displayAxisLabels,
						lineStyle: {
							color: 'rgba(128, 128, 128, 0.5)',
						},
					},
				},
			]}
			series={
				isMultiSeries
					? multipleSeries.map((series) => ({
							name: series.name,
							type: series.type || 'line',
							smooth: series.smooth !== undefined ? series.smooth : true,
							color: series.color,
							lineStyle: {
								width: borderWidth,
								color: series.color,
							},
							showSymbol: displayTooltip,
							label: {
								show: false,
								position: 'top',
							},
							showAllSymbol: false,
							areaStyle: series.areaStyle
								? {
										opacity: 0.3,
										color: linearGradient(series.color || color),
									}
								: undefined,
							emphasis: {
								focus: 'series',
							},
							data: series.data,
							symbol: 'circle',
							symbolSize: 8,
						}))
					: [
							{
								name,
								type: 'line',
								stack: 'Total',
								smooth: true,
								color,
								lineStyle: {
									width: 3,
									color,
								},
								showSymbol: false,
								label: {
									show: false,
									position: 'top',
								},
								showAllSymbol: false,
								areaStyle: {
									opacity: 0.8,
									color: linearGradient(color),
								},
								emphasis: {
									focus: 'series',
								},
								data: seriesData,
								symbol: 'circle',
								symbolSize: 12,
							},
						]
			}
		/>
	)
}
