import type { SettlementWriteOffReasonCode } from '../lib'

import version from './version.json'

export const __DEV__ = process.env.NODE_ENV === `development`
export const __PRODUCTION__ = process.env.NODE_ENV === `production`

export { default as sizing } from '../theme/sizing'

// Public Forms
export const FORM_CONTACT_TITLE = `Contact Form`
export const FORM_NEWSLETTER_TITLE = `Newsletter Form`
export const FORM_USER_TITLE = `User Form`
//
export const LIST_LIMIT = 250
export const SKIP = 0
export const __HEADER_ID__ = `stack-header-main`
export const __HEADER_Z_INDEX__ = 100000
//
export const HEADER_NOTIFICATION_TAG = '___header_notification'
export const TAG_LAYOUT_SIDEBAR = `stack-layout-sidebar-open`
export const SESSION_TOKEN_TAG = `stack-ai-session-token`
export const DEVICE_TOKEN_TAG = `stack-ai-device-token`
export const COOKIE_POLICY_CONSENT_TAG = 'stack-cookie-consent'
export const THEME_COLOR_TAG = `themeMode`
export const THEME_COLOR_DEFAULT = 'dark'
export const FORM_NEWSLETTER_NAME = `Newsletter Form`
//
export const ACCOUNT_ACTION_HEIGHT = 100
//
export const TOKEN_LOADER_TAG = `___loader`
export const DATE_FORMAT = `YYYY-MM-DD`
export const PASSWORD_VALIDATION_RGX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const __APP_VERSION__ = version.version
export const __APP_BUILD_DATE__ = version.buildDate
export const __GEO__ = `--stack--geo`
//
export const ARBITER_MOUNT_PATH = process.env.NEXT_PUBLIC_ARBITER_STACK_SERVER_MOUNT_PATH as string
export const APP_ID = process.env.NEXT_PUBLIC_API_KEYS_APP_ID as string
export const CLIENT_KEY = process.env.NEXT_PUBLIC_API_KEYS_CLIENT_KEY as string
export const JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_API_KEYS_JAVASCRIPT_KEY as string
//
// 64, and it must stay in step with the SAME-NAMED build-time define in `vite.config.ts` and
// `.storybook/main.ts`. Two declarations share this identifier: a file that IMPORTS it gets this
// value, a file that uses the bare global gets the define. They disagreed until 2026-08-17 — this
// said 80 while both defines said 64 — so the header component rendered 80 tall while the layout
// context offset content by 64, and nothing failed anywhere. Change all three together.
export const __HEADER_HEIGHT__ = 64
export const __SIDEBAR_WIDTH__ = 300
export const __SIDEBAR_WIDTH_COLLAPSED__ = 82
export const __SIDEBAR_WIDTH_RIGHT__ = 400

export const LOGIN_PATHNAME = `/login`
export const PLAYWRIGHT_PATHNAME = `/playwright`
export const TRACK_PATHNAME = `/track`
// The single switch that lets a route render without a Parse session: `AuthGate` (provider) asks
// `isPublicPathname`, which matches these as PREFIXES, so `/track` covers `/track/:token`. A public
// route registered in a tenant router but missing here still bounces the visitor to the auth SPA.
export const PUBLIC_PATHNAMES = [LOGIN_PATHNAME, `/map`, TRACK_PATHNAME] as const

