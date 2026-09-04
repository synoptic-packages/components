import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { Text } from '../../text'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Icon } from '../../icon'
import { Component as FieldArray } from './Component'

const basicOptions = [
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
	{ label: 'South Africa', value: 'za' },
	{ label: 'Mexico', value: 'mx' },
]

const skillOptions = [
	{ label: 'JavaScript', value: 'javascript' },
	{ label: 'TypeScript', value: 'typescript' },
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Node.js', value: 'nodejs' },
	{ label: 'Python', value: 'python' },
	{ label: 'Java', value: 'java' },
	{ label: 'C++', value: 'cpp' },
	{ label: 'Go', value: 'go' },
]

const meta = {
	title: 'Form Fields/Field Array',
	component: FieldArray,
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
} satisfies Meta<typeof FieldArray>

export default meta

export const WithoutInitialValue = {
	render: () => {
		const validationSchema = yup.object().shape({
			countries: yup.array().min(1, `Please select at least one country`).required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { countries: [] },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldArray
								name={`countries`}
								label={`Select Countries`}
								placeholder={`Choose countries`}
								options={basicOptions}
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
		const validationSchema = yup.object().shape({
			countries: yup.array().min(1, `Please select at least one country`).required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { countries: ['uk', 'us', 'ca'] },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldArray
								name={`countries`}
								label={`Select Countries`}
								placeholder={`Choose countries`}
								options={basicOptions}
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
		const validationSchema = yup.object().shape({
			smallField: yup.array().min(1, `Please select at least one skill`).required(`This field is required`),
			normalField: yup.array().min(1, `Please select at least one skill`).required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { smallField: [], normalField: ['javascript', 'react'] },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldArray
								size={`small`}
								name={`smallField`}
								label={`Small Size (No Initial Value)`}
								placeholder={`Select skills`}
								options={skillOptions}
								control={control}
							/>
							<FieldArray
								name={`normalField`}
								label={`Normal Size (With Initial Value)`}
								placeholder={`Select skills`}
								options={skillOptions}
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
		const validationSchema = yup.object().shape({
			countries: yup.array().min(1, `Please select at least one country`).required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { countries: [] },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldArray
								name={`countries`}
								label={`Select Countries`}
								placeholder={`Choose countries`}
								hint={`Please select all countries where you have residence`}
								options={basicOptions}
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

export const WithCustomRenderOption = {
	render: () => {
		const validationSchema = yup.object().shape({
			skills: yup.array().min(1, `Please select at least one skill`).required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { skills: [] },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		const renderSkillOption = (option: { label: string; value: string }): React.ReactNode => {
			return (
				<Box display={`flex`} alignItems={`center`} gap={1}>
					<Icon name={`ListCheck`} size={16} color={`primary`} />
					<Text color={`text.primary`}>{option.label}</Text>
					<Text
						variant={`caption`}
						sx={{
							marginLeft: 'auto',
							padding: '2px 8px',
							backgroundColor: 'action.selected',
							borderRadius: '4px',
						}}>
						{option.value}
					</Text>
				</Box>
			)
		}

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldArray
								name={`skills`}
								label={`Select Skills`}
								placeholder={`Choose your skills`}
								hint={`Custom rendered options with icons and badges`}
								options={skillOptions}
								control={control}
								renderOption={renderSkillOption}
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

export const WithComplexCustomRender = {
	render: () => {
		const validationSchema = yup.object().shape({
			countries: yup.array().min(1, `Please select at least one country`).required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { countries: ['us', 'uk'] },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		const countryDetails: Record<string, { flag: string; code: string; population: string }> = {
			us: { flag: '🇺🇸', code: '+1', population: '331M' },
			uk: { flag: '🇬🇧', code: '+44', population: '67M' },
			ca: { flag: '🇨🇦', code: '+1', population: '38M' },
			au: { flag: '🇦🇺', code: '+61', population: '26M' },
			de: { flag: '🇩🇪', code: '+49', population: '83M' },
			fr: { flag: '🇫🇷', code: '+33', population: '67M' },
			jp: { flag: '🇯🇵', code: '+81', population: '125M' },
			cn: { flag: '🇨🇳', code: '+86', population: '1.4B' },
			in: { flag: '🇮🇳', code: '+91', population: '1.4B' },
			br: { flag: '🇧🇷', code: '+55', population: '213M' },
			za: { flag: '🇿🇦', code: '+27', population: '60M' },
			mx: { flag: '🇲🇽', code: '+52', population: '128M' },
		}

		const renderCountryOption = (option: { label: string; value: string }): React.ReactNode => {
			const details = countryDetails[option.value]
			if (!details) return <Text color={`text.primary`}>{option.label}</Text>

			return (
				<Box display={`flex`} alignItems={`center`} gap={1.5} flex={1}>
					<Text variant={`h6`} sx={{ fontSize: '24px', lineHeight: 1 }}>
						{details.flag}
					</Text>
					<Box flex={1}>
						<Text color={`text.primary`} fontWeight={500}>
							{option.label}
						</Text>
						<Text variant={`caption`}>
							{details.code} • Pop: {details.population}
						</Text>
					</Box>
				</Box>
			)
		}

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldArray
								name={`countries`}
								label={`Select Countries`}
								placeholder={`Choose countries`}
								hint={`Complex custom render with flags, country codes, and population data`}
								options={basicOptions}
								control={control}
								renderOption={renderCountryOption}
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

export const ManySelectedItems = {
	render: () => {
		const validationSchema = yup.object().shape({
			countries: yup.array().min(1, `Please select at least one country`).required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { countries: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'jp', 'cn'] },
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldArray
								name={`countries`}
								label={`Select Countries`}
								placeholder={`Choose countries`}
								hint={`Shows how the field handles many selected items with chip display`}
								options={basicOptions}
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
