import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CountryCode } from 'libphonenumber-js'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Form, FormContent } from '..'
import {
	FieldArray,
	FieldCheckbox,
	FieldColor,
	FieldCountry,
	FieldCountryState,
	FieldCrypto,
	FieldCurrency,
	FieldDate,
	FieldEmail,
	FieldLanguage,
	FieldNumber,
	FieldPassword,
	FieldPhone,
	FieldRadio,
	FieldSelect,
	FieldSwitch,
	FieldText,
	FieldTextarea,
	FieldTime,
	FieldUpload,
} from '../..'
import type { TGeneric } from '../../../types/generics'

const meta = {
	title: 'Forms/Form',
	component: Form,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A comprehensive form component with built-in validation, loading states, error and success messages using FormContent.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'full'],
			description: 'The size of the form container',
		},
		isLoading: {
			control: 'boolean',
			description: 'Shows loading skeleton when true',
		},
		isSubmitting: {
			control: 'boolean',
			description: 'Shows submitting state on buttons',
		},
		hideActions: {
			control: 'boolean',
			description: 'Hides the submit and reset buttons',
		},
		submitLabel: {
			control: 'text',
			description: 'Custom label for submit button',
		},
		resetLabel: {
			control: 'text',
			description: 'Custom label for reset button',
		},
	},
} satisfies Meta<typeof Form>

type Story = StoryObj<typeof Form>

export default meta

