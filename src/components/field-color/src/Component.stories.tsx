import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldColor } from './Component'

const meta = {
	title: 'Form Fields/Field Color',
	component: FieldColor,
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
	},
} satisfies Meta<typeof FieldColor>

export default meta

export const Default = {
	render: () => {
		const validationSchema = yup.object().shape({
			primaryColor: yup.string().required(`Color is required`),
			secondaryColor: yup.string().required(`Color is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				primaryColor: '#3b82f6',
				secondaryColor: '#8b5cf6',
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldColor
								name={`primaryColor`}
								label={`Primary Color`}
								placeholder={`Select a color...`}
								size={`small`}
								control={control}
								hint={`Choose your primary brand color`}
							/>
							<FieldColor
								name={`secondaryColor`}
								label={`Secondary Color`}
								placeholder={`Select a color...`}
								control={control}
								hint={`Choose your secondary brand color`}
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

export const WithValidation = {
	render: () => {
		const validationSchema = yup.object().shape({
			brandColor: yup
				.string()
				.required(`Brand color is required`)
				.matches(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color'),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				brandColor: '',
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldColor
								name={`brandColor`}
								label={`Brand Color`}
								placeholder={`#000000`}
								size={`small`}
								control={control}
								hint={`Must be a valid hex color code`}
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

export const Disabled = {
	render: () => {
		const validationSchema = yup.object().shape({
			themeColor: yup.string().required(`Color is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				themeColor: '#10b981',
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldColor
								name={`themeColor`}
								label={`Theme Color (Disabled)`}
								placeholder={`Select a color...`}
								size={`small`}
								control={control}
								disabled={true}
								hint={`This field is disabled with a preset value`}
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

export const MultipleSizes = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallColor: yup.string().required(`Color is required`),
			mediumColor: yup.string().required(`Color is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallColor: '#ef4444',
				mediumColor: '#f59e0b',
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `400px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldColor
								name={`smallColor`}
								label={`Small Size`}
								placeholder={`Select a color...`}
								size={`small`}
								control={control}
							/>
							<FieldColor
								name={`mediumColor`}
								label={`Medium Size`}
								placeholder={`Select a color...`}
								size={`medium`}
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
