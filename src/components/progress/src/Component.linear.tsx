import { type LinearProgressProps, LinearProgress as MuiLinearProgress } from '@mui/material'

interface LinearProgressInterface extends LinearProgressProps {
	height?: number
	isLoading?: boolean
	testId?: string
}

export const Component: React.FC<LinearProgressInterface> = ({ height = 3, isLoading = false, testId }) => {
	return isLoading ? (
		<MuiLinearProgress
			data-test-id={testId ?? `id-wallet-progress`}
			color={'secondary'}
			sx={{
				height: height,
			}}
		/>
	) : null
}
