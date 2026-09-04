import type { ListItemButtonProps, ListItemProps as MuiListItemProps, ListProps as MuiListProps } from '@mui/material'
import type { ReactNode } from 'react'

export type ListProps = MuiListProps & {
	dense?: boolean
	disablePadding?: boolean
	subheader?: ReactNode
	testId?: string
}

export type ListItemProps = Omit<MuiListItemProps, 'children'> & {
	border?: boolean
	inset?: boolean
	icon?: ReactNode
	primary?: ReactNode
	secondary?: ReactNode
	right?: ReactNode
	button?: boolean
	buttonProps?: Omit<ListItemButtonProps, 'children'>
	testId?: string
}
