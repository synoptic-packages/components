import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldCrypto } from './Component'

const meta = {
	title: 'Form Fields/Field Crypto',
	component: FieldCrypto,
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
		crypto: {
			control: 'text',
		},
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
		disabled: {
			control: 'boolean',
		},
		fixedSelection: {
			control: 'boolean',
		},
		hint: {
			control: 'text',
		},
	},
} satisfies Meta<typeof FieldCrypto>

export default meta

export const Default = {
	render: () => {
		const validationSchema = yup.object().shape({
			cryptoAmount: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				cryptoAmount: {
					amount: 0,
					cryptoCode: 'BTC',
				},
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldCrypto
								name={`cryptoAmount`}
								label={`Cryptocurrency Amount`}
								crypto={`BTC`}
								size={`small`}
								control={control}
								hint={`Enter the amount of cryptocurrency`}
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

export const MultipleCryptos = {
	render: () => {
		const validationSchema = yup.object().shape({
			bitcoinAmount: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
			ethereumAmount: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				bitcoinAmount: {
					amount: 0.5,
					cryptoCode: 'BTC',
				},
				ethereumAmount: {
					amount: 2.5,
					cryptoCode: 'ETH',
				},
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldCrypto
								name={`bitcoinAmount`}
								label={`Bitcoin Amount`}
								crypto={`BTC`}
								size={`small`}
								control={control}
								hint={`Enter Bitcoin amount`}
							/>
							<FieldCrypto
								name={`ethereumAmount`}
								label={`Ethereum Amount`}
								crypto={`ETH`}
								control={control}
								hint={`Enter Ethereum amount`}
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

export const FixedSelection = {
	render: () => {
		const validationSchema = yup.object().shape({
			cryptoAmount: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				cryptoAmount: {
					amount: 1.5,
					cryptoCode: 'KGR',
				},
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldCrypto
								name={`cryptoAmount`}
								label={`Kruger Gold Token`}
								crypto={`KGR`}
								size={`small`}
								control={control}
								fixedSelection={true}
								hint={`Cryptocurrency selection is locked to KGR`}
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
			cryptoAmount: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				cryptoAmount: {
					amount: 3.14159,
					cryptoCode: 'BTC',
				},
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldCrypto
								name={`cryptoAmount`}
								label={`Crypto Amount (Disabled)`}
								crypto={`BTC`}
								size={`small`}
								control={control}
								disabled={true}
								hint={`This field is disabled`}
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
			cryptoAmount: yup.object().shape({
				amount: yup
					.number()
					.min(0.01, `Minimum amount is 0.01`)
					.max(100, `Maximum amount is 100`)
					.required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				cryptoAmount: {
					amount: 0,
					cryptoCode: 'SOL',
				},
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldCrypto
								name={`cryptoAmount`}
								label={`Solana Amount`}
								crypto={`SOL`}
								size={`small`}
								control={control}
								hint={`Enter amount between 0.01 and 100`}
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

export const AllSizes = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallCrypto: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
			mediumCrypto: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallCrypto: {
					amount: 0.25,
					cryptoCode: 'BTC',
				},
				mediumCrypto: {
					amount: 10.5,
					cryptoCode: 'ETH',
				},
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, minWidth: `500px` }}>
				<Form size={`small`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldCrypto
								name={`smallCrypto`}
								label={`Small Size`}
								crypto={`BTC`}
								size={`small`}
								control={control}
							/>
							<FieldCrypto
								name={`mediumCrypto`}
								label={`Medium Size`}
								crypto={`ETH`}
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
