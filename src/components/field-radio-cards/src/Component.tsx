import { alpha, Box, ButtonBase, FormHelperText, Grid, useTheme, type GridBaseProps } from '@mui/material'
import * as React from 'react'
import { useController, useFormState, type Control } from 'react-hook-form'

import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Icon } from '../../icon'
import { Text } from '../../text'

export type RadioCardOption = {
	value: string
	iconName: string
	title: string
	description?: string
}

export interface IComponentProps {
	name: string
	control: Control<TGeneric> | TGeneric
	options: RadioCardOption[]
	rules?: ValidationRules
	width?: GridBaseProps['size']
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({ name, control, options, rules, width = { xs: 12 }, testId }) => {
	const theme = useTheme()
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })
	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	const primary = theme.palette.primary.main
	const muted = theme.palette.text.secondary

	return (
		<Grid size={width}>
			<Box
				data-test-id={testId ?? `id-wallet-field-radio-cards`}
				sx={{ display: `flex`, flexDirection: `column`, gap: 1.25, width: `100%` }}>
				{options.map((option) => {
					const isSelected = value === option.value
					return (
						<ButtonBase
							key={option.value}
							onClick={() => onChange(option.value)}
							sx={{
								display: `flex`,
								alignItems: `center`,
								justifyContent: `flex-start`,
								gap: 1.5,
								width: `100%`,
								textAlign: `left`,
								p: 1.75,
								borderRadius: 2,
								border: `1.2px solid ${isSelected ? primary : theme.palette.divider}`,
								bgcolor: isSelected ? alpha(primary, 0.12) : theme.palette.background.paper,
							}}>
							<Box
								sx={{
									width: 48,
									height: 48,
									flexShrink: 0,
									borderRadius: `50%`,
									display: `flex`,
									alignItems: `center`,
									justifyContent: `center`,
									bgcolor: isSelected ? alpha(primary, 0.12) : alpha(muted, 0.12),
								}}>
								<Icon name={option.iconName} size={22} color={isSelected ? primary : muted} />
							</Box>
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Text sx={{ fontWeight: 600 }}>{option.title}</Text>
								{option.description ? (
									<Text variant={`body2`} color={`text.secondary`} noWrap>
										{option.description}
									</Text>
								) : null}
							</Box>
							<Box
								sx={{
									width: 22,
									height: 22,
									flexShrink: 0,
									borderRadius: `50%`,
									border: `1.5px solid ${isSelected ? primary : muted}`,
									bgcolor: isSelected ? primary : `transparent`,
								}}
							/>
						</ButtonBase>
					)
				})}
				{hasError ? <FormHelperText error>{String(error?.message)}</FormHelperText> : null}
			</Box>
		</Grid>
	)
}
