import type { Meta } from '@storybook/react-vite'
import React from 'react'
import { CircularProgress, GlobalProgress, LinearProgress } from '..'
import { Icon } from '../../icon'

const meta = {
	title: 'Components/Progress',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta

export default meta

export const CircularProgressDefault = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={25} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>25%</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={50} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>50%</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={75} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>75%</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={100} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>100%</div>
			</div>
		</div>
	),
}

export const CircularProgressSizes = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={60} size={30} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>30px</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={60} size={45} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>45px (default)</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={60} size={60} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>60px</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={60} size={80} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>80px</div>
			</div>
		</div>
	),
}

export const CircularProgressWithIcons = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={30} size={60} icon={<Icon name={`ArrowDownFromLine`} />} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>Download</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={70} size={60} icon={<Icon name={`ArrowDownFromLine`} />} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>Upload</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<CircularProgress value={100} size={60} icon={<Icon name={`ArrowDownFromLine`} />} />
				<div style={{ marginTop: '8px', fontSize: '12px' }}>Complete</div>
			</div>
		</div>
	),
}

// Linear Progress Stories
export const LinearProgressDefault = {
	render: () => (
		<div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div>
				<div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
					Loading (default height: 3px)
				</div>
				<LinearProgress isLoading={true} />
			</div>
			<div>
				<div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Not Loading</div>
				<LinearProgress isLoading={false} />
				<div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
					Nothing shown when isLoading=false
				</div>
			</div>
		</div>
	),
}

export const LinearProgressHeights = {
	render: () => (
		<div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div>
				<div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Height: 2px</div>
				<LinearProgress isLoading={true} height={2} />
			</div>
			<div>
				<div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Height: 3px (default)</div>
				<LinearProgress isLoading={true} height={3} />
			</div>
			<div>
				<div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Height: 6px</div>
				<LinearProgress isLoading={true} height={6} />
			</div>
			<div>
				<div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Height: 10px</div>
				<LinearProgress isLoading={true} height={10} />
			</div>
		</div>
	),
}

// Global Progress Stories
export const GlobalProgressDefault = {
	render: () => {
		const [isLoading, setIsLoading] = React.useState(false)

		return (
			<div style={{ textAlign: 'center' }}>
				<button
					onClick={() => setIsLoading(!isLoading)}
					style={{
						padding: '12px 24px',
						fontSize: '16px',
						backgroundColor: isLoading ? '#f44336' : '#2196f3',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}>
					{isLoading ? 'Hide Global Progress' : 'Show Global Progress'}
				</button>
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
					{isLoading
						? 'Global progress bar is now showing at the top of the page'
						: 'Click to show the global progress bar'}
				</div>
				<GlobalProgress />
			</div>
		)
	},
}

export const GlobalProgressHeights = {
	render: () => {
		const [heightDemo, setHeightDemo] = React.useState<number | null>(null)

		return (
			<div style={{ textAlign: 'center' }}>
				<div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
					{[2, 3, 5, 8, 12].map((height) => (
						<button
							key={height}
							onClick={() => setHeightDemo(heightDemo === height ? null : height)}
							style={{
								padding: '8px 16px',
								fontSize: '14px',
								backgroundColor: heightDemo === height ? '#f44336' : '#2196f3',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
								cursor: 'pointer',
							}}>
							{height}px
						</button>
					))}
				</div>
				<div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
					Click buttons to show global progress with different heights
				</div>
				<GlobalProgress height={heightDemo || 3} />
			</div>
		)
	},
}
