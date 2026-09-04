import { EChart } from '@kbox-labs/react-echarts'
import { useMediaQuery } from '@mui/material'
import * as React from 'react'

interface ChartBarProps {
	name?: string
	color?: string
	height?: string
	width?: string
	xAxisData: string[]
	seriesData: string[] | number[]
	borderWidth?: number
	showTooltip?: boolean
	showLegend?: boolean
	minimal?: boolean
}

export const Component: React.FC<ChartBarProps> = ({
	name = 'Chart Bar',
	color = `yellow`,
	height = `100px`,
	width = `100%`,
	seriesData,
	borderWidth = 3,
	showTooltip = false,
	showLegend = false,
	minimal = false,
}) => {
	const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md')) ?? true

	const displayTooltip = minimal ? false : showTooltip
	const displayLegend = minimal ? false : showLegend

	return (
		<EChart
			renderer={'svg'}
			style={{
				height,
				width,
				padding: 0,
				margin: 0,
			}}
			tooltip={displayTooltip ? { trigger: 'axis' } : { show: false }}
			legend={displayLegend ? { show: true } : { show: false }}
			grid={{
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				containLabel: false,
			}}
			xAxis={[
				{
					type: 'category',
					show: false,
				},
			]}
			yAxis={[
				{
					type: 'value',
					show: false,
				},
			]}
			series={[
				{
					name,
					type: 'bar',
					data: seriesData,
					barWidth: isMobile ? '40%' : '60%',
					itemStyle: {
						color,
						borderRadius: [6, 6, 0, 0],
						borderWidth: borderWidth,
						borderColor: color,
					},
					emphasis: {
						focus: 'series',
					},
				},
			]}
		/>
	)
}
