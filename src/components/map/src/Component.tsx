import { getEnv } from '../../../lib/env'
import { Box, useTheme } from '@mui/material'
import { decodePolyline5 } from '../../../lib'
import mapboxgl, { type LngLatLike, type Map as MapboxMap } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as React from 'react'

import type { MapCoordinate, MapMarker, MapProps } from './types'

const lngLat = (coordinate: MapCoordinate): [number, number] => [coordinate.longitude, coordinate.latitude]

const LIGHT_STYLE = `mapbox://styles/mapbox/light-v11`
const DARK_STYLE = `mapbox://styles/mapbox/dark-v11`

const ROUTE_SOURCE = `--map-route`
const ROUTE_CASING = `--map-route-casing`
const ROUTE_LINE = `--map-route-line`

// Shared web Map (maps-geo Phase 4). Render-only: it draws tiles, markers, and the SERVER route geometry
// (decoded polyline5); it never fetches a route or any geo provider. Colours resolve from the MUI theme and
// the base style follows light/dark; attribution is shown per the tile licence.
export const Component: React.FC<MapProps> = ({
	accessToken,
	center,
	zoom,
	interactive = true,
	markers,
	route,
	hideAttribution = false,
	minHeight = 320,
	sx,
	...boxProps
}) => {
	const theme = useTheme()
	const containerRef = React.useRef<HTMLDivElement | null>(null)
	const mapRef = React.useRef<MapboxMap | null>(null)

	const mode = theme.palette.mode
	const routeColor = route?.color ?? theme.palette.primary.main
	const casingColor = theme.palette.background.paper
	const markerColor = React.useCallback(
		(marker: MapMarker): string => {
			if (marker.color) return marker.color
			switch (marker.variant) {
				case `origin`:
					return theme.palette.success.main
				case `destination`:
					return theme.palette.error.main
				case `driver`:
					return theme.palette.primary.main
				default:
					return theme.palette.text.secondary
			}
		},
		[theme]
	)

	// Initialise once per (token, style-mode). The provider Parse client refuses re-init with a different
	// config; the map is analogously torn down and rebuilt only when the token or the light/dark base changes.
	React.useEffect(() => {
		const token = accessToken ?? (getEnv('VITE_PUBLIC_MAPBOX_TOKEN'))
		const container = containerRef.current
		if (!token || !container) return

		mapboxgl.accessToken = token
		let map: MapboxMap | null = null
		let cancelled = false

		const init = () => {
			if (cancelled || map || !containerRef.current) return
			const { clientWidth, clientHeight } = containerRef.current
			if (clientWidth === 0 || clientHeight === 0) return
			map = new mapboxgl.Map({
				container: containerRef.current,
				style: mode === `dark` ? DARK_STYLE : LIGHT_STYLE,
				...(center ? { center: lngLat(center) } : {}),
				...(zoom !== undefined ? { zoom } : {}),
				interactive,
				projection: { name: `mercator` },
				...(hideAttribution ? { attributionControl: false } : {}),
			})
			mapRef.current = map
		}

		init()
		const observer = map ? null : new ResizeObserver(() => init())
		observer?.observe(container)

		return () => {
			cancelled = true
			observer?.disconnect()
			if (map) {
				try {
					map.remove()
				} catch {
					/* WebGL teardown races are non-fatal */
				}
			}
			mapRef.current = null
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken, mode, interactive])

	// Center / zoom updates without a re-init.
	React.useEffect(() => {
		const map = mapRef.current
		if (!map || !center) return
		map.setCenter(lngLat(center))
	}, [center])
	React.useEffect(() => {
		const map = mapRef.current
		if (!map || zoom === undefined) return
		map.setZoom(zoom)
	}, [zoom])

	// Markers.
	React.useEffect(() => {
		const map = mapRef.current
		if (!map) return
		const instances = (markers ?? []).map((marker) =>
			new mapboxgl.Marker({ color: markerColor(marker) }).setLngLat(lngLat(marker.coordinate)).addTo(map)
		)
		return () => instances.forEach((instance) => instance.remove())
	}, [markers, markerColor])

	// Server route geometry (decoded polyline5) — drawn as a themed line; never fetched client-side.
	const routeValue = route?.geometry.value
	const routeBounds = route?.bounds
	const routeWidth = route?.width ?? 4
	const routeFit = route?.fitBounds ?? true
	const routePadding = route?.fitPadding ?? 48
	React.useEffect(() => {
		const map = mapRef.current
		if (!map || !routeValue) return
		const coords = decodePolyline5(routeValue).map((point) => [point.longitude, point.latitude] as [number, number])
		if (coords.length < 2) return

		const draw = () => {
			if (!mapRef.current) return
			const m = mapRef.current
			const data: GeoJSON.Feature = {
				type: `Feature`,
				properties: {},
				geometry: { type: `LineString`, coordinates: coords },
			}
			if (m.getSource(ROUTE_SOURCE)) {
				;(m.getSource(ROUTE_SOURCE) as mapboxgl.GeoJSONSource).setData(data)
			} else {
				m.addSource(ROUTE_SOURCE, { type: `geojson`, data })
				m.addLayer({
					id: ROUTE_CASING,
					type: `line`,
					source: ROUTE_SOURCE,
					layout: { 'line-cap': `round`, 'line-join': `round` },
					paint: { 'line-color': casingColor, 'line-width': routeWidth + 4 },
				})
				m.addLayer({
					id: ROUTE_LINE,
					type: `line`,
					source: ROUTE_SOURCE,
					layout: { 'line-cap': `round`, 'line-join': `round` },
					paint: { 'line-color': routeColor, 'line-width': routeWidth },
				})
			}
			if (routeFit) {
				const bounds = routeBounds
					? new mapboxgl.LngLatBounds(lngLat(routeBounds.southWest), lngLat(routeBounds.northEast))
					: coords.reduce(
							(b, c) => b.extend(c as LngLatLike),
							new mapboxgl.LngLatBounds(coords[0] as LngLatLike, coords[0] as LngLatLike)
						)
				m.fitBounds(bounds, { padding: routePadding, duration: 500 })
			}
		}

		if (map.isStyleLoaded()) {
			draw()
		} else {
			map.once(`style.load`, draw)
		}

		return () => {
			const m = mapRef.current
			if (!m) return
			try {
				if (m.getLayer(ROUTE_LINE)) m.removeLayer(ROUTE_LINE)
				if (m.getLayer(ROUTE_CASING)) m.removeLayer(ROUTE_CASING)
				if (m.getSource(ROUTE_SOURCE)) m.removeSource(ROUTE_SOURCE)
			} catch {
				/* layer teardown after map.remove() is non-fatal */
			}
		}
	}, [routeValue, routeBounds, routeColor, casingColor, routeWidth, routeFit, routePadding])

	return (
		<Box
			ref={containerRef}
			sx={{ width: `100%`, height: `100%`, minHeight, borderRadius: 1, overflow: `hidden`, ...sx }}
			{...boxProps}
		/>
	)
}

export default Component