// Public courier/trip tracking (F-014, spec 03 §8). `/track/:token` is served by ui/ and reads ONE
// endpoint on the backend origin: a plain `GET`, no Parse, no session, no cookies, no client key.
// The token is a bearer capability, so it is never logged, never sent to analytics, and never placed
// in a tile, image or font URL.
export const PUBLIC_TRACKING_API_PATH = `/public/yaya/tracking`
// Mirrors be/'s own bound (`publicTrackingResolve` rejects anything under 20 or over 200 characters)
// so a mistyped link is answered locally instead of spending a request that would 404 anyway. The
// character class is RFC 3986 unreserved, a superset of the base64url bearer be/ derives.
export const PUBLIC_TRACKING_TOKEN_MIN_LENGTH = 20
export const PUBLIC_TRACKING_TOKEN_MAX_LENGTH = 200
export const PUBLIC_TRACKING_TOKEN_PATTERN = /^[A-Za-z0-9._~-]+$/
// The server tells the page how often to poll (`pollAfterSeconds`); these only bound a hostile or
// broken value. A page that polled every 100ms because a field came back as 0.1 would be a client
// DoS on a public, unauthenticated endpoint.
export const PUBLIC_TRACKING_POLL_MIN_MS = 3_000
export const PUBLIC_TRACKING_POLL_MAX_MS = 300_000
export const PUBLIC_TRACKING_POLL_FALLBACK_MS = 30_000
export const PUBLIC_TRACKING_BACKOFF_BASE_MS = 5_000
export const PUBLIC_TRACKING_BACKOFF_MAX_MS = 120_000
export const PUBLIC_TRACKING_RETRY_AFTER_MAX_MS = 300_000
export const PUBLIC_TRACKING_MAP_ZOOM = 14
// Local development fallback for the backend origin, used when `VITE_PUBLIC_BACKEND_API` is unset.
// The web app is served from the workstation, so localhost is a valid origin here — unlike mobile,
// which must always use the tunnel host.
export const BACKEND_DEV_ORIGIN = `http://localhost:8082`

export const MAP_PAGE_QUERY_PARAM_LOCATION = `location`
export const MAP_PAGE_QUERY_PARAM_FROM = `from`
export const MAP_PAGE_QUERY_PARAM_TO = `to`
export const MAP_PAGE_QUERY_PARAM_SESSION = `session`
export const MAP_PAGE_QUERY_PARAM_MAP_SESSION = `mapSession`
export const MAP_PAGE_QUERY_PARAM_PROFILE = `profile`
export const MAP_PAGE_QUERY_PARAM_ZOOM = `zoom`
export const MAP_PAGE_QUERY_PARAM_PITCH = `pitch`
export const MAP_PAGE_QUERY_PARAM_BEARING = `bearing`
export const MAP_PAGE_QUERY_PARAM_FIT = `fit`
export const MAP_PAGE_QUERY_PARAM_PADDING = `padding`
export const MAP_PAGE_QUERY_PARAM_MARKERS = `markers`
export const MAP_PAGE_QUERY_PARAM_ROUTE_COLOR = `routeColor`
export const MAP_PAGE_QUERY_PARAM_ROUTE_WIDTH = `routeWidth`
export const MAP_PAGE_QUERY_PARAM_ANIMATE = `animate`
export const MAP_PAGE_QUERY_PARAM_ANIMATION_COLOR = `animationColor`
export const MAP_PAGE_QUERY_PARAM_ANIMATION_WIDTH = `animationWidth`
export const MAP_PAGE_QUERY_PARAM_ANIMATION_SPEED = `animationSpeed`
export const MAP_PAGE_QUERY_PARAM_FROM_COLOR = `fromColor`
export const MAP_PAGE_QUERY_PARAM_TO_COLOR = `toColor`
export const MAP_PAGE_QUERY_PARAM_STYLE = `style`
export const MAP_PAGE_QUERY_PARAM_FOLLOW = `follow`
export const MAP_PAGE_QUERY_PARAM_CLEAR_SESSION = `clearSession`
export const MAP_PAGE_CURRENT_LOCATION_VALUE = `current`
export const MAP_PAGE_SESSION_STORAGE_KEY = `yaya-map-session`

// Better Auth session token persisted from the auth handoff exchange. Read by the Better Auth
// client as a Bearer credential for identity/admin API calls against the auth Worker.
export const STORAGE_KEY_BETTER_AUTH_TOKEN = `better-auth-token`

