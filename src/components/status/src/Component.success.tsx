import { Box, Container, Paper } from '@mui/material'
import { Text } from '../../text'
import { Lottie } from './lottie'
import alertSuccess from '../../../assets/lottie/alert-success.json'
import { useLocation } from '../../../hooks/useLocation'
import { useNavigate } from '../../../hooks/useNavigate'
import { Button } from '../../button'
import type { StatusAction, StatusSuccessProps } from './types'

export const Component: React.FC<StatusSuccessProps> = (props) => {
	const navigate = useNavigate()
	const { state } = useLocation()

	const title = props.title ?? state?.title
	const subTitle = props.subTitle ?? state?.subTitle
	const objectNumber = props.objectNumber ?? state?.objectNumber

	const actions = props.actions ??
		state?.actions ?? [
			{
				path: `/`,
				label: `Complete`,
				variant: `contained` as const,
			},
		]

	return (
		<Box
			data-test-id={props.testId ?? `id-wallet-status-success`}
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				height: `calc(100vh - 84px)`,
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
						animationData={alertSuccess}
						loop={1}
						style={{
							width: 180,
							height: 180,
							backgroundColor: 'transparent',
						}}
					/>
					<Text variant={`h2`} component={`h2`}>
						{title}
					</Text>
					{objectNumber && (
						<Text fontSize={12} sx={{ opacity: 0.6 }}>
							{objectNumber}
						</Text>
					)}
					{subTitle && (
						<Text fontSize={18} sx={{ opacity: 0.6 }}>
							{subTitle}
						</Text>
					)}
					<Box sx={{ height: 32 }} />
					{actions?.map((action: StatusAction, i: number) => (
						<Button
							key={i}
							variant={i === 0 ? `contained` : action.variant || `outlined`}
							size={`large`}
							color={action?.color || (i === 0 ? `success` : `primary`)}
							fullWidth={true}
							onClick={async () => {
								if (action.onClick) {
									await action.onClick()
								} else if (action.path) {
									navigate(action.path)
								}
							}}>
							{action.label || `Action ${i + 1}`}
						</Button>
					))}
				</Paper>
			</Container>
		</Box>
	)
}
