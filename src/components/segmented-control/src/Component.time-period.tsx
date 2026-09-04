import { ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'
import React from 'react'
import type { PeriodSpanType, TimePeriodSpanProps } from './types'

const periods: PeriodSpanType[] = ['day', 'week', 'month', 'year']

const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const Component: React.FC<TimePeriodSpanProps> = ({ periodSpan, onPeriodChange }) => {
	const theme = useTheme()

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: PeriodSpanType | null) => {
		if (newValue !== null) {
			onPeriodChange(newValue)
		}
	}

	return (
		<ToggleButtonGroup
			value={periodSpan}
			exclusive
			onChange={handleChange}
			aria-label={`time period selection`}
			sx={{
				width: '100%',
				maxWidth: '250px',
				'& .MuiToggleButtonGroup-grouped': {
					border: 0,
					borderRadius: '12px !important',
					margin: '2px 4px',
					flex: 1,
					'&.Mui-selected': {
						backgroundColor:
							theme.palette.mode === 'dark' ? theme.palette.accent.main : theme.palette.primary.main,
						color:
							theme.palette.mode === 'dark'
								? theme.palette.accent.contrastText
								: theme.palette.primary.contrastText,
						'&:hover': {
							backgroundColor:
								theme.palette.mode === 'dark' ? theme.palette.accent.dark : theme.palette.primary.dark,
						},
					},
					'&:not(.Mui-selected)': {
						backgroundColor: theme.palette.common.white,
						color: theme.palette.common.black,
					},
				},
			}}>
			{periods.map((period) => (
				<ToggleButton
					key={period}
					value={period}
					aria-label={period}
					sx={{
						textTransform: 'none',
						fontSize: '12px',
						fontWeight: 500,
						py: 0.5,
					}}>
					{capitalize(period)}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	)
}
