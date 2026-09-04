import type { AvatarProps as AvatarMirrorProps } from '@mui/material'
import AvatarNative from '@mui/material/Avatar'
import React from 'react'

export type AvatarProps = AvatarMirrorProps & {
	alt?: string
	src?: string
	variant?: 'circular' | 'rounded' | 'square'
	sizes?: string
	srcSet?: string
	size?: number
	sx?: AvatarMirrorProps['sx']
	testId?: string
}

export const Component: React.FC<AvatarProps> = ({ children, size, sx, testId, ...props }) => {
	const sizeStyles = size
		? {
				width: size,
				height: size,
				fontSize: `${Math.max(Math.round(size * 0.4), 10)}px`,
				...sx,
			}
		: sx

	return (
		<AvatarNative
			data-test-id={testId ?? `id-wallet-avatar`}
			sx={{
				...sizeStyles,
			}}
			{...props}>
			{children}
		</AvatarNative>
	)
}
