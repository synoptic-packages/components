// ~
import { Alert, CssBaseline, IconButton, Snackbar as MuiSnackbar, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider, type Direction, type ThemeOptions } from '@mui/material/styles'
import { type FC, memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from '../../../lib/redux'
import { AlertDialog } from '../../../components/dialog'
import type { IDialogInterface } from '../../../components/dialog/src/Component'
import { Icon } from '../../../components/icon'
import { alertIconMapping } from '../../../components/icon/src/Component.mapping'
import { GlobalProgress } from '../../../components/progress'
import { Splash } from '../../../components/splash'
import { useTranslation } from '../../../hooks/useTranslation'
import { locales_meta } from '../../../lib/i18n'
import type { RootState } from '../../../lib/store'
import { colorsDark, colorsLight, setBrandColors } from '../../../theme/colors'
import { __DEV__ } from '../../../constants'
import { isStorybook } from '../../../lib/env'
import { getDesignTokens } from '../../../theme/material'
import type { Color, TGeneric } from '../../../types/generics'
import CameraProvider from '../../context-camera/src/Context'
import { LayoutProvider } from '../../context-layout'
import { ProviderForms } from '../../provider-forms'
import { AppContext, initialDialog, initialSnackbar, type ISnackbarInterface, type ProviderContextType } from '../index'

const ProviderContent: FC<{ children: React.ReactNode; theme: TGeneric; tenant: TGeneric }> = memo(
	function ProviderContent({ children, theme, tenant }) {
		const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
		const isMobile = useMediaQuery(theme.breakpoints.down('md'))
		const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
		const [mounted, setMounted] = useState(isStorybook())
		const [loading, setLoading] = useState<boolean>(false)
		const [dialog, setDialog] = useState<IDialogInterface>(initialDialog)
		const [snackbar, setSnackbar] = useState<ISnackbarInterface>(initialSnackbar)
		const isDark = useMemo(() => theme?.palette?.mode === 'dark', [theme?.palette?.mode])

		const colors = useMemo((): Color | TGeneric => {
			const base = isDark ? colorsDark : colorsLight

			const overrides = {
				...(tenant?.brand_color && { primary: tenant.brand_color }),
				...(tenant?.brand_color_accent && { accent: tenant.brand_color_accent }),
			}

			return {
				...base,
				...overrides,
			}
		}, [isDark, tenant?.brand_color, tenant?.brand_color_accent])

		const isAppLoading = loading || !mounted

		const snackbarHandleClose = () => {
			setSnackbar({ ...snackbar, open: false })
		}

		const value: ProviderContextType = useMemo(
			() => ({
				setSnackbar,
				setDialog,
				loading,
				setLoading,
				isMobile,
				isSmall,
				isLarge,
				isDark,
				colors,
			}),
			[setSnackbar, setDialog, loading, setLoading, isMobile, isSmall, isLarge, isDark, colors]
		)

		useEffect(() => {
			setMounted(true)
		}, [])

		return (
			<AppContext.Provider value={value}>
				<CssBaseline />
				<GlobalProgress />
				{isAppLoading ? <Splash /> : children}
				{dialog && <AlertDialog {...dialog} setDialog={setDialog} />}

				<MuiSnackbar
					anchorOrigin={{
						vertical: snackbar.vertical ?? 'bottom',
						horizontal: snackbar.horizontal ?? 'left',
					}}
					open={snackbar.open}
					autoHideDuration={__DEV__ ? 120000 : 7000}
					onClose={snackbarHandleClose}
					sx={{
						width: `100%`,
						maxWidth: isMobile ? `calc(100vw - 48px)` : '420px',
						minWidth: `350px`,
						color: `white`,
					}}>
					<Alert
						variant={`filled`}
						onClose={snackbarHandleClose}
						severity={snackbar.severity}
						iconMapping={alertIconMapping()}
						classes={{
							colorSuccess: `white`,
							colorInfo: `white`,
						}}
						sx={{ width: '100%' }}
						action={
							<IconButton
								size={`small`}
								aria-label={`close`}
								color={`inherit`}
								onClick={snackbarHandleClose}>
								<Icon name={`SyClose`} size={18} color={`white`} />
							</IconButton>
						}>
						{snackbar.message}
					</Alert>
				</MuiSnackbar>
			</AppContext.Provider>
		)
	}
)

export interface ProviderProps {
	children: React.ReactNode
	/** Color scheme. Defaults to 'dark' (kept for source compatibility); consumers pass their own mode. */
	mode?: 'light' | 'dark'
	/** Brand colours. Applied via setBrandColors so themed components pick them up. */
	brand?: {
		brand_color?: string
		brand_color_accent?: string
	}
	/** Document direction. Defaults to ltr (rtl auto-derived from active i18n language when unset). */
	direction?: Direction
	/** Optional tenant/config blob forwarded to the config context (source-compatible). */
	tenant?: TGeneric
}

const Provider: FC<ProviderProps> = memo(function ProviderCommon({
	children,
	mode,
	brand,
	direction: directionProp,
	tenant,
}) {
	const { themeColor } = useSelector((state: RootState) => state.themeStore)
	const resolvedMode: 'light' | 'dark' = mode ?? themeColor ?? 'dark'

	// Brand override: re-derive the exported palettes so every themed component
	// (buttons, fields, headers) picks up the brand primary/accent.
	useEffect(() => {
		if (brand) {
			setBrandColors({
				brand_color: brand.brand_color,
				brand_color_accent: brand.brand_color_accent,
			})
		}
	}, [brand?.brand_color, brand?.brand_color_accent])

	const { i18n } = useTranslation()

	// Direction: explicit prop wins, else follows the ACTIVE i18n language's rtl flag.
	const languageCode = (i18n.language || `en`).split(`-`)[0]
	const direction: Direction =
		directionProp ?? (locales_meta[languageCode]?.rtl ? `rtl` : `ltr`)

	useEffect(() => {
		document.documentElement.dir = direction
	}, [direction])

	const themeOptions: ThemeOptions = useMemo(
		() => getDesignTokens(resolvedMode, direction),
		[resolvedMode, direction]
	)
	const theme = useMemo(() => createTheme(themeOptions), [themeOptions])

	return (
		<MuiThemeProvider theme={theme}>
			<ProviderContent theme={theme} tenant={tenant}>
				<CameraProvider>
					<LayoutProvider>
						<ProviderForms>{children}</ProviderForms>
					</LayoutProvider>
				</CameraProvider>
			</ProviderContent>
		</MuiThemeProvider>
	)
})

export { Provider }
