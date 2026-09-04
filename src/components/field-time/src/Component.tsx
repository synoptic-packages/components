import { startCase } from '../../../lib'
import { FormControl, FormLabel, Grid, type GridBaseProps } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	disabled?: boolean
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	onChange?: (_value: TGeneric) => void
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	disabled,
	size = 'medium',
	width = { xs: 12, sm: 12 },
	onChange: _onChange,
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

	function handleChange(newValue: Dayjs | null): void {
		if (typeof _onChange === 'function') {
			_onChange(newValue)
		} else {
			onChange(newValue)
		}
	}

	return (
		<Grid size={width}>
			<FormControl fullWidth error={hasError} disabled={disabled}>
				<FormLabel>{label ?? startCase(name)}</FormLabel>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<MuiTimePicker
								{...field}
								data-test-id={testId ?? `id-wallet-field-time`}
								data-describedby={name}
								value={value ? dayjs(value) : null}
								onChange={handleChange}
								disabled={disabled}
								slotProps={{
									textField: {
										error: hasError,
										helperText: hasError ? error?.message : hint,
										fullWidth: true,
										size: size,
									},
								}}
							/>
						</LocalizationProvider>
					)}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldTime'
