import type { TabsProps as TabsMirrorProps } from '@mui/material'
import TabsNative from '@mui/material/Tabs'
import React from 'react'
import type { TGeneric } from '../../../types/generics'

export type TabsProps = TabsMirrorProps & {
	value?: number | string | false
	onChange?: (event: React.SyntheticEvent, value: TGeneric) => void
	orientation?: 'horizontal' | 'vertical'
	variant?: 'standard' | 'scrollable' | 'fullWidth'
	scrollButtons?: boolean | 'auto'
	allowScrollButtonsMobile?: boolean
	testId?: string
}

export const Component: React.FC<TabsProps> = ({ children, testId, ...props }) => {
	return (
		<TabsNative data-test-id={testId ?? `id-wallet-tabs`} {...props}>
			{children}
		</TabsNative>
	)
}
