import { FormControl, FormControlLabel, FormHelperText, Grid, Switch, type GridBaseProps } from '@mui/material'
import { Controller, useController, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	size = 'medium',
	control,
	rules,
	width = { xs: 12, sm: 12 },
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	return (
		<Grid size={width}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<FormControl error={isTouched && Boolean(error)} size={size}>
						<FormControlLabel
							control={
								<Switch
									{...field}
									data-test-id={testId ?? `id-wallet-field-switch`}
									data-describedby={name}
									checked={Boolean(value)}
									size={size}
									onChange={(event) => onChange(event.target.checked)}
								/>
							}
							label={label}
						/>
						<FormHelperText>{isTouched && error ? error.message : hint}</FormHelperText>
					</FormControl>
				)}
			/>
		</Grid>
	)
}

Component.displayName = 'FieldSwitch'
