import type { PaletteMode } from '@mui/material'
import type { Direction, ThemeOptions as MuiThemeOptions, PaletteOptions } from '@mui/material/styles'
import chroma from 'chroma-js'
import { alertIconMapping, checkboxIconMapping, radioIconMapping } from '../components/icon/src/Component.mapping'
import { sizing } from '../constants'
import type { TGeneric } from '../types/generics'
import { colorsDark, colorsLight } from './colors'
import { fonts } from './fonts'
import { displayLetterSpacing } from './typography'

interface CustomPaletteOptions extends PaletteOptions {
	bg: {
		main: string
		light: string
	}
	accent: {
		dark: string
		main: string
		light: string
		contrastText: string
	}
	danger: {
		dark: string
		main: string
		light: string
		contrastText: string
	}
	disabled: {
		dark: string
		main: string
		light: string
		contrastText: string
	}
	text: {
		default: string
		main: string
		accent: string
		primary: string
		secondary: string
		disabled: string
		disabledLight: string
		muted: string
	}
}

export interface ThemeOptions extends MuiThemeOptions {
	palette?: CustomPaletteOptions
}

/**
 * A heading set in the display face, with its tracking DERIVED from its own size rather than typed
 * beside it — see `./typography` for the curve and why it steps. Deriving is the point: a hand-written
 * value would have been computed for whichever size was current when someone typed it, and would then
 * silently outlive the next size change.
 */
const displayHeading = (fontSize: number) => ({
	fontFamily: fonts.display,
	fontSize,
	fontWeight: 'bolder' as const,
	letterSpacing: displayLetterSpacing(fontSize),
})

