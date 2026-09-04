import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldNumber } from './Component'

const meta = {
	title: 'Form Fields/Field Number',
	component: FieldNumber,
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
		placeholder: {
			control: 'text',
		},
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
		disabled: {
			control: 'boolean',
		},
		hint: {
			control: 'text',
		},
		suffix: {
			control: 'text',
		},
		min: {
			control: 'number',
		},
		max: {
			control: 'number',
		},
		step: {
			control: 'number',
		},
	},
} satisfies Meta<typeof FieldNumber>

export default meta

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallField: yup.number().required(`This field is required`),
			normalField: yup.number().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallField: 0,
				normalField: 0,
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
							<FieldNumber
								size={`small`}
								name={`smallField`}
								label={`Small Size`}
								placeholder={`Enter number...`}
								control={control}
							/>
							<FieldNumber
								name={`normalField`}
								label={`Normal Size`}
								placeholder={`Enter number...`}
								control={control}
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

export const WithHints = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { fieldWithHint: 0, fieldWithLimits: 5 } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldNumber
								name={`fieldWithHint`}
								label={`Field with Hint`}
								placeholder={`Enter number...`}
								hint={`This is a helpful hint for the user`}
								size={`small`}
								control={control}
							/>
							<FieldNumber
								name={`fieldWithLimits`}
								label={`Field with Min/Max`}
								placeholder={`Enter number...`}
								hint={`Value must be between 0 and 10`}
								min={0}
								max={10}
								control={control}
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

export const WithSuffix = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { percentageField: 25, currencyField: 100 } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldNumber
								name={`percentageField`}
								label={`Percentage Field`}
								placeholder={`Enter percentage...`}
								hint={`Enter a value as a percentage`}
								suffix={`%`}
								min={0}
								max={100}
								control={control}
							/>
							<FieldNumber
								name={`currencyField`}
								label={`Currency Field`}
								placeholder={`Enter amount...`}
								hint={`Enter a monetary value`}
								suffix={`USD`}
								min={0}
								control={control}
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

export const WithStepValues = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { decimalStep: 1.5, largeStep: 10 } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldNumber
								name={`decimalStep`}
								label={`Decimal Step Field`}
								placeholder={`Enter number...`}
								hint={`Step value is 0.5`}
								step={0.5}
								control={control}
							/>
							<FieldNumber
								name={`largeStep`}
								label={`Large Step Field`}
								placeholder={`Enter number...`}
								hint={`Step value is 5`}
								step={5}
								control={control}
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

export const DisabledField = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { disabledField: 42 } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldNumber
								name={`disabledField`}
								label={`Disabled Field`}
								placeholder={`This field is disabled...`}
								hint={`You cannot edit this field`}
								disabled
								control={control}
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
