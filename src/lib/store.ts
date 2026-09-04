/**
 * A dependency-free Redux-ish store surface for the components that need a couple of app-level
 * values but must not be coupled to the wallet app's actual store (@reduxjs/toolkit is a peer
 * dependency, but components do not need a real store to render).
 *
 * `Provider` (context/provider-config) historically read `state.themeStore.themeColor` and
 * `state.user.userScopeLoading` from the wallet store. Consumers of this package may keep their own
 * real store and connect it via `Provider`'s `store` prop; the default shim keeps the Provider
 * TypeScript-clean and renderable without one.
 */
import { createContext, useContext } from 'react'

export type ColorScheme = 'light' | 'dark'

export interface ThemeStoreState {
	themeColor: ColorScheme
}

export interface CryptoOption {
	symbol?: string
	name?: string
	slug?: string
	color?: string
	colorDark?: string
	icon?: string
	[key: string]: unknown
}

export interface AccountLike {
	id?: string
	[key: string]: unknown
}

export interface ShimState {
	themeStore: ThemeStoreState
	crypto: {
		cryptos: CryptoOption[]
	}
	accounts: {
		account: AccountLike | null
	}
	user: {
		userScopeLoading?: boolean
		user?: AccountLike | null
		[key: string]: unknown
	}
}

export const shimInitialState: ShimState = {
	themeStore: {
		themeColor: 'dark',
	},
	crypto: {
		cryptos: [],
	},
	accounts: {
		account: null,
	},
	user: {
		userScopeLoading: false,
		user: null,
	},
}

/** Returns the persisted color scheme or the OS/browser preference — mirrors the app store slice. */
export const shimGetThemeColor = (): ColorScheme => {
	if (typeof window === `undefined`) return 'dark'
	try {
		const stored = localStorage.getItem(`themeMode`)
		if (stored) {
			const parsed = JSON.parse(stored)
			if (parsed?.themeColor === `light` || parsed?.themeColor === `dark`) return parsed.themeColor
		}
	} catch {
		/* ignore */
	}
	try {
		return window.matchMedia(`(prefers-color-scheme: dark)`).matches ? `dark` : `light`
	} catch {
		return 'dark'
	}
}

// Minimal useSelector stand-in so consumer code that runs inside Provider without a connected store
// still gets sensible defaults instead of a crash.
export const ShimStoreContext = createContext<ShimState>(shimInitialState)

export const useShimStore = () => useContext(ShimStoreContext)

/** Re-exported for consumers that want to type their own RootState against the same union. */
export type RootStateLike = ShimState | { [key: string]: any }

/** RootState alias so components that historically read the app store keep typechecking. */
export type RootState = ShimState
