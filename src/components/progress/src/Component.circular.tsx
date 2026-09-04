import { Box, CircularProgress as MuiCircularProgress } from '@mui/material'
import * as React from 'react'

interface IComponentProps {
	value: number
	size?: number
	icon?: React.ReactNode
	testId?: string
}

function CustomCircularProgress(props: IComponentProps) {
	return (
		<Box
			sx={{ position: `relative` }}
			className={`custom-circular-progress`}
			maxHeight={props.size}
			overflow={`hidden`}>
			<MuiCircularProgress variant={`determinate`} thickness={4} {...props} value={100} />
			<MuiCircularProgress
				variant={`determinate`}
				sx={{
					animationDuration: '550ms',
					position: 'absolute',
					left: 0,
					color: 'muted.main',
				}}
				thickness={4}
				{...props}
			/>
		</Box>
	)
}

export const Component: React.FC<IComponentProps> = ({ value, size = 45, icon, testId }) => {
	return (
		<Box data-test-id={testId ?? `id-wallet-progress`} position={`relative`} display={`inline-flex`}>
			<CustomCircularProgress size={size} value={value} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position={`absolute`}
				display={`flex`}
				alignItems={`center`}
				justifyContent={`center`}>
				{icon}
			</Box>
		</Box>
	)
}
