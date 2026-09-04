import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import type { PasswordStrength } from '../../../lib'

interface IComponentIndicatorProps {
	passwordStrength: PasswordStrength
}

export const ComponentIndicator: React.FC<IComponentIndicatorProps> = ({ passwordStrength }) => {
	const { color, percentage } = passwordStrength

	return (
		<Box sx={{ mt: 1, px: 1 }}>
			<LinearProgress
				variant={`determinate`}
				value={percentage}
				sx={{
					height: 4,
					borderRadius: 2,
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
					'& .MuiLinearProgress-bar': {
						backgroundColor: color,
						borderRadius: 2,
					},
				}}
			/>
		</Box>
	)
}
