/**
 * Currency helpers vendored from `@wallet/provider` (`utils/currencySymbol.ts` and
 * `utils/currencyMinorUnits.ts`), using the bundled `constants/currencies.json` dataset.
 */
import currencies from '../constants/currencies.json'

/**
 * Looks up a currency symbol by ISO currency code from the bundled currency list.
 */
export function currencySymbol(currencyCode: string) {
	const currency = currencies.find((o: any) => o?.code?.toLowerCase() === currencyCode?.toLowerCase())
	return currency?.symbol
}

/**
 * ISO 4217 minor-unit exponents. Everything not listed is exponent 2 (the default), which covers
 * the large majority of the bundled currencies.
 */
const ZERO_DECIMAL = new Set([
	'BIF',
	'CLP',
	'DJF',
	'GNF',
	'ISK',
	'JPY',
	'KMF',
	'KRW',
	'MGA',
	'PYG',
	'RWF',
	'UGX',
	'VND',
	'VUV',
	'XAF',
	'XOF',
	'XPF',
])

const THREE_DECIMAL = new Set(['BHD', 'IQD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND'])

export const CURRENCY_DEFAULT_MINOR_UNITS = 2

/** The number of decimal places `<currencyCode>` is written with. Unknown codes get the 2-dp default. */
export const currencyMinorUnits = (currencyCode?: string | null): number => {
	const code = String(currencyCode ?? '')
		.trim()
		.toUpperCase()
	if (!code) return CURRENCY_DEFAULT_MINOR_UNITS
	if (ZERO_DECIMAL.has(code)) return 0
	if (THREE_DECIMAL.has(code)) return 3
	return CURRENCY_DEFAULT_MINOR_UNITS
}
