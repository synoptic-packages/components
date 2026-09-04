import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldSwitch } from './Component'

const meta = {
	title: 'Form Fields/Field Switch',
	component: FieldSwitch,
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
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
	},
} satisfies Meta<typeof FieldSwitch>

export default meta

export const Default = {
	args: {
		name: 'switchField',
		label: 'Enable Feature',
		hint: 'Toggle this switch to enable or disable the feature',
		size: 'medium',
	},
	render: (args: any) => {
		const { control, watch } = useForm({ defaultValues: { switchField: false } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldSwitch {...args} control={control} />
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
		const validationSchema = yup.object().shape({
			smallSwitch: yup.boolean().oneOf([true], `This field must be enabled`),
			mediumSwitch: yup.boolean().oneOf([true], `This field must be enabled`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallSwitch: false,
				mediumSwitch: true,
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
							<FieldSwitch
								name={`smallSwitch`}
								control={control}
								label={`Small Switch`}
								size={`small`}
								hint={`Small size switch (off by default)`}
							/>
							<FieldSwitch
								name={`mediumSwitch`}
								control={control}
								label={`Medium Switch`}
								size={`medium`}
								hint={`Medium size switch (on by default)`}
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
