/**
 * Environment accessors for the library. The original components read Vite
 * globals (`import.meta.env.*`) which only exist inside the app's Vite build.
 * This shim reads the same values from `process.env` / a global override so the
 * package works in any bundler (Vite, webpack, CRA, Next).
 */

type Env = Record<string, string | undefined>

function read(): Env {
	if (typeof process !== 'undefined' && process.env) {
		return process.env as Env
	}
	return {}
}

/** Base URL for public assets (mirrors Vite's import.meta.env.BASE_URL). */
export const getAssetBaseUrl = (): string => read().PUBLIC_URL || read().BASE_URL || '/'

/** Storybook flag (Vite injects import.meta.env.STORYBOOK). */
export const isStorybook = (): boolean =>
	read().STORYBOOK === 'true' || (typeof window !== 'undefined' && Boolean((window as any).STORYBOOK))

/** Generic Vite-style env var read, e.g. VITE_PUBLIC_MAPBOX_TOKEN. */
export const getEnv = (key: string): string | undefined => read()[key]
