import { random, startCase } from '../../../lib'
import {
	FormControl,
	FormLabel,
	Grid,
	InputAdornment,
	TextField as MuiTextField,
	Popover,
	type BaseTextFieldProps,
	type GridBaseProps,
	type TextFieldProps,
} from '@mui/material'
import React, { useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Box } from '../../box'
import { IconButton } from '../../button-icon'
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
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)
	const isDisabledWithValue = disabled && Boolean(value)

	const [color, setColor] = React.useState(value || `#ffffff`)
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

	useEffect(() => {
		if (value && value !== color) {
			setColor(value)
		}
	}, [color, value])

	function handleChange(newColor: string): void {
		setColor(newColor)
		if (typeof _onChange === 'function') {
			_onChange(newColor)
		} else {
			onChange(newColor)
		}
	}

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const inputValue = event.target.value
		handleChange(inputValue)
	}

	function handleOpenPopover(event: React.MouseEvent<HTMLElement>): void {
		if (!disabled) {
			setAnchorEl(event.currentTarget)
		}
	}

	function handleClosePopover(): void {
		setAnchorEl(null)
	}

	const isPopoverOpen = Boolean(anchorEl)

	return (
		<Grid size={width}>
			<FormControl variant={`outlined`} fullWidth error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<>
							<MuiTextField
								{...field}
								data-test-id={testId ?? `id-wallet-field-color`}
								key={name}
								data-describedby={name}
								margin={'dense'}
								error={hasError}
								fullWidth
								name={name}
								disabled={disabled}
								value={color}
								type={`text`}
								size={size}
								data-aria-describedby={name}
								placeholder={placeholder ?? `Enter ${label ?? name}`}
								autoComplete={random()}
								helperText={hasError ? error?.message : hint}
								onChange={handleInputChange}
								slotProps={{
									input: {
										size,
										disabled,
										sx: {
											pr: 0,
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
										startAdornment: (
											<InputAdornment position={`start`}>
												<Box
													sx={{
														display: `flex`,
														alignItems: `center`,
														justifyContent: `center`,
														width: size === 'small' ? 21 : 32,
														height: size === 'small' ? 21 : 32,
														borderRadius: `50%`,
														borderWidth: 1,
														borderColor: `divider`,
														borderStyle: `solid`,
														bgcolor: color,
														mr: 1,
													}}
												/>
											</InputAdornment>
										),
										endAdornment: isDisabledWithValue ? (
											<InputAdornment position={`end`} sx={{ mr: 1 }}>
												<Icon name={`Check`} size={21} color={`success`} />
											</InputAdornment>
										) : (
											<InputAdornment position={`end`} sx={{ mr: 1 }}>
												<IconButton
													size={`small`}
													onClick={handleOpenPopover}
													disabled={disabled}>
													<Icon name={`ChevronDown`} size={21} />
												</IconButton>
											</InputAdornment>
										),
									},
									inputLabel: {
										shrink: false,
									},
									formHelperText: {},
									...slotProps,
								}}
							/>
							<Popover
								open={isPopoverOpen}
								anchorEl={anchorEl}
								onClose={handleClosePopover}
								anchorOrigin={{
									vertical: `bottom`,
									horizontal: `left`,
								}}
								transformOrigin={{
									vertical: `top`,
									horizontal: `left`,
								}}>
								<Box sx={{ p: 2 }}>
									<HexColorPicker color={color} onChange={handleChange} />
								</Box>
							</Popover>
						</>
					)}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldColor'
