import type { Meta } from '@storybook/react-vite'
import { Component as Flag } from './Component'

const meta = {
	title: 'Components/Flag',
	component: Flag,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		code: {
			control: 'select',
			options: [
				'ZA',
				'US',
				'GB',
				'DE',
				'FR',
				'JP',
				'AU',
				'CA',
				'IN',
				'BR',
				'CN',
				'ES',
				'IT',
				'NL',
				'SE',
				'NO',
				'DK',
				'FI',
				'CH',
				'AT',
			],
			description: 'Country code (ISO 3166-1 alpha-2)',
		},
		size: {
			control: { type: 'range', min: 16, max: 128, step: 8 },
			description: 'Size of the flag in pixels',
		},
		style: {
			control: 'object',
			description: 'Custom CSS styles',
		},
	},
} satisfies Meta<typeof Flag>

export default meta

export const Default = {
	args: {
		code: 'ZA',
		size: 24,
	},
}

export const SizeVariants = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
			<div style={{ textAlign: 'center' }}>
				<Flag code={`ZA`} size={16} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>16px</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Flag code={`ZA`} size={24} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>24px</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Flag code={`ZA`} size={32} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>32px</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Flag code={`ZA`} size={48} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>48px</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Flag code={`ZA`} size={64} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>64px</div>
			</div>
		</div>
	),
}

export const CountryVariants = {
	render: () => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
				gap: '16px',
				maxWidth: '600px',
			}}>
			{[
				{ code: 'ZA', name: 'South Africa' },
				{ code: 'US', name: 'United States' },
				{ code: 'GB', name: 'United Kingdom' },
				{ code: 'DE', name: 'Germany' },
				{ code: 'FR', name: 'France' },
				{ code: 'JP', name: 'Japan' },
				{ code: 'AU', name: 'Australia' },
				{ code: 'CA', name: 'Canada' },
				{ code: 'IN', name: 'India' },
				{ code: 'BR', name: 'Brazil' },
				{ code: 'CN', name: 'China' },
				{ code: 'ES', name: 'Spain' },
			].map((country) => (
				<div key={country.code} style={{ textAlign: 'center' }}>
					<Flag code={country.code} size={32} />
					<div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 'bold' }}>{country.code}</div>
					<div style={{ fontSize: '10px', color: '#666' }}>{country.name}</div>
				</div>
			))}
		</div>
	),
}

export const WithCustomStyles = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
			<div style={{ textAlign: 'center' }}>
				<Flag
					code={`ZA`}
					size={48}
					style={{
						border: '2px solid #333',
						borderRadius: '4px',
					}}
				/>
				<div style={{ marginTop: '8px', fontSize: '12px' }}>With Border</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Flag
					code={`US`}
					size={48}
					style={{
						boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
						borderRadius: '50%',
					}}
				/>
				<div style={{ marginTop: '8px', fontSize: '12px' }}>With Shadow</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Flag
					code={`GB`}
					size={48}
					style={{
						opacity: 0.7,
						filter: 'grayscale(50%)',
					}}
				/>
				<div style={{ marginTop: '8px', fontSize: '12px' }}>Styled</div>
			</div>
		</div>
	),
}
