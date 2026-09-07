import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { initialDialog, useConfig } from '../../../context/provider-config'
import type { TGeneric } from '../../../types/generics'
import { Alert } from '../../alert'
import { Box } from '../../box'
import { Button } from '../../button'
import { IconButton } from '../../button-icon'
import { Chip } from '../../chip'
import { FieldText } from '../../field-text'
import { Form, FormContent, FormWrapper } from '../../form'
import { Icon } from '../../icon'
import { List, ListItem } from '../../list'
import { BounceLoader } from '../../loader'
import { Text } from '../../text'
import {
	defaultPasskeyName,
	isPasskeySupported,
	passkeyCreatedLabel,
	passkeyErrorMessage,
	passkeyLabel,
	toPasskeyRows,
} from './helpers'
import type { PasskeyEnrollmentProps, PasskeyRow } from './types'

const DEFAULT_TEST_ID = `id-wallet-passkey-enrollment`

interface RenameValues {
	name: string
}

/**
 * Passkey enrolment and management, against the **better-auth Worker** — the identity owner —
 * never Parse. It reads and writes the passkey plugin's four user-facing endpoints:
 * `GET /passkey/list-user-passkeys`, `POST /passkey/verify-registration` (through `addPasskey`,
 * which drives `generate-register-options` and the WebAuthn ceremony), `POST /passkey/update-passkey`
 * and `POST /passkey/delete-passkey`.
 *
 * **Listing used to be broken and this is the reason to read the client source before calling it.**
 * The previous implementation awaited `authClient.$listPasskeys.get()`, silenced by a
 * `@ts-expect-error`. `$listPasskeys` is a nanostore REFETCH SIGNAL the plugin sets to
 * `Math.random()` after a registration or deletion — a number, not the data — so `.map` always
 * threw and the surface permanently claimed "Could not list passkeys". The data comes from the
 * plugin's own path proxy: `authClient.passkey.listUserPasskeys()`.
 *
 * **These calls RESOLVE with `{ data, error }`; they do not reject.** A bare `try/catch` therefore
 * catches nothing, treats a refusal as a success, and — where a busy flag is cleared only on the
 * happy path — latches the surface into a permanently disabled state. Every call here inspects the
 * envelope AND keeps a `catch` for genuine transport failures, and every one clears its busy flag
 * in `finally`.
 *
 * Rename is the shared form system in its local, state-driven mode:
 * `FormWrapper` -> `Form`/`FormContent` -> `FieldText`. It is not registered in the central form
 * renderer on purpose — this is a shared component, and a component in `src/components/` reaching
 * into an application form registry would invert the dependency the component system rests on.
 *
 * Port note: ventry imported its `parse/auth-client` directly. The library takes the bound
 * client as a `client` prop instead — same four methods, same envelopes.
 */
