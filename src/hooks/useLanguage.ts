import { useLanguage as useLanguageData } from '../lib'
import { useTranslation } from './useTranslation'

export const useLanguage = () => {
	const { i18n } = useTranslation()
	const data = useLanguageData()

	const changeLanguage = async (locale: string) => {
		try {
			await i18n.changeLanguage(locale)
		} catch {
			/* ignore */
		}
	}

	return {
		currentLanguage: i18n.language,
		changeLanguage,
		...data,
	}
}
