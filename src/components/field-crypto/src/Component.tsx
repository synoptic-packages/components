import { startCase } from '../../../lib'
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
import { useController, useFormState, type Control } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useSelector } from '../../../lib/redux'
import { sizing } from '../../../constants'
import type { RootState } from '../../../lib/store'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Icon } from '../../icon'
import type { IconName } from '../../icon/src/Component'
import { Text } from '../../text'

interface ICryptoValue {
	amount: number | string
	cryptoCode: string
}

interface ICryptoOption {
	value: string
	label: string
	slug: string
	color: string
	icon: IconName
	colorDark: string
}

export interface IComponentProps extends BaseTextFieldProps {
	name: string
	label?: string
	hint?: string
	crypto?: string
	disabled?: boolean
	onChange?: (_: ICryptoValue) => void
	size?: 'small' | 'medium'
	width?: GridBaseProps['size']
	fixedSelection?: boolean
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
	crypto,
	size = 'medium',
	width = { xs: 12, sm: 12 },
	fixedSelection = false,
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

	const { cryptos } = useSelector((state: RootState) => state.crypto)
	const defaultCrypto = crypto ?? `KGR`
	const options = cryptos.map((crypto: TGeneric) => ({
		value: crypto.symbol,
		label: crypto.name,
		slug: crypto.slug,
		color: crypto.color,
		colorDark: crypto.colorDark,
		icon: crypto.icon,
	}))

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	let imperativeValue = { amount: 0, cryptoCode: defaultCrypto }

	if (!value) {
		imperativeValue = { amount: 0, cryptoCode: defaultCrypto }
	} else if (typeof value === 'number' && !isNaN(value)) {
		imperativeValue = { amount: value, cryptoCode: defaultCrypto }
	} else if (typeof value === `string`) {
		imperativeValue = { amount: parseFloat(value), cryptoCode: defaultCrypto }
	} else if (value?.amount !== undefined) {
		imperativeValue = {
			amount: value.amount,
			cryptoCode: value.cryptoCode || defaultCrypto,
		}
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		if (!fixedSelection && !disabled) {
			setAnchorEl(event.currentTarget.closest('.sy-crypto-input') as HTMLElement)
		}
	}

	const handleClose = (): void => {
		setAnchorEl(null)
		setSearchTerm('')
	}

	const handleCryptoSelect = (selectedCryptoCode: string): void => {
		const currentAmount = imperativeValue?.amount || 0
		onChange({
			amount: currentAmount,
			cryptoCode: selectedCryptoCode,
		})
		setAnchorEl(null)
		setSearchTerm('')
	}

