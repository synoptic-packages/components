import { random, startCase, useCountry } from '../../../lib'
import {
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	type GridBaseProps,
	type InputProps as InputPropsInterface,
	MenuItem,
	TextField as MuiTextField,
	Select,
	type SelectProps,
} from '@mui/material'
import type { CountryCode } from 'libphonenumber-js'
import React, { useEffect, useMemo } from 'react'
import { type Control, Controller, useController, useFormState } from 'react-hook-form'
import type { Options, TGeneric, ValidationRules } from '../../../types/generics'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	country: CountryCode
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	placeholder?: string
	onChange?: (_value: TGeneric) => void
	InputProps?: InputPropsInterface
	slotProps?: SelectProps['slotProps']
	options: Options
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	input?: React.ReactElement<unknown, any>
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	country,
	placeholder,
	onChange: _onChange,
	size = 'medium',
	width = { xs: 12, sm: 12 },
	control,
	rules,
	slotProps,
	input,
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })
	const { getCountryByCode } = useCountry()
	const options = useMemo(
		() => (getCountryByCode(country)?.states?.map((s) => ({ label: s, value: s })) as Options) || ([] as Options),
		[country, getCountryByCode]
	)

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	const imperativeValue = useMemo(() => {
		return value || (options && options[0]?.value)
	}, [options, value])

	useEffect(() => {
		if (!value && imperativeValue) {
			onChange(imperativeValue)
		}
	}, [imperativeValue, onChange, value])

	return (
		<Grid size={width}>
			<FormControl fullWidth={true} size={size} variant={`outlined`} error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				{options?.length > 0 ? (
					<React.Fragment>
						<Controller
							name={name}
							control={control}
							defaultValue={options[0]?.value} // initial value
							render={({ field }) => (
								<Select
									{...field}
									data-test-id={testId ?? `id-wallet-field-country-state`}
									name={name}
									key={name}
									margin={`none`}
									data-describedby={name}
									autoComplete={`off`}
									size={size}
									error={hasError}
									input={input}
									slotProps={slotProps}
									inputProps={{
										margin: `none`,
										sx: {
											textAlign: 'left',
										},
										inputLabel: {
											shrink: false,
										},
									}}>
									{options.length > 0 &&
										options.map((option, i) => (
											<MenuItem key={i} value={option.value}>
												{option.label}
											</MenuItem>
										))}
								</Select>
							)}
						/>
						{(error?.message || hint) && (
							<FormHelperText>{hasError ? error?.message : hint}</FormHelperText>
						)}
					</React.Fragment>
				) : (
					<Controller
						name={name}
						control={control}
						defaultValue={options[0]?.value}
						render={({ field }) => (
							<MuiTextField
								{...field}
								data-test-id={`id-wallet-field-country-state`}
								key={name}
								data-describedby={name}
								margin={`dense`}
								error={hasError}
								fullWidth
								name={name}
								value={value}
								type={`text`}
								size={size}
								placeholder={placeholder ?? `Enter ${label ?? name}`}
								autoComplete={random()}
								helperText={hasError ? error?.message : hint}
								slotProps={{
									input: {
										size,
										startAdornment: <React.Fragment />,
										endAdornment: <React.Fragment />,
										sx: {
											'& .MuiInputBase-input::placeholder': {
												color: hasError ? `error.light` : `disabled.main`,
											},
										},
									},
									inputLabel: {
										shrink: false,
									},
									formHelperText: {},
								}}
							/>
						)}
					/>
				)}
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldCountryState'
