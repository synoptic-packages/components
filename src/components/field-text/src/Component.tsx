import { random, startCase } from '../../../lib'
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
import { Icon } from '../../icon'

export interface IComponentProps extends BaseTextFieldProps {
	name: string
	label?: string
	hint?: string
	multiline?: boolean
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
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)
	const isDisabledWithValue = disabled && Boolean(value)

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		if (typeof _onChange === 'function') {
			_onChange(event.target.value)
		} else {
			onChange(event.target.value)
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
							data-test-id={testId ?? `id-wallet-field-text`}
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
							type={`text`}
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
									startAdornment: <React.Fragment />,
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

Component.displayName = 'FieldText'
