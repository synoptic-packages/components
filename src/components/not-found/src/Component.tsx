import { Box, Button } from '@mui/material'
import React from 'react'
import { Image } from '../../image'
import { Link } from '../../link'
import { Text } from '../../text'
import type { NotFoundProps } from './types'
import { getAssetBaseUrl } from '../../../lib/env'

export type { NotFoundProps }

export const Component: React.FC<NotFoundProps> = ({
	where,
	title = 'Not Found',
	description,
	homeUrl = '/',
	homeButtonText = 'Return Home',
	imageUrl = `${getAssetBaseUrl()}404.png`,
	imageAlt = 'Not Found',
	imageWidth = 350,
	imageHeight = 100,
	sx,
	testId,
	...boxProps
}) => {
	const displayDescription = description || (where ? `Could not find requested resource ${where}` : undefined)

	return (
		<Box
			data-test-id={testId ?? `id-wallet-not-found`}
			sx={{
				textAlign: 'center',
				padding: 4,
				mx: 'auto',
				maxWidth: 500,
				minHeight: 450,
				borderRadius: 4,
				my: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				...sx,
			}}
			{...boxProps}>
			<Image src={imageUrl} alt={imageAlt} width={imageWidth} height={imageHeight} />
			<Text variant={`h1`} component={`h1`} sx={{ mt: 5, mb: 1 }}>
				{title}
			</Text>
			{displayDescription && (
				<Text fontSize={18} sx={{ mb: 1, color: `disabled.main` }} color={`textDisabled`}>
					{displayDescription}
				</Text>
			)}
			<Button
				variant={`contained`}
				color={`primary`}
				size={`large`}
				component={Link}
				sx={{ mt: 2, width: 210 }}
				href={homeUrl}>
				{homeButtonText}
			</Button>
		</Box>
	)
}
