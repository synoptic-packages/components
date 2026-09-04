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
import { colorsDark, colorsLight } from '../../../theme/colors'
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

const Provider: FC<TGeneric> = memo(function ProviderCommon({ children }) {
	const { themeColor } = useSelector((state: RootState) => state.themeStore)
	const { i18n } = useTranslation()

	// Direction follows the ACTIVE i18n language's rtl flag — it was hardcoded 'ltr' here, which
	// silently broke every right-to-left locale the language picker can select. The document
	// element carries the same value so non-MUI layout (scrollbars, native inputs) flips with it.
	const languageCode = (i18n.language || `en`).split(`-`)[0]
	const direction: Direction = locales_meta[languageCode]?.rtl ? `rtl` : `ltr`

	useEffect(() => {
		document.documentElement.dir = direction
	}, [direction])

	const themeOptions: ThemeOptions = useMemo(() => getDesignTokens(themeColor, direction), [themeColor, direction])
	const theme = useMemo(() => createTheme(themeOptions), [themeOptions])

	return (
		<MuiThemeProvider theme={theme}>
			<ProviderContent theme={theme} tenant={undefined}>
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