export const Component: React.FC<PasskeyEnrollmentProps> = ({ testId, client }) => {
	const base = testId ?? DEFAULT_TEST_ID
	const { setDialog, setSnackbar } = useConfig()

	const [rows, setRows] = useState<PasskeyRow[] | null>(null)
	const [loading, setLoading] = useState(true)
	const [loadError, setLoadError] = useState<string | null>(null)
	const [enrolling, setEnrolling] = useState(false)
	const [busyId, setBusyId] = useState<string | null>(null)
	const [renaming, setRenaming] = useState<PasskeyRow | null>(null)
	const [renameError, setRenameError] = useState<string | null>(null)

	const supported = isPasskeySupported()

	const {
		control,
		reset,
		trigger,
		getValues,
		formState: { isSubmitting },
	} = useForm<RenameValues>({ defaultValues: { name: `` } })

	const load = useCallback(async () => {
		setLoading(true)
		try {
			const { data, error } = await client.listUserPasskeys()
			if (error) {
				setRows(null)
				setLoadError(passkeyErrorMessage(error, `Unable to load your passkeys.`))
				return
			}
			setLoadError(null)
			setRows(toPasskeyRows(data))
		} catch (error: unknown) {
			setRows(null)
			setLoadError(passkeyErrorMessage(error, `Unable to load your passkeys.`))
		} finally {
			setLoading(false)
		}
	}, [client])

	useEffect(() => {
		void load()
	}, [load])

	const enrol = useCallback(async () => {
		setEnrolling(true)
		try {
			const { error } = await client.addPasskey({ name: defaultPasskeyName() })
			if (error) {
				setSnackbar?.({
					open: true,
					message: passkeyErrorMessage(error, `Could not set up a passkey on this device.`),
					severity: `error`,
				})
				return
			}
			setSnackbar?.({ open: true, message: `Passkey added.`, severity: `success` })
			await load()
		} catch (error: unknown) {
			setSnackbar?.({
				open: true,
				message: passkeyErrorMessage(error, `Could not set up a passkey on this device.`),
				severity: `error`,
			})
		} finally {
			setEnrolling(false)
		}
	}, [client, load, setSnackbar])

	const remove = useCallback(
		async (row: PasskeyRow) => {
			setBusyId(row.id)
			try {
				const { error } = await client.deletePasskey({ id: row.id })
				if (error) {
					setSnackbar?.({
						open: true,
						message: passkeyErrorMessage(error, `Could not remove that passkey.`),
						severity: `error`,
					})
					return
				}
				setSnackbar?.({ open: true, message: `Passkey removed.`, severity: `success` })
				await load()
			} catch (error: unknown) {
				setSnackbar?.({
					open: true,
					message: passkeyErrorMessage(error, `Could not remove that passkey.`),
					severity: `error`,
				})
			} finally {
				setBusyId(null)
			}
		},
		[client, load, setSnackbar]
	)

	const confirmRemove = useCallback(
		(row: PasskeyRow) => {
			setDialog?.({
				...initialDialog,
				open: true,
				title: `Remove passkey?`,
				description: `${passkeyLabel(row)} will no longer sign you in. You can add it again from that device.`,
				confirmTitle: `Remove`,
				variant: `warning`,
				testId: `${base}-remove-confirm`,
				onConfirm: async () => {
					await remove(row)
				},
			})
		},
		[base, remove, setDialog]
	)

	const openRename = useCallback(
		(row: PasskeyRow) => {
			setRenameError(null)
			reset({ name: row.name ?? `` })
			setRenaming(row)
		},
		[reset]
	)

	const closeRename = useCallback(() => {
		setRenameError(null)
		setRenaming(null)
	}, [])

	// `trigger()` before submitting is this form system's contract: it validates every field rather
	// than only the touched ones, so a modal opened and submitted untouched still fails its rules.
	const submitRename = useCallback(async () => {
		if (!renaming) return
		setRenameError(null)
		if (!(await trigger())) return

		const name = getValues().name.trim()
		setBusyId(renaming.id)
		try {
			const { error } = await client.updatePasskey({ id: renaming.id, name })
			if (error) {
				setRenameError(passkeyErrorMessage(error, `Could not rename that passkey.`))
				return
			}
			setRenaming(null)
			setSnackbar?.({ open: true, message: `Passkey renamed.`, severity: `success` })
			await load()
		} catch (error: unknown) {
			setRenameError(passkeyErrorMessage(error, `Could not rename that passkey.`))
		} finally {
			setBusyId(null)
		}
	}, [client, getValues, load, renaming, setSnackbar, trigger])

	return (
		<Box testId={base}>
			{loading ? (
				<Box testId={`${base}-loading`} sx={{ display: `flex`, justifyContent: `center`, py: 3 }}>
					<BounceLoader />
				</Box>
			) : loadError ? (
				<Alert severity={`error`} message={loadError} testId={`${base}-error`} sx={{ mb: 2 }} />
			) : (rows ?? []).length === 0 ? (
				<Box testId={`${base}-empty`} sx={{ py: 2 }}>
					<Text variant={`body2`} color={`text.secondary`}>
						{`No passkeys yet. Add one to sign in with your fingerprint, face or device PIN.`}
					</Text>
				</Box>
			) : (
				<List testId={`${base}-list`}>
					{(rows ?? []).map((row, index) => (
						<ListItem
							key={row.id}
							button={false}
							border={index < (rows ?? []).length - 1}
							testId={`${base}-row-${row.id}`}
							icon={<Icon name={`KeyRound`} size={20} />}
							primary={
								<Text testId={`${base}-name-${row.id}`} variant={`body1`}>
									{passkeyLabel(row)}
								</Text>
							}
							secondary={passkeyCreatedLabel(row)}
							right={
								<Box sx={{ display: `flex`, alignItems: `center`, gap: 1 }}>
									<Chip
										size={`small`}
										label={row.backedUp ? `Synced` : `This device`}
										testId={`${base}-sync-${row.id}`}
									/>
									<IconButton
										aria-label={`rename passkey`}
										disabled={busyId === row.id}
										onClick={() => openRename(row)}
										testId={`${base}-rename-${row.id}`}>
										<Icon name={`Pencil`} size={18} />
									</IconButton>
									<IconButton
										aria-label={`remove passkey`}
										disabled={busyId === row.id}
										onClick={() => confirmRemove(row)}
										testId={`${base}-remove-${row.id}`}>
										<Icon name={`Trash2`} size={18} />
									</IconButton>
								</Box>
							}
						/>
					))}
				</List>
			)}

			<Box sx={{ display: `flex`, gap: 1, flexWrap: `wrap`, mt: 2, px: 2 }}>
				{supported ? (
					<Button
						variant={`contained`}
						size={`small`}
						disabled={enrolling}
						loading={enrolling}
						onClick={() => void enrol()}
						startIcon={<Icon name={`Fingerprint`} size={18} />}
						testId={`${base}-enrol`}>
						{`Add a passkey`}
					</Button>
				) : (
					<Alert
						severity={`info`}
						testId={`${base}-unsupported`}
						message={`This browser cannot create a passkey. Existing passkeys still work and can be removed here.`}
					/>
				)}
				<Button
					variant={`outlined`}
					size={`small`}
					disabled={loading}
					onClick={() => void load()}
					testId={`${base}-refresh`}>
					{`Refresh`}
				</Button>
			</Box>

			{renaming ? (
				<FormWrapper asModal={true} closeForm={closeRename} name={`passkey-rename`} title={`Rename passkey`}>
					<Form
						testId={`${base}-rename-form`}
						size={`small`}
						control={control as TGeneric}
						isSubmitting={isSubmitting}
						onSubmit={submitRename}
						onReset={closeRename}
						resetLabel={`Cancel`}
						submitLabel={`Save`}>
						{({ control: formControl }) => (
							<FormContent title={`Rename passkey`} hideTitle={true} error={renameError} success={null}>
								<FieldText
									control={formControl}
									name={`name`}
									label={`Name`}
									placeholder={`e.g. Work laptop`}
									rules={{ required: `Give this passkey a name.` }}
									testId={`${base}-rename-input`}
								/>
							</FormContent>
						)}
					</Form>
				</FormWrapper>
			) : null}
		</Box>
	)
}

Component.displayName = `PasskeyEnrollment`
