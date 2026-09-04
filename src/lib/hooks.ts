/**
 * React hooks vendored from `@wallet/provider` (`hooks/useCountry.ts`, `hooks/useCurrency.ts`,
 * `hooks/usePassword.ts`, `hooks/useLanguage.ts`), adapted to read the bundled datasets in this
 * package's `constants/`. Implementations are verbatim copies of the provider code except for the
 * import path of the seed data, so behaviour stays identical.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import countriesData from '../constants/countries.json'
import currenciesData from '../constants/currencies.json'
import languagesData from '../constants/languages.json'
import type { Country, CountryOption, Currency, Language } from './types'
import { upperCase } from './string'

/** Bundled currency seed data used as the default for `useCurrency()`. */
export const currencies: Currency[] = currenciesData as Currency[]
/** Bundled country seed data used as the default for `useCountry()`. */
export const countries: Country[] = countriesData as Country[]
/** Bundled language seed data used as the default for `useLanguage()`. */
export const languages: Language[] = languagesData as Language[]

/**
 * Select option shape derived from a country record.
 */
export type { CountryOption } from './types'

type UseCountryReturn = {
	countries: Country[]
	getCountryByCode: (code: string) => Country | undefined
	options: CountryOption[]
}

/**
 * Provides country list state, country-code lookup, and select options from the
 * bundled or supplied country list.
 */
export function useCountry(dataList: Country[] = countries, restrictTo?: string[]): UseCountryReturn {
	const [countriesState, setCountries] = useState<Country[]>(dataList)
	const [options, setOptions] = useState<CountryOption[]>([])
	const restrictKey = (restrictTo ?? [])
		.map((code) => upperCase(code))
		.sort()
		.join(',')

	useEffect(() => {
		const allow = restrictKey ? restrictKey.split(',') : []
		const source = allow.length
			? dataList.filter((country) => allow.includes(upperCase(country.countryCode)))
			: dataList
		const opts = source.map((country) => ({
			label: country.name.common,
			value: country.countryCode,
			callingCode: country.callingCode,
			countryCode: country.countryCode,
		}))
		setCountries(source)
		setOptions(opts)
	}, [dataList, restrictKey])

	const getCountryByCode = useCallback(
		(code: string): Country | undefined => {
			return dataList.find((country) => upperCase(country?.countryCode) === upperCase(code))
		},
		[dataList]
	)

	return {
		countries: countriesState,
		getCountryByCode,
		options,
	}
}

/**
 * Select option shape derived from a currency record.
 */
export type CurrencyOption = {
	value: string
	label: string
	countryCode?: string
	[key: string]: any
}

type UseCurrencyReturn = {
	currencyGet: (code: string) => Currency | undefined
	options: CurrencyOption[]
}

/**
 * Provides currency lookup helpers and select options from the bundled or supplied currency list.
 *
 * NOTE: `currencyAmountToWords` from the provider's `useCurrency` (which depended on the `to-words`
 * package) is intentionally NOT vendored — nothing in the copied component surface uses it.
 */
export function useCurrency(data: Currency[] = currencies): UseCurrencyReturn {
	/**
	 * Finds a currency by ISO currency code.
	 */
	function currencyGet(code: string): Currency | undefined {
		return data?.find((currency) => currency.code === code)
	}

	const currencyOptions: CurrencyOption[] = useMemo(
		() =>
			data.map((currency) => ({
				value: currency.code,
				label: currency.name.common,
				countryCode: currency.flag,
			})),
		[data]
	)

	return {
		currencyGet,
		options: currencyOptions,
	}
}

/**
 * Password strength result returned by `usePassword()`.
 */
export type PasswordStrength = {
	/** Strength bucket from empty/very weak to strong. */
	score: 0 | 1 | 2 | 3 | 4
	/** User-facing label selected from default or supplied labels. */
	label: string
	/** Color token selected from default or supplied colors. */
	color: string
	/** Percent of strength checks that passed, from 0 to 100. */
	percentage: number
	/** Fraction of strength checks that passed, from 0 to 1. */
	progress: number
	/** Individual password composition checks. */
	checks: {
		hasLowercase: boolean
		hasUppercase: boolean
		hasNumber: boolean
		hasMinLength: boolean
		hasSpecialChar: boolean
	}
}

