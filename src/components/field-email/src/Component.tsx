import { emailNormalize, random, startCase } from '../../../lib'
import {
	FormControl,
	FormLabel,
	Grid,
	TextField as MuiTextField,
	type BaseTextFieldProps,
	type GridBaseProps,
	type TextFieldProps,
} from '@mui/material'
import React from 'react'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Box } from '../../box'
import { Icon } from '../../icon'

export interface IComponentProps extends BaseTextFieldProps {
	name: string
	label?: string
	hint?: string
	disabled?: boolean
	placeholder?: string
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	onChange?: (_value: TGeneric) => void
	slotProps?: TextFieldProps['slotProps']
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	placeholder,
	disabled,
	onChange: _onChange,
	size,
	width = { xs: 12, sm: 12 },
	slotProps,
	control,
	rules,
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({
		name,
		control,
		rules: {
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Please enter a valid email address',
			},
			...rules,
		},
	})

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)
	const isDisabledWithValue = disabled && Boolean(value)

	// Normalized AT THE FIELD, not at each of the six call sites that submit an address
	// (`.project/findings/0184`). Trim is the reported painpoint — a stubborn autocorrect or a paste adds
	// edge whitespace and better-auth never trims, so the account becomes unreachable by its own owner.
	// Lowercasing is visible as you type and that is intended: an email is case-insensitive, and showing
	// the canonical form is what makes the field agree with what the server will store.
	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const normalized = emailNormalize(event.target.value)
		if (typeof _onChange === 'function') {
			_onChange(normalized)
		} else {
			onChange(normalized)
		}
	}

	return (
		<Grid size={width}>
			<FormControl variant={`outlined`} fullWidth error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<MuiTextField
							{...field}
							data-test-id={testId ?? `id-wallet-field-email`}
							key={name}
							data-describedby={name}
							margin={'dense'}
							error={hasError}
							fullWidth
							name={name}
							disabled={disabled}
							multiline={false}
							rows={1}
							value={value}
							type={`email`}
							size={size}
							data-aria-describedby={name}
							placeholder={placeholder ?? `Enter ${label ?? name}`}
							autoComplete={random()}
							helperText={hasError ? error?.message : hint}
							onChange={handleChange}
							slotProps={{
								input: {
									size,
									disabled,
									startAdornment: (
										<Box
											width={40}
											sx={{
												display: `flex`,
												alignItems: `center`,
												justifyContent: `center`,
												mr: 1,
											}}>
											<Icon name={`Mail`} size={21} />
										</Box>
									),
									endAdornment: isDisabledWithValue ? (
										<Icon name={`Check`} size={21} color={`success`} />
									) : (
										<React.Fragment />
									),
									sx: {
										'& .MuiInputBase-input::placeholder': {
											color: hasError ? `error.light` : `disabled.main`,
										},
										...(isDisabledWithValue && {
											'& .MuiInputBase-input': {
												color: `text.primary`,
												WebkitTextFillColor: `text.primary`,
											},
										}),
									},
								},
								inputLabel: {
									shrink: false,
								},
								formHelperText: {},
								...slotProps,
							}}
						/>
					)}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldEmail'