export const getDesignTokens = (mode: PaletteMode, direction: Direction): ThemeOptions => {
	const isDark = mode === `dark`

	const borderWidthDefault = `1.5px`

	const text = isDark ? colorsDark.text : colorsLight.text
	const light = colorsDark.light
	const white = colorsLight.white
	const primary = isDark ? colorsDark.primary : colorsLight.primary
	const secondary = isDark ? colorsDark.secondary : colorsLight.secondary
	const accent = isDark ? colorsDark.accent : colorsLight.accent
	const success = isDark ? colorsDark.success : colorsLight.success
	const error = isDark ? colorsDark.error : colorsLight.error
	const danger = error
	const warning = isDark ? colorsDark.warning : colorsLight.warning
	const info = isDark ? colorsDark.info : colorsLight.info
	const disabled = isDark ? colorsDark.disabled : colorsLight.disabled
	const muted = isDark ? colorsDark.muted : colorsLight.muted
	const divider = isDark ? colorsDark.divider : colorsLight.divider
	const bg = isDark ? colorsDark.bg : colorsLight.bg
	const bgLight = isDark ? colorsDark.bgLighter : colorsLight.bgLighter

	return {
		direction,
		breakpoints: {
			values: {
				xs: sizing.xs,
				sm: sizing.sm,
				md: sizing.md,
				lg: sizing.lg,
				xl: sizing.xl,
			},
		},
		palette: {
			mode,
			bg: {
				main: bg,
				light: bgLight,
			},
			primary: {
				main: primary,
				light: primary,
			},
			secondary: {
				main: secondary,
				contrastText: white,
			},
			accent: {
				dark: chroma(accent).darken().hex(),
				main: accent,
				light: chroma(accent).brighten().hex(),
				contrastText: colorsLight.black,
			},
			error: {
				dark: chroma(error).darken().hex(),
				main: error,
				contrastText: light,
				light: chroma(error).brighten().hex(),
			},
			danger: {
				dark: chroma(danger).darken().hex(),
				main: danger,
				contrastText: light,
				light: chroma(danger).brighten().hex(),
			},
			disabled: {
				dark: chroma(disabled).darken().hex(),
				main: disabled,
				contrastText: colorsLight.dark,
				light: chroma(disabled).brighten().hex(),
			},
			warning: {
				dark: chroma(warning).darken().hex(),
				main: warning,
				contrastText: colorsLight.dark,
				light: chroma(warning).brighten().hex(),
			},
			info: {
				dark: chroma(info).darken().hex(),
				main: info,
				contrastText: colorsLight.white,
				light: chroma(info).brighten().hex(),
			},
			success: {
				dark: chroma(success).darken().hex(),
				main: success,
				contrastText: colorsLight.white,
				light: chroma(success).brighten().hex(),
			},
			divider: isDark ? chroma(divider).brighten().hex() : divider,
			background: {
				default: bg,
				paper: bgLight,
			},
			text: {
				default: text,
				main: text,
				accent: accent,
				primary: text,
				secondary: muted,
				disabled: disabled,
				disabledLight: chroma(disabled).brighten().hex(),
				muted: isDark ? chroma(disabled).brighten().hex() : disabled,
			},
		},
		typography: {
			fontFamily: [fonts.regular, fonts.display, fonts.label, fonts.numerics].join(','),
			giant: {
				fontSize: 34,
				lineHeight: `51px`,
				fontWeight: 400,
			},
			mega: {
				fontSize: 28,
				lineHeight: `42px`,
				fontWeight: 400,
			},
			huge: {
				fontSize: 24,
				lineHeight: `36px`,
				fontWeight: 400,
			},
			jumbo: {
				fontSize: 20,
				lineHeight: `30px`,
				fontWeight: 400,
			},
			large: {
				fontSize: 18,
				lineHeight: `27px`,
				fontWeight: 400,
			},
			medium: {
				fontSize: 16,
				lineHeight: `24px`,
				fontWeight: 400,
			},
			normal: {
				fontSize: 14,
				lineHeight: `21px`,
			},
			small: {
				fontSize: 12,
				lineHeight: `18px`,
			},
			subtitle1: {
				fontSize: sizing.bodyFontSize + 2,
				lineHeight: `${sizing.themeSpacing * 3}px`,
				marginBottom: sizing.themeSpacing,
			},
			subtitle2: {
				fontFamily: fonts.regular,
				fontWeight: 'bolder',
				fontSize: 16,
			},
			body1: {
				fontFamily: fonts.regular,
				fontSize: 14,
			},
			body2: {
				fontFamily: fonts.regular,
				fontSize: 13,
			},
			h1: displayHeading(46),
			h2: displayHeading(34),
			h3: displayHeading(28),
			h4: displayHeading(24),
			h5: displayHeading(20),
			h6: displayHeading(16),
			wide: {
				fontFamily: fonts.wide,
			},
		},
		components: {
			MuiButton: {
				defaultProps: {
					disableRipple: true,
					color: isDark ? `accent` : `primary`,
				},
				styleOverrides: {
					root: {
						borderRadius: sizing.borderRadius,
						paddingLeft: 36,
						paddingRight: 36,
						fontWeight: 700,
						textTransform: 'none',
						whiteSpace: 'nowrap',
						boxShadow: 'none',
						'&:hover': {
							boxShadow: 'none',
						},
						'&.MuiButton-containedAccent': {
							color: colorsLight.text,
						},
						'&.MuiButton-sizeSmall': {
							padding: '4px 8px',
							fontSize: sizing.bodyFontSize * 0.9,
							borderRadius: sizing.inputHeight * 0.5,
							height: sizing.inputHeight * 0.75,
							paddingLeft: sizing.inputHeight * 0.25,
							paddingRight: sizing.inputHeight * 0.25,
						},
						'&.MuiButton-sizeMedium': {
							fontSize: Math.round(sizing.bodyFontSize * 0.9),
							borderRadius: sizing.inputHeight * 0.75,
							height: sizing.inputHeight * 0.75,
							paddingLeft: sizing.inputHeight * 0.35,
							paddingRight: sizing.inputHeight * 0.35,
						},
						'&.MuiButton-sizeLarge': {
							fontSize: sizing.bodyFontSize,
							borderRadius: sizing.inputHeight,
							height: sizing.inputHeight,
							paddingLeft: sizing.inputHeight * 0.5,
							paddingRight: sizing.inputHeight * 0.5,
						},
						'&.MuiButtonGroup-grouped': {
							borderColor: divider,
							'&:not(:first-child):not(:last-child)': {
								borderRadius: 0,
							},
							'&:first-child': {
								borderTopRightRadius: 0,
								borderBottomRightRadius: 0,
							},
							'&:last-child': {
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
							},
						},
					},
				},
				variants: [
					{
						props: { variant: 'outlined' },
						style: {
							borderWidth: borderWidthDefault,
							'&:hover': {
								backgroundColor: chroma(isDark ? accent : primary)
									.alpha(0.1)
									.css(),
								borderWidth: borderWidthDefault,
								boxShadow: 'none',
							},
						},
					},
					{
						props: { color: 'accent', variant: 'contained' },
						style: {
							color: colorsLight.text,
							'&:hover': {
								color: colorsLight.text,
							},
							'&:disabled': {
								color: colorsLight.text,
								opacity: 0.6,
							},
						},
					},
					{
						props: { color: 'accent', variant: 'text' },
						style: {
							color: accent,
						},
					},
				],
			},
			MuiButtonBase: {
				styleOverrides: {
					root: {
						'& .MuiLoadingButton-loadingIndicator': {
							color: isDark ? text : primary,
						},
						'&.MuiButtonBase-root': {
							lineHeight: 1,
						},
					},
				},
				defaultProps: {
					disableRipple: true,
				},
			},
			MuiDivider: {
				styleOverrides: {
					root: {
						margin: `${sizing.themeSpacing} auto`,
						width: `100%`,
					},
					inset: {
						marginLeft: 56,
					},
				},
			},
			MuiAccordion: {
				styleOverrides: {
					root: {
						'&:before': {
							display: 'none',
						},
						boxShadow: 'none',
						margin: '0 !important',
						'&:not(:last-child)': {
							borderBottom: '1px solid',
							borderBottomColor: divider,
						},
						'&.Mui-expanded': {
							margin: '0',
						},
					},
				},
			},
			MuiAccordionSummary: {
				styleOverrides: {
					content: {
						'& .MuiTypography-root': {
							fontSize: 16,
							fontWeight: 600,
						},
					},
				},
			},
			MuiAccordionDetails: {
				styleOverrides: {
					root: {
						paddingTop: 0,
					},
				},
			},
			MuiChip: {
				defaultProps: {
					color: isDark ? `accent` : `primary`,
				},
				styleOverrides: {
					root: ({ ownerState }) => {
						const size = ownerState.size || ownerState.inputSize

						return {
							fontSize: size === 'small' ? '0.65rem' : size === 'medium' ? '0.75rem' : '0.85rem',
							fontWeight: 600,
						}
					},
				},
			},
			MuiStepContent: {
				styleOverrides: {
					root: {
						padding: 0,
						margin: 0,
						borderLeft: `none`,
						borderRight: `none`,
					},
				},
			},
			MuiStepper: {
				styleOverrides: {
					root: {
						padding: 0,
						margin: 0,
						paddingLeft: 0,
						paddingRight: 0,
						marginLeft: 0,
						marginRight: 0,
						borderLeft: `none`,
						borderRight: `none`,
					},
				},
			},
			MuiStepLabel: {
				styleOverrides: {
					label: {
						margin: 0,
						padding: 0,
					},
				},
			},
			MuiStepConnector: {
				styleOverrides: {
					root: {
						display: 'none',
					},
					line: {
						display: 'none',
					},
				},
			},
			MuiLink: {
				styleOverrides: {
					root: {
						textDecoration: 'none',
						color: isDark ? accent : text,
						'&:hover': {
							color: isDark ? white : primary,
						},
					},
				},
			},
			MuiSvgIcon: {
				styleOverrides: {
					root: {
						color: text,
						fontSize: 24,
					},
				},
			},
			MuiTypography: {
				defaultProps: {
					color: text,
				},
				styleOverrides: {
					root: {
						color: text,
					},
				},
			},
			MuiContainer: {
				styleOverrides: {
					root: {
						backgroundColor: bg,
					},
				},
			},
			// @ts-ignore
			MuiPickersOutlinedInput: {
				styleOverrides: {
					notchedOutline: {
						borderWidth: borderWidthDefault,
						borderColor: muted,
						marginTop: `4px`,
					},
					root: ({ ownerState }: TGeneric) => {
						const size = ownerState.size || ownerState.inputSize

						return {
							color: text,
							paddingRight:
								size === 'small'
									? '8px'
									: size === 'medium'
										? '14px'
										: size === 'large'
											? '14px'
											: undefined,
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: disabled,
								color: text,
								borderWidth: borderWidthDefault,
								boxShadow: 'none',
								'& fieldset': {
									borderColor: disabled,
									borderWidth: borderWidthDefault,
									boxShadow: 'none',
								},
								'&:hover fieldset': {
									borderColor: disabled,
									color: text,
									borderWidth: borderWidthDefault,
									boxShadow: 'none',
								},
								'&.Mui-focused fieldset': {
									color: text,
									borderColor: text,
									borderWidth: borderWidthDefault,
									boxShadow: 'none',
								},
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: secondary,
								borderWidth: borderWidthDefault,
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								borderColor: '#222',
							},
						}
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					notchedOutline: {
						borderWidth: borderWidthDefault,
					},
					sizeSmall: {
						height: sizing.inputHeightSmall,
					},
					root: ({ ownerState }) => {
						const size = ownerState.size || ownerState.inputSize

						return {
							height: size === 'small' ? sizing.inputHeightSmall : sizing.inputHeight,
							input: {
								'&::placeholder': {
									opacity: 1, // fix for Firefox
								},
							},
							root: {
								'&.Mui-error .MuiOutlinedInput-input::placeholder': {
									color: error,
								},
							},
							color: text,
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: disabled,
								color: text,
								borderWidth: borderWidthDefault,
								boxShadow: 'none',
								'& fieldset': {
									borderColor: disabled,
									borderWidth: borderWidthDefault,
									boxShadow: 'none',
								},
								'&:hover fieldset': {
									borderColor: disabled,
									color: text,
									borderWidth: borderWidthDefault,
									boxShadow: 'none',
								},
								'&.Mui-focused fieldset': {
									color: text,
									borderColor: text,
									borderWidth: borderWidthDefault,
									boxShadow: 'none',
								},
							},
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: secondary,
								borderWidth: borderWidthDefault,
							},
							'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
								borderColor: '#222',
							},
						}
					},
				},
			},
			MuiFormHelperText: {
				styleOverrides: {
					root: () => {
						return {
							color: text,
							margin: 0,
						}
					},
				},
			},
			MuiDataGrid: {
				styleOverrides: {
					root: {
						borderWidth: borderWidthDefault,
						'& .MuiDataGrid-withBorderColor': {
							borderWidth: `${borderWidthDefault} !important`,
						},
						'& .MuiDataGrid-row--borderBottom .MuiDataGrid-columnHeader': {
							borderBottomWidth: borderWidthDefault,
						},
						'& .MuiDataGrid-row--borderBottom .MuiDataGrid-filler': {
							borderBottomWidth: borderWidthDefault,
						},
						'& .MuiDataGrid-row--borderBottom .MuiDataGrid-scrollbarFiller': {
							borderBottomWidth: borderWidthDefault,
						},
						'& .MuiDataGrid-columnSeparator': {
							width: borderWidthDefault,
							backgroundColor: 'currentColor',
						},
						'& .MuiDataGrid-columnHeaderTitle': {
							fontSize: '14px',
							fontWeight: 700,
						},
					},
					columnHeaders: {
						borderBottomWidth: borderWidthDefault,
						fontSize: '16px',
						fontFamily: fonts.bold,
						letterSpacing: displayLetterSpacing(16),
						fontWeight: `700 !important`,
					},
					row: {
						borderBottomWidth: borderWidthDefault,
					},
					cell: {
						borderRightWidth: borderWidthDefault,
						fontSize: `13px`,
					},
				},
			},
			MuiCheckbox: {
				defaultProps: {
					color: isDark ? `accent` : `primary`,
					disableRipple: true,
					...checkboxIconMapping(),
				},
				styleOverrides: {
					root: {
						color: isDark ? accent : primary,
						'&.Mui-checked': {
							color: isDark ? accent : primary,
							fill: isDark ? accent : primary,
							'&.Mui-disabled': {
								opacity: 0.25,
								color: isDark ? text : muted,
							},
						},
						'&:hover': {
							color: isDark ? chroma(accent).darken(0.5).hex() : chroma(primary).darken(0.5).hex(),
						},
						'&.MuiOutlinedInput-root': {
							'&:hover fieldset': {
								borderColor: isDark ? accent : primary,
							},
							'&.Mui-focused fieldset': {
								borderColor: isDark ? accent : primary,
							},
						},
					},
				},
			},
			MuiToolbar: {
				styleOverrides: {
					root: {
						'& p': {
							margin: 0,
						},
					},
				},
			},
			MuiRadio: {
				defaultProps: {
					color: isDark ? `accent` : `primary`,
					disableRipple: true,
					...radioIconMapping(),
				},
				styleOverrides: {
					root: {
						color: isDark ? accent : primary,
						'&.Mui-checked': {
							color: isDark ? accent : primary,
							fill: isDark ? accent : primary,
							'&.Mui-disabled': {
								opacity: 0.25,
								color: isDark ? text : muted,
							},
						},
						'&:hover': {
							color: isDark ? chroma(accent).darken(0.5).hex() : chroma(primary).darken(0.5).hex(),
						},
						'&.MuiOutlinedInput-root': {
							'&:hover fieldset': {
								borderColor: isDark ? accent : primary,
							},
							'&.Mui-focused fieldset': {
								borderColor: isDark ? accent : primary,
							},
						},
					},
				},
			},
			MuiAutocomplete: {
				styleOverrides: {
					inputRoot: {
						'& input::placeholder': {
							color: disabled,
							opacity: 1,
						},
					},
				},
			},
			MuiInputBase: {
				styleOverrides: {
					sizeSmall: {
						height: sizing.inputHeightSmall,
					},
					root: () => {
						return {
							'&.Mui-disabled': {
								opacity: 0.625,
								color: disabled,
							},
						}
					},
				},
			},
			MuiSelect: {
				styleOverrides: {
					select: () => {
						return {
							color: text,
						}
					},
					icon: {
						color: text,
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						color: text,
						fontWeight: 700,
						'&.Mui-focused': {
							color: text,
						},
					},
				},
			},
			MuiFormLabel: {
				styleOverrides: {
					root: {
						fontWeight: 700,
						color: text,
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						textTransform: 'none',
						borderWidth: borderWidthDefault,
						boxShadow: 'none',
						marginTop: '4px',
						color: text,
						borderRadius: sizing.borderRadius,
						'& .MuiInputBase-root': {
							borderWidth: borderWidthDefault,
							borderRadius: sizing.borderRadius,
							'&:disabled': {
								color: disabled,
							},
						},
						'& .MuiOutlinedInput-input': {
							// height: '48px',
						},
						'& .MuiOutlinedInput-disabled': {
							color: disabled,
						},
						'& .MuiOutlinedInput-root': {
							borderColor: secondary,
							color: text,
							borderWidth: borderWidthDefault,
							boxShadow: 'none',
							'& fieldset': {
								borderColor: disabled,
								borderWidth: borderWidthDefault,
								boxShadow: 'none',
							},
							'&:hover fieldset': {
								borderColor: isDark ? accent : primary,
								color: text,
								borderWidth: borderWidthDefault,
								boxShadow: 'none',
							},
							'&.Mui-focused fieldset': {
								color: text,
								borderColor: text,
								borderWidth: borderWidthDefault,
								boxShadow: 'none',
							},
						},
					},
				},
			},

			MuiSwitch: {
				styleOverrides: {
					root: {
						width: 46,
						height: 27,
						padding: 0,
						margin: 8,
					},
					switchBase: {
						padding: 1,
						'&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
							transform: 'translateX(16px)',
							color: disabled,
							'& + $track': {
								opacity: 1,
								border: 'none',
							},
						},
						'&.Mui-checked': {
							color: isDark ? accent : primary,
							'& + .MuiSwitch-track': {
								backgroundColor: disabled, // track color when checked
							},
						},
					},
					thumb: {
						width: 24,
						height: 24,
						boxShadow: 'none',
					},
					track: {
						borderRadius: 13,
						border: 'none',
						backgroundColor: disabled,
						opacity: 1,
						transition:
							'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					},
				},
			},
			MuiDialogTitle: {
				styleOverrides: {
					root: {
						fontSize: '24px',
						fontWeight: 900,
						fontFamily: fonts.bold,
						letterSpacing: displayLetterSpacing(24),
						padding: `${sizing.themeSpacing}px`,
					},
				},
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						borderRadius: sizing.borderRadius * 3,
						padding: `${sizing.themeSpacing}px`,
						margin: `${sizing.themeSpacing}px`,
						backgroundImage: 'none',
					},
				},
			},
			MuiDialogContent: {
				styleOverrides: {
					root: {
						color: text,
						border: 'none',
						borderTop: 'none',
						borderBottom: 'none',
					},
				},
			},
			MuiStack: {
				defaultProps: {
					useFlexGap: true,
				},
			},
			MuiSnackbar: {
				defaultProps: {
					className: `-infomentor-ce-ui-snackbar`,
				},
				styleOverrides: {
					root: {
						color: white,
						padding: 0,
					},
				},
			},
			MuiAlert: {
				defaultProps: {
					iconMapping: alertIconMapping(),
				},
				styleOverrides: {
					root: {
						borderRadius: 12,
						opacity: 1,
					},
					message: {
						lineHeight: '21px',
						fontWeight: 500,
					},
					filledSuccess: {
						backgroundColor: success,
						color: light,
					},
					standardSuccess: {
						backgroundColor: success,
						color: light,
					},
					filledError: {
						backgroundColor: error,
						color: light,
					},
					standardError: {
						backgroundColor: error,
						color: light,
					},
					filledWarning: {
						backgroundColor: warning,
						color: light,
					},
					standardWarning: {
						backgroundColor: warning,
						color: light,
					},
					filledInfo: {
						backgroundColor: info,
						color: light,
					},
					standardInfo: {
						backgroundColor: info,
						color: light,
					},
					outlinedInfo: {
						backgroundColor: chroma(info).alpha(0.06).css(),
						borderWidth: borderWidthDefault,
						borderColor: info,
						color: text,
						'& .MuiAlert-icon': {
							color: info,
						},
					},
					outlinedSuccess: {
						backgroundColor: chroma(success).alpha(0.06).css(),
						borderWidth: borderWidthDefault,
						borderColor: success,
						color: text,
						'& .MuiAlert-icon': {
							color: success,
						},
					},
					outlinedWarning: {
						backgroundColor: chroma(warning).alpha(0.06).css(),
						borderWidth: borderWidthDefault,
						borderColor: warning,
						color: text,
						'& .MuiAlert-icon': {
							color: warning,
						},
					},
					outlinedError: {
						backgroundColor: chroma(error).alpha(0.06).css(),
						borderWidth: borderWidthDefault,
						borderColor: error,
						color: text,
						'& .MuiAlert-icon': {
							color: error,
						},
					},
				},
			},
			MuiTabs: {
				styleOverrides: {
					root: {
						transition: 'none',
						backgroundColor: bg,
					},
					indicator: {
						backgroundColor: isDark ? accent : primary,
					},
				},
			},
			MuiTab: {
				styleOverrides: {
					root: {
						color: text,
						opacity: 0.6,
						'&.Mui-selected': {
							color: isDark ? accent : primary,
							backgroundColor: bgLight,
							opacity: 1,
						},
						fontWeight: `bold`,
						fontSize: sizing.bodyFontSize,
						textTransform: 'none',
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						borderRadius: 0,
						backgroundColor: bgLight,
					},
				},
			},

			MuiPaper: {
				defaultProps: {
					elevation: 0,
				},
				styleOverrides: {
					root: {
						backgroundColor: bgLight,
						backgroundImage: 'none',
						borderRadius: sizing.borderRadius * 2,
					},
				},
			},
			MuiList: {
				styleOverrides: {
					root: {
						backgroundColor: `transparent`,
					},
				},
			},
			MuiListItem: {
				styleOverrides: {
					root: {
						padding: 0,
						backgroundColor: `transparent`,
					},
				},
			},
			MuiListItemText: {
				styleOverrides: {
					primary: {
						fontWeight: 700,
					},
				},
			},
			MuiListItemIcon: {
				styleOverrides: {
					root: {
						minWidth: 40,
					},
				},
			},
			MuiListSubheader: {
				styleOverrides: {
					root: {
						backgroundColor: `transparent`,
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: sizing.borderRadius,
					},
				},
			},
		},
		spacing: sizing.themeSpacing,
		shape: {
			borderRadius: sizing.borderRadius,
		},
	}
}

