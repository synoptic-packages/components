import type { TGeneric } from '../../../types/generics'
import type { IconName } from '../../icon/src/Component'

export interface IUser {
	first_name?: string
	last_name?: string
	email?: string
	avatar?: string
}

export interface IMenuItem {
	label: string
	path: string
	icon?: IconName | string
	showHeaderIcon?: boolean
}

export interface IProfileMenuExtra {
	key: string
	label: string
	icon: IconName
	path: string
}

export interface IHeaderProps {
	user?: IUser | TGeneric | null
	onLogout?: () => void | Promise<void>
	onNavigate?: (path: string) => void
	menuItems?: IMenuItem[]
	profileMenuExtras?: IProfileMenuExtra[]
	onThemeToggle?: () => void
	onLocaleChange?: (locale: string) => void
	showThemeSwitcher?: boolean
	showLocaleSwitcher?: boolean
}

export interface IHeaderLinkProps {
	icon?: IconName
	label?: string
	path?: string
	active?: boolean
	divider?: ('left' | 'right')[]
	showHeaderIcon?: boolean
}