export const SmallForm: Story = {
	render: () => {
		const validationSchema = yup.object().shape({
			firstName: yup.string().required(`First name is required`),
			lastName: yup.string().required(`Last name is required`),
			email: yup.string().email(`Invalid email address`).required(`Email is required`),
		} as TGeneric)

		const { control, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
			},
		})

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted!', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{({ control }) => (
					<FormContent title={`Quick Sign Up`} subTitle={`Create your account in seconds`}>
						<FieldText
							name={`firstName`}
							label={`First Name`}
							placeholder={`Enter your first name`}
							control={control}
							width={{ xs: 12 }}
						/>
						<FieldText
							name={`lastName`}
							label={`Last Name`}
							placeholder={`Enter your last name`}
							control={control}
							width={{ xs: 12 }}
						/>
						<FieldText
							name={`email`}
							label={`Email`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 12 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const MediumForm: Story = {
	render: () => {
		const validationSchema = yup.object().shape({
			firstName: yup.string().required(`First name is required`),
			lastName: yup.string().required(`Last name is required`),
			email: yup.string().email(`Invalid email address`).required(`Email is required`),
			phone: yup.string().required(`Phone number is required`),
			password: yup.string().min(8, `Password must be at least 8 characters`).required(`Password is required`),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], `Passwords must match`)
				.required(`Please confirm your password`),
		} as TGeneric)

		const { control, reset, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				password: '',
				confirmPassword: '',
			},
		})

		const onSubmit = handleSubmit(async (data) => {
			console.log('Medium form submitted!', data)
		})

		return (
			<Form size={`medium`} control={control} onReset={reset} submitLabel={`Create Account`} onSubmit={onSubmit}>
				{({ control }) => (
					<FormContent title={`User Registration`} subTitle={`Fill in your details to create a new account`}>
						<FieldText
							name={`firstName`}
							label={`First Name`}
							placeholder={`Enter your first name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText
							name={`lastName`}
							label={`Last Name`}
							placeholder={`Enter your last name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText
							name={`email`}
							label={`Email`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldPhone name={`phone`} label={`Phone Number`} control={control} width={{ xs: 12, sm: 6 }} />
						<FieldPassword
							name={`password`}
							label={`Password`}
							placeholder={`Enter your password`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldPassword
							name={`confirmPassword`}
							label={`Confirm Password`}
							placeholder={`Confirm your password`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const ComprehensiveForm: Story = {
	render: () => {
		const validationSchema = yup.object().shape({
			firstName: yup.string().required(`First name is required`),
			lastName: yup.string().required(`Last name is required`),
			email: yup.string().email(`Invalid email address`).required(`Email is required`),
			password: yup.string().min(8, `Password must be at least 8 characters`).required(`Password is required`),
			phone: yup.string().required(`Phone number is required`),
			age: yup.number().min(18, `Must be at least 18 years old`).required(`Age is required`),
			salary: yup.number().positive(`Salary must be positive`).required(`Salary is required`),
			birthDate: yup.date().nullable().required(`Birth date is required`),
			meetingTime: yup.string().required(`Meeting time is required`),
			country: yup.string().required(`Country is required`),
			countryState: yup.string().required(`State is required`),
			language: yup.string().required(`Language is required`),
			cryptoAmount: yup.object().shape({
				amount: yup.number().min(0.000001, `Amount must be greater than 0`).required(`Amount is required`),
				cryptoCode: yup.string().required(`Cryptocurrency is required`),
			}),
			gender: yup.string().required(`Gender is required`),
			plan: yup.string().required(`Plan is required`),
			brandColor: yup.string().required(`Brand color is required`),
			newsletter: yup.boolean(),
			notifications: yup.boolean(),
			bio: yup.string().max(500, `Bio must be less than 500 characters`),
			profile: yup.string(),
			documents: yup.mixed(),
			tags: yup.array(),
		} as TGeneric)

		const { control, watch, reset, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				phone: '',
				age: 0,
				salary: 0,
				birthDate: null,
				meetingTime: '',
				country: '',
				countryState: '',
				language: 'en',
				cryptoAmount: {
					amount: 0,
					cryptoCode: 'BTC',
				},
				gender: '',
				plan: '',
				brandColor: '#3b82f6',
				newsletter: false,
				notifications: false,
				bio: '',
				profile: '',
				documents: null,
				tags: [],
			},
		})

		const watchedValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Comprehensive form submitted!', data)
		})

		return (
			<Form
				size={`medium`}
				control={control}
				onReset={reset}
				submitLabel={`Create Account`}
				resetLabel={`Clear Form`}
				onSubmit={onSubmit}>
				{({ control }) => (
					<FormContent
						title={`Comprehensive Form - All Field Types`}
						subTitle={`This form demonstrates all available field components`}>
						<FieldText
							name={`firstName`}
							label={`First Name`}
							placeholder={`Enter your first name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText
							name={`lastName`}
							label={`Last Name`}
							placeholder={`Enter your last name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldEmail
							name={`email`}
							label={`Email Address`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 6 }}
						/>
						<FieldPassword
							name={`password`}
							label={`Password`}
							placeholder={`Enter your password`}
							control={control}
							width={{ xs: 6 }}
						/>
						<FieldPhone name={`phone`} label={`Phone Number`} control={control} width={{ xs: 6 }} />
						<FieldDate
							name={`birthDate`}
							label={`Birth Date`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldNumber
							name={`age`}
							label={`Age`}
							placeholder={`Enter your age`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldCurrency
							name={`salary`}
							label={`Salary`}
							placeholder={`Enter your salary`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>

						<FieldTime
							name={`meetingTime`}
							label={`Meeting Time`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldSelect
							name={`plan`}
							label={`Subscription Plan`}
							control={control}
							options={[
								{ value: 'basic', label: 'Basic Plan' },
								{ value: 'standard', label: 'Standard Plan' },
								{ value: 'premium', label: 'Premium Plan' },
								{ value: 'enterprise', label: 'Enterprise Plan' },
							]}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldCountry name={`country`} label={`Country`} control={control} width={{ xs: 12, sm: 6 }} />
						<FieldCountryState
							name={`countryState`}
							label={`State/Province`}
							control={control}
							width={{ xs: 12, sm: 6 }}
							country={watchedValues.country as CountryCode}
							options={[]}
						/>
						<FieldLanguage
							name={`language`}
							label={`Preferred Language`}
							placeholder={`Select your language...`}
							control={control}
							width={{ xs: 12, sm: 6 }}
							hint={`Choose your preferred language`}
						/>
						<FieldColor
							name={`brandColor`}
							label={`Brand Color`}
							placeholder={`Select your brand color`}
							control={control}
							width={{ xs: 12, sm: 6 }}
							hint={`Choose your primary brand color`}
						/>
						<FieldCrypto
							name={`cryptoAmount`}
							label={`Cryptocurrency Amount`}
							crypto={`BTC`}
							control={control}
							width={{ xs: 12, sm: 6 }}
							hint={`Enter cryptocurrency amount`}
						/>
						<FieldRadio
							name={`gender`}
							label={`Gender`}
							control={control}
							row={true}
							options={[
								{ value: 'male', label: 'Male' },
								{ value: 'female', label: 'Female' },
								{ value: 'other', label: 'Other' },
							]}
							width={{ xs: 12, sm: 6 }}
						/>

						<FieldCheckbox
							name={`newsletter`}
							label={`Subscribe to Newsletter`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldSwitch
							name={`notifications`}
							label={`Enable Notifications`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldTextarea
							name={`bio`}
							label={`Bio`}
							placeholder={`Tell us about yourself...`}
							control={control}
							width={{ xs: 12 }}
						/>
						<FieldUpload
							name={`documents`}
							label={`Upload Documents`}
							control={control}
							onUpload={async (file: File) => {
								console.log('Uploading file:', file)
								return { success: true, fileId: Math.random() }
							}}
						/>
						<FieldArray
							name={`tags`}
							label={`Skills & Technologies`}
							hint={`Select your skills and technologies`}
							control={control}
							options={[
								{ value: 'javascript', label: 'JavaScript' },
								{ value: 'typescript', label: 'TypeScript' },
								{ value: 'react', label: 'React' },
								{ value: 'nodejs', label: 'Node.js' },
								{ value: 'python', label: 'Python' },
								{ value: 'java', label: 'Java' },
								{ value: 'go', label: 'Go' },
								{ value: 'rust', label: 'Rust' },
							]}
							width={{ xs: 12 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const LoadingState: Story = {
	render: () => {
		const { control, reset } = useForm({
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
			},
		})

		return (
			<Form size={`medium`} control={control} onReset={reset} isLoading={true} onSubmit={async () => {}}>
				{({ control }) => (
					<FormContent title={`Create Account`} subTitle={`Please wait while we load your information...`}>
						<FieldText
							name={`firstName`}
							label={`First Name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText name={`lastName`} label={`Last Name`} control={control} width={{ xs: 12, sm: 6 }} />
						<FieldText name={`email`} label={`Email`} control={control} width={{ xs: 12 }} />
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithErrorMessage: Story = {
	render: () => {
		const { control, reset } = useForm({
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
			},
		})

		return (
			<Form size={`medium`} control={control} onReset={reset} onSubmit={async () => {}}>
				{({ control }) => (
					<FormContent
						title={`Sign In`}
						subTitle={`Enter your credentials to access your account`}
						error={`Invalid credentials. Please check your email and password and try again.`}>
						<FieldText
							name={`email`}
							label={`Email Address`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 12 }}
						/>
						<FieldPassword
							name={`password`}
							label={`Password`}
							placeholder={`Enter your password`}
							control={control}
							width={{ xs: 12 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithSuccessMessage: Story = {
	render: () => {
		const { control, reset } = useForm({
			defaultValues: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
			},
		})

		return (
			<Form
				size={`medium`}
				control={control}
				onReset={reset}
				submitLabel={`Update Profile`}
				onSubmit={async () => {}}>
				{({ control }) => (
					<FormContent
						title={`Profile Updated`}
						subTitle={`Your profile information has been saved`}
						success={`Your changes have been successfully saved. You can continue editing or close this form.`}>
						<FieldText
							name={`firstName`}
							label={`First Name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText name={`lastName`} label={`Last Name`} control={control} width={{ xs: 12, sm: 6 }} />
						<FieldText name={`email`} label={`Email`} control={control} width={{ xs: 12 }} />
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithMultipleErrors: Story = {
	render: () => {
		const { control, reset } = useForm({
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			},
		})

		return (
			<Form size={`medium`} control={control} onReset={reset} submitLabel={`Register`} onSubmit={async () => {}}>
				{({ control }) => (
					<FormContent
						title={`Registration Failed`}
						subTitle={`Please correct the errors below`}
						error={`We couldn't create your account. Please ensure all required fields are filled correctly and passwords match.`}>
						<FieldText
							name={`firstName`}
							label={`First Name`}
							placeholder={`Enter your first name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText
							name={`lastName`}
							label={`Last Name`}
							placeholder={`Enter your last name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText
							name={`email`}
							label={`Email Address`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 12 }}
						/>
						<FieldPassword
							name={`password`}
							label={`Password`}
							placeholder={`Enter your password`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldPassword
							name={`confirmPassword`}
							label={`Confirm Password`}
							placeholder={`Re-enter your password`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithInfoMessage: Story = {
	render: () => {
		const { control, reset } = useForm({
			defaultValues: {
				email: '',
			},
		})

		return (
			<Form
				size={`small`}
				control={control}
				onReset={reset}
				submitLabel={`Send Reset Link`}
				resetLabel={`Cancel`}
				onSubmit={async () => {}}>
				{({ control }) => (
					<FormContent
						title={`Reset Password`}
						subTitle={`Enter your email address and we'll send you a link to reset your password`}>
						<FieldText
							name={`email`}
							label={`Email Address`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 12 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const InteractiveFormWithMessages: Story = {
	render: () => {
		const [formState, setFormState] = useState<'idle' | 'error' | 'success'>('idle')
		const { control, reset } = useForm({
			defaultValues: {
				email: '',
				password: '',
			},
		})

		const handleSubmit = async () => {
			const randomOutcome = Math.random()
			if (randomOutcome > 0.5) {
				setFormState('success')
			} else {
				setFormState('error')
			}
		}

		const handleReset = () => {
			setFormState('idle')
			reset()
		}

		return (
			<Form
				size={`medium`}
				control={control}
				onReset={handleReset}
				submitLabel={`Sign In`}
				onSubmit={handleSubmit}>
				{({ control }) => (
					<FormContent
						title={`Welcome Back`}
						subTitle={`Sign in to your account to continue`}
						error={formState === 'error' ? `Authentication failed. Please try again.` : undefined}
						success={formState === 'success' ? `Login successful! Redirecting...` : undefined}>
						<FieldText
							name={`email`}
							label={`Email Address`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 12 }}
						/>
						<FieldPassword
							name={`password`}
							label={`Password`}
							placeholder={`Enter your password`}
							control={control}
							width={{ xs: 12 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithoutActions: Story = {
	render: () => {
		const { control, reset } = useForm({
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
			},
		})

		return (
			<Form size={`medium`} control={control} onReset={reset} hideActions={true} onSubmit={async () => {}}>
				{({ control }) => (
					<FormContent
						title={`Read-Only Form`}
						subTitle={`This form has no action buttons for demonstration purposes`}>
						<FieldText
							name={`firstName`}
							label={`First Name`}
							placeholder={`Enter your first name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText
							name={`lastName`}
							label={`Last Name`}
							placeholder={`Enter your last name`}
							control={control}
							width={{ xs: 12, sm: 6 }}
						/>
						<FieldText
							name={`email`}
							label={`Email`}
							placeholder={`Enter your email`}
							control={control}
							width={{ xs: 12 }}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithValuesPreview: Story = {
	render: () => {
		const { control, reset, watch } = useForm({
			defaultValues: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				phone: '+27123456789',
				birthDate: null,
				country: 'ZA',
				bio: 'I am a software developer passionate about creating user-friendly applications.',
				age: 30,
				newsletter: true,
				notifications: false,
				preferredContact: 'email',
				preferredTime: null,
			},
		})

		const watchedValues = watch()

		return (
			<Box sx={{ display: `flex`, flexDirection: `column`, gap: 2, minWidth: `600px` }}>
				<Form
					size={`medium`}
					control={control}
					onReset={reset}
					submitLabel={`Update Profile`}
					resetLabel={`Reset Form`}
					onSubmit={async () => {
						console.log('Form with preview submitted!', watchedValues)
					}}>
					{({ control }) => (
						<FormContent title={`Edit Profile`} subTitle={`Update your personal information below`}>
							<FieldText
								name={`firstName`}
								label={`First Name`}
								placeholder={`Enter your first name`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldText
								name={`lastName`}
								label={`Last Name`}
								placeholder={`Enter your last name`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldText
								name={`email`}
								label={`Email Address`}
								placeholder={`Enter your email`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldPhone
								name={`phone`}
								label={`Phone Number`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldDate
								name={`birthDate`}
								label={`Date of Birth`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldNumber
								name={`age`}
								label={`Age`}
								placeholder={`Enter your age`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldCountry
								name={`country`}
								label={`Country`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldSelect
								name={`preferredContact`}
								label={`Preferred Contact Method`}
								control={control}
								options={[
									{ value: 'email', label: 'Email' },
									{ value: 'phone', label: 'Phone' },
									{ value: 'sms', label: 'SMS' },
								]}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldTime
								name={`preferredTime`}
								label={`Preferred Contact Time`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldTextarea
								name={`bio`}
								label={`Biography`}
								placeholder={`Tell us about yourself...`}
								control={control}
								width={{ xs: 12 }}
							/>
							<FieldCheckbox
								name={`newsletter`}
								label={`Subscribe to Newsletter`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
							<FieldSwitch
								name={`notifications`}
								label={`Enable Notifications`}
								control={control}
								width={{ xs: 12, sm: 6 }}
							/>
						</FormContent>
					)}
				</Form>
				<Box
					sx={{
						p: 2,
						bgcolor: `#f5f5f5`,
						borderRadius: 1,
						fontSize: `14px`,
						fontFamily: `monospace`,
						maxHeight: `400px`,
						overflow: `auto`,
					}}>
					<strong>Form Values Preview:</strong>
					<pre>{JSON.stringify(watchedValues, null, 2)}</pre>
				</Box>
			</Box>
		)
	},
}
