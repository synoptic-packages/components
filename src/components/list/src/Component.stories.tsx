import { IconButton, ListSubheader } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, ChevronRight, Inbox, Mail, Settings, Star, User } from 'lucide-react'
import { Component as CustomList } from './Component'
import { Component as ListItem } from './Component.item'

const meta = {
	title: 'Components/List',
	component: CustomList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		dense: {
			control: 'boolean',
		},
		disablePadding: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof CustomList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: (
			<>
				<ListItem primary={`Inbox`} />
				<ListItem primary={`Drafts`} />
				<ListItem primary={`Trash`} />
			</>
		),
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
	},
}

export const WithBorders: Story = {
	args: {
		children: (
			<>
				<ListItem border primary={`Inbox`} secondary={`5 new messages`} />
				<ListItem border primary={`Drafts`} secondary={`3 items saved`} />
				<ListItem primary={`Trash`} secondary={`Empty`} />
			</>
		),
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
	},
}

export const WithIcons: Story = {
	args: {
		children: (
			<>
				<ListItem border inset icon={<Inbox size={24} />} primary={`Inbox`} secondary={`5 new messages`} />
				<ListItem border inset icon={<Mail size={24} />} primary={`Drafts`} secondary={`3 items saved`} />
				<ListItem
					border
					inset
					icon={<User size={24} />}
					primary={`Profile`}
					secondary={`Manage your account`}
				/>
				<ListItem icon={<Settings size={24} />} primary={`Settings`} secondary={`Preferences and options`} />
			</>
		),
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
	},
}

export const WithRightContent: Story = {
	args: {
		children: (
			<>
				<ListItem
					border
					inset
					icon={<Inbox size={24} />}
					primary={`Inbox`}
					secondary={`5 new messages`}
					right={
						<IconButton edge={`end`}>
							<ChevronRight size={20} />
						</IconButton>
					}
				/>
				<ListItem
					border
					inset
					icon={<Mail size={24} />}
					primary={`Drafts`}
					secondary={`3 items saved`}
					right={
						<IconButton edge={`end`}>
							<ChevronRight size={20} />
						</IconButton>
					}
				/>
				<ListItem
					inset
					icon={<User size={24} />}
					primary={`Profile`}
					secondary={`Manage your account`}
					right={
						<IconButton edge={`end`}>
							<ArrowRight size={20} />
						</IconButton>
					}
				/>
			</>
		),
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
	},
}

export const WithInset: Story = {
	args: {
		children: (
			<>
				<ListItem border icon={<Inbox size={24} />} primary={`With Icon`} secondary={`Message folder`} inset />
				<ListItem
					border
					icon={<Mail size={24} />}
					primary={`Inset with icon`}
					secondary={`Draft messages`}
					inset
				/>
				<ListItem
					border
					icon={<Star size={24} />}
					primary={`Another with icon`}
					secondary={`Starred items`}
					inset
				/>
				<ListItem icon={<Settings size={24} />} primary={`Last item`} secondary={`Configuration`} inset />
			</>
		),
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
	},
}

export const Dense: Story = {
	args: {
		dense: true,
		children: (
			<>
				<ListItem border inset icon={<Inbox size={20} />} primary={`Inbox`} secondary={`Jan 9, 2025`} />
				<ListItem border inset icon={<Mail size={20} />} primary={`Drafts`} secondary={`Jan 7, 2025`} />
				<ListItem icon={<User size={20} />} primary={`Profile`} secondary={`Jan 5, 2025`} />
			</>
		),
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
	},
}

export const WithSubheader: Story = {
	args: {
		subheader: <ListSubheader>{`Messages`}</ListSubheader>,
		children: (
			<>
				<ListItem border inset icon={<Inbox size={24} />} primary={`Inbox`} secondary={`5 new messages`} />
				<ListItem border inset icon={<Mail size={24} />} primary={`Drafts`} secondary={`3 items saved`} />
				<ListItem icon={<Star size={24} />} primary={`Starred`} secondary={`12 starred items`} />
			</>
		),
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
	},
}

export const Comprehensive: Story = {
	args: {
		sx: { width: '100%', maxWidth: 360, bgcolor: 'background.paper' },
		children: (
			<>
				<ListItem
					border
					inset
					icon={<Inbox size={24} />}
					primary={`Inbox`}
					secondary={`5 new messages`}
					right={
						<IconButton edge={`end`} aria-label={`navigate`}>
							<ChevronRight size={20} />
						</IconButton>
					}
				/>
				<ListItem
					border
					inset
					icon={<Mail size={24} />}
					primary={`Drafts`}
					secondary={`3 items saved`}
					right={
						<IconButton edge={`end`} aria-label={`navigate`}>
							<ChevronRight size={20} />
						</IconButton>
					}
				/>
				<ListItem
					border
					inset
					icon={<User size={24} />}
					primary={`Profile`}
					secondary={`Manage your account`}
					right={
						<IconButton edge={`end`} aria-label={`navigate`}>
							<ChevronRight size={20} />
						</IconButton>
					}
				/>
				<ListItem
					icon={<Settings size={24} />}
					primary={`Settings`}
					secondary={`Preferences and options`}
					right={
						<IconButton edge={`end`} aria-label={`navigate`}>
							<ChevronRight size={20} />
						</IconButton>
					}
				/>
			</>
		),
	},
}
