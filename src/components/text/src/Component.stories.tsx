import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as Text } from './Component'

const meta = {
	title: 'Components/Text',
	component: Text,
	parameters: {
		layout: `centered`,
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: `select`,
			options: [
				`h1`,
				`h2`,
				`h3`,
				`h4`,
				`h5`,
				`h6`,
				`subtitle1`,
				`subtitle2`,
				`body1`,
				`body2`,
				`caption`,
				`overline`,
				`button`,
			],
		},
		fontSize: { control: `text` },
		fontWeight: { control: `text` },
		fontFamily: { control: `text` },
		fontStyle: {
			control: `select`,
			options: [`normal`, `italic`, `oblique`],
		},
		lineHeight: { control: `text` },
		letterSpacing: { control: `text` },
		textAlign: {
			control: `select`,
			options: [`left`, `center`, `right`, `justify`, `inherit`],
		},
		textTransform: {
			control: `select`,
			options: [`none`, `capitalize`, `uppercase`, `lowercase`],
		},
		textDecoration: { control: `text` },
		color: { control: `color` },
		noWrap: { control: `boolean` },
		gutterBottom: { control: `boolean` },
	},
	args: {
		children: `The quick brown fox jumps over the lazy dog`,
	},
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		variant: `body1`,
	},
}

export const Headings: Story = {
	render: () => (
		<Stack spacing={2}>
			<Text variant={`h1`}>Heading 1</Text>
			<Text variant={`h2`}>Heading 2</Text>
			<Text variant={`h3`}>Heading 3</Text>
			<Text variant={`h4`}>Heading 4</Text>
			<Text variant={`h5`}>Heading 5</Text>
			<Text variant={`h6`}>Heading 6</Text>
		</Stack>
	),
}

export const BodyVariants: Story = {
	render: () => (
		<Stack spacing={2}>
			<Text variant={`body1`}>Body 1 — primary paragraph text, used for most content.</Text>
			<Text variant={`body2`}>Body 2 — secondary paragraph text, slightly smaller.</Text>
			<Text variant={`subtitle1`}>Subtitle 1 — section label or supporting headline.</Text>
			<Text variant={`subtitle2`}>Subtitle 2 — smaller supporting headline.</Text>
			<Text variant={`caption`}>Caption — small supplementary text.</Text>
			<Text variant={`overline`}>Overline — uppercase label above a section.</Text>
			<Text variant={`button`}>Button label text</Text>
		</Stack>
	),
}

export const FontSizes: Story = {
	render: () => (
		<Stack spacing={1}>
			{[10, 12, 14, 16, 20, 24, 32, 48].map((size) => (
				<Text key={size} fontSize={size}>{`${size}px — The quick brown fox`}</Text>
			))}
		</Stack>
	),
}

export const FontWeights: Story = {
	render: () => (
		<Stack spacing={1}>
			{[100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
				<Text key={weight} fontWeight={weight}>{`Weight ${weight} — The quick brown fox`}</Text>
			))}
		</Stack>
	),
}

export const Colors: Story = {
	render: () => (
		<Stack spacing={1}>
			<Text color={`text.primary`}>text.primary — main body color</Text>
			<Text color={`text.secondary`}>text.secondary — muted label color</Text>
			<Text color={`primary.main`}>primary.main</Text>
			<Text color={`secondary.main`}>secondary.main</Text>
			<Text color={`error.main`}>error.main</Text>
			<Text color={`warning.main`}>warning.main</Text>
			<Text color={`info.main`}>info.main</Text>
			<Text color={`success.main`}>success.main</Text>
		</Stack>
	),
}

export const TextTransforms: Story = {
	render: () => (
		<Stack spacing={1}>
			<Text textTransform={`none`}>none — The quick brown fox</Text>
			<Text textTransform={`capitalize`}>capitalize — The quick brown fox</Text>
			<Text textTransform={`uppercase`}>uppercase — The quick brown fox</Text>
			<Text textTransform={`lowercase`}>LOWERCASE — THE QUICK BROWN FOX</Text>
		</Stack>
	),
}

export const TextAlignments: Story = {
	parameters: { layout: `padded` },
	render: () => (
		<Stack spacing={2} width={400}>
			<Text textAlign={`left`}>Left aligned text across multiple characters.</Text>
			<Text textAlign={`center`}>Center aligned text across multiple characters.</Text>
			<Text textAlign={`right`}>Right aligned text across multiple characters.</Text>
			<Text textAlign={`justify`}>
				Justified text — the spacing between words is adjusted so that the text aligns with both the left and
				right margins.
			</Text>
		</Stack>
	),
}

export const FontStyles: Story = {
	render: () => (
		<Stack spacing={1}>
			<Text fontStyle={`normal`}>Normal — The quick brown fox</Text>
			<Text fontStyle={`italic`}>Italic — The quick brown fox</Text>
			<Text fontStyle={`oblique`}>Oblique — The quick brown fox</Text>
		</Stack>
	),
}

export const Decorations: Story = {
	render: () => (
		<Stack spacing={1}>
			<Text textDecoration={`underline`}>Underlined text</Text>
			<Text textDecoration={`line-through`}>Strikethrough text</Text>
			<Text textDecoration={`underline line-through`}>Underline and strikethrough</Text>
			<Text textDecoration={`none`}>No decoration</Text>
		</Stack>
	),
}

export const LetterSpacing: Story = {
	render: () => (
		<Stack spacing={1}>
			<Text letterSpacing={-1}>{`letterSpacing: -1`}</Text>
			<Text letterSpacing={0}>{`letterSpacing: 0`}</Text>
			<Text letterSpacing={2}>{`letterSpacing: 2`}</Text>
			<Text letterSpacing={4}>{`letterSpacing: 4`}</Text>
			<Text letterSpacing={8}>{`letterSpacing: 8`}</Text>
		</Stack>
	),
}

export const LineHeight: Story = {
	parameters: { layout: `padded` },
	render: () => (
		<Stack spacing={3} width={360}>
			<Text lineHeight={1}>lineHeight 1 — The quick brown fox jumps over the lazy dog beside the river.</Text>
			<Text lineHeight={1.5}>lineHeight 1.5 — The quick brown fox jumps over the lazy dog beside the river.</Text>
			<Text lineHeight={2}>lineHeight 2 — The quick brown fox jumps over the lazy dog beside the river.</Text>
			<Text lineHeight={3}>lineHeight 3 — The quick brown fox jumps over the lazy dog beside the river.</Text>
		</Stack>
	),
}

export const NoWrap: Story = {
	parameters: { layout: `padded` },
	render: () => (
		<Stack spacing={2} width={200}>
			<Text noWrap>noWrap — This long text will be clipped and not wrap to a second line.</Text>
			<Text>Default — This long text will wrap naturally onto a second line.</Text>
		</Stack>
	),
}

export const CustomFontFamily: Story = {
	render: () => (
		<Stack spacing={1}>
			<Text fontFamily={`Geist`}>Geist — label and numerics font</Text>
			<Text fontFamily={`Mabry Pro`}>Mabry Pro — body and regular font</Text>
			<Text fontFamily={`Charlie Display`}>Charlie Display — bold display font</Text>
			<Text fontFamily={`Wise Sans`}>Wise Sans — display headline font</Text>
		</Stack>
	),
}

export const GutterBottom: Story = {
	render: () => (
		<Stack>
			<Text gutterBottom variant={`h5`}>
				Heading with gutterBottom
			</Text>
			<Text variant={`body1`}>
				This paragraph immediately follows the heading and benefits from the extra spacing below it.
			</Text>
		</Stack>
	),
}
