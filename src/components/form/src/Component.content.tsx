import { Box, Grid } from '@mui/material'
import { Text } from '../../text'
import React from 'react'
import { Alert } from '../../alert'

interface IComponentProps {
	asModal?: boolean
	title?: string
	subTitle?: string | any
	error?: string | null
	success?: string | null
	action?: any
	hideTitle?: boolean
	avatar?: {
		src: string
		alt: string
	}
	children?: React.ReactNode
	/**
	 * Addresses the error Alert for a spec. A shared default cannot disambiguate two open forms, so
	 * a form whose refusal a spec must assert on passes its own (e.g. `ops-asset-supply-error`) —
	 * the same central-extension shape as `Form`'s `-submit`/`-reset` stamping.
	 */
	errorTestId?: string
}

export const Component: React.FC<IComponentProps> = ({
	children,
	error,
	success,
	title,
	subTitle,
	hideTitle,
	errorTestId,
}) => {
	return (
		<React.Fragment>
			<Grid size={{ xs: 12 }} className={`--form-content`}>
				{!hideTitle && (title || subTitle) && (
					<React.Fragment>
						<Box sx={{ mb: 1 }} />
						<Box
							className={`--form-title`}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								width: `100%`,
							}}>
							{title && (
								<Text
									variant={`h3`}
									fontWeight={`bold`}
									marginBottom={1}
									textAlign={`center`}
									sx={{ fontSize: 32 }}>
									{title}
								</Text>
							)}
							{subTitle && <Text textAlign={`center`}>{subTitle}</Text>}
						</Box>
						<Box sx={{ mb: 2 }} />
					</React.Fragment>
				)}
				{(error || success) && (
					<React.Fragment>
						{error ? (
							<Alert severity={`error`} message={error} sx={{ mb: 1.5 }} testId={errorTestId} />
						) : success ? (
							<Alert severity={`success`} message={success} sx={{ mb: 1.5 }} />
						) : null}
						<Box sx={{ mb: 2 }} />
					</React.Fragment>
				)}
			</Grid>
			{children}
		</React.Fragment>
	)
}

Component.displayName = 'FormContent'
