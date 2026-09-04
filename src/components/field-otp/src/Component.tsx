import React from 'react'

import { Box, FormControl, FormHelperText, Grid, type GridBaseProps } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Controller, useController, useFormState, type Control } from 'react-hook-form'
import type { ValidationRules } from '../../../types/generics'

export interface IComponentProps {
	name: string
	hint?: string
	label?: string
	disabled?: boolean
	width?: GridBaseProps['size']
	control: Control<any>
	rules?: ValidationRules
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({ name, hint, disabled, control, width, rules, testId }) => {
	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	return (
		<Grid size={width}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<FormControl fullWidth variant={`outlined`} error={isTouched && Boolean(error)} disabled={disabled}>
						<Box sx={{ margin: `auto` }}>
							<MuiOtpInput
								{...field}
								data-test-id={testId ?? `id-wallet-field-otp`}
								value={value}
								length={5}
								margin={`none`}
								gap={`8px`}
								paddingRight={0}
								maxWidth={340}
								minWidth={340}
								display={`flex`}
								marginInline={`auto`}
								data-describedby={name}
								className={`sy-otp-field`}
								TextFieldsProps={(index) => ({
									placeholder: `*`,
									size: `small`,
									disabled: disabled,
									// Per-digit accessible name: screen readers announce each slot, and it gives the
									// mobile WebView a stable per-slot anchor — the /account tree is embedded there and
									// the data-test-id on the root is not reachable inside a WebView.
									// The soft-keyboard hints ride the same slot, because slotProps.htmlInput REPLACES
									// the deprecated inputProps rather than merging with it. They have to sit on the
									// <input>: TextField forwards only its own known props there and spreads the rest
									// onto the FormControl root, so an `inputMode` passed at the top level of
									// TextFieldsProps lands on a div and the WebView still opens a full QWERTY
									// keyboard. `inputMode` is what modern iOS/Android WebViews read; `pattern` is the
									// legacy iOS trigger and costs nothing. `text` replaces an invalid `string` type.
									slotProps: {
										htmlInput: {
											type: `text`,
											inputMode: `numeric`,
											pattern: `[0-9]*`,
											'aria-label': `Verification code digit ${index + 1}`,
										},
									},
									sx: {
										height: '52px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										input: {
											paddingRight: `6px`,
											paddingLeft: `6px`,
											textAlign: `center`,
											fontSize: `36px`,
											fontWeight: 700,
											lineHeight: `52px`,
											height: '52px',
											display: 'flex',
											alignItems: 'center',
											'&::placeholder': {
												fontSize: `24px`,
												color: 'muted.main',
											},
										},
										'.MuiOutlinedInput-root': {
											height: '52px',
											display: 'flex',
											alignItems: 'center',
											'&.Mui-focused fieldset': {
												borderColor: 'primary.main',
											},
										},
										'.MuiOutlinedInput-root:has(input:not(:placeholder-shown))': {
											'& fieldset': {
												borderColor: 'success.main',
												borderTopWidth: `2px`,
												borderLeftWidth: `2px`,
												borderRightWidth: `4px`,
												borderBottomWidth: `4px`,
											},
											'& input': {
												color: 'success.main',
											},
										},
										'.MuiOutlinedInput-root fieldset': {
											borderTopWidth: `1px`,
											borderLeftWidth: `1px`,
											borderRightWidth: `3px`,
											borderBottomWidth: `3px`,
										},
									},
								})}
								onChange={onChange}
							/>
						</Box>
						{(error?.message || hint) && (
							<FormHelperText sx={{ textAlign: `center`, mt: 1 }}>
								{hasError ? error?.message : hint}
							</FormHelperText>
						)}
					</FormControl>
				)}
			/>
		</Grid>
	)
}

Component.displayName = 'FieldOTP'
