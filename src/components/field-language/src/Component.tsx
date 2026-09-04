import { lowerCase, startCase } from '../../../lib'
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
import React, { useState } from 'react'
import { type Control, useController, useFormState } from 'react-hook-form'
import languages from '../../../constants/languages.json'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Flag } from '../../flag'
import { Icon } from '../../icon'
import { Text } from '../../text'

interface LanguageOption {
	value: string
	label: string
	flag: string
}

const options: LanguageOption[] = languages.map((lang: TGeneric) => ({
	value: lang.code,
	label: lang.label?.[lang.code],
	flag: lang.flag,
}))

export interface IComponentProps extends BaseTextFieldProps {
	name: string
	label?: string
	hint?: string
	disabled?: boolean
	placeholder?: string
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

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const imperativeValue = value || 'en'

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
		if (!disabled) {
			setAnchorEl(event.currentTarget.closest('.sy-language-input') as HTMLElement)
		}
	}

	const handleClose = (): void => {
		setAnchorEl(null)
		setSearchTerm('')
	}

	const handleLanguageSelect = (selectedLanguageCode: string): void => {
		onChange(selectedLanguageCode)
		setAnchorEl(null)
		setSearchTerm('')
	}

	const filteredOptions = options.filter((option: LanguageOption) =>
		option.label?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const selectedOption = options.find((option) => lowerCase(option.value) === lowerCase(imperativeValue))
	const displayValue = selectedOption?.label || 'Select Language'
	const imperativeFlag = selectedOption?.flag

	const helperText = hasError
		? typeof error === 'object' && error !== null
			? String(Object.values(error)[0])
			: error
		: hint

	const open = Boolean(anchorEl)
	const id = open ? 'language-field-popover' : undefined

	return (
		<Grid size={width}>
			<FormControl
				fullWidth
				variant={`outlined`}
				error={hasError}
				size={size}
				disabled={disabled}
				className={`sy-language-input`}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<TextField
					data-test-id={testId ?? `id-wallet-field-language`}
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
							className: `sy-language-input`,
							startAdornment: imperativeFlag ? (
								<InputAdornment position={`start`}>
									<Flag
										code={imperativeFlag === `uk` ? `gb` : imperativeFlag?.toLowerCase()}
										size={size === 'small' ? 18 : 21}
									/>
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
					<Box display="flex" flexDirection="column" height="100%">
						<Box padding={`8px`} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
							<TextField
								fullWidth={true}
								margin={`none`}
								placeholder={`Search languages...`}
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
							{filteredOptions.map((option: LanguageOption) => (
								<Box
									key={option.value}
									display={`flex`}
									alignItems={`center`}
									justifyContent={`space-between`}
									padding={`8px`}
									onClick={() => handleLanguageSelect(option.value)}
									sx={{
										cursor: `pointer`,
										'&:hover': {
											backgroundColor: `action.hover`,
										},
									}}>
									<Box display={`flex`} alignItems={`center`}>
										<Flag
											code={option.flag === `uk` ? `gb` : option.flag?.toLowerCase()}
											size={21}
										/>
										<Text marginLeft={`8px`} color={hasError ? `error.main` : `text.primary`}>
											{option.label}
										</Text>
									</Box>
									<Text
										color={hasError ? `error.main` : `text.secondary`}
										fontSize={12}
										sx={{ textTransform: `uppercase` }}>
										{option.value}
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

Component.displayName = 'FieldLanguage'
