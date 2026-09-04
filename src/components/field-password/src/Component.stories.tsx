import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldPassword } from './Component'

const meta = {
	title: 'Form Fields/Field Password',
	component: FieldPassword,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
		},
	},
} satisfies Meta<typeof FieldPassword>

export default meta

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallField: yup
				.string()
				.min(8, `Password must be at least 8 characters`)
				.required(`This field is required`),
			normalField: yup
				.string()
				.min(8, `Password must be at least 8 characters`)
				.required(`This field is required`),
			checklistField: yup
				.string()
				.min(8, `Password must be at least 8 characters`)
				.required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallField: '',
				normalField: '',
				checklistField: '',
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
							<FieldPassword name={`smallField`} size={`small`} control={control} />
							<FieldPassword name={`normalField`} control={control} strengthIndicatorVariant={`bar`} />
							<FieldPassword
								name={`checklistField`}
								control={control}
								label={`Password with checklist`}
								strengthIndicatorVariant={`checklist`}
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
