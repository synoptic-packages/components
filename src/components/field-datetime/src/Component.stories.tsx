import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldDateTime } from './Component'

const meta = {
	title: 'Form Fields/Field Date Time',
	component: FieldDateTime,
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
		minDateTime: {
			control: 'date',
			description: 'Earliest selectable moment (server-owned lead time)',
		},
		maxDateTime: {
			control: 'date',
			description: 'Latest selectable moment (server-owned horizon)',
		},
	},
} satisfies Meta<typeof FieldDateTime>

export default meta

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallWhen: yup.date().nullable().required(`This field is required`),
			mediumWhen: yup.date().nullable().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallWhen: null,
				mediumWhen: null,
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `320px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldDateTime
								name={`smallWhen`}
								control={control}
								label={`Small Date Time`}
								size={`small`}
								hint={`Small size date-time picker`}
							/>
							<FieldDateTime
								name={`mediumWhen`}
								control={control}
								label={`Medium Date Time`}
								hint={`Normal size date-time picker`}
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

export const BoundedAndDisabled = {
	render: () => {
		// Story demo: untyped on purpose, the same way the field's control prop is declared.
		const { control, watch } = useForm<any>({
			defaultValues: {
				boundedWhen: null,
				disabledWhen: {
					iso: dayjs().add(2, 'hour').toISOString(),
				},
			},
		})
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `320px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldDateTime
								name={`boundedWhen`}
								control={control}
								label={`Delivery window`}
								hint={`Selectable between now and 7 days out`}
								minDateTime={dayjs()}
								maxDateTime={dayjs().add(7, 'day')}
							/>
							<FieldDateTime
								name={`disabledWhen`}
								control={control}
								label={`Booked for`}
								hint={`This field is disabled`}
								disabled={true}
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
