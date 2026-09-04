import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component as Map } from './Component'

// The Map renders live Mapbox GL tiles, so a story only shows content when VITE_PUBLIC_MAPBOX_TOKEN is set
// in the Storybook env. It is render-only — markers and a SERVER route (polyline5) go in, no directions are
// ever fetched.
const meta = {
	title: 'Map/Map',
	component: Map,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
} satisfies Meta<typeof Map>

export default meta
type Story = StoryObj<typeof meta>

const SANDTON = { latitude: -26.1076, longitude: 28.0567 }
const ROSEBANK = { latitude: -26.142, longitude: 28.0473 }

export const OriginAndDestination: Story = {
	args: {
		center: SANDTON,
		zoom: 12,
		markers: [
			{ id: 'origin', coordinate: SANDTON, variant: 'origin' },
			{ id: 'destination', coordinate: ROSEBANK, variant: 'destination' },
		],
		sx: { height: '100vh' },
	},
}

export const WithServerRoute: Story = {
	args: {
		markers: [
			{ id: 'origin', coordinate: SANDTON, variant: 'origin' },
			{ id: 'destination', coordinate: ROSEBANK, variant: 'destination' },
		],
		// A precomputed polyline5 line between the two points (server geometry; the Map never fetches it).
		route: { geometry: { encoding: 'polyline5', value: 'zbl`Eqm_iBjyE`d@' } },
		sx: { height: '100vh' },
	},
}
