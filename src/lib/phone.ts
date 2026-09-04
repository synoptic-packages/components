/**
 * Phone helpers vendored from `@wallet/provider` (`utils/phoneNumberGetInternationalString.ts`),
 * plus the tiny `isPhoneNumberValid` helper it depends on.
 *
 * NOTE: the provider's `isPhoneNumberValid` used `google-libphonenumber` (a heavyweight native
 * dependency). This vendored copy uses `libphonenumber-js` instead — the same library the rest of
 * the component surface already depends on — keeping the package dependency-light while preserving
 * the parse-and-validate behaviour.
 */
import { isValidPhoneNumber, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import type { PhoneNumberInterface } from './types'

/**
 * Validates a phone number for a country using libphonenumber-js.
 */
export const isPhoneNumberValid = (countryCode: string | undefined, number: string | undefined): boolean => {
	try {
		if (!countryCode || !number) return false
		return isValidPhoneNumber(number, countryCode as CountryCode)
	} catch {
		return false
	}
}

/**
 * Parses and formats a phone number into national and international display forms.
 */
export function phoneNumberGetInternationalString(phoneNumberObject: PhoneNumberInterface):
	| {
			national: string | undefined
			international: string | undefined
			countryCode: string
	  }
	| undefined {
	if (!phoneNumberObject) return undefined

	const { national, international, countryCode } = phoneNumberObject
	if (!countryCode) return undefined

	const input = international || national
	if (!input) return undefined

	let parsed
	try {
		parsed = parsePhoneNumberFromString(input, countryCode as CountryCode)
	} catch {
		return undefined
	}

	if (!parsed || !isPhoneNumberValid(countryCode as string, input)) return undefined

	return {
		national: parsed.formatNational(),
		international: parsed.formatInternational(),
		countryCode: countryCode as string,
	}
}