// better-auth's machine-readable refusal codes (`@better-auth/core`'s `BASE_ERROR_CODES`, sent as
// the APIError body's `code`). They are the auth Worker's contract, not copy this console invents,
// so they live here and are branched on by name rather than by matching the human message.
//
// `SESSION_NOT_FRESH` is the one worth knowing about: `/unlink-account` runs under
// `freshSessionMiddleware`, so a handoff Bearer older than the Worker's `session.freshAge` (24h by
// default) is refused outright. Retrying cannot help — only a new sign-in can.
export const AUTH_ERROR_CODES = {
	sessionNotFresh: `SESSION_NOT_FRESH`,
	unauthorized: `UNAUTHORIZED`,
	failedToUnlinkLastAccount: `FAILED_TO_UNLINK_LAST_ACCOUNT`,
	accountNotFound: `ACCOUNT_NOT_FOUND`,
	socialAccountAlreadyLinked: `SOCIAL_ACCOUNT_ALREADY_LINKED`,
	providerNotFound: `PROVIDER_NOT_FOUND`,
} as const

// The OAuth link journey leaves the console and comes back. On success better-auth returns the
// browser to `callbackURL`; on failure it returns it to `errorCallbackURL` carrying these two
// query parameters (`redirectOnError`, `better-auth/dist/oauth2/errors.mjs`). Without an explicit
// `errorCallbackURL` the user is stranded on the auth Worker's own error page instead.
export const OAUTH_ERROR_QUERY_PARAM = `error`
export const OAUTH_ERROR_DESCRIPTION_QUERY_PARAM = `error_description`

// User settings (feature 036). The `/account/*` tree is built once here and ALSO opened inside the
// mobile app's WebView ("embedded mode") with the console chrome hidden. The launch contract is the
// provider's `buildAccountUrl`: the native shell appends `?client=rn`, and the flag is persisted in
// sessionStorage so client-side navigation that drops the query keeps the embed presentation.
export const LAUNCH_CLIENT_QUERY_PARAM = `client`
export const LAUNCH_CLIENT_RN = `rn`
export const EMBEDDED_CLIENT_STORAGE_KEY = `wallet-embedded-client`

// The launching surface states its colour scheme here (the same param `buildAuthUrl` has always
// carried), so the console opens matching the app around it instead of this origin's last choice.
export const THEME_QUERY_PARAM = `theme`

// `auth_setProfileImage` carries the picture as base64; oversized payloads are refused locally
// before a megabyte round-trip the server would reject anyway.
export const AVATAR_IMAGE_MAX_BYTES = 2 * 1024 * 1024

// `mobility_adminSettlementWriteOff`'s reason enum, in the order an operator reads the picker in —
// the enum's own order, not alphabetical.
//
// It is a CLOSED enum and never free text, because it is the field a later question is asked of:
// how much did this market write off last quarter, and for what. `OTHER` exists so the list never
// has to be widened under pressure during an incident, and it is the one code that says nothing on
// its own — which is why the note beside it is mandatory (`.project/spec/028-settlement-write-off/SPEC.md` §3).
//
// The TYPE is the package's `SettlementWriteOffReasonCode` and is deliberately not re-declared here.
// A list is not a type: the package ships the union (`be/`'s own `SETTLEMENT_WRITE_OFF_REASON_CODES`,
// `src/domain/mobility/adminSettlement.ts`) but no runtime array, and the picker needs values in a
// stated order — so this is the ORDERING, pinned to that union. `satisfies` catches the harmful
// direction: a code invented here would be a control that `requireEnum` always refuses. It does not
// catch a code `be/` adds that nobody offers here, which is a missing option rather than a broken one.
export const SETTLEMENT_WRITE_OFF_REASON_CODES = [
	`DEMO_DATA`,
	`UNCOLLECTABLE`,
	`DUPLICATE`,
	`GOODWILL`,
	`OTHER`,
] as const satisfies readonly SettlementWriteOffReasonCode[]

