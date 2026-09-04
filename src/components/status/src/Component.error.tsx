'use client'

import { Box, Container, Paper } from '@mui/material'
import { Text } from '../../text'
import { Lottie } from './lottie'
import alertError from '../../../assets/lottie/alert-error.json'
import { useLocation } from '../../../hooks/useLocation'
import { useNavigate } from '../../../hooks/useNavigate'
import { Button } from '../../button'
import type { StatusErrorProps } from './types'

export const Component: React.FC<StatusErrorProps> = (props) => {
	const navigate = useNavigate()
	const { state } = useLocation()

	const title = props.title ?? state?.title
	const subTitle = props.subTitle ?? state?.subTitle ?? `An error occurred`
	const objectNumber = props.objectNumber ?? state?.objectNumber

	const actions = [
		...(props.actions || state?.actions || []),
		{
			path: `/`,
			label: `Complete`,
			variant: `contained` as const,
			color: `error` as const,
		},
	]

	return (
		<Box
			data-test-id={props.testId ?? `id-wallet-status-error`}
			sx={{
				width: '100%',
				height: `calc(100vh - 84px)`,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Container maxWidth={`xs`} sx={{ textAlign: `center`, my: 3 }}>
				<Paper
					sx={{
						pb: 4,
						pt: 2,
						px: 3,
						display: `flex`,
						borderRadius: 5,
						justifyContent: `center`,
						alignItems: `center`,
						flexDirection: `column`,
						gap: 1,
					}}>
					<Lottie
						animationData={alertError}
						loop={1}
						style={{
							width: 180,
							height: 180,
							backgroundColor: 'transparent',
						}}
					/>
					<Text variant={`h3`}>{title}</Text>
					{objectNumber && (
						<Text fontSize={12} sx={{ opacity: 0.6 }}>
							{objectNumber}
						</Text>
					)}
					<Text fontSize={18} sx={{ opacity: 0.6 }}>
						{subTitle}
					</Text>
					<Box sx={{ height: 32 }} />
					{actions?.map((action, i) => (
						<Button
							key={i}
							variant={action.variant || `outlined`}
							size={`large`}
							color={action.color || `primary`}
							fullWidth={true}
							onClick={async () => {
								if (action.onClick) {
									await action.onClick()
								} else if (action.path) {
									navigate(action.path)
								} else {
									navigate(`/`)
								}
							}}>
							{action.label || `Action ${i + 1}`}
						</Button>
					))}
					<Button variant={`outlined`} size={`large`} color={`error`} fullWidth={true}>
						Close
					</Button>
				</Paper>
			</Container>
		</Box>
	)
}
