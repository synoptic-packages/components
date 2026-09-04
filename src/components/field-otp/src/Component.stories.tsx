import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldOTP } from './Component'

const meta = {
	title: 'Form Fields/Field OTP',
	component: FieldOTP,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
		},
		hint: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof FieldOTP>

export default meta

export const Default = {
	args: {
		name: 'otpField',
		hint: 'Enter the 5-digit verification code sent to your device',
	},
	render: (args: any) => {
		const validationSchema = yup.object().shape({
			otpField: yup.string().required(`This field is required`).length(5, `OTP must be 5 digits`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { otpField: '' },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldOTP {...args} control={control} />
						</FormContent>
					)}
				</Form>
				<div
					style={{
						padding: `16px`,
						backgroundColor: `#f5f5f5`,
						borderRadius: `8px`,
						fontSize: `14px`,
						fontFamily: `monospace`,
					}}>
					<strong>Form Values:</strong>
					<pre>{JSON.stringify(watchedValues, null, 2)}</pre>
				</div>
			</div>
		)
	},
}

export const WithPrefilledValue = {
	render: () => {
		const validationSchema = yup.object().shape({
			otpPrefilled: yup.string().required(`This field is required`).length(5, `OTP must be 5 digits`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { otpPrefilled: '12345' },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldOTP
								name={`otpPrefilled`}
								control={control}
								hint={`This OTP field has a pre-filled value`}
							/>
							<pre>{JSON.stringify(watchedValues, null, 2)}</pre>
						</FormContent>
					)}
				</Form>
				<div
					style={{
						padding: `16px`,
						backgroundColor: `#f5f5f5`,
						borderRadius: `8px`,
						fontSize: `14px`,
						fontFamily: `monospace`,
					}}>
					<strong>Form Values:</strong>
					<pre>{JSON.stringify(watchedValues, null, 2)}</pre>
				</div>
			</div>
		)
	},
}

export const Disabled = {
	args: {
		name: 'otpFieldDisabled',
		hint: 'This field is disabled',
		disabled: true,
	},
	render: Default.render,
}
