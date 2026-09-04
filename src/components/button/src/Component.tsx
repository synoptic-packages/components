import type { ButtonProps as ButtonMirrorProps } from '@mui/material'
import ButtonNative from '@mui/material/Button'
import React from 'react'

export type ButtonProps = ButtonMirrorProps & {
	disabled?: boolean
	testId?: string
}

export const Component: React.FC<ButtonProps> = ({ children, testId, ...props }) => {
	return (
		<ButtonNative data-test-id={testId ?? `id-wallet-button`} {...props}>
			{children}
		</ButtonNative>
	)
}
