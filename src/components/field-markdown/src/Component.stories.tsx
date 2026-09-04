import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import type { Meta } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import type { TGeneric } from '../../../types/generics'
import { Form, FormContent } from '../../form'
import { Component as FieldMarkdown } from './Component'

const meta = {
	title: 'Form Fields/Field Markdown',
	component: FieldMarkdown,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		name: { control: 'text' },
		label: { control: 'text' },
		placeholder: { control: 'text' },
		hint: { control: 'text' },
		readOnly: { control: 'boolean' },
		autoFocus: { control: 'boolean' },
		minHeight: { control: 'number' },
		enableFrontmatter: { control: 'boolean' },
		enableDiffSource: { control: 'boolean' },
		enableTable: { control: 'boolean' },
		enableImage: { control: 'boolean' },
		enableLink: { control: 'boolean' },
		enableCodeBlock: { control: 'boolean' },
	},
} satisfies Meta<typeof FieldMarkdown>

export default meta

const kitchenSink = `---
title: Welcome to MDX Editor
author: Infomentor
---

# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

> A blockquote with some *emphasized* text and a [link](https://mdxeditor.dev).

## Lists

- Bullet item one
- Bullet item two
  - Nested item
- Bullet item three

1. Numbered one
2. Numbered two
3. Numbered three

## Table

| Feature | Supported |
| ------- | --------- |
| Headings | Yes |
| Lists    | Yes |
| Tables   | Yes |
| Code     | Yes |

## Code block

\`\`\`tsx
import React from 'react'

export const Hello = () => <h1>Hello world</h1>
\`\`\`

## Image

![Picsum](https://picsum.photos/600/300)

---

Use the diff/source toggle in the toolbar to view the raw markdown.
`

