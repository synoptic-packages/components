'use client'

import { Box } from '@mui/material'
import { Lottie } from '../../status/src/lottie'
import loaderGeneric from '../../../assets/lottie/loader-generic.json'
import { BrandLogo } from '../../brand'
import { Text } from '../../text'

interface ComponentProps {
	message?: string
}

export const Component: React.FC<ComponentProps> = ({ message }) => {
	return (
		<Box
			display={`flex`}
			flexDirection={`column`}
			alignItems={`center`}
			justifyContent={`center`}
			width={`100vw`}
			height={`100vh`}>
			<BrandLogo />
			<Text variant={`body2`} color={`textDisabled`} sx={{ marginTop: `16px`, opacity: 0.5 }}>
				{message}
			</Text>
			<Box
				mx={`auto`}
				maxHeight={52}
				textAlign={`center`}
				display={`flex`}
				justifyContent={`center`}
				alignItems={`center`}
				overflow={`hidden`}>
				<Lottie
					animationData={loaderGeneric}
					loop={true}
					style={{
						width: 180,
						height: 180,
						backgroundColor: 'transparent',
					}}
				/>
			</Box>
		</Box>
	)
}
