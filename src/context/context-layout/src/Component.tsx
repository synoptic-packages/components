import { Box } from '@mui/material'
import * as React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FooterMinimal } from '../../../components/footer'
import { Header } from '../../../components/header'
import { ScrollToTop } from '../../../components/scroll-to-top'
import { __HEADER_HEIGHT__, __SIDEBAR_WIDTH__, __SIDEBAR_WIDTH_RIGHT__ } from '../../../constants'
import type { IProfileMenuExtra, IUser } from '../../../components/header/src/types'
import { LayoutContext, initialLayoutState } from '../index'
import type { LayoutConfig } from '../types'

export interface LayoutProviderProps {
	children: React.ReactNode
	/** Signed-in user rendered in the header chrome. Optional — header renders without a user menu when omitted. */
	user?: IUser | null
	/** Called when the user triggers sign-out from the header profile menu. */
	onLogout?: () => void | Promise<void>
	/** Extra items injected into the header profile menu (app-specific routes). */
	profileMenuExtras?: IProfileMenuExtra[]
	/** Overrides the theme toggle behaviour (e.g. dispatch to your own theme store). */
	onThemeToggle?: () => void
	/** Overrides locale switching (e.g. i18n.changeLanguage). */
	onLocaleChange?: (locale: string) => void
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
	children,
	user = null,
	onLogout,
	profileMenuExtras = [],
	onThemeToggle,
	onLocaleChange,
}) => {
	const [config, setConfig] = useState<LayoutConfig>(initialLayoutState)
	const { pathname } = usePathname()

	const showHeader = config.showHeader !== false
	const headerOffset = showHeader ? __HEADER_HEIGHT__ : 0
	const sideBarTopOffset = showHeader ? __HEADER_HEIGHT__ + 10 : 0
	const showLeft = (config.layout === 'left-sidebar' || config.layout === 'three-column') && config.sideBarLeft
	const showRight = (config.layout === 'right-sidebar' || config.layout === 'three-column') && config.sideBarRight

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	const setLayout = useCallback((newConfig: LayoutConfig) => {
		setConfig(newConfig)
	}, [])

	const updateLayout = useCallback((newConfig: Partial<LayoutConfig>) => {
		setConfig((prev) => ({ ...prev, ...newConfig }))
	}, [])

	const contextValue = useMemo(() => ({ config, setLayout, updateLayout }), [config, setLayout, updateLayout])

	const handleThemeToggle = useCallback(() => {
		if (onThemeToggle) {
			onThemeToggle()
		}
	}, [onThemeToggle])

	const handleLocaleChange = useCallback(
		(locale: string) => {
			if (onLocaleChange) {
				onLocaleChange(locale)
			}
		},
		[onLocaleChange]
	)

	return (
		<LayoutContext.Provider value={contextValue}>
			<React.Fragment>
				{showHeader && (
					<Header
						user={user}
						showThemeSwitcher={true}
						showLocaleSwitcher={true}
						onLogout={() => onLogout?.()}
						onThemeToggle={handleThemeToggle}
						onLocaleChange={handleLocaleChange}
						profileMenuExtras={profileMenuExtras}
					/>
				)}
				<Box style={{ paddingTop: headerOffset }} sx={{ display: `flex`, minHeight: `100vh` }}>
					{showLeft && (
						<Box
							component={`aside`}
							boxShadow={2}
							sx={{
								position: 'fixed',
								top: 0,
								left: 0,
								height: '100vh',
								minHeight: '100vh',
								maxHeight: '100vh',
								overflowY: 'auto',
								width: __SIDEBAR_WIDTH__,
								minWidth: __SIDEBAR_WIDTH__,
								bgcolor: 'background.paper',
							}}>
							<Box sx={{ height: sideBarTopOffset }} />
							{config.sideBarLeft}
						</Box>
					)}
					<Box
						sx={{
							flexGrow: 1,
							ml: showLeft ? `${__SIDEBAR_WIDTH__}px` : 0,
							mr: showRight ? `${__SIDEBAR_WIDTH_RIGHT__}px` : 0,
							maxWidth: `calc(100% - ${showLeft ? __SIDEBAR_WIDTH__ : 0}px - ${showRight ? __SIDEBAR_WIDTH_RIGHT__ : 0}px)`,
							display: 'flex',
							flexDirection: 'column',
							minHeight: '100vh',
						}}>
						<Box
							component={`main`}
							id={`--main-content`}
							sx={{
								flexGrow: 1,
								boxSizing: 'border-box',
								overflowY: 'auto',
								bgcolor: 'background.default',
							}}>
							<ScrollToTop />
							{children}
						</Box>
						{(config.footer || config.showFooter) && (
							<Box>
								{config.showFooter ? (
									<FooterMinimal
										menuItems={config.footerMenuItems}
										title={config.footerTitle}
										description={config.footerDescription}
									/>
								) : (
									config.footer
								)}
							</Box>
						)}
					</Box>
					{showRight && (
						<Box
							component={`aside`}
							sx={{
								position: 'fixed',
								top: 0,
								right: 0,
								height: '100vh',
								minHeight: '100vh',
								maxHeight: '100vh',
								overflowY: 'auto',
								width: `${__SIDEBAR_WIDTH_RIGHT__}px`,
								borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
								bgcolor: 'background.paper',
							}}>
							<Box sx={{ height: sideBarTopOffset }} />
							{config.sideBarRight}
						</Box>
					)}
				</Box>
			</React.Fragment>
		</LayoutContext.Provider>
	)
}

/** Router-agnostic pathname subscription so the layout can scroll-to-top on navigation. */
function usePathname(): { pathname: string } {
	const [pathname, setPathname] = React.useState<string>(
		typeof window !== 'undefined' ? window.location.pathname : '/'
	)
	React.useEffect(() => {
		if (typeof window === 'undefined') return
		const onPath = () => setPathname(window.location.pathname)
		window.addEventListener('popstate', onPath)
		return () => window.removeEventListener('popstate', onPath)
	}, [])
	return { pathname }
}
