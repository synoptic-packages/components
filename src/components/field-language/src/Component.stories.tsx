import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldLanguage } from './Component'

const meta = {
	title: 'Form Fields/Field Language',
	component: FieldLanguage,
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
} satisfies Meta<typeof FieldLanguage>

export default meta

export const Default = {
	render: () => {
		const validationSchema = yup.object().shape({
			primaryLanguage: yup.string().required(`Language is required`),
			secondaryLanguage: yup.string().required(`Language is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				primaryLanguage: 'en',
				secondaryLanguage: 'es',
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
							<FieldLanguage
								name={`primaryLanguage`}
								label={`Primary Language`}
								placeholder={`Select your primary language...`}
								size={`small`}
								control={control}
								hint={`Choose your primary language`}
							/>
							<FieldLanguage
								name={`secondaryLanguage`}
								label={`Secondary Language`}
								placeholder={`Select your secondary language...`}
								control={control}
								hint={`Choose your secondary language`}
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
			language: yup.string().required(`Please select a language`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				language: '',
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
							<FieldLanguage
								name={`language`}
								label={`Preferred Language`}
								placeholder={`Select a language...`}
								size={`small`}
								control={control}
								hint={`This field is required`}
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
			language: yup.string().required(`Language is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				language: 'pt',
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
							<FieldLanguage
								name={`language`}
								label={`Language (Disabled)`}
								placeholder={`Select a language...`}
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
			smallLanguage: yup.string().required(`Language is required`),
			mediumLanguage: yup.string().required(`Language is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallLanguage: 'ja',
				mediumLanguage: 'de',
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
							<FieldLanguage
								name={`smallLanguage`}
								label={`Small Size`}
								placeholder={`Select a language...`}
								size={`small`}
								control={control}
							/>
							<FieldLanguage
								name={`mediumLanguage`}
								label={`Medium Size`}
								placeholder={`Select a language...`}
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

export const AllLanguages = {
	render: () => {
		const validationSchema = yup.object().shape({
			language: yup.string().required(`Language is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				language: 'en',
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
							<FieldLanguage
								name={`language`}
								label={`Select Language`}
								placeholder={`Choose from 12 available languages...`}
								size={`small`}
								control={control}
								hint={`Available: English, Portuguese, Spanish, Hindi, Chinese, Japanese, German, French, Korean, Turkish, Arabic, Russian`}
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