	const filteredOptions = options.filter((option: ICryptoOption) =>
		option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const helperText = hasError
		? typeof error === 'object' && error !== null
			? String(Object.values(error)[0])
			: error
		: hint

	const open = Boolean(anchorEl)
	const id = open ? 'crypto-field-popover' : undefined

	const selectedCrypto = cryptos?.find((crypto: TGeneric) => crypto?.symbol === imperativeValue?.cryptoCode)

	return (
		<Grid size={width}>
			<FormControl
				fullWidth
				variant={`outlined`}
				error={hasError}
				size={size}
				disabled={disabled}
				className={`sy-crypto-input`}>
				<FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>
				<NumericFormat
					data-test-id={testId ?? `id-wallet-field-crypto`}
					aria-describedby={id}
					customInput={MuiTextField}
					allowLeadingZeros={true}
					allowNegative={false}
					thousandSeparator={`,`}
					fixedDecimalScale={true}
					decimalScale={6}
					error={hasError}
					data-describedby={name}
					defaultValue={imperativeValue?.amount}
					disabled={disabled}
					margin={`dense`}
					size={size}
					onValueChange={(values): void => {
						if (values.floatValue !== undefined) {
							const currentCryptoCode = value?.cryptoCode || imperativeValue?.cryptoCode
							onChange({
								amount: values.floatValue,
								cryptoCode: currentCryptoCode,
							})

							if (typeof onAfterChange === 'function') {
								onAfterChange({
									amount: values.floatValue,
									cryptoCode: currentCryptoCode,
								})
							}
						}
					}}
					onFocus={(e: React.FocusEvent<HTMLInputElement>): void => e.target.select()}
					placeholder={`0.000000`}
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
							className: `sy-crypto-input py-0`,
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
										justifyContent={`flex-start`}
										onClick={handleClick}
										disabled={fixedSelection || disabled}>
										{selectedCrypto?.slug ? (
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													backgroundColor: selectedCrypto?.color as string,
													borderRadius: `50%`,
													width: size === 'small' ? 24 : 32,
													height: size === 'small' ? 24 : 32,
												}}>
												<Icon
													name={selectedCrypto?.icon as string}
													size={size === 'small' ? 18 : 24}
													color={selectedCrypto?.colorDark ? `#ffffff` : `#000000`}
												/>
											</Box>
										) : (
											<Box
												width={size === 'small' ? 20 : 24}
												height={size === 'small' ? 20 : 24}
												borderRadius={`50%`}
												bgcolor={`divider`}
											/>
										)}
										<Icon name={`ChevronDown`} color={hasError ? `error` : `action`} />
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
													borderBottom: '1px solid',
													borderColor: 'divider',
												}}>
												<MuiTextField
													fullWidth={true}
													margin={`none`}
													placeholder={`Search cryptocurrencies...`}
													value={searchTerm}
													onChange={(e): void => setSearchTerm(e.target.value)}
													size={`small`}
												/>
											</Box>
											<Box sx={{ overflowY: 'auto', maxHeight: '240px' }}>
												{filteredOptions.map((option: ICryptoOption) => {
													return (
														<Box
															key={option.value}
															display={`flex`}
															alignItems={`center`}
															justifyContent={`space-between`}
															padding={`8px`}
															onClick={() => handleCryptoSelect(option.value)}
															sx={{
																cursor: `pointer`,
																'&:hover': {
																	backgroundColor: `action.hover`,
																},
															}}>
															<Box display={`flex`} alignItems={`center`}>
																{option?.slug ? (
																	<Box
																		sx={{
																			display: 'flex',
																			alignItems: 'center',
																			justifyContent: 'center',
																			backgroundColor: option?.color,
																			borderRadius: `50%`,
																			width: size === 'small' ? 24 : 32,
																			height: size === 'small' ? 24 : 32,
																		}}>
																		<Icon
																			name={option?.icon}
																			size={size === 'small' ? 18 : 24}
																			color={
																				option?.colorDark
																					? `#ffffff`
																					: `#000000`
																			}
																		/>
																	</Box>
																) : (
																	<Box
																		width={24}
																		height={24}
																		borderRadius={`50%`}
																		bgcolor={`divider`}
																	/>
																)}
																<Text
																	marginLeft={`8px`}
																	color={hasError ? `error.main` : `text.primary`}>
																	{option.label}
																</Text>
															</Box>
															<Text
																color={hasError ? `error.main` : `text.secondary`}
																fontSize={14}
																sx={{ textTransform: `uppercase` }}>
																{option.value}
															</Text>
														</Box>
													)
												})}
											</Box>
										</Box>
									</Popover>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position={`end`}>
									<Text
										sx={{ textTransform: `uppercase` }}
										color={
											hasError ? `error` : `muted.main`
										}>{`${imperativeValue?.cryptoCode ?? ''}`}</Text>
								</InputAdornment>
							),
							sx: {
								'& .MuiInputBase-input': {
									textAlign: `right`,
									paddingTop: '0px',
									paddingBottom: '0px',
									height: size === `small` ? sizing.inputHeightSmall : sizing.inputHeight,
									fontSize: `18px`,
									color: hasError ? `error.main` : `text.primary`,
								},
								paddingRight: 2,
							},
							size,
						},
					}}
				/>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldCrypto'
