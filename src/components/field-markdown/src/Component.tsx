import { startCase } from '../../../lib'
import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	ChangeCodeMirrorLanguage,
	CodeToggle,
	ConditionalContents,
	CreateLink,
	DiffSourceToggleWrapper,
	InsertCodeBlock,
	InsertFrontmatter,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	ListsToggle,
	MDXEditor,
	Separator,
	StrikeThroughSupSubToggles,
	UndoRedo,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	type EditorInFocus,
	type IconKey,
	type MDXEditorMethods,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { Box, FormControl, FormHelperText, FormLabel, Grid, type GridBaseProps } from '@mui/material'
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	Check,
	ChevronDown,
	Code,
	Columns,
	Copy,
	ExternalLink,
	FileCode,
	FileText,
	GitCompareArrows,
	Highlighter,
	Image as ImageIcon,
	Info,
	Italic,
	LayoutDashboard,
	Link as LinkIcon,
	List,
	ListChecks,
	ListOrdered,
	Minus,
	MoreHorizontal,
	MoreVertical,
	PenLine,
	Plus,
	Redo2,
	Rows,
	Settings,
	SquarePen,
	Strikethrough,
	Subscript,
	Superscript,
	Table as TableIcon,
	Trash,
	Trash2,
	Type,
	Underline,
	Undo2,
	Unlink,
	X,
	type LucideIcon,
} from 'lucide-react'
import React from 'react'
import { useController, useFormState, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
export interface IComponentProps {
	name: string
	label?: string
	hint?: string
	placeholder?: string
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	onChange?: (_value: string) => void
	width?: GridBaseProps['size']
	readOnly?: boolean
	autoFocus?: boolean
	minHeight?: number | string
	imageUploadHandler?: (_image: File) => Promise<string>
	imageAutocompleteSuggestions?: string[]
	codeBlockLanguages?: Record<string, string>
	defaultCodeBlockLanguage?: string
	enableFrontmatter?: boolean
	enableDiffSource?: boolean
	enableTable?: boolean
	enableImage?: boolean
	enableLink?: boolean
	enableCodeBlock?: boolean
	testId?: string
}

const lucideIconMap: Partial<Record<IconKey, LucideIcon>> = {
	undo: Undo2,
	redo: Redo2,
	format_bold: Bold,
	format_italic: Italic,
	format_underlined: Underline,
	code: Code,
	strikeThrough: Strikethrough,
	superscript: Superscript,
	subscript: Subscript,
	format_list_bulleted: List,
	format_list_numbered: ListOrdered,
	format_list_checked: ListChecks,
	format_highlight: Highlighter,
	link: LinkIcon,
	add_photo: ImageIcon,
	table: TableIcon,
	horizontal_rule: Minus,
	frontmatter: FileText,
	frame_source: FileCode,
	arrow_drop_down: ChevronDown,
	admonition: Info,
	rich_text: PenLine,
	difference: GitCompareArrows,
	markdown: SquarePen,
	open_in_new: ExternalLink,
	link_off: Unlink,
	edit: PenLine,
	content_copy: Copy,
	more_horiz: MoreHorizontal,
	more_vert: MoreVertical,
	close: X,
	settings: Settings,
	delete_big: Trash2,
	delete_small: Trash,
	format_align_center: AlignCenter,
	format_align_left: AlignLeft,
	format_align_right: AlignRight,
	add_row: Rows,
	add_column: Columns,
	insert_col_left: Columns,
	insert_col_right: Columns,
	insert_row_above: Rows,
	insert_row_below: Rows,
	check: Check,
}

const fallbackIconFor = (name: IconKey): LucideIcon | null => {
	switch (name) {
		case `more_horiz`:
		case `more_vert`:
			return Plus
		default:
			return Type
	}
}

const iconComponentFor = (name: IconKey) => {
	const LucideIconComponent = lucideIconMap[name] ?? fallbackIconFor(name) ?? LayoutDashboard
	return <LucideIconComponent size={16} strokeWidth={1.6} />
}

const defaultCodeBlockLanguages: Record<string, string> = {
	js: `JavaScript`,
	jsx: `JavaScript (React)`,
	ts: `TypeScript`,
	tsx: `TypeScript (React)`,
	css: `CSS`,
	html: `HTML`,
	json: `JSON`,
	md: `Markdown`,
	bash: `Bash`,
	sh: `Shell`,
	py: `Python`,
	go: `Go`,
	rs: `Rust`,
	sql: `SQL`,
	yaml: `YAML`,
	txt: `Plain Text`,
	'': `Unspecified`,
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
	readOnly = false,
	autoFocus = false,
	minHeight = 240,
	imageUploadHandler,
	imageAutocompleteSuggestions,
	codeBlockLanguages = defaultCodeBlockLanguages,
	defaultCodeBlockLanguage = ``,
	enableFrontmatter = true,
	enableDiffSource = true,
	enableTable = true,
	enableImage = true,
	enableLink = true,
	enableCodeBlock = true,
	testId,
}) => {
	const editorRef = React.useRef<MDXEditorMethods>(null)

	const {
		field: { value, onChange },
		fieldState: { error, isTouched },
	} = useController({ name, control, rules })

	const { submitCount } = useFormState({ control })
	const hasError = Boolean(error?.message) && (submitCount > 0 || isTouched)

	React.useEffect(() => {
		if (editorRef.current && typeof value === 'string' && value !== editorRef.current.getMarkdown()) {
			editorRef.current.setMarkdown(value)
		}
	}, [value])

	const handleChange = React.useCallback(
		(next: string) => {
			onChange(next)
			if (typeof externalOnChange === 'function') {
				externalOnChange(next)
			}
		},
		[onChange, externalOnChange]
	)

	const plugins = React.useMemo(() => {
		const list = [
			headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
			listsPlugin(),
			quotePlugin(),
			thematicBreakPlugin(),
		]

		if (enableLink) {
			list.push(linkPlugin())
			list.push(linkDialogPlugin())
		}

		if (enableImage) {
			list.push(
				imagePlugin({
					imageAutocompleteSuggestions,
					imageUploadHandler:
						imageUploadHandler ?? (async () => Promise.resolve(`https://picsum.photos/600/400`)),
				})
			)
		}

		if (enableTable) {
			list.push(tablePlugin())
		}

		if (enableFrontmatter) {
			list.push(frontmatterPlugin())
		}

		if (enableCodeBlock) {
			list.push(codeBlockPlugin({ defaultCodeBlockLanguage }))
			list.push(codeMirrorPlugin({ codeBlockLanguages }))
		}

		if (enableDiffSource) {
			list.push(diffSourcePlugin({ viewMode: `rich-text`, diffMarkdown: typeof value === 'string' ? value : `` }))
		}

		list.push(
			toolbarPlugin({
				toolbarContents: () => (
					<DiffSourceToggleWrapper>
						<ConditionalContents
							options={[
								{
									when: (editor: EditorInFocus | null) => editor?.editorType === `codeblock`,
									contents: () => <ChangeCodeMirrorLanguage />,
								},
								{
									fallback: () => (
										<React.Fragment>
											<UndoRedo />
											<Separator />
											<BoldItalicUnderlineToggles />
											<CodeToggle />
											<Separator />
											<StrikeThroughSupSubToggles />
											<Separator />
											<ListsToggle />
											<Separator />
											<BlockTypeSelect />
											<Separator />
											{enableLink && <CreateLink />}
											{enableImage && <InsertImage />}
											<Separator />
											{enableTable && <InsertTable />}
											<InsertThematicBreak />
											{enableCodeBlock && (
												<React.Fragment>
													<Separator />
													<InsertCodeBlock />
												</React.Fragment>
											)}
											{enableFrontmatter && (
												<React.Fragment>
													<Separator />
													<InsertFrontmatter />
												</React.Fragment>
											)}
										</React.Fragment>
									),
								},
							]}
						/>
					</DiffSourceToggleWrapper>
				),
			})
		)

		return list
	}, [
		enableLink,
		enableImage,
		enableTable,
		enableFrontmatter,
		enableCodeBlock,
		enableDiffSource,
		imageAutocompleteSuggestions,
		imageUploadHandler,
		codeBlockLanguages,
		defaultCodeBlockLanguage,
		value,
	])

	return (
		<Grid size={width}>
			<FormControl fullWidth error={hasError} variant={`outlined`}>
				{label && <FormLabel htmlFor={name}>{label ?? startCase(name)}</FormLabel>}
				{hint && !hasError && <Box sx={{ mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>{hint}</Box>}
				<Box
					data-test-id={testId ?? `id-wallet-field-markdown`}
					className={`--cs-markdown-editor`}
					sx={{
						border: '1px solid',
						borderColor: hasError ? 'error.main' : 'divider',
						borderRadius: 1.2,
						overflow: 'hidden',
						'& .mdxeditor': {
							bgcolor: 'background.paper',
						},
						'& .mdxeditor-toolbar': {
							bgcolor: 'bg.light',
							borderBottom: '1px solid',
							borderColor: 'divider',
							borderRadius: 0,
						},
						'& .mdxeditor-toolbar button, & .mdxeditor-toolbar button[data-state="on"], & .mdxeditor-toolbar button[data-state="open"], & .mdxeditor-toolbar button:active, & .mdxeditor-toolbar button:hover':
							{
								background: 'transparent',
								backgroundColor: 'transparent',
							},
						'& .mdxeditor-root-contenteditable': {
							minHeight,
						},
						'& .mdxeditor-root-contenteditable [contenteditable=true]': {
							minHeight,
							padding: '12px 16px',
							outline: 'none',
						},
					}}>
					<MDXEditor
						ref={editorRef}
						markdown={typeof value === 'string' ? value : ``}
						onChange={handleChange}
						placeholder={placeholder ?? `Enter ${label ?? startCase(name)}`}
						readOnly={readOnly}
						autoFocus={autoFocus}
						plugins={plugins}
						iconComponentFor={iconComponentFor}
						contentEditableClassName={`mdx-content-editable`}
					/>
				</Box>
				{hasError && <FormHelperText>{error?.message}</FormHelperText>}
			</FormControl>
		</Grid>
	)
}

Component.displayName = 'FieldMarkdown'
