import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldPhone } from './Component'

const meta = {
	title: 'Form Fields/Field Phone',
	component: FieldPhone,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
		hint: {
			control: 'text',
		},
		placeholder: {
			control: 'text',
		},
		geo: {
			control: 'select',
			options: ['ZA', 'US', 'GB', 'DE', 'FR', 'AU', 'CA', 'IN'],
			description: 'Default country code',
		},
		disabled: {
			control: 'boolean',
		},
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
	},
} satisfies Meta<typeof FieldPhone>

export default meta

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallPhone: yup.string().required(`This field is required`),
			mediumPhone: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallPhone: '',
				mediumPhone: '',
			},
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
							<FieldPhone
								name={`smallPhone`}
								control={control}
								label={`Small Phone Field`}
								size={`small`}
								geo={`ZA`}
							/>
							<FieldPhone
								name={`mediumPhone`}
								control={control}
								label={`Medium Phone Field`}
								size={`medium`}
								geo={`ZA`}
							/>
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

export const PrePopulatedValues = {
	render: () => {
		const { control, watch } = useForm({
			defaultValues: {
				southAfricaPhone: {
					countryCode: 'ZA',
					national: '0649940334',
					international: '+27 64 994 0334',
				},
				usPhone: {
					countryCode: 'US',
					national: '2025551234',
					international: '+1 202 555 1234',
				},
				ukPhone: {
					countryCode: 'GB',
					national: '07911123456',
					international: '+44 7911 123456',
				},
			},
		})
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldPhone
								name={`southAfricaPhone`}
								control={control}
								label={`South Africa (with leading 0)`}
								hint={`Pre-populated with 064 994 0334`}
							/>
							<FieldPhone
								name={`usPhone`}
								control={control}
								label={`US Phone (no leading 0)`}
								hint={`Pre-populated with 202 555 1234`}
							/>
							<FieldPhone
								name={`ukPhone`}
								control={control}
								label={`UK Phone (with leading 0)`}
								hint={`Pre-populated with 07911 123456`}
							/>
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

export const InternationalNumbers = {
	render: () => {
		const { control, watch } = useForm({
			defaultValues: {
				india: {
					countryCode: 'IN',
					national: '09876543210',
					international: '+91 98765 43210',
				},
				australia: {
					countryCode: 'AU',
					national: '0412345678',
					international: '+61 412 345 678',
				},
				france: {
					countryCode: 'FR',
					national: '0612345678',
					international: '+33 6 12 34 56 78',
				},
				germany: {
					countryCode: 'DE',
					national: '01701234567',
					international: '+49 170 1234567',
				},
			},
		})
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldPhone
								name={`india`}
								control={control}
								label={`India`}
								hint={`Pre-populated with 098765 43210`}
							/>
							<FieldPhone
								name={`australia`}
								control={control}
								label={`Australia`}
								hint={`Pre-populated with 0412 345 678`}
							/>
							<FieldPhone
								name={`france`}
								control={control}
								label={`France`}
								hint={`Pre-populated with 06 12 34 56 78`}
							/>
							<FieldPhone
								name={`germany`}
								control={control}
								label={`Germany`}
								hint={`Pre-populated with 0170 1234567`}
							/>
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

export const EmptyAndDisabled = {
	render: () => {
		const { control, watch } = useForm({
			defaultValues: {
				emptyPhone: '',
				disabledPhone: {
					countryCode: 'ZA',
					national: '0649940334',
					international: '+27 64 994 0334',
				},
			},
		})
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldPhone
								name={`emptyPhone`}
								control={control}
								label={`Empty Phone Field`}
								geo={`ZA`}
								hint={`Start typing a phone number`}
							/>
							<FieldPhone
								name={`disabledPhone`}
								control={control}
								label={`Disabled Phone Field`}
								disabled={true}
								hint={`This field is disabled`}
							/>
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
