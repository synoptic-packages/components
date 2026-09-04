import type { TGeneric } from '../../../types/generics'

export interface TableActionContext {
	row: TGeneric
	close: () => void
}

export type TableRowActions = {
	handleDelete?: (id?: string) => void
	handleEdit?: (id?: string) => void
	handleView?: (id?: string) => void
}

export interface TableActionConfig {
	key: string
	label: string
	icon: string
	textColor?: string
	iconColor?: string
	disabled?: boolean
	onClick?: (context: TableActionContext) => void | Promise<void>
}

export interface TableToolbarAction {
	key: string
	label: string
	icon: string
	disabled?: boolean
	onClick: () => void
}
