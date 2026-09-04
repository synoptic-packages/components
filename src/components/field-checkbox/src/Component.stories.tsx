import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldCheckbox } from './Component'

const meta = {
	title: 'Form Fields/Field Checkbox',
	component: FieldCheckbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
		},
	},
} satisfies Meta<typeof FieldCheckbox>

export default meta

export const SizeVariants = {
	render: () => {
		const validationSchema = yup.object().shape({
			smallField: yup.boolean().oneOf([true], `This field must be checked`),
			normalField: yup.boolean().oneOf([true], `This field must be checked`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				smallField: false,
				normalField: true,
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
							<FieldCheckbox name={`smallField`} control={control} />
							<FieldCheckbox name={`normalField`} control={control} />
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

export const WithLongHint = {
	render: () => {
		const validationSchema = yup.object().shape({
			termsAccepted: yup.boolean().oneOf([true], `You must accept the terms and conditions`),
			privacyAccepted: yup.boolean().oneOf([true], `You must accept the privacy policy`),
			marketingConsent: yup.boolean(),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				termsAccepted: false,
				privacyAccepted: false,
				marketingConsent: false,
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<div style={{ display: `flex`, flexDirection: `column`, gap: `16px`, maxWidth: `600px` }}>
				<Form size={`medium`} control={control} onSubmit={onSubmit}>
					{() => (
						<FormContent>
							<FieldCheckbox
								name={`termsAccepted`}
								control={control}
								label={`Accept Terms and Conditions`}
								hint={`By checking this box, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions outlined in our Terms of Service. These terms govern your use of our services and include important information about your rights, obligations, and limitations of liability. Please ensure you have reviewed all sections carefully before proceeding.`}
							/>
							<FieldCheckbox
								name={`privacyAccepted`}
								control={control}
								label={`Privacy Policy Agreement`}
								hint={`I consent to the collection, processing, and storage of my personal information as described in the Privacy Policy. This includes data such as name, email address, contact details, and usage information. Your data will be handled in accordance with GDPR and other applicable data protection regulations. You have the right to access, modify, or delete your data at any time by contacting our data protection officer.`}
							/>
							<FieldCheckbox
								name={`marketingConsent`}
								control={control}
								label={`Marketing Communications`}
								hint={`Yes, I would like to receive marketing communications, newsletters, and promotional offers via email and SMS. These communications may include product updates, special offers, industry insights, and personalized recommendations based on your preferences and usage patterns. You can unsubscribe from these communications at any time by clicking the unsubscribe link in any email or updating your communication preferences in your account settings.`}
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
