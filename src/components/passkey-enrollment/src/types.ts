/** One registered passkey, normalised from the better-auth `Passkey` row. */
export interface PasskeyRow {
	id: string
	name: string | null
	createdAt: string | null
	/** A backed-up credential is synced by the platform keychain; the rest live on one device. */
	backedUp: boolean
}

/**
 * better-auth envelope: client methods RESOLVE with `{ data, error }` rather
 * than rejecting, so every call site inspects the envelope AND keeps a
 * `catch` for genuine transport failures. (Ventry source comment, kept.)
 */
export interface PasskeyEnvelope<T = unknown> {
	data?: T
	error?: unknown
}

/**
 * Identity-owner client (better-auth Worker passkey plugin). Injected rather
 * than imported: ventry reached directly for its `parse/auth-client`, which a
 * shared package must not do. The host passes its own bound client through.
 */
export interface PasskeyClient {
	listUserPasskeys: () => Promise<PasskeyEnvelope<unknown>>
	addPasskey: (_args: { name?: string }) => Promise<PasskeyEnvelope>
	deletePasskey: (_args: { id: string }) => Promise<PasskeyEnvelope>
	updatePasskey: (_args: { id: string; name: string }) => Promise<PasskeyEnvelope>
}

export interface PasskeyEnrollmentProps {
	/**
	 * Namespaces every id this component stamps (`<base>-list`, `<base>-row-<id>`, ...). Defaults
	 * to the shared `id-wallet-passkey-enrollment`, which cannot distinguish two instances — a
	 * surface that a spec drives passes its own, exactly as `Form` and `FieldSelect` require.
	 */
	testId?: string
	client: PasskeyClient
}
