import ListNative from '@mui/material/List'
import React from 'react'
import type { ListProps } from './types'

export const Component: React.FC<ListProps> = ({ children, sx, testId, ...props }) => {
	return (
		<ListNative
			data-test-id={testId ?? `id-wallet-list`}
			sx={{
				overflow: 'hidden',
				...sx,
			}}
			{...props}>
			{children}
		</ListNative>
	)
}
