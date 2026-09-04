import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import type { IMenuItem } from '../../../types/generics'
import { Component as MenuSidebar } from './Component.sidebar'

const basicMenuItems: IMenuItem[] = [
	{
		icon: 'House',
		label: 'Dashboard',
		path: '/dashboard',
	},
	{
		icon: 'User',
		label: 'Profile',
		path: '/profile',
	},
	{
		icon: 'Bell',
		label: 'Notifications',
		path: '/notifications',
	},
	{
		icon: 'LogOut',
		label: 'Logout',
		path: '/logout',
	},
]

const menuWithDividers: IMenuItem[] = [
	{
		icon: 'House',
		label: 'Dashboard',
		path: '/dashboard',
		divider: ['bottom'],
	},
	{
		icon: 'User',
		label: 'Profile',
		path: '/profile',
	},
	{
		icon: 'Bell',
		label: 'Notifications',
		path: '/notifications',
		divider: ['bottom'],
	},
	{
		icon: 'LogOut',
		label: 'Logout',
		path: '/logout',
	},
]

const menuWithBadges: IMenuItem[] = [
	{
		icon: 'House',
		label: 'Dashboard',
		path: '/dashboard',
	},
	{
		icon: 'Bell',
		label: 'Notifications',
		path: '/notifications',
		badge: 3,
		badgeColor: 'error',
	},
	{
		icon: 'User',
		label: 'Messages',
		path: '/messages',
		badge: 'New',
		badgeColor: 'primary',
	},
	{
		icon: 'LogOut',
		label: 'Logout',
		path: '/logout',
	},
]

const menuWithStates: IMenuItem[] = [
	{
		icon: 'House',
		label: 'Dashboard',
		path: '/dashboard',
		active: true,
	},
	{
		icon: 'User',
		label: 'Profile',
		path: '/profile',
	},
	{
		icon: 'Bell',
		label: 'Notifications',
		path: '/notifications',
		disabled: true,
	},
	{
		icon: 'LogOut',
		label: 'Logout',
		path: '/logout',
	},
]

const menuWithoutIcons: IMenuItem[] = [
	{
		label: 'Dashboard',
		path: '/dashboard',
	},
	{
		label: 'Profile Settings',
		path: '/profile',
	},
	{
		label: 'Notification Preferences',
		path: '/notifications',
	},
	{
		label: 'Sign Out',
		path: '/logout',
	},
]

const menuWithSorting: IMenuItem[] = [
	{
		icon: 'LogOut',
		label: 'Logout',
		path: '/logout',
		sort: 4,
	},
	{
		icon: 'House',
		label: 'Dashboard',
		path: '/dashboard',
		sort: 1,
	},
	{
		icon: 'Bell',
		label: 'Notifications',
		path: '/notifications',
		sort: 3,
	},
	{
		icon: 'User',
		label: 'Profile',
		path: '/profile',
		sort: 2,
	},
]

const menuWithMixedSorting: IMenuItem[] = [
	{
		icon: 'Settings',
		label: 'Settings',
		path: '/settings',
		sort: 10,
	},
	{
		icon: 'House',
		label: 'Dashboard',
		path: '/dashboard',
		sort: 1,
	},
	{
		icon: 'Bell',
		label: 'Notifications',
		path: '/notifications',
	},
	{
		icon: 'User',
		label: 'Profile',
		path: '/profile',
		sort: 5,
	},
	{
		icon: 'LogOut',
		label: 'Logout',
		path: '/logout',
	},
]

const menuWithTopBottomDividers: IMenuItem[] = [
	{
		icon: 'House',
		label: 'Main Section',
		path: '/main',
		divider: ['top', 'bottom'],
	},
	{
		icon: 'User',
		label: 'Profile',
		path: '/profile',
	},
	{
		icon: 'Bell',
		label: 'Settings',
		path: '/settings',
		divider: ['top'],
	},
	{
		icon: 'LogOut',
		label: 'Logout',
		path: '/logout',
	},
]

const longMenuItems: IMenuItem[] = [
	{
		icon: 'House',
		label: 'Dashboard',
		path: '/dashboard',
	},
	{
		icon: 'GraduationCap',
		label: 'Education',
		path: '/consumer-education',
	},
	{
		icon: 'LampDesk',
		label: 'Programs',
		path: '/fellowship',
	},
	{
		icon: 'FolderDown',
		label: 'Downloads',
		path: '/resources',
	},
	{
		icon: 'CircleQuestionMark',
		label: 'Frequently Asked Questions',
		path: '/faqs',
	},
	{
		icon: 'NotebookTabs',
		label: 'Contact Support',
		path: '/contact',
	},
	{
		icon: 'Settings',
		label: 'Settings',
		path: '/settings',
	},
	{
		icon: 'LogOut',
		label: 'Sign Out',
		path: '/logout',
		divider: ['top'],
	},
]

