import { random, startCase } from '../../../lib'
import {
	Box,
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	type GridBaseProps,
	InputAdornment,
	type InputProps as InputPropsInterface,
	TextField as MuiTextField,
	Popover,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { type Control, Controller, useController, useFormState } from 'react-hook-form'
import type { Options, TGeneric, ValidationRules } from '../../../types/generics'
import { Icon } from '../../icon'
import { Text } from '../../text'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	placeholder?: string
	onChange?: (_value: TGeneric) => void
	InputProps?: InputPropsInterface
	options: Options
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	options,
	placeholder,
	onChange: _onChange,
	size,
	width = { xs: 12, sm: 12 },
	control,
	rules,
	testId,
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget.closest('.sy-field-select-search') as HTMLElement)
	}

	const handleClose = (): void => {
		setAnchorEl(null)
		setSearchTerm('')
	}

	const handleOptionSelect = (selectedValue: TGeneric): void => {
		onChange(selectedValue)
		if (_onChange) {
			_onChange(selectedValue)
		}
		setAnchorEl(null)
		setSearchTerm('')
	}

	const filteredOptions = useMemo(() => {
		if (!searchTerm) return options
		return options.filter((option) => option.label?.toLowerCase().includes(searchTerm.toLowerCase()))
	}, [options, searchTerm])

	const selectedOption = options.find((option) => option.value === value)
	const displayValue = selectedOption?.label || ''

	const open = Boolean(anchorEl)
	const popoverId = open ? `field-select-popover-${name}` : undefined

	return (
		<Grid size={width}>
			<FormControl fullWidth={true} variant={`outlined`} error={hasError}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				{options?.length > 0 ? (
					<React.Fragment>
						<Controller
							name={name}
							control={control}
							defaultValue={''}
							render={({ field }) => (
								<MuiTextField
									{...field}
									data-test-id={testId ?? `id-wallet-field-select`}
									aria-describedby={popoverId}
									label={null}
									value={displayValue}
									placeholder={placeholder || `Select option`}
									size={size}
									fullWidth={true}
									onClick={handleClick}
									className={`sy-field-select-search`}
									error={hasError}
									slotProps={{
										inputLabel: {
											shrink: false,
										},
										input: {
											readOnly: true,
											fullWidth: true,
											autoComplete: random(),
											margin: `none`,
											className: `sy-field-select-search`,
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
														sx={{
															backgroundColor: `transparent`,
															border: `none`,
															cursor: `pointer`,
														}}
														onClick={handleClick}>
														<Icon
															name={`SyChevronDownSystem`}
															size={size === 'small' ? 12 : 16}
															color={`text`}
														/>
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
							)}
						/>
						<Popover
							id={popoverId}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							slotProps={{
								paper: {
									sx: {
										maxHeight: `300px`,
										width: anchorEl ? anchorEl.offsetWidth : undefined,
										overflow: 'hidden',
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
							<Box display={`flex`} flexDirection={`column`} height={`100%`}>
								<Box
									padding={`8px`}
									sx={{
										borderBottom: '1px solid',
										borderColor: 'divider',
									}}>
									<MuiTextField
										fullWidth={true}
										margin={`none`}
										placeholder={`Search options...`}
										value={searchTerm}
										onChange={(e): void => setSearchTerm(e.target.value)}
										size={`small`}
										autoFocus={true}
									/>
								</Box>
								<Box
									data-test-id={`${testId ?? `id-wallet-field-select`}-options`}
									role={`listbox`}
									sx={{
										overflowY: 'auto',
										maxHeight: '240px',
										flexGrow: 1,
									}}>
									{filteredOptions.length > 0 ? (
										filteredOptions.map((option, i) => (
											<Box
												key={i}
												// Options render as plain Boxes in a Popover, not MUI MenuItems, so they
												// carried no role and no test id: `getByRole('option')` matched nothing
												// and no `data-test-id` existed either, leaving the control undrivable.
												// Selection is data-test-id-only (e2e/TESTID_CONVENTION.md), and the id is
												// namespaced by the field so two selects on one screen stay distinct —
												// mirroring mobile's `modal-option-<value>`.
												data-test-id={`${testId ?? `id-wallet-field-select`}-option-${option.value}`}
												role={`option`}
												aria-selected={option.value === value}
												display={`flex`}
												alignItems={`center`}
												justifyContent={`space-between`}
												padding={`8px`}
												onClick={() => handleOptionSelect(option.value)}
												sx={{
													cursor: `pointer`,
													backgroundColor:
														option.value === value ? `action.selected` : `transparent`,
													'&:hover': {
														backgroundColor: `action.hover`,
													},
												}}>
												<Text color={`text.primary`}>{option.label}</Text>
											</Box>
										))
									) : (
										<Box padding={`16px`} display={`flex`} justifyContent={`center`}>
											<Text variant={`body2`}>No options found</Text>
										</Box>
									)}
								</Box>
							</Box>
						</Popover>
						{(error?.message || hint) && (
							<FormHelperText>{hasError ? error?.message : hint}</FormHelperText>
						)}
					</React.Fragment>
				) : (
					<Controller
						name={name}
						control={control}
						defaultValue={''}
						render={({ field }) => (
							<MuiTextField
								{...field}
								margin={`none`}
								error={hasError}
								fullWidth
								name={name}
								value={value}
								type={'text'}
								placeholder={placeholder}
								size={size}
								autoComplete={random()}
								helperText={hasError ? error?.message : hint}
								slotProps={{
									inputLabel: {
										shrink: false,
									},
								}}
							/>
						)}
					/>
				)}
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldSelect'
