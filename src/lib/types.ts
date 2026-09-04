/**
 * Shared backend-neutral types vendored from `@wallet/provider` (copy + adapt of the provider
 * package's own type surface, trimmed to what this library uses). Kept dependency-free on purpose:
 * consumers of `@synotech/components` must not need `@wallet/provider` to type-check against us.
 *
 * The base record shapes (Country/Currency/Language/TGeneric/PhoneNumberInterface) are declared
 * once in `src/types/generics.ts` and re-exported here so both the lib helpers and the components
 * reference the same types.
 */
import type { CountryCode } from 'libphonenumber-js'

export * from '../types/generics'

/** The purpose an address-autocomplete search is being run for (see geo autocomplete contracts). */
export type GeoAutocompletePurpose = 'MOBILITY_ORIGIN' | 'MOBILITY_DESTINATION' | 'MERCHANT_DELIVERY' | 'STORE_LOCATION'

/** A point on the earth's surface. */
export interface GeoPointDto {
	latitude: number
	longitude: number
}

/** How precisely an address snapshot is known. */
export type AddressPrecision = 'ENTRANCE' | 'ROOFTOP' | 'PARCEL' | 'STREET' | 'LOCALITY' | 'APPROXIMATE' | 'PIN'

/** Provenance metadata attached to a resolved address. */
export interface AddressProvenance {
	provider: string
	placeId?: string
	resolvedAt: string
	fallbackFrom?: string
}

/** A resolved, structured address (spec-10 §9 contract shape, trimmed). */
export interface AddressSnapshotV1 {
	schemaVersion: 1
	label: string
	formattedAddress: string
	addressLines: string[]
	streetNumber?: string
	streetName?: string
	unit?: string
	subLocality?: string
	locality?: string
	region?: string
	regionCode?: string
	postalCode?: string
	countryCode: string
	countryName?: string
	timeZone: string
	locale?: string
	precision: AddressPrecision
	entryPoint?: { latitude: number; longitude: number; label?: string }
	provenance: AddressProvenance
	attribution?: string
}

/** Params accepted by a geo place-autocomplete call. */
export interface GeoAutocompleteParams {
	accountId: string
	purpose: GeoAutocompletePurpose
	query: string
	searchSessionRef?: string
	bias?: GeoPointDto
	countryCodes?: string[]
	locale?: string
}

/** A single autocomplete suggestion projection. */
export interface GeoSuggestionProjection {
	suggestionId: string
	placeRef: string
	primaryText: string
	secondaryText: string
	categories: string[]
	distanceMeters?: number
	attribution?: string
	inServiceArea?: boolean
}

/** Result of a geo place-autocomplete call. */
export interface GeoAutocompleteResult {
	schemaVersion: 1
	searchSessionRef: string
	suggestions: GeoSuggestionProjection[]
	expiresAt: string
	quality: 'CURRENT' | 'DEGRADED'
}

/** Params accepted by a geo place-resolve call. */
export interface GeoResolveParams {
	accountId: string
	searchSessionRef: string
	placeRef: string
}

/** A resolved place with a definitive point and structured address. */
export interface ResolvedPlace {
	schemaVersion: 1
	point: GeoPointDto
	address: AddressSnapshotV1
	placeRef: string
	expiresAt: string
	inServiceArea?: boolean
}

/** The shape consumed by `useCountry`-style option maps (provider-compatible). */
export type CountryOption = {
	value: string
	label: string
	callingCode?: string
	countryCode?: string
	[key: string]: any
}

// Vendored from @wallet/provider (parse/contracts.ts)
export type SettlementWriteOffReasonCode = 'DEMO_DATA' | 'UNCOLLECTABLE' | 'DUPLICATE' | 'GOODWILL' | 'OTHER'
