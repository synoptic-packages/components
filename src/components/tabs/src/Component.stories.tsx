import { Box, Tab } from '@mui/material'
import { Text } from '../../text'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Component as Tabs } from './Component'

const meta = {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
		},
		variant: {
			control: 'select',
			options: ['standard', 'scrollable', 'fullWidth'],
		},
		scrollButtons: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role={`tabpanel`}
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	}
}

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState(0)

		const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
			setValue(newValue)
		}

		return (
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label={`basic tabs`}>
						<Tab label={`Tab One`} {...a11yProps(0)} />
						<Tab label={`Tab Two`} {...a11yProps(1)} />
						<Tab label={`Tab Three`} {...a11yProps(2)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Text>{`Content for Tab One`}</Text>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Text>{`Content for Tab Two`}</Text>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Text>{`Content for Tab Three`}</Text>
				</TabPanel>
			</Box>
		)
	},
}

export const FullWidth: Story = {
	render: () => {
		const [value, setValue] = useState(0)

		const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
			setValue(newValue)
		}

		return (
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} variant={`fullWidth`} aria-label={`full width tabs`}>
						<Tab label={`Item One`} {...a11yProps(0)} />
						<Tab label={`Item Two`} {...a11yProps(1)} />
						<Tab label={`Item Three`} {...a11yProps(2)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Text>{`Full width content for Item One`}</Text>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Text>{`Full width content for Item Two`}</Text>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Text>{`Full width content for Item Three`}</Text>
				</TabPanel>
			</Box>
		)
	},
}

export const Scrollable: Story = {
	render: () => {
		const [value, setValue] = useState(0)

		const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
			setValue(newValue)
		}

		return (
			<Box sx={{ maxWidth: 480 }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						variant={`scrollable`}
						scrollButtons
						allowScrollButtonsMobile
						aria-label={`scrollable tabs`}>
						<Tab label={`Item One`} {...a11yProps(0)} />
						<Tab label={`Item Two`} {...a11yProps(1)} />
						<Tab label={`Item Three`} {...a11yProps(2)} />
						<Tab label={`Item Four`} {...a11yProps(3)} />
						<Tab label={`Item Five`} {...a11yProps(4)} />
						<Tab label={`Item Six`} {...a11yProps(5)} />
						<Tab label={`Item Seven`} {...a11yProps(6)} />
					</Tabs>
				</Box>
			</Box>
		)
	},
}

export const Vertical: Story = {
	render: () => {
		const [value, setValue] = useState(0)

		const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
			setValue(newValue)
		}

		return (
			<Box sx={{ display: 'flex', height: 300 }}>
				<Tabs
					orientation={`vertical`}
					value={value}
					onChange={handleChange}
					aria-label={`vertical tabs`}
					sx={{ borderRight: 1, borderColor: 'divider' }}>
					<Tab label={`Item One`} {...a11yProps(0)} />
					<Tab label={`Item Two`} {...a11yProps(1)} />
					<Tab label={`Item Three`} {...a11yProps(2)} />
					<Tab label={`Item Four`} {...a11yProps(3)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<Text>{`Vertical content for Item One`}</Text>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Text>{`Vertical content for Item Two`}</Text>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Text>{`Vertical content for Item Three`}</Text>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Text>{`Vertical content for Item Four`}</Text>
				</TabPanel>
			</Box>
		)
	},
}
