import { AvatarGroup, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as Avatar } from './Component'

const meta = {
	title: 'Components/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['circular', 'rounded', 'square'],
		},
		alt: {
			control: 'text',
		},
		src: {
			control: 'text',
		},
		size: {
			control: 'number',
		},
	},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		alt: 'John Doe',
		children: 'JD',
		sx: { bgcolor: 'primary.main' },
	},
}

export const WithImage: Story = {
	args: {
		alt: 'User Avatar',
		src: 'https://i.pravatar.cc/150?img=1',
		variant: 'circular',
	},
}

export const Rounded: Story = {
	args: {
		alt: 'Jane Smith',
		children: 'JS',
		variant: 'rounded',
		sx: { bgcolor: 'secondary.main' },
	},
}

export const Square: Story = {
	args: {
		alt: 'Alex Johnson',
		children: 'AJ',
		variant: 'square',
		sx: { bgcolor: 'success.main' },
	},
}

export const Sizes: Story = {
	render: () => (
		<Stack direction={`row`} spacing={2} alignItems={`center`}>
			<Avatar size={24}>{`XS`}</Avatar>
			<Avatar size={32}>{`S`}</Avatar>
			<Avatar size={40}>{`M`}</Avatar>
			<Avatar size={56}>{`L`}</Avatar>
			<Avatar size={72}>{`XL`}</Avatar>
		</Stack>
	),
}

export const CustomSize: Story = {
	args: {
		size: 64,
		children: '64',
		sx: { bgcolor: 'primary.main' },
	},
}

export const Group: Story = {
	render: () => (
		<AvatarGroup max={4}>
			<Avatar alt={`User 1`} src={`https://i.pravatar.cc/150?img=1`} />
			<Avatar alt={`User 2`} src={`https://i.pravatar.cc/150?img=2`} />
			<Avatar alt={`User 3`} src={`https://i.pravatar.cc/150?img=3`} />
			<Avatar alt={`User 4`} src={`https://i.pravatar.cc/150?img=4`} />
			<Avatar alt={`User 5`} src={`https://i.pravatar.cc/150?img=5`} />
		</AvatarGroup>
	),
}

export const WithColors: Story = {
	render: () => (
		<Stack direction={`row`} spacing={2}>
			<Avatar sx={{ bgcolor: 'primary.main' }}>{`P`}</Avatar>
			<Avatar sx={{ bgcolor: 'secondary.main' }}>{`S`}</Avatar>
			<Avatar sx={{ bgcolor: 'error.main' }}>{`E`}</Avatar>
			<Avatar sx={{ bgcolor: 'warning.main' }}>{`W`}</Avatar>
			<Avatar sx={{ bgcolor: 'info.main' }}>{`I`}</Avatar>
			<Avatar sx={{ bgcolor: 'success.main' }}>{`S`}</Avatar>
		</Stack>
	),
}
