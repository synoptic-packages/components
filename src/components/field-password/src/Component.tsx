import {
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	InputAdornment,
	TextField,
	type GridBaseProps,
	type TextFieldProps,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import { passwordSanitize, random, startCase, usePassword } from '../../../lib'
import type { ValidationRules } from '../../../types/generics'
import { IconButton } from '../../button-icon'
import { Icon } from '../../icon'
import { ComponentIndicator } from './Component.indicator'
import { PasswordRequirements } from './Component.requirements'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	placeholder?: string
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	slotProps?: TextFieldProps['slotProps']
	control: Control<any>
	rules?: ValidationRules
	strengthIndicatorVariant?: 'bar' | 'checklist'
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	size,
	placeholder,
	slotProps,
	control,
	rules,
	width = { xs: 12, sm: 12 },
	strengthIndicatorVariant,
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const { passwordStrength } = usePassword(value || '')

	return (
		<Grid size={width}>
			<FormControl fullWidth={true} variant={`outlined`} error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							data-test-id={testId ?? `id-wallet-field-password`}
							margin={`none`}
							error={hasError}
							fullWidth
							name={name}
							value={value}
							data-describedby={name}
							type={showPassword ? 'text' : 'password'}
							size={size}
							placeholder={placeholder ?? `Enter ${label ?? name}`}
							autoComplete={random()}
							onChange={(event) => {
								// Sanitized at the field so every password this app submits matches what the auth
								// SPA stored (`.project/findings/0184`). For typing this is a no-op — an interior
								// space survives; for a paste it removes the CR/LF and zero-width marks that make a
								// correct credential fail. Trimming is safe ONLY because it is applied on every
								// path: signup, sign-in and reset alike.
								onChange(passwordSanitize(event.target.value))
							}}
							slotProps={{
								input: {
									...(size ? { size } : {}),
									endAdornment: (
										<InputAdornment position={`end`} sx={{ mr: 1 }}>
											<IconButton
												aria-label={`toggle password visibility`}
												onClick={() => setShowPassword(!showPassword)}
												edge={`end`}>
												{showPassword ? (
													<Icon
														name={`Eye`}
														color={hasError ? `danger` : `text`}
														size={size === `small` ? 18 : 21}
													/>
												) : (
													<Icon
														name={`EyeClosed`}
														color={hasError ? `danger` : `text`}
														size={size === `small` ? 18 : 21}
													/>
												)}
											</IconButton>
										</InputAdornment>
									),
									sx: {
										'& .MuiInputBase-input::placeholder': {
											color: hasError ? `error.light` : `disabled.main`,
										},
									},
								},
								inputLabel: {
									shrink: false,
								},
								...slotProps,
							}}
						/>
					)}
				/>
				{strengthIndicatorVariant === 'bar' && !hasError && (
					<ComponentIndicator passwordStrength={passwordStrength} />
				)}
				{strengthIndicatorVariant === 'checklist' && (
					<PasswordRequirements passwordStrength={passwordStrength} />
				)}
				{(error?.message || hint) && (
					<FormHelperText sx={{ ml: 1 }}>{hasError ? error?.message : hint}</FormHelperText>
				)}
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldPassword'
