import { getBrandColors, setBrandColors, type ThemeBrand } from '../lib/brand'

export type { ThemeBrand }

export interface ThemeColors {
	bg: string
	bgLighter: string
	text: string
	primary: string
	secondary: string
	accent: string
	error: string
	warning: string
	info: string
	success: string
	disabled: string
	divider: string
	muted: string
	dark: string
	light: string
	low: string
	medium: string
	high: string
	critical: string
	white: string
	black: string
}

/** Build the shared (mode-independent) color tokens from the CURRENT brand configuration. */
const buildColors = (): Pick<
	ThemeColors,
	| 'dark'
	| 'light'
	| 'accent'
	| 'error'
	| 'warning'
	| 'info'
	| 'success'
	| 'low'
	| 'medium'
	| 'high'
	| 'critical'
	| 'black'
	| 'white'
> => {
	const { brand_color_accent } = getBrandColors()

	return {
		dark: 'rgba(15, 15, 20, 1)',
		light: '#ffffff',
		accent: brand_color_accent,
		error: '#f60e08',
		warning: '#ff8000',
		info: '#1d6ff2',
		success: '#02ad21',
		/**
		 * Notifications
		 */
		low: '#fb850e',
		medium: '#ff8000',
		high: '#f60e08',
		critical: '#c50500',
		white: '#ffffff',
		black: '#000000',
	}
}

export let colors: ReturnType<typeof buildColors> = buildColors()

export let colorsDark: ThemeColors = {
	bg: '#000000',
	bgLighter: '#242433',
	text: '#ffffff',
	primary: getBrandColors().brand_color,
	secondary: '#0831a3',
	disabled: '#525456',
	divider: 'rgba(255, 255, 255, 0.15)',
	muted: 'rgba(255, 255, 255, 0.25)',
	...colors,
}

export let colorsLight: ThemeColors = {
	bg: '#f8f8f8',
	bgLighter: '#ffffff',
	text: '#2D2323',
	primary: getBrandColors().brand_color,
	secondary: '#0051f2',
	disabled: '#bdbdbd',
	divider: 'rgba(0, 0, 0, 0.15)',
	muted: 'rgba(0, 0, 0, 0.25)',
	...colors,
}

/**
 * Re-derive the exported palettes after a brand override. Call `setBrandColors(...)` then
 * `rebuildColors()` before first render (or call the convenience `applyBrandColors` below).
 */
export const rebuildColors = (): void => {
	colors = buildColors()
	colorsDark = {
		bg: '#000000',
		bgLighter: '#242433',
		text: '#ffffff',
		primary: getBrandColors().brand_color,
		secondary: '#0831a3',
		disabled: '#525456',
		divider: 'rgba(255, 255, 255, 0.15)',
		muted: 'rgba(255, 255, 255, 0.25)',
		...colors,
	}
	colorsLight = {
		bg: '#f8f8f8',
		bgLighter: '#ffffff',
		text: '#2D2323',
		primary: getBrandColors().brand_color,
		secondary: '#0051f2',
		disabled: '#bdbdbd',
		divider: 'rgba(0, 0, 0, 0.15)',
		muted: 'rgba(0, 0, 0, 0.25)',
		...colors,
	}
}

/** One-call brand override: sets the brand and re-derives every exported palette. */
export const applyBrandColors = (brand: Partial<ThemeBrand>): void => {
	setBrandColors(brand)
	rebuildColors()
}

export { getBrandColors, setBrandColors }
