import { useTheme } from '@mui/material'
import React from 'react'
import { IconButton } from '../../button-icon'

export interface IThemeSwitcherProps {
	onThemeToggle?: () => void
}

export const Component: React.FC<IThemeSwitcherProps> = ({ onThemeToggle }) => {
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'
	const iconFillColor: string = isDark ? theme.palette.accent.main : theme.palette.primary.main

	const handleToggle = (): void => {
		if (onThemeToggle) {
			onThemeToggle()
		}
	}

	return (
		<IconButton
			sx={{
				width: 40,
				height: 40,
				bgcolor: `bg.main`,
				color: iconFillColor,
				'& svg': {
					transition: `transform 200ms`,
				},
				'& svg path': {
					fill: iconFillColor,
				},
				'&:hover svg': { transform: `rotate(-45deg)` },
			}}
			onClick={handleToggle}
			color={`inherit`}>
			<svg width="20" height="20" viewBox="0 0 16.52 16.52" xmlns="http://www.w3.org/2000/svg">
				<path
					fill={iconFillColor}
					d="m8.26 0c-4.56 0-8.26 3.7-8.26 8.26s3.7 8.26 8.26 8.26 8.26-3.7 8.26-8.26-3.71-8.26-8.26-8.26zm0 15.52c-2 0-3.82-.81-5.13-2.13l10.26-10.26c1.31 1.31 2.13 3.13 2.13 5.13 0 4-3.26 7.26-7.26 7.26z"
				/>
			</svg>
		</IconButton>
	)
}

Component.displayName = `ThemeSwitcher`
