import { yupResolver } from '@hookform/resolvers/yup'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldTextarearich } from './Component'

const meta = {
	title: 'Form Fields/Field Textarearich',
	component: FieldTextarearich,
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
		hint: {
			control: 'text',
		},
	},
} satisfies Meta<typeof FieldTextarearich>

export default meta

export const Default = {
	render: () => {
		const validationSchema = yup.object().shape({
			richTextField: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { richTextField: `` },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`small`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldTextarearich
							name={`richTextField`}
							label={`Rich Text Editor`}
							placeholder={`Enter your content with formatting...`}
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
		const validationSchema = yup.object().shape({
			fieldWithHint: yup.string().required(`This field is required`),
			prefilledContent: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				fieldWithHint: ``,
				prefilledContent: `<h2>Welcome to Rich Text</h2><p>This field has some <strong>pre-filled content</strong> with <em>formatting</em>.</p><ul><li>Bullet point one</li><li>Bullet point two</li></ul>`,
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
						<FieldTextarearich
							name={`fieldWithHint`}
							label={`Rich Text with Hint`}
							placeholder={`Start typing and use the toolbar for formatting...`}
							hint={`Use the toolbar above to format your text with bold, italic, headings, lists, and more.`}
							control={control}
						/>
						<FieldTextarearich
							name={`prefilledContent`}
							label={`Pre-filled Content`}
							placeholder={`This field has pre-filled content...`}
							hint={`This field demonstrates how existing HTML content is rendered`}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const FormattingShowcase = {
	render: () => {
		const validationSchema = yup.object().shape({
			formattingDemo: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				formattingDemo: `<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, <u>underlined text</u>, and <s>strikethrough text</s>.</p><blockquote>This is a blockquote for important information or quotes.</blockquote><ul><li>First bullet point</li><li>Second bullet point with <strong>formatting</strong></li><li>Third bullet point</li></ul><ol><li>First numbered item</li><li>Second numbered item</li><li>Third numbered item</li></ol><hr><p>Content after a horizontal rule.</p>`,
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
						<FieldTextarearich
							name={`formattingDemo`}
							label={`Formatting Showcase`}
							hint={`This demonstrates all available formatting options: headings, bold, italic, underline, strikethrough, lists, blockquotes, and horizontal rules.`}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const MultipleEditors = {
	render: () => {
		const validationSchema = yup.object().shape({
			title: yup.string().required(`This field is required`),
			introduction: yup.string().required(`This field is required`),
			mainContent: yup.string().required(`This field is required`),
			conclusion: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				title: `<h2>Article Title</h2>`,
				introduction: `<p>This is the introduction paragraph where you can provide an overview of the content.</p>`,
				mainContent: `<p>Main content goes here. You can use all formatting features:</p><ul><li><strong>Bold text</strong> for emphasis</li><li><em>Italic text</em> for style</li><li><u>Underlined text</u> for highlights</li></ul>`,
				conclusion: `<p>Conclusion and final thoughts...</p>`,
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
						<FieldTextarearich
							name={`title`}
							label={`Article Title`}
							placeholder={`Enter the article title...`}
							hint={`Use heading styles for the title`}
							control={control}
						/>
						<FieldTextarearich
							name={`introduction`}
							label={`Introduction`}
							placeholder={`Write a compelling introduction...`}
							hint={`Keep it concise and engaging`}
							control={control}
						/>
						<FieldTextarearich
							name={`mainContent`}
							label={`Main Content`}
							placeholder={`Write the main content here...`}
							hint={`Use formatting to structure your content effectively`}
							control={control}
						/>
						<FieldTextarearich
							name={`conclusion`}
							label={`Conclusion`}
							placeholder={`Wrap up your article...`}
							hint={`Summarize key points and provide closure`}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const EmailComposer = {
	render: () => {
		const validationSchema = yup.object().shape({
			subject: yup.string().required(`This field is required`),
			emailBody: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				subject: `Meeting Follow-up`,
				emailBody: `<p>Dear Team,</p><p>Thank you for attending today's meeting. Here are the key points we discussed:</p><ul><li><strong>Project Timeline:</strong> Q2 delivery confirmed</li><li><strong>Budget Allocation:</strong> Approved for next quarter</li><li><strong>Next Steps:</strong> Schedule follow-up meetings</li></ul><p>Please let me know if you have any questions.</p><p>Best regards,<br><em>Your Name</em></p>`,
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
						<FieldTextarearich
							name={`emailBody`}
							label={`Email Content`}
							placeholder={`Compose your email...`}
							hint={`Use formatting to make your email clear and professional`}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const BlogEditor = {
	render: () => {
		const validationSchema = yup.object().shape({
			blogPost: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				blogPost: `<h1>How to Write Great Content</h1><p><em>Published on ${new Date().toLocaleDateString()}</em></p><h2>Introduction</h2><p>Writing great content requires attention to several key factors...</p><h3>Key Principles</h3><ol><li><strong>Clarity:</strong> Make your message clear and concise</li><li><strong>Structure:</strong> Use headings and lists to organize content</li><li><strong>Engagement:</strong> Keep readers interested throughout</li></ol><blockquote>Great content doesn't happen by accident - it's the result of careful planning and execution.</blockquote><h3>Best Practices</h3><ul><li>Use <strong>bold</strong> for important points</li><li>Add <em>emphasis</em> where needed</li><li>Break up long paragraphs</li><li>Include relevant examples</li></ul><hr><h2>Conclusion</h2><p>By following these guidelines, you'll be well on your way to creating content that resonates with your audience.</p>`,
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
						<FieldTextarearich
							name={`blogPost`}
							label={`Blog Post Content`}
							placeholder={`Start writing your blog post...`}
							hint={`Create engaging blog content with proper formatting and structure`}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}
