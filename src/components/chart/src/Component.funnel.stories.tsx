import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as ChartFunnel } from './Component.funnel'

const meta = {
	title: 'Charts/Funnel',
	component: ChartFunnel,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		height: {
			control: 'text',
		},
		width: {
			control: 'text',
		},
		sort: {
			control: 'select',
			options: ['ascending', 'descending', 'none'],
		},
		align: {
			control: 'select',
			options: ['left', 'center', 'right'],
		},
		funnelAlign: {
			control: 'select',
			options: ['left', 'center', 'right'],
		},
	},
} satisfies Meta<typeof ChartFunnel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		height: '500px',
		width: '700px',
		data: [
			{ value: 100, name: 'Display' },
			{ value: 80, name: 'Click' },
			{ value: 60, name: 'Visit' },
			{ value: 40, name: 'Consulting' },
			{ value: 20, name: 'Order' },
		],
	},
}

export const SalesFunnel: Story = {
	args: {
		height: '500px',
		width: '700px',
		data: [
			{ value: 1000, name: 'Website Visitors' },
			{ value: 750, name: 'Product Views' },
			{ value: 500, name: 'Add to Cart' },
			{ value: 250, name: 'Checkout' },
			{ value: 150, name: 'Purchase' },
		],
		showTooltip: true,
	},
}

export const AscendingOrder: Story = {
	args: {
		height: '500px',
		width: '700px',
		sort: 'ascending',
		data: [
			{ value: 20, name: 'Converted' },
			{ value: 40, name: 'Qualified' },
			{ value: 60, name: 'Interested' },
			{ value: 80, name: 'Contacted' },
			{ value: 100, name: 'Leads' },
		],
	},
}

export const LeftAligned: Story = {
	args: {
		height: '500px',
		width: '700px',
		align: 'left',
		funnelAlign: 'left',
		data: [
			{ value: 500, name: 'Awareness' },
			{ value: 400, name: 'Interest' },
			{ value: 300, name: 'Consideration' },
			{ value: 200, name: 'Intent' },
			{ value: 100, name: 'Evaluation' },
			{ value: 50, name: 'Purchase' },
		],
	},
}

export const RightAligned: Story = {
	args: {
		height: '500px',
		width: '700px',
		align: 'right',
		funnelAlign: 'right',
		data: [
			{ value: 800, name: 'Impressions' },
			{ value: 600, name: 'Engagements' },
			{ value: 400, name: 'Clicks' },
			{ value: 200, name: 'Conversions' },
		],
	},
}

export const WithGap: Story = {
	args: {
		height: '500px',
		width: '700px',
		gap: 5,
		data: [
			{ value: 100, name: 'Step 1' },
			{ value: 85, name: 'Step 2' },
			{ value: 70, name: 'Step 3' },
			{ value: 55, name: 'Step 4' },
			{ value: 40, name: 'Step 5' },
		],
	},
}

export const Pyramid: Story = {
	args: {
		height: '500px',
		width: '700px',
		sort: 'ascending',
		data: [
			{ value: 20, name: 'Premium' },
			{ value: 40, name: 'Gold' },
			{ value: 60, name: 'Silver' },
			{ value: 80, name: 'Bronze' },
			{ value: 100, name: 'Basic' },
		],
	},
}

export const RecruitmentFunnel: Story = {
	args: {
		height: '500px',
		width: '700px',
		data: [
			{ value: 2000, name: 'Applications' },
			{ value: 500, name: 'Phone Screen' },
			{ value: 200, name: 'First Interview' },
			{ value: 100, name: 'Second Interview' },
			{ value: 50, name: 'Final Interview' },
			{ value: 20, name: 'Offer' },
			{ value: 15, name: 'Accepted' },
		],
		showTooltip: true,
	},
}

export const Minimal: Story = {
	args: {
		height: '400px',
		width: '600px',
		data: [
			{ value: 100, name: 'Top' },
			{ value: 75, name: 'Middle' },
			{ value: 50, name: 'Bottom' },
		],
		minimal: true,
	},
}
