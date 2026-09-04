import type { BoxProps } from '@mui/material'

export interface NotFoundProps extends Omit<BoxProps, 'children'> {
	where?: string
	title?: string
	description?: string
	homeUrl?: string
	homeButtonText?: string
	imageUrl?: string
	imageAlt?: string
	imageWidth?: number
	imageHeight?: number
	testId?: string
}
