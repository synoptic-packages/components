import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldSelect } from './Component'

const options = [
	{ label: 'United States', value: 'us' },
	{ label: 'United Kingdom', value: 'uk' },
	{ label: 'Canada', value: 'ca' },
	{ label: 'Australia', value: 'au' },
	{ label: 'Germany', value: 'de' },
	{ label: 'France', value: 'fr' },
	{ label: 'Japan', value: 'jp' },
	{ label: 'China', value: 'cn' },
	{ label: 'India', value: 'in' },
	{ label: 'Brazil', value: 'br' },
]

const meta = {
	title: 'Form Fields/Field Select',
	component: FieldSelect,
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
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
	},
} satisfies Meta<typeof FieldSelect>

export default meta

export const WithoutInitialValue = {
	render: () => {
		const validationSchema = yup.object().shape({
			country: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				country: '',
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldSelect
								name={`country`}
								label={`Select Country`}
								placeholder={`Choose a country`}
								options={options}
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

export const WithInitialValue = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { country: 'uk' } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldSelect
								name={`country`}
								label={`Select Country`}
								placeholder={`Choose a country`}
								options={options}
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

export const SizeVariants = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { smallField: '', normalField: 'us' } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldSelect
								size={`small`}
								name={`smallField`}
								label={`Small Size (No Initial Value)`}
								placeholder={`Select option`}
								options={options}
								control={control}
							/>
							<FieldSelect
								name={`normalField`}
								label={`Normal Size (With Initial Value)`}
								placeholder={`Select option`}
								options={options}
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

export const WithHint = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { country: '' } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldSelect
								name={`country`}
								label={`Select Country`}
								placeholder={`Choose a country`}
								hint={`Please select your country of residence`}
								options={options}
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
