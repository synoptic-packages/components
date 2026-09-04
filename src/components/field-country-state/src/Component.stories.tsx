import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldCountryState } from './Component'

const meta = {
	title: 'Form Fields/Field Country State',
	component: FieldCountryState,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
		},
	},
} satisfies Meta<typeof FieldCountryState>

export default meta

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallField: yup.string().required(`This field is required`),
			normalField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { smallField: ``, mediumField: `` },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldCountryState
							size={`small`}
							name={`smallField`}
							control={control}
							country={'ZA'}
							options={[]}
						/>
						<FieldCountryState name={`normalField`} control={control} country={'US'} options={[]} />
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}
