import { type CountryOption, startCase, useCountry } from '../../../lib'

import {
	type BaseTextFieldProps,
	Box,
	FormControl,
	FormLabel,
	Grid,
	type GridBaseProps,
	InputAdornment,
	Popover,
	TextField,
} from '@mui/material'
import { type CountryCode } from 'libphonenumber-js'
import React, { useState } from 'react'
import { type Control, useController, useFormState } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Flag } from '../../flag'
import { Icon } from '../../icon'
import { Text } from '../../text'

export interface IComponentProps extends BaseTextFieldProps {
	name: string
	label?: string
	hint?: string
	disabled?: boolean
	placeholder?: string
	geo?: CountryCode | string
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
	placeholder,
	size = 'medium',
	width = { xs: 12, sm: 12 },
	disabled,
	geo,
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

	const { options } = useCountry()
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const imperativeValue = value || geo

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget.closest('.sy-country-input') as HTMLElement)
	}

	const handleClose = (): void => {
		setAnchorEl(null)
		setSearchTerm('')
	}

	const handleCountrySelect = (selectedCountryCode: string): void => {
		onChange(selectedCountryCode)
		setAnchorEl(null)
		setSearchTerm('')
	}

	const filteredOptions = options.filter((option: CountryOption) =>
		option.label?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const selectedOption = options.find((option) => option.value === imperativeValue)
	const displayValue = selectedOption?.label || 'Select Country'

	const helperText = hasError
		? typeof error === 'object' && error !== null
			? String(Object.values(error)[0])
			: error
		: hint

	const open = Boolean(anchorEl)
	const id = open ? 'country-field-popover' : undefined

	return (
		<Grid size={width}>
			<FormControl
				fullWidth
				variant={`outlined`}
				error={hasError}
				size={size}
				disabled={disabled}
				className={`sy-country-input`}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<TextField
					data-test-id={testId ?? `id-wallet-field-country`}
					aria-describedby={id}
					label={null}
					value={displayValue}
					disabled={disabled}
					placeholder={placeholder}
					error={hasError}
					helperText={helperText}
					size={size}
					data-describedby={name}
					name={name}
					fullWidth
					onClick={handleClick}
					slotProps={{
						inputLabel: {
							shrink: false,
						},
						input: {
							readOnly: true,
							name,
							fullWidth: true,
							autoComplete: `off`,
							margin: `none`,
							error: hasError,
							className: `sy-country-input`,
							startAdornment: imperativeValue ? (
								<InputAdornment position={`start`}>
									<Flag code={imperativeValue?.toLowerCase()} size={21} />
								</InputAdornment>
							) : null,
							endAdornment: (
								<InputAdornment position={`end`}>
									<Box
										component={`button`}
										type={`button`}
										display={`flex`}
										alignItems={`center`}
										flexDirection={`row`}
										margin={0}
										padding={0}
										sx={{ backgroundColor: `transparent`, border: `none`, cursor: `pointer` }}
										onClick={handleClick}>
										<Icon name={`ChevronDown`} color={hasError ? `error` : `action`} />
									</Box>
								</InputAdornment>
							),
							sx: {
								cursor: 'pointer',
								'& .MuiInputBase-input': {
									cursor: 'pointer',
								},
							},
						},
					}}
				/>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					slotProps={{
						paper: {
							sx: {
								maxHeight: `300px`,
								width: anchorEl ? anchorEl.offsetWidth : undefined,
								overflow: 'hidden', // Prevent the paper itself from scrolling
							},
						},
					}}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}>
					<Box display="flex" flexDirection="column" height="100%">
						<Box padding={`8px`} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
							<TextField
								fullWidth={true}
								margin={`none`}
								placeholder={`Search countries...`}
								value={searchTerm}
								onChange={(e): void => setSearchTerm(e.target.value)}
								size={`small`}
							/>
						</Box>
						<Box
							sx={{
								overflowY: 'auto',
								maxHeight: '240px',
								flexGrow: 1,
							}}>
							{filteredOptions.map((option: CountryOption) => (
								<Box
									key={option.value}
									display={`flex`}
									alignItems={`center`}
									justifyContent={`space-between`}
									padding={`8px`}
									onClick={() => handleCountrySelect(option.value)}
									sx={{
										cursor: `pointer`,
										'&:hover': {
											backgroundColor: `action.hover`,
										},
									}}>
									<Box display={`flex`} alignItems={`center`}>
										<Flag code={option.value?.toLowerCase()} size={21} />
										<Text marginLeft={`8px`} color={hasError ? `error.main` : `text.primary`}>
											{option.label}
										</Text>
									</Box>
									<Text color={hasError ? `error.main` : `text.secondary`} fontSize={14}>
										{option.countryCode}
									</Text>
								</Box>
							))}
						</Box>
					</Box>
				</Popover>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldCountry'
