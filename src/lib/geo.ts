/**
 * A dependency-free geo autocomplete/resolve controller. In the wallet app this surface was backed
 * by the Parse backend via `useParseGeo()`; this package has no backend, so the same hook contract
 * is preserved and the controller is meant to be supplied by the CONSUMER (see
 * `ProviderGeoContext` / `GeoProvider` in `../context/provider-config`). When no controller is
 * configured the returned functions answer empty/undefined — exactly what `FieldPlaces` needs to
 * render an inert input rather than crash.
 */
import type {
	GeoAutocompleteParams,
	GeoAutocompleteResult,
	GeoAutocompletePurpose,
	GeoResolveParams,
	ResolvedPlace,
} from './types'

export type GeoController = {
	autocomplete: (_params: GeoAutocompleteParams) => Promise<GeoAutocompleteResult>
	resolve: (_params: GeoResolveParams) => Promise<ResolvedPlace>
}

export const EMPTY_GEO_CONTROLLER: GeoController = {
	autocomplete: async () => ({
		schemaVersion: 1,
		searchSessionRef: ``,
		suggestions: [],
		expiresAt: new Date(0).toISOString(),
		quality: 'CURRENT',
	}),
	resolve: async () => {
		throw new Error(`No GeoProvider configured — supply a geo controller via Provider's geo prop.`)
	},
}

export type { GeoAutocompleteParams, GeoAutocompleteResult, GeoAutocompletePurpose, GeoResolveParams, ResolvedPlace }

/**
 * Hook-compatible shim for the wallet provider's `useParseGeo()`.
 *
 * The wallet app backed autocomplete/resolve with the Parse backend. This package has no
 * backend, so the hook returns an inert controller (empty suggestion results, resolve
 * throws a clear "not configured" error). Consumers that want real geo wiring can supply a
 * `GeoController` through the provider (see `ProviderGeoContext`).
 */
export function useParseGeo(): GeoController {
	return EMPTY_GEO_CONTROLLER
}
