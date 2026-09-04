import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	RadioGroup as MuiRadioGroup,
	Radio,
	type GridBaseProps,
} from '@mui/material'
import React from 'react'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { Options, TGeneric, ValidationRules } from '../../../types/generics'
import { Box } from '../../box'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	disabled?: boolean
	row?: boolean
	color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning' | 'accent'
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	onChange?: (_value: TGeneric) => void
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	options: Options
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	disabled,
	row,
	color = 'primary',
	size = 'medium',
	width = { xs: 12, sm: 12 },
	onChange: _onChange,
	control,
	rules,
	options,
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const newValue = event.target.value
		if (typeof _onChange === 'function') {
			_onChange(newValue)
		} else {
			onChange(newValue)
		}
	}

	const testIdBase = testId ?? `id-wallet-field-radio`

	return (
		<Grid size={width}>
			<FormControl
				component={`fieldset`}
				data-test-id={testIdBase}
				fullWidth={true}
				size={size}
				error={hasError}
				disabled={disabled}>
				{label && <FormLabel component={`legend`}>{label}</FormLabel>}
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<MuiRadioGroup
							{...field}
							color={`primary`}
							row={row}
							value={value ?? ''}
							onChange={handleChange}>
							{options.map((option, index) => (
								<FormControlLabel
									key={`${name}-${index}`}
									data-describedby={name}
									color={`primary`}
									value={option.value}
									sx={{
										alignItems: `flex-start`,
										mt: 1,
									}}
									control={
										<Radio
											// Options stamp `<base>-option-<value>` (the FieldSelect precedent):
											// one shared id per option row disambiguates nothing.
											data-test-id={`${testIdBase}-option-${option.value}`}
											disableRipple={true}
											disableFocusRipple={true}
											disableTouchRipple={true}
											size={size}
											color={color}
											sx={{ pt: 0, fill: color }}
										/>
									}
									label={
										!row && option.hint ? (
											<Box mr={1} display={`flex`} flexDirection={`column`}>
												<FormLabel sx={{ mb: 0 }}>
													<span dangerouslySetInnerHTML={{ __html: option.label }} />
												</FormLabel>
												<FormHelperText>{option.hint}</FormHelperText>
											</Box>
										) : (
											<span dangerouslySetInnerHTML={{ __html: option.label }} />
										)
									}
								/>
							))}
						</MuiRadioGroup>
					)}
				/>
				<FormHelperText>{hasError ? error?.message : hint}</FormHelperText>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldRadio'
