import { random, startCase } from '../../../lib'
import { Box, FormControl, FormLabel, Grid, type GridBaseProps, type SxProps, type Theme } from '@mui/material'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Button } from '../../button'
import { IconButton } from '../../button-icon'
import { Icon } from '../../icon'

export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	placeholder?: string
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	onChange?: (_value: TGeneric) => void
	width?: GridBaseProps['size']
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	label,
	hint,
	placeholder,
	control,
	rules,
	onChange: externalOnChange,
	width = { xs: 12, sm: 12 },
	testId,
}) => {
	const {
		field: { value, onChange, ref },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Heading.configure({ levels: [1, 2, 3] }),
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			HorizontalRule,
			Link,
			Highlight,
		],
		content: value || '',
		editorProps: {
			attributes: {
				placeholder: placeholder ?? `Enter ${label ?? name}`,
				autoComplete: random(),
				class: 'min-h-[200px] border border-gray-300 rounded-md p-4 focus:outline-none',
			},
		},
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			onChange(html)
			if (typeof externalOnChange === 'function') {
				externalOnChange(html)
			}
		},
	})

	React.useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || '')
		}
	}, [editor, value])

	const size = '32px'
	const sx = {
		width: size,
		height: size,
		minWidth: size,
		minHeight: size,
		maxWidth: size,
		maxHeight: size,
	} as SxProps<Theme>
	const iconText = { fontSize: 14, fontWeight: 400 }

	return (
		<Grid size={width}>
			<FormControl fullWidth error={hasError} variant={`outlined`}>
				{label && <FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>}
				{hint && <Box sx={{ mb: 1, fontSize: '0.875rem' }}>{hint}</Box>}
				<Box
					className={`--cs-rich-text-editor`}
					sx={{
						border: '1px solid',
						borderColor: hasError ? 'error.main' : 'divider',
						borderRadius: 1.2,
					}}>
					{editor && (
						<Box
							bgcolor={`bg.light`}
							sx={{
								borderRadius: 0,
								display: 'flex',
								flexWrap: 'wrap',
								flexDirection: 'row',
								alignItems: 'center',
								borderBottom: '1px solid',
								borderColor: 'divider',
								gap: 1,
								p: 1,
							}}>
							<IconButton sx={sx} size={`small`} onClick={() => editor.chain().focus().undo().run()}>
								<Icon name={`Undo`} size={20} />
							</IconButton>
							<IconButton sx={sx} size={`small`} onClick={() => editor.chain().focus().redo().run()}>
								<Icon name={`Redo`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('bold') ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleBold().run()}>
								<Icon name={`Bold`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('italic') ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleItalic().run()}>
								<Icon name={`Italic`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('underline') ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleUnderline().run()}>
								<Icon name={`Underline`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('strike') ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleStrike().run()}>
								<Icon name={`Strikethrough`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
								<Box component={`span`} sx={iconText}>
									H1
								</Box>
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
								<Box component={`span`} sx={iconText}>
									H2
								</Box>
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
								<Box component={`span`} sx={iconText}>
									H3
								</Box>
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								className={editor.isActive('bulletList') ? 'bg-gray-200 rounded' : ''}
								onClick={() => editor.chain().focus().toggleBulletList().run()}>
								<Icon name={`List`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('orderedList') ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleOrderedList().run()}>
								<Icon name={`ListOrdered`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								color={editor.isActive('blockquote') ? 'primary' : 'default'}
								onClick={() => editor.chain().focus().toggleBlockquote().run()}>
								<Icon name={`Quote`} size={20} />
							</IconButton>
							<IconButton
								sx={sx}
								size={`small`}
								onClick={() => editor.chain().focus().setHorizontalRule().run()}>
								<Box component={`span`} sx={iconText}>
									HR
								</Box>
							</IconButton>

							<Button sx={sx} size={`small`} onClick={() => editor.chain().focus().clearNodes().run()}>
								<Box component={`span`} sx={iconText}>
									Clear
								</Box>
							</Button>
						</Box>
					)}
					<Box>
						<Box
							sx={{
								px: 1,
								'& .ProseMirror': {
									border: 'none',
									'& code': {
										bgcolor: `bg.main`,
										borderRadius: '4px',
										fontSize: '0.875em',
										padding: '4px',
									},
									'& ul, & ol': {
										marginLeft: '16px',
									},
									'& li': {
										marginBottom: '2px',
									},
								},
							}}>
							<EditorContent
								data-test-id={testId ?? `id-wallet-field-textarearich`}
								editor={editor}
								ref={ref}
							/>
						</Box>
						{editor && (
							<React.Fragment>
								<FloatingMenu editor={editor}>
									<div className={`p-2 bg-white shadow border rounded`}>Floating</div>
								</FloatingMenu>
								<BubbleMenu editor={editor}>
									<div className={`p-2 bg-white shadow border rounded`}>Bubble</div>
								</BubbleMenu>
							</React.Fragment>
						)}
					</Box>
				</Box>
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldTextarearich'
