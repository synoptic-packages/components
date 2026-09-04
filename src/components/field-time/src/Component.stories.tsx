import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldTime } from './Component'

const meta = {
	title: 'Form Fields/Field Time',
	component: FieldTime,
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
		disabled: {
			control: 'boolean',
		},
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
	},
} satisfies Meta<typeof FieldTime>

export default meta

export const Default = {
	args: {
		name: 'timeField',
		label: 'Select Time',
		hint: 'Choose a time from the picker',
		disabled: false,
		size: 'medium',
	},
	render: (args: any) => {
		const validationSchema = yup.object().shape({
			timeField: yup.string().required(`This field is required`),
			timeFieldSmall: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { timeField: null, timeFieldSmall: null },
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
							<FieldTime
								{...args}
								name={`timeFieldSmall`}
								label={`Small Time Field`}
								size={`small`}
								control={control}
							/>
							<FieldTime {...args} control={control} />
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

export const WithPresetTime = {
	render: () => {
		const validationSchema = yup.object().shape({
			presetTime: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { presetTime: '2024-01-01T14:30:00' },
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
							<FieldTime
								name={`presetTime`}
								control={control}
								label={`Preset Time Field`}
								hint={`This field has a preset time (2:30 PM)`}
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
