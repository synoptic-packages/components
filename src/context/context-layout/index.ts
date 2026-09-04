import { createContext, useContext, useEffect, useRef, type DependencyList } from 'react'
import type { LayoutConfig } from './types'

export const initialLayoutState: LayoutConfig = {
	layout: 'plain',
	sideBarLeft: undefined,
	sideBarRight: undefined,
	footer: undefined,
	showFooter: false,
	footerMenuItems: undefined,
	footerTitle: undefined,
	footerDescription: undefined,
	showHeader: true,
}

export interface LayoutContextType {
	config: LayoutConfig
	setLayout: (layout: LayoutConfig) => void
	updateLayout: (layout: Partial<LayoutConfig>) => void
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const useLayout = () => {
	const context = useContext(LayoutContext)
	if (context === undefined) {
		throw new Error('useLayout must be used within a LayoutProvider')
	}

	return context
}

export const usePageLayout = (pageLayout: Partial<LayoutConfig>, dependencies: DependencyList = []): void => {
	const { setLayout, updateLayout } = useLayout()
	const pageLayoutRef = useRef<Partial<LayoutConfig>>(pageLayout)

	useEffect(() => {
		pageLayoutRef.current = pageLayout
	}, [pageLayout])

	useEffect(() => {
		updateLayout(pageLayoutRef.current)

		return () => {
			setLayout(initialLayoutState)
		}
		// The hook intentionally accepts a caller-defined dependency list for routed page layouts.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setLayout, updateLayout, ...dependencies])
}

export { LayoutProvider } from './src/Component'
export * from './types'
