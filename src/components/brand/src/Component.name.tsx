import { Box } from '@mui/material'
import clsx from 'clsx'
import type { FC } from 'react'
import { Text } from '../../text'

interface Props {
	name?: string
	className?: string
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2'
}

export const Component: FC<Props> = ({ className, name = 'Infomentor', variant = 'h4' }) => {
	return (
		<Box className={clsx('flex items-center', className)}>
			<Text variant={variant} component={`span`} sx={{ fontWeight: 700 }}>
				{name}
			</Text>
		</Box>
	)
}
