/**
 * Minimal i18next instance for components that need a translation function outside an app that has
 * configured react-i18next. Components that call `useTranslation()` from `react-i18next` are
 * expected to run inside an `I18nextProvider`; this shim backs the locale metadata helpers only.
 */
import languagesData from '../constants/languages.json'
import type { TGeneric } from '../types/generics'

export const languages = languagesData as TGeneric[]

export const locales = languages.map((lang) => lang.code)

export const locales_meta = languages.reduce(
	(acc, lang) => {
		acc[lang.code] = {
			name: lang.label[lang.code],
			flag: lang.flag,
			rtl: lang.rtl,
		}
		return acc
	},
	{} as Record<string, { name: string; flag: string; rtl: boolean }>
)

export const getLanguageLabel = (code: string, displayLanguage: string = 'en'): string => {
	const language = languages.find((lang) => lang.code === code)
	return language?.label?.[displayLanguage] || code
}
