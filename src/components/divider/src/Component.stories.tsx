import type { Meta } from '@storybook/react-vite'
import { Component as Divider } from './Component'

const meta = {
	title: 'Components/Divider',
	component: Divider,
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
			options: ['fullWidth', 'inset', 'middle'],
		},
		flexItem: {
			control: 'boolean',
		},
		textAlign: {
			control: 'select',
			options: ['center', 'left', 'right'],
		},
	},
} satisfies Meta<typeof Divider>

export default meta

export const Default = {
	args: {
		orientation: 'horizontal',
		variant: 'fullWidth',
	},
	render: (args: any) => (
		<div style={{ width: '300px', padding: '20px' }}>
			<div>Content above</div>
			<Divider {...args} />
			<div>Content below</div>
		</div>
	),
}

export const OrientationVariants = {
	render: () => (
		<div style={{ display: 'flex', gap: '40px' }}>
			<div style={{ width: '200px' }}>
				<h4>Horizontal Divider</h4>
				<div>Content above</div>
				<Divider orientation={`horizontal`} />
				<div>Content below</div>
			</div>
			<div style={{ height: '150px', display: 'flex', alignItems: 'center' }}>
				<span>Left content</span>
				<Divider orientation={`vertical`} flexItem />
				<span>Right content</span>
			</div>
		</div>
	),
}

export const VariantTypes = {
	render: () => (
		<div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<div>
				<h4>Full Width</h4>
				<div>Content above</div>
				<Divider variant={`fullWidth`} />
				<div>Content below</div>
			</div>
			<div>
				<h4>Inset</h4>
				<div>Content above</div>
				<Divider variant={`inset`} />
				<div>Content below</div>
			</div>
			<div>
				<h4>Middle</h4>
				<div>Content above</div>
				<Divider variant={`middle`} />
				<div>Content below</div>
			</div>
		</div>
	),
}

export const WithText = {
	render: () => (
		<div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<div>
				<div>Content above</div>
				<Divider textAlign={`center`}>CENTER</Divider>
				<div>Content below</div>
			</div>
			<div>
				<div>Content above</div>
				<Divider textAlign={`left`}>LEFT</Divider>
				<div>Content below</div>
			</div>
			<div>
				<div>Content above</div>
				<Divider textAlign={`right`}>RIGHT</Divider>
				<div>Content below</div>
			</div>
		</div>
	),
}
