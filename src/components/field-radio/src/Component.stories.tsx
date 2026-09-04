import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldRadio } from './Component'

const options = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
]

const meta = {
	title: 'Form Fields/Field Radio',
	component: FieldRadio,
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
		row: {
			control: 'boolean',
		},
		size: {
			control: 'select',
			options: ['small', 'medium'],
		},
	},
} satisfies Meta<typeof FieldRadio>

export default meta

export const Default = {
	render: () => {
		const validationSchema = yup.object().shape({
			radioField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				radioField: '',
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldRadio
							name={`radioField`}
							control={control}
							options={options}
							label={`Choose an option`}
							hint={`Select one option from the list`}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallField: yup.string().required(`This field is required`),
			mediumField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { smallField: '', mediumField: '' },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldRadio
							name={`smallField`}
							control={control}
							options={options}
							label={`Small Radio`}
							size={`small`}
						/>
						<FieldRadio
							name={`mediumField`}
							control={control}
							options={options}
							label={`Medium Radio`}
							size={`medium`}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const RowLayout = {
	render: () => {
		const validationSchema = yup.object().shape({
			rowField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { rowField: '' },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldRadio
							name={`rowField`}
							control={control}
							options={options}
							label={`Horizontal Layout`}
							row={true}
							hint={`Options displayed in a row`}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const Disabled = {
	render: () => {
		const validationSchema = yup.object().shape({
			disabledField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { disabledField: 'option2' },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldRadio
							name={`disabledField`}
							control={control}
							options={options}
							label={`Disabled Radio`}
							disabled={true}
							hint={`This field is disabled`}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithValidation = {
	render: () => {
		const validationSchema = yup.object().shape({
			requiredField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { requiredField: '' },
		})

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldRadio
							name={`requiredField`}
							control={control}
							options={options}
							label={`Required Selection`}
							hint={`This field is required`}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithLongHint = {
	render: () => {
		const validationSchema = yup.object().shape({
			accountType: yup.string().required(`This field is required`),
			subscriptionPlan: yup.string().required(`This field is required`),
			paymentFrequency: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				accountType: '',
				subscriptionPlan: '',
				paymentFrequency: '',
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		const accountOptions = [
			{ label: 'Personal Account', value: 'personal' },
			{ label: 'Business Account', value: 'business' },
			{ label: 'Enterprise Account', value: 'enterprise' },
		]

		const subscriptionOptions = [
			{ label: 'Basic', value: 'basic' },
			{ label: 'Professional', value: 'professional' },
			{ label: 'Premium', value: 'premium' },
		]

		const paymentOptions = [
			{ label: 'Monthly', value: 'monthly' },
			{ label: 'Quarterly', value: 'quarterly' },
			{ label: 'Annually', value: 'annually' },
		]

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `24px`, maxWidth: `700px` }}>
				<Form size={`medium`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldRadio
								name={`accountType`}
								control={control}
								options={accountOptions}
								label={`Select Your Account Type`}
								hint={`Choose the account type that best fits your needs. Personal accounts are designed for individual users with basic features and limited storage. Business accounts provide enhanced collaboration tools, increased storage capacity, and priority support for small to medium-sized teams. Enterprise accounts offer advanced security features, unlimited storage, dedicated account management, custom integrations, and SLA guarantees suitable for large organizations with complex requirements.`}
							/>
							<FieldRadio
								name={`subscriptionPlan`}
								control={control}
								options={subscriptionOptions}
								label={`Choose Your Subscription Plan`}
								row={true}
								hint={`Select a subscription plan that aligns with your usage requirements and budget. The Basic plan includes essential features with standard support and is perfect for getting started. The Professional plan offers advanced features, priority email support, increased API rate limits, and additional user seats for growing teams. The Premium plan provides all features, 24/7 premium support, dedicated account manager, custom training sessions, advanced analytics, and white-label options for organizations requiring the highest level of service and customization.`}
							/>
							<FieldRadio
								name={`paymentFrequency`}
								control={control}
								options={paymentOptions}
								label={`Payment Frequency`}
								size={`small`}
								hint={`Choose how often you would like to be billed for your subscription. Monthly billing provides maximum flexibility with no long-term commitment, allowing you to cancel or upgrade at any time. Quarterly billing offers a 10% discount compared to monthly pricing and helps with budget planning. Annual billing provides the best value with a 20% discount, includes two months free, priority feature access, and ensures uninterrupted service for the entire year. All billing cycles include automatic renewal and can be changed or cancelled at any time from your account settings.`}
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
					<pre>{JSON.stringify(formValues, null, 2)}</pre>
				</div>
			</div>
		)
	},
}

export const WithPerOptionHints = {
	render: () => {
		const validationSchema = yup.object().shape({
			deliveryMethod: yup.string().required(`This field is required`),
			supportLevel: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				deliveryMethod: '',
				supportLevel: '',
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		const deliveryOptions = [
			{
				label: 'Standard Delivery',
				value: 'standard',
				hint: 'Estimated delivery in 5-7 business days. Free shipping on orders over $50. Track your package online from dispatch to delivery.',
			},
			{
				label: 'Express Delivery',
				value: 'express',
				hint: 'Guaranteed delivery within 2-3 business days. Additional $15 fee applies. Priority handling and expedited shipping with real-time tracking updates.',
			},
			{
				label: 'Overnight Delivery',
				value: 'overnight',
				hint: 'Next business day delivery for orders placed before 2 PM. Premium service with $35 fee. Includes signature confirmation and insurance coverage up to $1000.',
			},
			{
				label: 'Store Pickup',
				value: 'pickup',
				hint: 'Pick up your order at any of our 200+ retail locations. No shipping fees. Receive notification when your order is ready for pickup, typically within 2-4 hours.',
			},
		]

		const supportOptions = [
			{
				label: 'Basic Support',
				value: 'basic',
				hint: 'Email support with 48-hour response time during business hours. Access to knowledge base, community forums, and standard documentation. Suitable for non-critical inquiries.',
			},
			{
				label: 'Priority Support',
				value: 'priority',
				hint: 'Email and phone support with 24-hour response time. Includes video call assistance, dedicated support portal, and priority queue placement. Available Monday-Friday, 8 AM - 6 PM EST.',
			},
			{
				label: 'Premium Support',
				value: 'premium',
				hint: '24/7 phone, email, and live chat support with 4-hour guaranteed response time. Dedicated support engineer, proactive system monitoring, quarterly business reviews, and direct escalation path to engineering team for critical issues.',
			},
		]

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `24px`, maxWidth: `800px` }}>
				<Form size={`medium`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldRadio
								name={`deliveryMethod`}
								control={control}
								options={deliveryOptions}
								label={`Choose Your Delivery Method`}
								hint={`Select the delivery option that best meets your timeline and budget needs.`}
							/>
							<FieldRadio
								name={`supportLevel`}
								control={control}
								options={supportOptions}
								label={`Select Support Level`}
								size={`small`}
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
					<pre>{JSON.stringify(formValues, null, 2)}</pre>
				</div>
			</div>
		)
	},
}

export const HintsOnlyInVertical = {
	render: () => {
		const validationSchema = yup.object().shape({
			verticalField: yup.string().required(`This field is required`),
			horizontalField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				verticalField: '',
				horizontalField: '',
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		const optionsWithHints = [
			{
				label: 'Option One',
				value: 'one',
				hint: 'This hint will only appear in vertical layout. It provides additional context to help users make informed decisions.',
			},
			{
				label: 'Option Two',
				value: 'two',
				hint: 'Hints are hidden in horizontal/row layout to maintain a clean, compact appearance while preserving space.',
			},
			{
				label: 'Option Three',
				value: 'three',
				hint: 'The vertical layout allows for more descriptive text, making it ideal for complex choices requiring explanation.',
			},
		]

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `24px`, maxWidth: `800px` }}>
				<Form size={`medium`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldRadio
								name={`verticalField`}
								control={control}
								options={optionsWithHints}
								label={`Vertical Layout with Hints`}
								hint={`This is the group-level hint. Notice how each option also has its own hint below.`}
							/>
							<FieldRadio
								name={`horizontalField`}
								control={control}
								options={optionsWithHints}
								label={`Horizontal Layout (hints hidden)`}
								row={true}
								hint={`In horizontal mode, individual option hints are not displayed to keep the layout compact.`}
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
					<pre>{JSON.stringify(formValues, null, 2)}</pre>
				</div>
			</div>
		)
	},
}
