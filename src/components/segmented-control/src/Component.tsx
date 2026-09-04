import { Box, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'
import React from 'react'
import type { SegmentedControlProps } from './types'

export const Component: React.FC<SegmentedControlProps> = ({
	options,
	selected,
	setSelected,
	onChange,
	width = '100%',
	sx,
	...props
}) => {
	const theme = useTheme()

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: number | null) => {
		if (newValue !== null) {
			setSelected(newValue)
			onChange?.({ index: newValue, segment: options[newValue] })
		}
	}

	return (
		<Box
			sx={{
				display: 'inline-flex',
				backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
				borderRadius: '18px',
				padding: '3px',
				width,
				...sx,
			}}>
			<ToggleButtonGroup
				value={selected}
				exclusive
				onChange={handleChange}
				aria-label={`segmented control`}
				fullWidth
				sx={{
					width: '100%',
					height: '36px',
					'& .MuiToggleButtonGroup-grouped': {
						border: 0,
						borderRadius: '16px !important',
						margin: 0,
						'&.Mui-selected': {
							backgroundColor:
								theme.palette.mode === 'dark' ? theme.palette.accent.main : theme.palette.primary.main,
							color:
								theme.palette.mode === 'dark'
									? theme.palette.accent.contrastText
									: theme.palette.primary.contrastText,
							'&:hover': {
								backgroundColor:
									theme.palette.mode === 'dark'
										? theme.palette.accent.dark
										: theme.palette.primary.dark,
							},
						},
						'&:not(.Mui-selected)': {
							color: theme.palette.text.main,
							'&:hover': {
								backgroundColor: 'rgba(0, 0, 0, 0.04)',
							},
						},
					},
				}}
				{...props}>
				{options.map((option, index) => (
					<ToggleButton
						key={index}
						value={index}
						aria-label={option.label}
						sx={{
							textTransform: 'none',
							fontWeight: 500,
							fontSize: '14px',
							flex: 1,
						}}>
						{option.startIcon && (
							<Box
								component={`span`}
								sx={{
									display: 'flex',
									alignItems: 'center',
									mr: option.label ? 1.5 : 0,
								}}>
								{option.startIcon}
							</Box>
						)}
						{option.label}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	)
}