declare module '@mui/material/styles' {
	interface TypographyVariants {
		giant: React.CSSProperties
		mega: React.CSSProperties
		huge: React.CSSProperties
		jumbo: React.CSSProperties
		large: React.CSSProperties
		medium: React.CSSProperties
		normal: React.CSSProperties
		small: React.CSSProperties
		wide: React.CSSProperties
	}

	interface TypographyVariantsOptions {
		giant?: React.CSSProperties
		mega?: React.CSSProperties
		huge?: React.CSSProperties
		jumbo?: React.CSSProperties
		large?: React.CSSProperties
		medium?: React.CSSProperties
		normal?: React.CSSProperties
		small?: React.CSSProperties
		wide?: React.CSSProperties
	}

	interface TypeText {
		default: string
		main: string
		accent: string
		primary: string
		secondary: string
		disabled: string
		disabledLight: string
	}
	interface Palette {
		bg: {
			main: string
			light: string
		}
		accent: {
			dark: string
			main: string
			light: string
			contrastText: string
		}
		danger: {
			dark: string
			main: string
			light: string
			contrastText: string
		}
		disabled: {
			dark: string
			main: string
			light: string
		}
	}
}

declare module '@mui/material' {
	interface ButtonPropsColorOverrides {
		accent: true
		text: true
		disabled: true
		danger: true
	}
}

declare module '@mui/material' {
	interface CircularProgressPropsColorOverrides {
		accent: true
	}
}

declare module '@mui/material' {
	interface AlertPropsColorOverrides {
		accent: true
	}
}

declare module '@mui/material' {
	interface IconButtonPropsColorOverrides {
		accent: true
		text: true
		disabled: true
		danger: true
	}
}

declare module '@mui/material' {
	interface SvgIconPropsColorOverrides {
		text: true
		accent: true
		disabled: true
		danger: true
	}
}

declare module '@mui/material' {
	interface TextFieldPropsSizeOverrides {
		size: 'small' | 'medium' | 'large' | undefined
	}
}

declare module '@mui/material' {
	interface ChipPropsColorOverrides {
		accent: true
		danger: true
	}
}

declare module '@mui/material' {
	interface RadioPropsColorOverrides {
		accent: true
	}
}

declare module '@mui/material' {
	interface CheckboxPropsColorOverrides {
		accent: true
	}
}

declare module '@mui/material/SvgIcon' {
	interface SvgIconPropsSizeOverrides {
		small: true
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		giant: true
		mega: true
		huge: true
		jumbo: true
		large: true
		medium: true
		normal: true
		small: true
	}
}