// The one reason code that cannot stand alone. A write-off recorded as `OTHER` with no explanation
// is an unanswerable row, so the note is required beside it — enforced through the shared field's
// own `rules`, and again in `be/` before anything is written.
export const SETTLEMENT_WRITE_OFF_NOTE_REQUIRED_FOR: SettlementWriteOffReasonCode = `OTHER`

// Opt-in settings section tokens carried on `services_resolve`'s `ServiceDto.features`. Token
// present ⇒ the section is enabled for the tenant; absent ⇒ the section renders its stated closed
// state (never a redirect). The always-on sections (profile, personal information, preferences,
// legal, support) need no token.
export const SETTINGS_FEATURE_TOKENS = {
	profile: `settings.profile`,
	preferences: `settings.preferences`,
	notifications: `settings.notifications`,
	security: `settings.security`,
	connectedAccounts: `settings.connectedAccounts`,
	workspace: `settings.workspace`,
} as const

export type SettingsFeatureToken = (typeof SETTINGS_FEATURE_TOKENS)[keyof typeof SETTINGS_FEATURE_TOKENS]

// What a settings section demands: open to every signed-in user (`always`), a tenant opt-in token
// (`settings.*`), or closed outright until a backend contract exists (`never`).
export type SettingsSectionRequirement = `always` | `never` | SettingsFeatureToken

// The `/account/*` deep-link contract — shared with the mobile shell, which builds WebView URLs
// from these paths, so they live in constants rather than beside the route tree.
export const accountPaths = {
	root: `/account`,
	settings: `/account/settings`,
	profile: `/account/profile`,
	profileSettings: `/account/profile/settings`,
	personalInformation: `/account/profile/personal-information`,
	personalInformationAddresses: `/account/profile/personal-information/addresses`,
	preferences: `/account/profile/preferences`,
	connectedAccounts: `/account/profile/connected-accounts`,
	loginSecurity: `/account/profile/login-security`,
	loginSecuritySessions: `/account/profile/login-security/sessions`,
	loginSecurityDevices: `/account/profile/login-security/devices`,
	loginSecurityPermissions: `/account/profile/login-security/permissions`,
	loginSecuritySocialAccounts: `/account/profile/login-security/social-accounts`,
	paymentCardsLegacy: `/account/profile/payment-cards`,
	notifications: `/account/profile/notifications`,
	account: `/account/profile/account`,
	wallet: `/account/profile/wallet`,
	accountGroupsPermissions: `/account/profile/account/groups-permissions`,
	accountWalletDefi: `/account/profile/account/wallet-defi`,
	accountWallet: `/account/profile/account/wallet`,
	accountAddresses: `/account/profile/account/addresses`,
	taxes: `/account/profile/taxes`,
	items: `/account/profile/items`,
	legal: `/account/profile/legal`,
	support: `/account/profile/support`,
	supportFaqs: `/account/profile/support/faqs`,
} as const

// storage keys
export const __STORAGE_KEYS__ = {
	geo: __GEO__,
	email: `authEmail`,
	password: `authPassword`,
	lastName: `authLastName`,
	firstName: `authFirstName`,
	mobileNumber: `authMobileNumber`,
	theme: `themeSchemeMode`,
}

export const salutations = [
	'Miss',
	'Mr',
	'Mrs',
	'Dr',
	'Eng.',
	'Ms',
	'Prof',
	'Rev',
	'Lady',
	'Sir',
	'Capt',
	'Major',
	'Lt-col',
	'Col.',
]

// The three currencies `be/` permits on an Event (`eventCurrencyAssert`, spec 042 `EV-DEC-001`).
// A contract with the backend allowlist, not a preference: the organizer form offers exactly these
// and omits the key entirely when none is chosen, so the server default (the organizer account's
// currency) applies (finding 0202).
export const EVENT_CURRENCIES = [`ZAR`, `BWP`, `USD`] as const

// One page of the Ventry event discovery feed (`events_feed` `limit`/`skip`, spec 050).
export const EVENT_FEED_PAGE_SIZE = 24
