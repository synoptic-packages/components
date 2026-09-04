import { IconButton as MuiIconButton, type IconButtonProps as IconButtonMirrorProps } from '@mui/material'
import React from 'react'

export type IconButtonProps = IconButtonMirrorProps & {
	disabled?: boolean
	testId?: string
}

export const Component: React.FC<IconButtonProps> = ({ children, testId, ...props }) => {
	return (
		<MuiIconButton data-test-id={testId ?? `id-wallet-button-icon`} {...props}>
			{children}
		</MuiIconButton>
	)
}
