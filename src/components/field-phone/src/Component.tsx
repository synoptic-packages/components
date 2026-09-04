import { phoneNumberGetInternationalString, random, startCase } from '../../../lib'
import { FormControl, FormHelperText, FormLabel, Grid, InputAdornment, type GridBaseProps } from '@mui/material'
import { getExampleNumber } from 'libphonenumber-js'
import examples from 'libphonenumber-js/examples.mobile.json'
import { MuiTelInput } from 'mui-tel-input'
import React from 'react'
import { useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Box } from '../../box'
import { Flag } from '../../flag'
import { Icon } from '../../icon'

export interface IComponentProps {
	name: string
	geo?: string
	hint?: string
	label?: string
	disabled?: boolean
	placeholder?: string
	slotProps?: TGeneric
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	geo,
	placeholder: pld,
	label,
	disabled = false,
	hint,
	slotProps,
	size,
	width = { xs: 12, sm: 12 },
	control,
	rules,
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })

	const errorMessage =
		error?.message || (error as TGeneric)?.phoneNumber?.message || (error as TGeneric)?.countryCode?.message

	const hasError = Boolean(errorMessage) && (submitCount > 0 || isTouched)
	const defaultCountry = value?.countryCode || geo
	const example = getExampleNumber(defaultCountry?.toUpperCase(), examples)
	const placeholder = example?.formatNational() || pld

	const imperativeValue = {
		...value,
		countryCode: defaultCountry,
	}

	const [phone, setPhone] = React.useState('')

	// E.164, not the display form. `formatInternational()` returns a SPACED string
	// (`+27 69 235 4441`), and `mobileNumberString` is stored compact (`+27692354441`) — so an exact
	// backend comparison never matched and the driver lookup answered "no account matches" for a
	// number that plainly exists. `mobile/`'s field has always normalised here; ui's did not
	// (finding 0111).
	const toE164 = (value?: string): string | undefined => {
		if (!value) return undefined
		const compact = value.replace(/[^\d+]/g, '')
		return compact.startsWith('+') && compact.length > 1 ? compact : undefined
	}

	const handleChangeText = (phoneTextInput: string, info: { countryCode: any }) => {
		setPhone(phoneTextInput)
		const formattedPhoneNumber = phoneNumberGetInternationalString({
			countryCode: info?.countryCode,
			national: phoneTextInput,
			international: phoneTextInput,
		})

		const nationalFormatted = formattedPhoneNumber?.national ?? phoneTextInput
		const phoneNumber = nationalFormatted.replace(/\D/g, '')

		// The cross-frontend contract is `{ countryCode, phoneNumber, phoneNumberInternational, raw }`
		// — the same keys `mobile/`'s FieldPhone emits. This field used to emit `{ countryCode,
		// national, international }`, the retired shape, so every caller written against the
		// documented contract read `undefined` from every keystroke and reported that nothing had been
		// typed. The Yaya driver lookup by mobile number could therefore never run (finding 0111).
		onChange({
			countryCode: info?.countryCode,
			phoneNumber,
			phoneNumberInternational: toE164(formattedPhoneNumber?.international),
			raw: nationalFormatted,
		})
	}

	return (
		<Grid size={width}>
			<FormControl fullWidth variant={`outlined`} error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<MuiTelInput
					data-test-id={testId ?? `id-wallet-field-phone`}
					defaultCountry={defaultCountry}
					fullWidth={true}
					size={size}
					margin={`none`}
					inputMode={`tel`}
					disabled={disabled}
					placeholder={placeholder}
					error={hasError}
					autoComplete={random()}
					forceCallingCode={true}
					focusOnSelectCountry={true}
					data-describedby={name}
					value={phone || imperativeValue?.raw || imperativeValue?.phoneNumber}
					onChange={handleChangeText}
					sx={{
						pl: 0,
						'& .MuiTelInput-IconButton': {
							borderRight: 'none !important',
						},
						'& .MuiTelInput-IconButton + p': (theme: any) => {
							const divider = theme.vars ? theme.vars.palette.divider : theme.palette.divider
							return {
								borderRight: `1px solid color-mix(in srgb, ${divider} 50%, transparent)`,
							}
						},
					}}
					getFlagElement={(flag: any) => {
						return (
							<Box sx={{ display: `flex`, alignItems: `center`, flexDirection: `row` }}>
								{flag && <Flag code={flag?.toLowerCase()} size={size === `small` ? 14 : 24} />}
							</Box>
						)
					}}
					slotProps={{
						input: {
							margin: `none`,
							sx: {
								pl: 0.5,
								'& .MuiInputBase-input::placeholder': {
									color: hasError ? `error.light` : `disabled.main`,
								},
							},
							error: hasError,
							autoComplete: random(),
							disabled,
							...(size ? { size } : {}),
							endAdornment: (
								<InputAdornment position={`end`}>
									<Icon
										name={`SyPhone`}
										size={size === 'small' ? 16 : 20}
										color={hasError ? `error.main` : `text`}
									/>
								</InputAdornment>
							),
						},
						inputLabel: {
							shrink: false,
						},
						...slotProps,
					}}
				/>
				{(errorMessage || hint) && (
					<FormHelperText sx={{ ml: 1 }}>{hasError ? errorMessage : hint}</FormHelperText>
				)}
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldPhone'
