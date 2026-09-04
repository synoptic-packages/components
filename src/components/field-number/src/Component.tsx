import { random, startCase } from '../../../lib'
import { FormControl, FormLabel, Grid, IconButton, InputAdornment, TextField, type GridBaseProps } from '@mui/material'
import React from 'react'
import { useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Icon } from '../../icon'
import { Text } from '../../text'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	placeholder?: string
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	suffix?: string
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	placeholder,
	size = 'medium',
	width = { xs: 12, sm: 12 },
	suffix,
	min,
	max,
	step = 1,
	disabled,
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

	const increment = () => {
		const newValue = parseFloat((value + step).toFixed(10))
		if (max !== undefined && newValue > max) return
		onChange(newValue)
	}

	const decrement = () => {
		const newValue = parseFloat((value - step).toFixed(10))
		if (min !== undefined && newValue < min) return
		onChange(newValue)
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newValue = event.target.value === '' ? '' : Number(event.target.value)
		onChange(newValue)
	}

	return (
		<Grid size={width}>
			<FormControl fullWidth variant={`outlined`} error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<TextField
					data-test-id={testId ?? `id-wallet-field-number`}
					margin={'dense'}
					error={hasError}
					fullWidth
					value={value}
					type={`number`}
					size={size}
					name={name}
					disabled={disabled}
					data-describedby={name}
					placeholder={placeholder ?? `Enter ${label ?? name}`}
					autoComplete={random()}
					helperText={hasError ? error?.message : hint}
					onChange={handleChange}
					slotProps={{
						inputLabel: {
							shrink: false,
						},
						input: {
							...(size ? { size } : {}),
							...(min !== undefined ? { min } : {}),
							...(max !== undefined ? { max } : {}),
							...(step !== undefined ? { step } : {}),
							disabled,
							sx: {
								'& .MuiInputBase-input': {
									color: hasError ? `error.main` : `text.main`,
									fontSize: size === `small` ? `11px` : `18px`,
									textAlign: `right`,
									paddingRight: `2px`,
								},
							},
							startAdornment: (
								<InputAdornment position={`start`}>
									<IconButton
										onClick={decrement}
										disabled={min !== undefined && value <= min}
										sx={{ padding: 0 }}>
										<Icon
											name={`SyMinus`}
											color={hasError ? `danger` : `text`}
											size={size === 'small' ? 14 : 16}
										/>
									</IconButton>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position={`end`}>
									<Text fontSize={size === `small` ? `10px` : `17px`} color={`disabled.main`}>
										{suffix}
									</Text>
									<IconButton
										onClick={increment}
										disabled={max !== undefined && value >= max}
										sx={{ padding: 0, ml: suffix ? 1 : 0 }}>
										<Icon
											name={`SyAdd`}
											color={hasError ? `danger` : `text`}
											size={size === 'small' ? 14 : 16}
										/>
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldNumber'
