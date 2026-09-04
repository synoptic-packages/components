import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldUpload } from './Component'

const meta = {
	title: 'Form Fields/Field Upload',
	component: FieldUpload,
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
		icon: {
			control: false,
			description: 'Custom icon component',
		},
	},
} satisfies Meta<typeof FieldUpload>

export default meta

export const Default = {
	args: {
		name: 'uploadField',
		label: 'Upload your image',
		shape: 'square',
	},
	render: (args: any) => {
		const validationSchema = yup.object().shape({
			uploadField: yup.mixed().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { uploadField: null },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldUpload {...args} control={control} onComplete={() => console.log('Upload completed!')} />
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}
