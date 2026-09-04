import { Divider, type DividerProps } from '@mui/material'
import type React from 'react'

export interface IComponentProps extends DividerProps {}

export const Component: React.FC<IComponentProps> = (props) => {
	return <Divider data-test-id={`id-wallet-divider`} {...props} />
}
