/**
 * Brand colour injection for the theme.
 *
 * The wallet app read brand colours from its `config.json` at import time; a reusable library
 * cannot. `theme/colors.ts` therefore consults this module instead. The defaults below are the
 * wallet app's own brand colours; a consumer can override them (before first render) via
 * `setBrandColors`, which re-derives the exported `colorsDark`/`colorsLight` objects in place.
 */
export interface ThemeBrand {
	brand_color: string
	brand_color_accent: string
}

export const DEFAULT_BRAND: ThemeBrand = {
	brand_color: `#C2410C`,
	brand_color_accent: `#FDBA74`,
}

let brand: ThemeBrand = { ...DEFAULT_BRAND }

export const getBrandColors = (): ThemeBrand => ({ ...brand })

export const setBrandColors = (next: Partial<ThemeBrand>): void => {
	brand = { ...brand, ...next }
}
