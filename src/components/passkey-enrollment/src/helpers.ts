import type { PasskeyRow } from './types'

/**
 * Pure helpers for the passkey manager. They exist apart from the component because the whole
 * point of the fix is the ENVELOPE: better-auth's client methods resolve with `{ data, error }`
 * instead of rejecting, so "did this call succeed" is a value to inspect, not an exception to
 * catch — and a value is worth unit-testing on its own.
 */

/** better-auth's error envelope, plus the thrown-Error case a transport failure still produces. */
export const passkeyErrorMessage = (error: unknown, fallback: string): string => {
	if (typeof error === `string` && error.trim().length > 0) return error
	if (error instanceof Error && error.message.trim().length > 0) return error.message
	if (error && typeof error === `object`) {
		const message = (error as { message?: unknown }).message
		if (typeof message === `string` && message.trim().length > 0) return message
		const code = (error as { code?: unknown }).code
		if (typeof code === `string` && code.trim().length > 0) return code
	}
	return fallback
}

const toIsoDate = (value: unknown): string | null => {
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString()
	if (typeof value === `string` || typeof value === `number`) {
		const parsed = new Date(value)
		return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString()
	}
	return null
}

/**
 * `GET /passkey/list-user-passkeys` answers with the raw `Passkey` rows. Anything that is not a
 * usable row is dropped rather than rendered as a nameless entry with no id to act on.
 */
export const toPasskeyRows = (data: unknown): PasskeyRow[] => {
	if (!Array.isArray(data)) return []

	return data
		.filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === `object`)
		.map((row): PasskeyRow => {
			const name = typeof row.name === `string` ? row.name.trim() : ``
			return {
				id: typeof row.id === `string` ? row.id : ``,
				name: name.length > 0 ? name : null,
				createdAt: toIsoDate(row.createdAt),
				backedUp: row.backedUp === true,
			}
		})
		.filter((row) => row.id.length > 0)
}

/** Better-auth stores the name as optional; an unnamed credential is still a real credential. */
export const passkeyLabel = (row: PasskeyRow): string => row.name ?? `Passkey`

export const passkeyCreatedLabel = (row: PasskeyRow): string => {
	if (!row.createdAt) return `Added on an unknown date`
	return `Added ${new Date(row.createdAt).toLocaleDateString()}`
}

/**
 * The label a new credential is registered with. `navigator.platform` is deprecated but is the
 * only universally present hint, and the user can rename the row afterwards — so a wrong guess
 * costs a rename, never a failed enrolment.
 */
export const defaultPasskeyName = (): string | undefined => {
	if (typeof navigator === `undefined`) return undefined
	const withUaData = navigator as Navigator & { userAgentData?: { platform?: string } }
	const platform = (withUaData.userAgentData?.platform ?? navigator.platform ?? ``).trim()
	return platform.length > 0 ? platform : undefined
}

/**
 * Whether this browser can CREATE a credential. Listing and removing stay available regardless:
 * a browser that cannot enrol must still be able to revoke a credential enrolled elsewhere.
 */
export const isPasskeySupported = (): boolean =>
	typeof window !== `undefined` && typeof window.PublicKeyCredential !== `undefined`
