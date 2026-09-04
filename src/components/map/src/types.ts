import type { BoxProps } from '@mui/material'

// Shared web Map boundary (maps-geo Phase 4, mirrors mobile/src/components/map). The Map is RENDER-ONLY:
// it draws markers and a SERVER route (decoded polyline5) plus tiles; it never fetches directions or any
// geo provider itself. The public tile token is tiles-only. Colours come from the MUI theme, light/dark
// aware; attribution is shown per the tile licence. The web analogue of the mobile MapRouteConfig.

export type MapCoordinate = {
	latitude: number
	longitude: number
}

export type MapMarkerVariant = 'origin' | 'destination' | 'driver' | 'point'

export type MapMarker = {
	id: string
	coordinate: MapCoordinate
	variant?: MapMarkerVariant
	color?: string
}

export type MapRouteGeometry = {
	encoding: 'polyline5'
	value: string
}

export type MapBounds = {
	southWest: MapCoordinate
	northEast: MapCoordinate
}

export type MapRouteConfig = {
	// SERVER geometry is the only route source: the decoded polyline5 is rendered as the line and its
	// bounds frame the camera. There is no client-direct directions fetch.
	geometry: MapRouteGeometry
	bounds?: MapBounds
	color?: string
	width?: number
	showMarkers?: boolean
	fitBounds?: boolean
	fitPadding?: number
}

export interface MapProps extends Omit<BoxProps, 'children'> {
	accessToken?: string
	center?: MapCoordinate
	zoom?: number
	interactive?: boolean
	markers?: MapMarker[]
	route?: MapRouteConfig
	// Attribution is visible by default per the tile licence; only a deliberate non-product diagnostic
	// surface hides it.
	hideAttribution?: boolean
	minHeight?: number
}
