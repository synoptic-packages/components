/**
 * Google Encoded Polyline Algorithm Format decode helper vendored from `@wallet/provider`
 * (`utils/polyline5.ts`, factor 1e5 precision). Verbatim implementation.
 */
export interface GeoCoordinate {
	latitude: number
	longitude: number
}

const FACTOR = 1e5

/**
 * Decodes a Google Encoded Polyline Algorithm Format string at precision 5 (factor 1e5).
 * An empty string yields an empty list, and an incomplete trailing chunk is ignored.
 */
export const decodePolyline5 = (value: string): GeoCoordinate[] => {
	const points: GeoCoordinate[] = []
	let index = 0
	let latitude = 0
	let longitude = 0
	while (index < value.length) {
		const startIndex = index
		let result = 0
		let shift = 0
		let byte = 0
		do {
			byte = value.charCodeAt(index++) - 63
			result |= (byte & 0x1f) << shift
			shift += 5
		} while (byte >= 0x20 && index < value.length)
		if (byte >= 0x20) break
		const latitudeDelta = result & 1 ? ~(result >> 1) : result >> 1
		result = 0
		shift = 0
		do {
			byte = value.charCodeAt(index++) - 63
			result |= (byte & 0x1f) << shift
			shift += 5
		} while (byte >= 0x20 && index < value.length)
		if (byte >= 0x20) {
			index = startIndex
			break
		}
		const longitudeDelta = result & 1 ? ~(result >> 1) : result >> 1
		latitude += latitudeDelta
		longitude += longitudeDelta
		points.push({ latitude: latitude / FACTOR, longitude: longitude / FACTOR })
	}
	return points
}
