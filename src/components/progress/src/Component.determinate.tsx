import { type LinearProgressProps, LinearProgress as MuiLinearProgress, linearProgressClasses } from '@mui/material'
import { styled } from '@mui/styles'

const BorderLinearProgress = styled(MuiLinearProgress)(() => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: 'primary.main',
		//   opacity: .2
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: 'primary.main',
		//   opacity: 1
	},
}))

interface DeterminateProgressInterface extends LinearProgressProps {
	height?: number
	value: number
}

export const Component: React.FC<DeterminateProgressInterface> = ({ height = 8, value }) => {
	return (
		<BorderLinearProgress
			variant={`determinate`}
			sx={{
				height: height,
			}}
			value={value}
		/>
	)
}
