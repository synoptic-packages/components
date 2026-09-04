import { Alert, type SxProps, type Theme } from '@mui/material'
import * as React from 'react'
import { Icon } from '../../icon'

export interface IComponentProps {
	severity?: 'success' | 'warning' | 'error' | 'info' | 'accent'
	message?: string
	variant?: 'outlined' | 'standard' | 'filled'
	sx?: SxProps<Theme>
	testId?: string
}

const getAlertIconMapping = (variant: 'outlined' | 'standard' | 'filled', severity?: string) => {
	const isOutlined = variant === `outlined`
	const iconColor = isOutlined ? undefined : severity === `accent` ? `dark` : `white`

	return {
		success: <Icon name={`SyCheck`} color={iconColor} size={21} />,
		warning: <Icon name={`SyWarning`} color={iconColor} size={21} />,
		error: <Icon name={`SyError`} color={iconColor} size={21} />,
		info: <Icon name={`SyInfoSolid`} color={iconColor} size={21} />,
		accent: <Icon name={`SyInfoSolid`} color={iconColor} size={21} />,
	}
}

export const Component: React.FC<IComponentProps> = ({
	severity = `info`,
	variant = `outlined`,
	message,
	sx,
	testId,
}) => {
	const isOutlined = variant === `outlined`

	const customSx: SxProps<Theme> = {
		width: `100%`,
		borderRadius: `12px`,
		...(isOutlined && {
			'& .MuiAlert-icon': {
				color:
					severity === `success`
						? `success.main`
						: severity === `error`
							? `error.main`
							: severity === `warning`
								? `warning.main`
								: severity === `accent`
									? `accent.main`
									: `info.main`,
			},
			'& .MuiAlert-message': {
				color: `text.main`,
			},
		}),
		...(severity === `accent` &&
			variant === `filled` && {
				backgroundColor: `accent.main`,
				color: `accent.contrastText`,
			}),
		...(severity === `accent` &&
			variant === `standard` && {
				backgroundColor: `accent.main`,
				color: `accent.contrastText`,
			}),
		...sx,
	}

	const alertSeverity = severity === `accent` ? `info` : severity

	return (
		<Alert
			variant={variant}
			severity={alertSeverity as 'success' | 'warning' | 'error' | 'info'}
			className={`--infomentor-alert-${severity}`}
			data-test-id={testId ?? `id-wallet-alert`}
			sx={customSx}
			iconMapping={getAlertIconMapping(variant, severity)}>
			{message}
		</Alert>
	)
}
