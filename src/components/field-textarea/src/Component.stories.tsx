import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldTextarea } from './Component'

const meta = {
	title: 'Form Fields/Field Textarea',
	component: FieldTextarea,
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
		rows: {
			control: 'number',
		},
		disabled: {
			control: 'boolean',
		},
		hint: {
			control: 'text',
		},
	},
} satisfies Meta<typeof FieldTextarea>

export default meta

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallField: yup.string().required(`This field is required`),
			mediumField: yup.string().required(`This field is required`),
			normalField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallField: '',
				mediumField: '',
				normalField: '',
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
							<FieldTextarea
								name={`smallField`}
								label={`Small Size`}
								placeholder={`Small textarea field...`}
								size={`small`}
								rows={3}
								control={control}
							/>
							<FieldTextarea
								name={`mediumField`}
								label={`Medium Size`}
								placeholder={`Medium textarea field...`}
								size={`medium`}
								rows={4}
								control={control}
							/>
							<FieldTextarea
								name={`normalField`}
								label={`Normal Size`}
								placeholder={`Normal textarea field...`}
								rows={4}
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

export const SmallSize = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { smallTextareaField: '' } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldTextarea
								name={`smallTextareaField`}
								label={`Small Textarea Field`}
								placeholder={`Small size field...`}
								size={`small`}
								rows={3}
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

export const MediumSize = {
	render: () => {
		const { control, watch } = useForm({ defaultValues: { mediumTextareaField: '' } })
		const watchedValues = watch()

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `300px` }}>
				<Form size={`small`} control={control} onSubmit={async () => {}}>
					{() => (
						<FormContent>
							<FieldTextarea
								name={`mediumTextareaField`}
								label={`Medium Textarea Field`}
								placeholder={`Medium size field...`}
								size={`medium`}
								rows={4}
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

export const RowVariants = {
	render: () => {
		const { control, watch } = useForm({
			defaultValues: {
				twoRows: ``,
				fourRows: ``,
				sixRows: ``,
				eightRows: ``,
			},
		})
		const formValues = watch()

		return (
			<Form size={`small`} control={control} onSubmit={async () => {}}>
				{() => (
					<FormContent>
						<FieldTextarea
							name={`twoRows`}
							label={`Two Rows`}
							placeholder={`Compact textarea (2 rows)...`}
							size={`small`}
							rows={2}
							control={control}
						/>
						<FieldTextarea
							name={`fourRows`}
							label={`Four Rows`}
							placeholder={`Standard textarea (4 rows)...`}
							size={`medium`}
							rows={4}
							control={control}
						/>
						<FieldTextarea
							name={`sixRows`}
							label={`Six Rows`}
							placeholder={`Large textarea (6 rows)...`}
							size={`medium`}
							rows={6}
							control={control}
						/>
						<FieldTextarea
							name={`eightRows`}
							label={`Eight Rows`}
							placeholder={`Extra large textarea (8 rows)...`}
							size={`medium`}
							rows={8}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithHints = {
	render: () => {
		const { control, watch } = useForm({
			defaultValues: {
				fieldWithHint: ``,
				disabledField: `This textarea is disabled and contains some default text that cannot be edited.`,
			},
		})
		const formValues = watch()

		return (
			<Form size={`small`} control={control} onSubmit={async () => {}}>
				{() => (
					<FormContent>
						<FieldTextarea
							name={`fieldWithHint`}
							label={`Textarea with Hint`}
							placeholder={`Enter your message...`}
							hint={`This is a helpful hint for the user. You can write multiple lines of text here.`}
							size={`small`}
							rows={4}
							control={control}
						/>
						<FieldTextarea
							name={`disabledField`}
							label={`Disabled Textarea`}
							placeholder={`This is disabled...`}
							hint={`This field is disabled and cannot be edited`}
							disabled
							rows={4}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const CompleteForm = {
	render: () => {
		const { control, watch } = useForm({
			defaultValues: {
				subject: ``,
				message: ``,
				description: ``,
				comments: ``,
				notes: ``,
			},
		})
		const formValues = watch()

		return (
			<Form size={`small`} control={control} onSubmit={async () => {}}>
				{() => (
					<FormContent>
						<FieldTextarea
							name={`subject`}
							label={`Subject`}
							placeholder={`Enter subject...`}
							size={`small`}
							rows={2}
							control={control}
						/>
						<FieldTextarea
							name={`message`}
							label={`Message`}
							placeholder={`Enter your message...`}
							hint={`Please provide a detailed message`}
							size={`medium`}
							rows={4}
							control={control}
						/>
						<div style={{ display: `grid`, gridTemplateColumns: `1fr 1fr`, gap: `16px` }}>
							<FieldTextarea
								name={`description`}
								label={`Description`}
								placeholder={`Enter description...`}
								size={`small`}
								rows={3}
								control={control}
							/>
							<FieldTextarea
								name={`comments`}
								label={`Comments`}
								placeholder={`Enter comments...`}
								size={`small`}
								rows={3}
								control={control}
							/>
						</div>
						<FieldTextarea
							name={`notes`}
							label={`Additional Notes`}
							placeholder={`Enter any additional notes...`}
							hint={`Optional: Any additional information you'd like to include`}
							size={`medium`}
							rows={6}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}