type PasswordColors = {
	error: string
	warning: string
	info: string
	success: string
	transparent: string
}

type PasswordLabels = {
	veryWeak: string
	weak: string
	good: string
	strong: string
}

const defaultColors: PasswordColors = {
	error: '#d32f2f',
	warning: '#ed6c02',
	info: '#0288d1',
	success: '#2e7d32',
	transparent: 'transparent',
}

const defaultLabels: PasswordLabels = {
	veryWeak: 'Very Weak',
	weak: 'Weak',
	good: 'Good',
	strong: 'Strong',
}

/**
 * Scores a password against the shared password composition rules.
 *
 * Consumers can override returned colors and labels to match each app's design
 * system while keeping validation behavior consistent across projects.
 */
export function usePassword(
	password: string = '',
	colors: Partial<PasswordColors> = {},
	labels: Partial<PasswordLabels> = {}
) {
	const mergedColors = useMemo(() => ({ ...defaultColors, ...colors }), [colors])
	const mergedLabels = useMemo(() => ({ ...defaultLabels, ...labels }), [labels])

	const passwordStrength = useMemo((): PasswordStrength => {
		const hasLowercase = /[a-z]/.test(password)
		const hasUppercase = /[A-Z]/.test(password)
		const hasNumber = /[0-9]/.test(password)
		const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
		const hasMinLength = password.length >= 8

		const checks = {
			hasLowercase,
			hasUppercase,
			hasNumber,
			hasMinLength,
			hasSpecialChar,
		}

		const passedChecks = Object.values(checks).filter(Boolean).length
		const totalChecks = Object.values(checks).length
		let score: 0 | 1 | 2 | 3 | 4 = 0
		let label = ''

		if (password.length === 0) {
			score = 0
			label = ''
		} else if (passedChecks <= 1) {
			score = 1
			label = mergedLabels.veryWeak
		} else if (passedChecks === 2) {
			score = 2
			label = mergedLabels.weak
		} else if (passedChecks === 3) {
			score = 3
			label = mergedLabels.good
		} else if (passedChecks >= 4) {
			score = 4
			label = mergedLabels.strong
		}

		const percentage = password.length === 0 ? 0 : (passedChecks / totalChecks) * 100
		const progress = password.length === 0 ? 0 : passedChecks / totalChecks

		let color = ''
		if (password.length === 0) {
			color = mergedColors.transparent
		} else if (score <= 1) {
			color = mergedColors.error
		} else if (score === 2) {
			color = mergedColors.warning
		} else if (score === 3) {
			color = mergedColors.info
		} else {
			color = mergedColors.success
		}

		return {
			score,
			label,
			color,
			percentage,
			progress,
			checks,
		}
	}, [password, mergedColors, mergedLabels])

	const isValidPassword = useMemo(() => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
		return regex.test(password)
	}, [password])

	return {
		passwordStrength,
		isValidPassword,
	}
}

/**
 * Select option shape derived from a language record.
 */
export type LanguageOption = {
	value: string
	label: string
	rtl: boolean
	flag: string
}

type UseLanguageReturn = {
	languageGet: (code: string) => Language | undefined
	options: LanguageOption[]
}

/**
 * Provides language lookup helpers and select options from the bundled or supplied language list.
 */
export function useLanguage(data: Language[] = languages): UseLanguageReturn {
	/**
	 * Finds a language by language code.
	 */
	function languageGet(code: string): Language | undefined {
		return data?.find((lang) => lang.code === code)
	}

	const options: LanguageOption[] = useMemo(
		() =>
			data.map((lang) => ({
				value: lang.code,
				label: lang.label.en ?? lang.label[Object.keys(lang.label)[0]],
				rtl: lang.rtl,
				flag: lang.flag,
			})),
		[data]
	)

	return {
		languageGet,
		options,
	}
}