const meta: Meta<typeof MenuSidebar> = {
	title: 'Components/Menu/Sidebar',
	component: MenuSidebar,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A sidebar menu component that displays a list of navigation items with optional icons, badges, and dividers.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		items: {
			description: 'Array of menu items to display',
			control: 'object',
		},
		showBackButton: {
			description: 'Whether to show a back button at the top of the menu',
			control: 'boolean',
		},
		onBackButtonClick: {
			description: 'Callback function called when back button is clicked',
			action: 'backButtonClicked',
		},
	},
	args: {
		onBackButtonClick: fn(),
	},
}

export default meta

type Story = StoryObj<typeof MenuSidebar>

export const Default: Story = {
	args: {
		items: basicMenuItems,
	},
}

export const WithBackButton: Story = {
	args: {
		items: basicMenuItems,
		showBackButton: true,
	},
}

export const WithDividers: Story = {
	args: {
		items: menuWithDividers,
	},
}

export const WithTopBottomDividers: Story = {
	args: {
		items: menuWithTopBottomDividers,
	},
}

export const WithBadges: Story = {
	args: {
		items: menuWithBadges,
	},
}

export const WithStates: Story = {
	args: {
		items: menuWithStates,
	},
	parameters: {
		docs: {
			description: {
				story: 'Shows menu items with different states: active and disabled items.',
			},
		},
	},
}

export const WithoutIcons: Story = {
	args: {
		items: menuWithoutIcons,
	},
}

export const LongMenu: Story = {
	args: {
		items: longMenuItems,
	},
	parameters: {
		docs: {
			description: {
				story: 'A longer menu with multiple items to demonstrate scrolling behavior and dividers.',
			},
		},
	},
}

export const EmptyMenu: Story = {
	args: {
		items: [],
	},
	parameters: {
		docs: {
			description: {
				story: 'An empty menu with no items.',
			},
		},
	},
}

export const BackButtonOnly: Story = {
	args: {
		items: [],
		showBackButton: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Menu showing only the back button with no menu items.',
			},
		},
	},
}

export const Interactive: Story = {
	args: {
		items: basicMenuItems.map((item) => ({
			...item,
			onClick: fn(),
		})),
		showBackButton: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive menu where clicking items triggers callbacks. Open the Actions panel to see click events.',
			},
		},
	},
}

export const MixedContent: Story = {
	args: {
		items: [
			{
				icon: 'House',
				label: 'Dashboard',
				path: '/dashboard',
				active: true,
			},
			{
				icon: 'Bell',
				label: 'Notifications',
				path: '/notifications',
				badge: 5,
				badgeColor: 'error',
				divider: ['bottom'],
			},
			{
				label: 'Text Only Item',
				path: '/text-only',
			},
			{
				icon: 'User',
				label: 'Profile Settings',
				path: '/profile',
				divider: ['top'],
			},
			{
				icon: 'LogOut',
				label: 'Sign Out',
				path: '/logout',
				disabled: true,
			},
		],
		showBackButton: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'A comprehensive example showing mixed content: items with and without icons, badges, dividers, different states, and a back button.',
			},
		},
	},
}

export const HiddenMenu: Story = {
	args: {
		items: [
			{
				icon: 'House',
				label: 'Dashboard',
				path: '/dashboard',
			},
			{
				icon: 'User',
				label: 'Profile (Hidden)',
				path: '/profile',
				hidden: true,
			},
			{
				icon: 'Bell',
				label: 'Notifications',
				path: '/notifications',
			},
			{
				icon: 'LogOut',
				label: 'Logout (Hidden)',
				path: '/logout',
				hidden: true,
			},
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates menu items with the hidden prop. Items marked as hidden will not be rendered in the menu.',
			},
		},
	},
}

export const WithSorting: Story = {
	args: {
		items: menuWithSorting,
	},
	parameters: {
		docs: {
			description: {
				story: 'Menu items with sort property. Items are automatically sorted by their sort value in ascending order. Despite the array definition order, items will display in sorted order: Dashboard (1), Profile (2), Notifications (3), Logout (4).',
			},
		},
	},
}

export const WithMixedSorting: Story = {
	args: {
		items: menuWithMixedSorting,
	},
	parameters: {
		docs: {
			description: {
				story: 'Menu with mixed sorting - some items have sort values while others do not. Items with sort values appear first in order, followed by items without sort values in their original order.',
			},
		},
	},
}
