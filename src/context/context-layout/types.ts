export interface FooterMenuItem {
	label: string
	href: string
	external: boolean
}

export type LayoutType = 'plain' | 'left-sidebar' | 'right-sidebar' | 'three-column'

export interface LayoutConfig {
	layout: LayoutType
	sideBarLeft?: React.ReactNode
	sideBarRight?: React.ReactNode
	footer?: React.ReactNode
	showFooter?: boolean
	footerMenuItems?: FooterMenuItem[]
	footerTitle?: string
	footerDescription?: string
	showHeader?: boolean
}
