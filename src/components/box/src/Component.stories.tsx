import type { Meta } from '@storybook/react-vite'
import { Component as Box } from './Component'

const meta = {
	title: 'Components/Box',
	component: Box,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: {
			control: 'color',
		},
		sx: {
			control: 'object',
		},
	},
} satisfies Meta<typeof Box>

export default meta

export const Default = {
	args: {
		backgroundColor: '#f5f5f5',
		fullWidth: false,
		children: 'This is content inside a Box',
	},
	render: (args: any) => (
		<Box {...args} sx={{ padding: 2, border: '1px solid #ddd' }}>
			{args.children}
		</Box>
	),
}

export const BackgroundVariants = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			<Box backgroundColor={`#e3f2fd`} sx={{ padding: 2, border: '1px solid #ddd' }}>
				Blue Background
			</Box>
			<Box backgroundColor={`#f3e5f5`} sx={{ padding: 2, border: '1px solid #ddd' }}>
				Purple Background
			</Box>
			<Box backgroundColor={`#e8f5e8`} sx={{ padding: 2, border: '1px solid #ddd' }}>
				Green Background
			</Box>
			<Box backgroundColor={`#fff3e0`} sx={{ padding: 2, border: '1px solid #ddd' }}>
				Orange Background
			</Box>
		</div>
	),
}

export const LayoutExamples = {
	render: () => (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Box width={`100%`} backgroundColor={`#f5f5f5`} sx={{ padding: 2, textAlign: 'center' }}>
				Full Width Box
			</Box>
			<div style={{ display: 'flex', gap: '16px' }}>
				<Box
					backgroundColor={`#e3f2fd`}
					sx={{
						padding: 2,
						flex: 1,
						textAlign: 'center',
						borderRadius: 1,
					}}>
					Flex Box 1
				</Box>
				<Box
					backgroundColor={`#f3e5f5`}
					sx={{
						padding: 2,
						flex: 1,
						textAlign: 'center',
						borderRadius: 1,
					}}>
					Flex Box 2
				</Box>
			</div>
		</div>
	),
}

export const WithMuiSxProps = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			<Box
				backgroundColor={`#f5f5f5`}
				sx={{
					padding: 3,
					borderRadius: 2,
					boxShadow: 1,
					border: '1px solid #ddd',
				}}>
				Rounded with Shadow
			</Box>
			<Box
				backgroundColor={`#e3f2fd`}
				sx={{
					padding: 2,
					borderLeft: '4px solid #2196f3',
					backgroundColor: '#e3f2fd',
				}}>
				Left Border Accent
			</Box>
			<Box
				backgroundColor={`transparent`}
				sx={{
					padding: 2,
					border: '2px dashed #666',
					borderRadius: 1,
				}}>
				Dashed Border
			</Box>
		</div>
	),
}
