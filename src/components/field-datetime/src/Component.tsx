import { startCase } from '../../../lib'
import { FormControl, FormLabel, Grid, type GridBaseProps, type TextFieldProps } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { type Dayjs } from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { ErrorBoundary } from '../../error-boundary'
import { Icon } from '../../icon'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	disabled?: boolean
	minDateTime?: Dayjs
	maxDateTime?: Dayjs
	slotProps?: TextFieldProps['slotProps']
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	control: Control<any>
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	disabled = false,
	minDateTime,
	maxDateTime,
	slotProps,
	size = 'medium',
	width = { xs: 12, sm: 12 },
	control,
	rules,
	testId,
}) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })
	const [show, setShow] = useState(false)

	const imperativeValue = useCallback((value: TGeneric): Dayjs | null => {
		if (value && value?.iso) {
			return dayjs(value.iso)
		} else if (value instanceof Date) {
			return dayjs(value)
		} else if (dayjs.isDayjs(value)) {
			return value
		} else if (typeof value === 'string') {
			return dayjs(value)
		} else if (!value || value === null || value === undefined) {
			return null
		} else {
			return dayjs()
		}
	}, [])

	function handleChange(value: TGeneric): void {
		const moment = value ? dayjs(value) : null
		onChange(moment)
	}

	useEffect(() => {
		onChange(imperativeValue(value))
		setShow(true)
	}, [imperativeValue, onChange, value])

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	if (!show) {
		return null
	}

	return (
		<Grid size={width}>
			<FormControl variant={`outlined`} fullWidth size={size} error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<Controller
					name={name}
					control={control}
					render={({ field }) => {
						const { ref } = field
						return (
							<ErrorBoundary>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DateTimePicker
										name={name}
										ref={ref}
										data-describedby={name}
										value={imperativeValue(value)}
										format={`DD MMMM, YYYY HH:mm`}
										minDateTime={minDateTime}
										maxDateTime={maxDateTime}
										disabled={disabled}
										onChange={handleChange}
										slots={{
											openPickerIcon: () => (
												<Icon
													name={`CalendarClock`}
													size={size === 'small' ? 20 : 24}
													color={`text`}
												/>
											),
										}}
										slotProps={{
											...slotProps,
											textField: {
												...(size ? { size } : {}),
												fullWidth: true,
												helperText: hasError ? error?.message : hint,
												margin: `none`,
												// On the TextField slot, not the DateTimePicker: MUI X drops unknown
												// picker props, so an id there never reached the DOM and the
												// field could not be selected at all — the same fix as FieldDate.
												...({ 'data-test-id': testId ?? `id-wallet-field-datetime` } as Record<
													string,
													string
												>),
											},
										}}
									/>
								</LocalizationProvider>
							</ErrorBoundary>
						)
					}}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldDateTime'