export const Default = {
	render: () => {
		const validationSchema = yup.object().shape({
			content: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { content: `# Hello world\n\nStart typing your markdown here...` },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`content`}
							label={`Markdown Content`}
							placeholder={`Write some markdown...`}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const KitchenSink = {
	render: () => {
		const validationSchema = yup.object().shape({
			doc: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { doc: kitchenSink },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`doc`}
							label={`Kitchen Sink`}
							hint={`Every feature enabled: headings, lists, quotes, links, images, tables, code, admonitions, frontmatter, diff/source.`}
							control={control}
							minHeight={420}
						/>
						<Box component={`pre`} sx={{ maxHeight: 240, overflow: 'auto' }}>
							{JSON.stringify(formValues, null, 2)}
						</Box>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithHints = {
	render: () => {
		const validationSchema = yup.object().shape({
			intro: yup.string().required(`This field is required`),
			body: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				intro: ``,
				body: `## Section\n\nWrite the body content here.`,
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`intro`}
							label={`Introduction`}
							placeholder={`Write a short introduction...`}
							hint={`Use the toolbar to format text, insert images, links, tables, and code blocks.`}
							control={control}
						/>
						<FieldMarkdown
							name={`body`}
							label={`Main Body`}
							placeholder={`Write the article body...`}
							hint={`This field comes pre-populated with markdown.`}
							control={control}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const ReadOnly = {
	render: () => {
		const validationSchema = yup.object().shape({
			readOnlyContent: yup.string(),
		} as TGeneric)

		const { control, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { readOnlyContent: kitchenSink },
		})

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`readOnlyContent`}
							label={`Read Only Markdown`}
							hint={`This editor is read-only — the toolbar still allows source/diff toggling.`}
							control={control}
							readOnly={true}
							minHeight={420}
						/>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const MinimalToolbar = {
	render: () => {
		const validationSchema = yup.object().shape({
			simple: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { simple: `# Just the basics\n\nNo tables, no images, no code blocks.` },
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`simple`}
							label={`Minimal Markdown`}
							hint={`Only text formatting and lists are enabled.`}
							control={control}
							enableTable={false}
							enableImage={false}
							enableCodeBlock={false}
							enableFrontmatter={false}
							enableDiffSource={false}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithImageUpload = {
	render: () => {
		const validationSchema = yup.object().shape({
			gallery: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				gallery: `## Gallery\n\nUse the image button to upload an image. The handler below returns a random Picsum URL.\n\n![Sample](https://picsum.photos/600/300)`,
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		const imageUploadHandler = async (image: File): Promise<string> => {
			console.log('Uploading', image.name, image.size)
			await new Promise((resolve) => setTimeout(resolve, 600))
			return `https://picsum.photos/seed/${encodeURIComponent(image.name)}/600/400`
		}

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`gallery`}
							label={`Gallery`}
							hint={`Custom image upload handler — simulates a network upload.`}
							control={control}
							imageUploadHandler={imageUploadHandler}
							imageAutocompleteSuggestions={[
								`https://picsum.photos/seed/one/600/400`,
								`https://picsum.photos/seed/two/600/400`,
								`https://picsum.photos/seed/three/600/400`,
							]}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithCustomCodeLanguages = {
	render: () => {
		const validationSchema = yup.object().shape({
			snippet: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				snippet: `## Snippet\n\n\`\`\`ts\nconst greet = (name: string) => \`Hello, \${name}!\`\n\`\`\``,
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`snippet`}
							label={`Code Snippet`}
							hint={`Limited language palette: TS, JS, Bash, Plain Text.`}
							control={control}
							defaultCodeBlockLanguage={`ts`}
							codeBlockLanguages={{
								ts: `TypeScript`,
								js: `JavaScript`,
								bash: `Bash`,
								txt: `Plain Text`,
							}}
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
			summary: yup.string().required(`This field is required`),
			content: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				title: `## Release Notes — v1.2.0`,
				summary: `*Highlights from this release cycle.*`,
				content: `### Changes\n\n- Added markdown editor\n- Improved form validation\n- Bug fixes\n\n> Thanks to all contributors!`,
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`title`}
							label={`Title`}
							control={control}
							minHeight={120}
							enableTable={false}
							enableImage={false}
							enableCodeBlock={false}
							enableFrontmatter={false}
							enableDiffSource={false}
						/>
						<FieldMarkdown name={`summary`} label={`Summary`} control={control} minHeight={120} />
						<FieldMarkdown name={`content`} label={`Content`} control={control} minHeight={260} />
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const WithFrontmatter = {
	render: () => {
		const validationSchema = yup.object().shape({
			post: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				post: `---
title: My First Post
draft: false
tags:
  - markdown
  - editor
---

# Post body

Edit the frontmatter using the toolbar button.`,
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`post`}
							label={`Blog Post`}
							hint={`Click the frontmatter button in the toolbar to edit the YAML front-matter.`}
							control={control}
							minHeight={360}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}

export const DiffSource = {
	render: () => {
		const validationSchema = yup.object().shape({
			article: yup.string().required(`This field is required`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: {
				article: `# Compare modes\n\nUse the toolbar control on the right to switch between **Rich Text**, **Source**, and **Diff** modes.`,
			},
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`article`}
							label={`Article`}
							hint={`Toggle the rich-text / source / diff view from the toolbar.`}
							control={control}
							minHeight={320}
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
			required: yup
				.string()
				.required(`Markdown content is required`)
				.min(20, `Content must be at least 20 characters`),
		} as TGeneric)

		const { control, watch, handleSubmit } = useForm({
			resolver: yupResolver(validationSchema),
			defaultValues: { required: `` },
			mode: 'onTouched',
		})

		const formValues = watch()

		const onSubmit = handleSubmit(async (data) => {
			console.log('Form submitted:', data)
		})

		return (
			<Form size={`full`} control={control} onSubmit={onSubmit}>
				{() => (
					<FormContent>
						<FieldMarkdown
							name={`required`}
							label={`Required Markdown`}
							placeholder={`Type at least 20 characters...`}
							hint={`Submit the form to trigger validation.`}
							control={control}
							rules={{ required: true }}
						/>
						<pre>{JSON.stringify(formValues, null, 2)}</pre>
					</FormContent>
				)}
			</Form>
		)
	},
}
