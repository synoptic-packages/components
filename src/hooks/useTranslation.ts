import { useTranslation as useI18nextTranslation } from 'react-i18next'

export const useTranslation = (ns?: string | string[]) => {
	try {
		return useI18nextTranslation(ns)
	} catch {
		return {
			// Mirrors i18next's `t(key, defaultValue?, options?)` arity. The narrower one-arg fallback
			// made the UNION of the two `t` signatures uncallable with three arguments, so every
			// interpolated `t(key, 'Default {var}', { var })` call failed to type-check while the
			// two-arg form passed — a typing artifact, not a runtime behaviour.
			t: (key: string, _defaultValue?: unknown, _options?: unknown) => key,
			i18n: {
				language: 'en',
				changeLanguage: () => Promise.resolve(),
				languages: ['en'],
				options: {},
			},
			ready: true,
		}
	}
}
