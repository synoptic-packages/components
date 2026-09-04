import type { TGeneric } from '../../../types/generics'

export interface StatusAction {
	path?: string
	label: string
	variant?: 'text' | 'outlined' | 'contained'
	color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
	onClick?: () => void | Promise<void>
}

export interface StatusErrorProps {
	title?: string
	subTitle?: string
	objectNumber?: string
	actions?: StatusAction[]
	testId?: string
}

export interface StatusSuccessProps {
	title?: string
	subTitle?: string
	objectNumber?: string
	actions?: StatusAction[]
	testId?: string
}

export interface StatusLocationState extends TGeneric {
	title?: string
	subTitle?: string
	objectNumber?: string
	actions?: StatusAction[]
}
