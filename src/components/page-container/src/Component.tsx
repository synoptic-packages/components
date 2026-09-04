import { Box, Typography } from '@mui/material'
import * as React from 'react'

export interface IComponentProps {
	children: React.ReactNode
	title?: string
	actions?: React.ReactNode
	maxWidth?: number
	/**
	 * Let the page use the full viewport width instead of the 920px reading measure.
	 *
	 * 920px is right for prose, forms and detail panels — a column of text wider than that is hard to read. It
	 * is wrong for a DATA TABLE, which is what most operator surfaces are: six columns squeezed into 920px start
	 * truncating and horizontally scrolling while hundreds of pixels sit empty on either side. Every table page
	 * in this console was capped at 920 because the default is, and none of them had asked to be.
	 *
	 * A named mode rather than each page passing its own magic number, so table pages cannot drift apart from
	 * one another and the intent is legible at the call site.
	 */
	wide?: boolean
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({ children, title, actions, maxWidth, wide, testId }) => {
	const resolvedMaxWidth = maxWidth ?? (wide ? `none` : 920)
	return (
		<Box
			data-test-id={testId ?? `id-wallet-page-container`}
			sx={{
				width: `100%`,
				px: { xs: 2, md: 4 },
				py: { xs: 3, md: 4 },
			}}>
			<Box sx={{ maxWidth: resolvedMaxWidth, mx: `auto`, width: `100%` }}>
				{(title || actions) && (
					<Box
						sx={{
							display: `flex`,
							alignItems: `center`,
							justifyContent: `space-between`,
							gap: 2,
							mb: 3,
						}}>
						{title ? (
							<Typography variant={`h5`} component={`h1`} sx={{ fontWeight: 700 }}>
								{title}
							</Typography>
						) : (
							<Box />
						)}
						{actions ? <Box sx={{ display: `flex`, alignItems: `center`, gap: 1 }}>{actions}</Box> : null}
					</Box>
				)}
				{children}
			</Box>
		</Box>
	)
}

Component.displayName = 'PageContainer'
