import { random, startCase } from '../../../lib'
import {
	Box,
	Checkbox,
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
import { Chip } from '../../chip'
import { Icon } from '../../icon'
import { Text } from '../../text'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	placeholder?: string
	onChange?: (_value: TGeneric[]) => void
	InputProps?: InputPropsInterface
	options: Options
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	renderOption?: (_option: { label: string; value: TGeneric }, _index: number) => React.ReactNode
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
	renderOption,
	testId,
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const {
		field: { value = [], onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget.closest('.sy-field-array-search') as HTMLElement)
	}

	const handleClose = (): void => {
		setAnchorEl(null)
		setSearchTerm('')
	}

	const handleOptionToggle = (selectedValue: TGeneric): void => {
		const currentValues = Array.isArray(value) ? value : []
		const newValues = currentValues.includes(selectedValue)
			? currentValues.filter((v: TGeneric) => v !== selectedValue)
			: [...currentValues, selectedValue]

		onChange(newValues)
		if (_onChange) {
			_onChange(newValues)
		}
	}

	const handleChipDelete = (chipValue: TGeneric): void => {
		const currentValues = Array.isArray(value) ? value : []
		const newValues = currentValues.filter((v: TGeneric) => v !== chipValue)
		onChange(newValues)
		if (_onChange) {
			_onChange(newValues)
		}
	}

	const filteredOptions = useMemo(() => {
		if (!searchTerm) return options
		return options.filter((option) => option.label?.toLowerCase().includes(searchTerm.toLowerCase()))
	}, [options, searchTerm])

	const selectedOptions = useMemo(() => {
		const currentValues = Array.isArray(value) ? value : []
		return options.filter((option) => currentValues.includes(option.value))
	}, [options, value])

	const open = Boolean(anchorEl)
	const popoverId = open ? `field-array-popover-${name}` : undefined

	const displayContent = ''
	const displayPlaceholder = selectedOptions.length > 0 ? '' : placeholder || `Select options`

	return (
		<Grid size={width}>
			<FormControl fullWidth={true} variant={`outlined`} error={hasError}>
				<Box display={`flex`} alignItems={`center`} gap={0.5}>
					<FormLabel
						htmlFor={
							name
						}>{`${label ?? startCase(name)} ${selectedOptions.length > 3 ? `(${selectedOptions.length})` : ''}`}</FormLabel>
				</Box>
				{options?.length > 0 ? (
					<React.Fragment>
						<Controller
							name={name}
							control={control}
							defaultValue={[]}
							render={({ field }) => (
								<Box position={`relative`}>
									<MuiTextField
										{...field}
										data-test-id={testId ?? `id-wallet-field-array`}
										aria-describedby={popoverId}
										label={null}
										value={displayContent}
										placeholder={displayPlaceholder}
										size={size}
										fullWidth={true}
										onClick={handleClick}
										className={`sy-field-array-search`}
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
												className: `sy-field-array-search`,
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
															<Icon name={`ChevronDown`} size={14} color={`text`} />
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
									{selectedOptions.length > 0 && (
										<Box
											display={`flex`}
											flexWrap={`wrap`}
											gap={1}
											padding={`8px`}
											sx={{
												position: 'absolute',
												top: 8,
												left: 0,
												right: 0,
												bottom: 0,
												pointerEvents: 'none',
												paddingRight: '48px',
												overflowY: 'auto',
												'& > *': {
													pointerEvents: 'auto',
												},
											}}>
											{selectedOptions.map((option, i) => (
												<Chip
													key={i}
													label={<span className={`mr-1`}>{option.label}</span>}
													size={size}
													color={`primary`}
													onDelete={() => handleChipDelete(option.value)}
													sx={{
														maxWidth: '100%',
														height: size === 'small' ? '20px' : '24px',
														'& .MuiChip-label': {
															padding: '0 6px',
														},
														'& .MuiChip-deleteIcon': {
															fontSize: size === 'small' ? '16px' : '18px',
														},
													}}
												/>
											))}
										</Box>
									)}
								</Box>
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
										maxHeight: `400px`,
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
									sx={{
										overflowY: 'auto',
										maxHeight: '340px',
										flexGrow: 1,
									}}>
									{filteredOptions.length > 0 ? (
										filteredOptions.map((option, i) => {
											const isChecked = Array.isArray(value) && value.includes(option.value)
											return (
												<Box
													key={i}
													display={`flex`}
													alignItems={`center`}
													justifyContent={`space-between`}
													padding={`8px`}
													onClick={() => handleOptionToggle(option.value)}
													sx={{
														cursor: `pointer`,
														backgroundColor: isChecked ? `action.selected` : `transparent`,
														'&:hover': {
															backgroundColor: `action.hover`,
														},
													}}>
													<Box display={`flex`} alignItems={`center`} gap={1} flex={1}>
														<Checkbox
															checked={isChecked}
															size={size}
															sx={{
																padding: 0,
															}}
														/>
														{renderOption ? (
															renderOption(option, i)
														) : (
															<Text color={`text.primary`}>{option.label}</Text>
														)}
													</Box>
												</Box>
											)
										})
									) : (
										<Box padding={`16px`} display={`flex`} justifyContent={`center`}>
											<Text color={`text.secondary`} variant={`body2`}>
												No options found
											</Text>
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
						defaultValue={[]}
						render={({ field }) => (
							<MuiTextField
								{...field}
								margin={`none`}
								error={hasError}
								fullWidth
								name={name}
								value={''}
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
								disabled={true}
							/>
						)}
					/>
				)}
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldArray'
