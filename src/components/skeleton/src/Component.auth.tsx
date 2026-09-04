import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

export const Component: React.FC = () => {
	return (
		<div className={`w-full max-w-[420px] mx-auto`}>
			<Stack
				spacing={1}
				sx={{
					display: `flex`,
					justifyContent: `center`,
					alignItems: `center`,
					flexDirection: `column`,
				}}>
				<Skeleton variant={`circular`} width={40} height={40} />
				<Skeleton variant={`text`} width={180} sx={{ fontSize: '2rem' }} />
				<Skeleton variant={`text`} width={250} sx={{ fontSize: '1rem' }} />
				<Skeleton variant={`rounded`} width={`100%`} height={54} />
				<Skeleton variant={`rounded`} width={`100%`} height={54} />
				<Box height={2} />
				<Skeleton variant={`rounded`} width={`100%`} height={54} sx={{ borderRadius: 27 }} />
				<Box height={2} />
			</Stack>
		</div>
	)
}
