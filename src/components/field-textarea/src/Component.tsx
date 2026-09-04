import { startCase } from '../../../lib'
import {
	FormControl,
	FormLabel,
	Grid,
	TextField as MuiTextField,
	type GridBaseProps,
	type TextFieldProps,
} from '@mui/material'
import React from 'react'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	placeholder?: string
	disabled?: boolean
	rows?: number | string
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
	rows = 3,
	onChange: _onChange,
	size,
	width = { xs: 12, sm: 12 },
	control,
	rules,
	slotProps,
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		onChange(event.target.value)
		if (typeof _onChange === 'function') {
			_onChange(event.target.value)
		}
	}

	return (
		<Grid size={width}>
			<FormControl variant={`outlined`} fullWidth={true} error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<MuiTextField
							{...field}
							data-test-id={testId ?? `id-wallet-field-textarea`}
							margin={`none`}
							multiline={true}
							data-describedby={name}
							disabled={disabled}
							fullWidth={true}
							value={value}
							rows={rows}
							placeholder={placeholder}
							error={hasError}
							variant={`outlined`}
							label={``}
							slotProps={{
								input: {
									size,
									startAdornment: <React.Fragment />,
									sx: {
										height: 'auto',
										minHeight: 'auto',
									},
								},
								inputLabel: {
									shrink: false,
									disableAnimation: true,
								},
								...slotProps,
							}}
							helperText={hasError ? error?.message : hint}
							size={size}
							onChange={handleChange}
						/>
					)}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldTextarea'
