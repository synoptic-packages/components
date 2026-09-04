/**
 * Backend-neutral string / data helpers vendored from `@wallet/provider` (provider's
 * `utils/string.ts`, `utils/random.ts`, `utils/sleep.ts` and `utils/credentialNormalize.ts`),
 * trimmed to what `@synotech/components` uses. Implementations are verbatim copies of the provider
 * code so behaviour stays identical.
 */

/** Uppercases a string, returning an empty string for nullish runtime values. */
export function upperCase(value: string): string {
	return value?.toUpperCase() ?? ''
}

/** Lowercases a string, returning an empty string for nullish runtime values. */
export function lowerCase(value: string): string {
	return value?.toLowerCase() ?? ''
}

/**
 * Converts camelCase, snake_case, kebab-case, or spaced text into Start Case.
 */
export function startCase(value: string | undefined): string {
	if (!value || typeof value !== 'string') return ''
	return value
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_\-\s]+/g, ' ')
		.trim()
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Builds up to two initials from a display name.
 */
export function initials(name: unknown): string {
	const normalized = typeof name === 'string' ? name.trim().replace(/-/g, '').replace(/,/g, '') : ''
	if (!normalized) return ``
	try {
		const parts = normalized.split(' ')
		if (parts.length >= 2) {
			const init = parts
				.map((p) => Array.from(p)[0])
				.join('')
				.toUpperCase()
				.substring(0, 2)
			return init || ``
		}
		const chars = Array.from(normalized)
		if (chars.length >= 2) {
			return (chars[0] + chars[1]).toUpperCase()
		}
		return chars[0]?.toUpperCase()
	} catch {
		return ``
	}
}

/**
 * Generates a short non-cryptographic random string for UI identifiers.
 */
export const random = (length?: number): string => {
	length = length || 10
	return Array.from({ length }, () => Math.random().toString(36).charAt(2)).join('')
}

/**
 * Resolves after the requested number of milliseconds.
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * The address as it should be stored and compared, everywhere (trim then lowercase, deliberately
 * unlocalized). Verbatim copy of the provider's `emailNormalize`.
 */
export const emailNormalize = (value: string | null | undefined): string =>
	typeof value === 'string' ? value.trim().toLowerCase() : ''

// eslint-disable-next-line no-control-regex
const INVISIBLE = /[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g

/**
 * The password as typed, minus what no keyboard produced on purpose. Verbatim copy of the
 * provider's `passwordSanitize`.
 */
export const passwordSanitize = (value: string | null | undefined): string =>
	typeof value === 'string' ? value.replace(INVISIBLE, '').trim() : ''
