import { startCase, useParseGeo, type GeoAutocompletePurpose } from '../../../lib'
import { CircularProgress, FormControl, FormLabel, Grid, type GridBaseProps } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import debounce from 'debounce'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useController, useFormState, type Control } from 'react-hook-form'
import { useSelector } from '../../../lib/redux'
import type { RootState } from '../../../lib/store'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Box } from '../../box'
import { Icon } from '../../icon'

export interface PlaceResult {
	name: string
	address: string
	lat: number | null
	lng: number | null
	place_id: string
	provider: string
}

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	disabled?: boolean
	placeholder?: string
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	onChange?: (_value: TGeneric) => void
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	debounceMs?: number
	testId?: string
	accountId?: string
	purpose?: GeoAutocompletePurpose
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	placeholder,
	disabled = false,
	width = { xs: 12, sm: 12 },
	onChange: _onChange,
	control,
	rules,
	debounceMs = 300,
	testId,
	accountId,
	purpose = `MOBILITY_ORIGIN`,
}) => {
	const { autocomplete, resolve } = useParseGeo()
	const reduxAccountId = useSelector((state: RootState) => state.accounts.account?.id ?? null)
	const resolvedAccountId: string | undefined = accountId ?? reduxAccountId ?? undefined
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })
	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)
	const placeValue = (value as PlaceResult) ?? null

	const [open, setOpen] = useState(false)
	const [places, setPlaces] = useState<readonly PlaceResult[]>([])
	const [searchQuery, setSearchQuery] = useState(placeValue?.name ?? '')
	const [isSearching, setIsSearching] = useState(false)
	const requestIdRef = useRef(0)

	const autocompleteRef = useRef(autocomplete)
	autocompleteRef.current = autocomplete
	const accountIdRef = useRef(resolvedAccountId)
	accountIdRef.current = resolvedAccountId
	const purposeRef = useRef(purpose)
	purposeRef.current = purpose
	const searchSessionRef = useRef<string | undefined>(undefined)

	const fetchResults = useRef(
		debounce(async (query: string) => {
			const trimmed = query.trim()
			if (trimmed.length < 2) {
				setPlaces([])
				setIsSearching(false)
				return
			}

			const requestId = requestIdRef.current + 1
			requestIdRef.current = requestId
			setIsSearching(true)

			const currentAccountId = accountIdRef.current
			if (!currentAccountId) {
				if (requestIdRef.current === requestId) {
					setPlaces([])
					setIsSearching(false)
				}
				return
			}

			try {
				const result = await autocompleteRef.current({
					accountId: currentAccountId,
					purpose: purposeRef.current,
					query: trimmed,
					searchSessionRef: searchSessionRef.current,
				})
				if (requestIdRef.current === requestId) {
					searchSessionRef.current = result.searchSessionRef
					setPlaces(
						result.suggestions.map((suggestion) => ({
							name: suggestion.primaryText,
							address: suggestion.secondaryText,
							lat: null,
							lng: null,
							place_id: suggestion.placeRef,
							provider: suggestion.categories[0] ?? ``,
						}))
					)
				}
			} catch {
				if (requestIdRef.current === requestId) {
					setPlaces([])
				}
			} finally {
				if (requestIdRef.current === requestId) {
					setIsSearching(false)
				}
			}
		}, debounceMs)
	).current

	useEffect(() => {
		if (placeValue?.name && placeValue.name !== searchQuery) {
			setSearchQuery(placeValue.name)
		}
	}, [placeValue?.name, searchQuery])

	const handleInputChange = (_event: React.SyntheticEvent, inputValue: string) => {
		setSearchQuery(inputValue)
		fetchResults(inputValue)
		if (!inputValue) {
			onChange(null)
			if (typeof _onChange === 'function') {
				_onChange(null)
			}
		}
	}

	const handleChange = async (_event: React.SyntheticEvent, place: PlaceResult | null) => {
		if (!place) {
			onChange(null)
			if (typeof _onChange === 'function') _onChange(null)
			return
		}

		// Autocomplete suggestions carry no coordinates — only resolve() knows the point. Emit the
		// suggestion first so the input never appears to drop the selection, then upgrade it.
		onChange(place)
		if (typeof _onChange === 'function') _onChange(place)

		if (!resolvedAccountId) return

		try {
			const { point, address } = await resolve({
				accountId: resolvedAccountId,
				searchSessionRef: searchSessionRef.current ?? ``,
				placeRef: place.place_id,
			})
			const resolved: PlaceResult = {
				...place,
				address: address.formattedAddress,
				lat: point.latitude,
				lng: point.longitude,
				provider: address.provenance.provider,
			}
			onChange(resolved)
			if (typeof _onChange === 'function') _onChange(resolved)
		} catch {
			// Keep the unresolved suggestion; the consumer sees null coordinates rather than nothing.
		}
	}

	const selectedValue = useMemo(() => {
		if (!placeValue) return null
		return places.find((p) => p.place_id === placeValue.place_id) ?? null
	}, [placeValue, places])

	return (
		<Grid size={width}>
			<FormControl variant={`outlined`} fullWidth error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<Box className={`-infomentor-input-form-control`}>
					<Autocomplete
						sx={{ padding: 0, width: `100%` }}
						className={`-infomentor-ce-ui-places`}
						open={open}
						loadingText={`Finding given address or town`}
						noOptionsText={`Address not found`}
						clearOnBlur={true}
						disabled={disabled}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
						getOptionLabel={(option: PlaceResult) => option?.name ?? ''}
						popupIcon={
							isSearching ? (
								<CircularProgress color="inherit" size={20} />
							) : (
								<Icon name={`Plus`} size={20} color={`text`} style={{ transform: `none` }} />
							)
						}
						options={places ?? []}
						loading={isSearching}
						value={selectedValue}
						inputValue={searchQuery}
						onChange={handleChange}
						filterOptions={(x) => x}
						onInputChange={handleInputChange}
						renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: PlaceResult) => (
							<Box component={`li`} display={`flex`} flexDirection={`column`} sx={{ py: 1 }} {...props}>
								<Box component={`span`} sx={{ fontSize: `0.875rem`, fontWeight: 500 }}>
									{option.name}
								</Box>
								{option.address ? (
									<Box component={`span`} sx={{ fontSize: `0.75rem`, color: `text.secondary` }}>
										{option.address}
									</Box>
								) : null}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								data-test-id={testId ?? `id-wallet-field-places`}
								fullWidth
								error={hasError}
								data-describedby={name}
								label={searchQuery ? `` : (placeholder ?? `Search by address or town name`)}
								className={`-infomentor-ce-ui-places-search`}
								helperText={hasError ? error?.message : hint}
								InputLabelProps={{
									shrink: false,
									style: {
										color: hasError ? 'error.light' : 'disabled.main',
									},
								}}
								InputProps={{
									...params.InputProps,
									endAdornment: <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>,
								}}
								inputProps={{
									...params.inputProps,
									style: { paddingRight: `70px` },
								}}
							/>
						)}
					/>
				</Box>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldPlaces'
