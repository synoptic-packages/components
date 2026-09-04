import { startCase } from '../../../lib'
import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	Checkbox as MuiCheckbox,
	type GridBaseProps,
} from '@mui/material'
import React from 'react'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Box } from '../../box'
import { Text } from '../../text'

export interface IComponentProps {
	name: string
	title?: string
	label?: string
	hint?: string
	disabled?: boolean
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	onChange?: (_value: boolean) => void
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}
//
export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	title,
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

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const newValue = event.target.checked
		if (typeof _onChange === 'function') {
			_onChange(newValue)
		} else {
			onChange(newValue)
		}
	}

	return (
		<Grid size={width}>
			<FormControl component={`fieldset`} size={size} fullWidth error={hasError} disabled={disabled}>
				{title && <FormLabel component={`legend`}>{title}</FormLabel>}
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<FormControlLabel
							sx={{
								alignItems: `flex-start`,
								mt: 0.5,
							}}
							control={
								<MuiCheckbox
									{...field}
									data-test-id={testId ?? `id-wallet-field-checkbox`}
									checked={Boolean(value)}
									onChange={handleChange}
									disableRipple={true}
									disableFocusRipple={true}
									disableTouchRipple={true}
									size={size}
									aria-describedby={name}
									sx={{ pt: 0 }}
								/>
							}
							label={
								<Box mr={1} display={`flex`} flexDirection={`column`}>
									<Text>{label ?? startCase(name)}</Text>
									<FormHelperText>{hasError ? error?.message : hint}</FormHelperText>
								</Box>
							}
						/>
					)}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldCheckbox'
