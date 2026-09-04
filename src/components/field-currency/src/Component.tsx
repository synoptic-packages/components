import {
	Box,
	FormControl,
	FormLabel,
	Grid,
	InputAdornment,
	TextField as MuiTextField,
	Popover,
	type BaseTextFieldProps,
	type GridBaseProps,
} from '@mui/material'
import { useState } from 'react'
import { Text } from '../../text'

import { currencyMinorUnits, currencySymbol, startCase, useCurrency } from '../../../lib'
import { useController, useFormState, type Control } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { sizing } from '../../../constants'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Flag } from '../../flag'
import { Icon } from '../../icon'

interface ICurrencyValue {
	amount: number | string

	currencyCode: string
}

interface ICurrencyOption {
	value: string
	label?: string
	countryCode?: string
}

export interface IComponentProps extends BaseTextFieldProps {
	name: string
	label?: string
	hint?: string
	currency?: string
	disabled?: boolean
	onChange?: (_: ICurrencyValue) => void
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	fixedSelection?: boolean
	showFlag?: boolean
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	disabled,
	onChange: onAfterChange,
	currency,
	size = 'medium',
	width = { xs: 12, sm: 12 },
	fixedSelection = false,
	showFlag = true,
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
	const defaultCurrency = currency
	const { options } = useCurrency()
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	let imperativeValue = { amount: 0, currencyCode: defaultCurrency }

	if (!value) {
		imperativeValue = { amount: 0, currencyCode: defaultCurrency }
	} else if (typeof value === 'number' && !isNaN(value)) {
		imperativeValue = { amount: value, currencyCode: defaultCurrency }
	} else if (typeof value === `string`) {
		imperativeValue = { amount: parseFloat(value), currencyCode: defaultCurrency }
	} else if (value?.amount !== undefined) {
		imperativeValue = {
			amount: value.amount,
			currencyCode: value.currencyCode || defaultCurrency,
		}
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		if (!fixedSelection) {
			setAnchorEl(event.currentTarget.closest('.sy-currency-input') as HTMLElement)
		}
	}

	const handleClose = (): void => {
		setAnchorEl(null)
		setSearchTerm('')
	}

	const handleCurrencySelect = (selectedCurrencyCode: string): void => {
		const currentAmount = imperativeValue?.amount || 0
		onChange({
			amount: currentAmount,
			currencyCode: selectedCurrencyCode,
		})
		setAnchorEl(null)
		setSearchTerm('')
	}

	const filteredOptions = options.filter((option: ICurrencyOption) =>
		option.label?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const helperText = hasError
		? typeof error === 'object' && error !== null
			? String(Object.values(error)[0])
			: error
		: hint

	const open = Boolean(anchorEl)
	const id = open ? 'currency-field-popover' : undefined
	const countryCode = options
		.find((option) => option?.value === imperativeValue?.currencyCode)
		?.countryCode?.toLowerCase()

	// The number of decimals follows the SELECTED currency, not a hardcoded 2. A fixed scale offered a
	// cents box for UGX and RWF — currencies that have no cents — so an operator could type an amount
	// this field would happily accept and `be/` would then refuse as over-precise, with the refusal
	// landing on submit rather than on the keystroke that caused it.
	const decimalScale = currencyMinorUnits(imperativeValue?.currencyCode)

	return (
		<Grid size={width}>
			<FormControl
				fullWidth
				variant={`outlined`}
				error={hasError}
				size={size}
				disabled={disabled}
				className={`sy-currency-input`}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<NumericFormat
					data-test-id={testId ?? `id-wallet-field-currency`}
					aria-describedby={id}
					customInput={MuiTextField}
					allowLeadingZeros={true}
					allowNegative={false}
					thousandSeparator={`,`}
					fixedDecimalScale={true}
					decimalScale={decimalScale}
					error={hasError}
					data-describedby={name}
					defaultValue={imperativeValue?.amount}
					disabled={disabled}
					margin={`dense`}
					size={size}
					onValueChange={(values): void => {
						if (values.floatValue) {
							const currentCurrencyCode = value?.currencyCode || imperativeValue?.currencyCode
							onChange({
								amount: values.floatValue,
								currencyCode: currentCurrencyCode,
							})

							if (typeof onAfterChange === 'function') {
								onAfterChange({
									amount: values.floatValue,
									currencyCode: currentCurrencyCode,
								})
							}
						}
					}}
					onFocus={(e: React.FocusEvent<HTMLInputElement>): void => e.target.select()}
					placeholder={`0.00`}
					name={`amount`}
					fullWidth
					helperText={helperText}
					slotProps={{
						inputLabel: {
							shrink: false,
						},
						input: {
							name,
							fullWidth: true,
							autoComplete: `off`,
							margin: `none`,
							error: hasError,
							className: `sy-currency-input py-0`,
							startAdornment: (
								<InputAdornment position={`start`}>
									<Box
										component={`button`}
										type={`button`}
										display={`flex`}
										alignItems={`center`}
										flexDirection={`row`}
										margin={0}
										padding={0}
										sx={{ backgroundColor: `transparent`, border: `none`, cursor: `pointer` }}
										justifyContent={`flex-start`}>
										<Text color={hasError ? `error.main` : `text.main`} fontSize={18}>
											{imperativeValue?.currencyCode
												? currencySymbol(imperativeValue?.currencyCode)
												: ``}
										</Text>
									</Box>
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
													display: 'flex',
													flexDirection: 'column',
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
										<Box>
											<Box
												padding={`8px`}
												sx={{
													position: 'sticky',
													top: 0,
													backgroundColor: 'background.paper',
													zIndex: 1,
												}}>
												<MuiTextField
													fullWidth={true}
													margin={`none`}
													placeholder={`Search...`}
													value={searchTerm}
													onChange={(e): void => setSearchTerm(e.target.value)}
													size={`small`}
												/>
											</Box>
											<Box sx={{ overflowY: 'auto', maxHeight: '240px' }}>
												{filteredOptions.map((option: ICurrencyOption) => (
													<Box
														key={option.value}
														display={`flex`}
														alignItems={`center`}
														padding={`8px`}
														onClick={() => handleCurrencySelect(option.value)}
														sx={{
															cursor: `pointer`,
															'&:hover': {
																backgroundColor: `bg.main`,
															},
														}}>
														<Flag
															code={option?.countryCode?.toLowerCase() ?? ``}
															size={24}
														/>
														<Text
															marginLeft={`8px`}
															color={hasError ? `error.main` : `text.main`}>
															{option?.label ?? ``}
														</Text>
													</Box>
												))}
											</Box>
										</Box>
									</Popover>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position={`end`}>
									<Box
										component={`button`}
										type={`button`}
										display={`flex`}
										alignItems={`center`}
										flexDirection={`row`}
										onClick={handleClick}
										justifyContent={`flex-end`}>
										{countryCode && showFlag && (
											<Flag code={countryCode} size={size === 'small' ? 18 : 24} />
										)}
										<Text
											sx={{ ml: 1 }}
											color={
												hasError ? `error.main` : `text.main`
											}>{`${imperativeValue?.currencyCode ?? ''}`}</Text>
										<Icon name={`ChevronDown`} color={hasError ? `error` : `text`} />
									</Box>
								</InputAdornment>
							),
							sx: {
								'& .MuiInputBase-input': {
									textAlign: `right`,
									paddingTop: '0px',
									paddingBottom: '0px',
									height: size === `small` ? sizing.inputHeightSmall : sizing.inputHeight,
									fontSize: `18px`,
									color: hasError ? `error.main` : `text.main`,
								},
								paddingRight: 0,
							},
							size,
						},
					}}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldCurrency'
