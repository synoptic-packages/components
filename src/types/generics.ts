import type { CountryCode } from 'libphonenumber-js'
import type { Control, FieldValues, UseControllerProps } from 'react-hook-form'
import type { IconName } from '../components/icon/src/Component'
import type { colorsDark, colorsLight, ThemeColors } from '../theme/colors'

export type TGeneric<T = any> = T | string

export type ValidationRules<T extends FieldValues = FieldValues> = UseControllerProps<T>['rules']

export type ColorScheme = 'light' | 'dark'

export type Color = typeof colorsLight | typeof colorsDark | Partial<ThemeColors>

export interface Option {
	label: string | TGeneric
	value: string | number | boolean | TGeneric
	hint?: string
	description?: string
	disabled?: boolean
}

export type Options = Option[]

export interface IMenuItem {
	icon?: IconName
	label: string | TGeneric
	path?: string
	/**
	 * Per-entry `data-test-id` for the rendered navigation button.
	 *
	 * There is deliberately no default: a sidebar renders one button per entry, so a shared default would
	 * be emitted N times on the same screen and could never disambiguate any of them — the same reasoning
	 * that leaves the shared `Text` without one. A menu a spec must navigate passes an id per entry
	 * (`e2e/TESTID_CONVENTION.md`). Selecting a nav row by its label is banned, being i18n-fragile.
	 */
	testId?: string
	divider?: ('bottom' | 'top')[]
	external?: boolean
	active?: boolean
	disabled?: boolean
	hidden?: boolean
	badge?: string | number | TGeneric
	badgeColor?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning'
	children?: IMenuItem[]
	onClick?: (_item: IMenuItem) => void
	sort?: number
}

export interface IMenu {
	items: IMenuItem[]
	collapsed?: boolean
	showBackButton?: boolean
	hidden?: boolean
	onBackButtonClick?: () => void
	testId?: string
}

export interface PhoneNumberInterface {
	countryCode: CountryCode | TGeneric
	national?: string
	international?: string
	type?: 'mobile' | 'landline' | 'unknown'
}

export interface ServiceErrorObject {
	message: string
	fieldErrors?: Record<string, string>
	status?: number
	raw?: unknown
}

export interface FormHookProps {
	asModal?: boolean
	name?: string | undefined
	id?: string | undefined
	title?: string
	values?: Record<string, TGeneric> | null
	visible?: boolean
	afterSave?: (_data?: TGeneric) => Promise<TGeneric>
	closeForm?: () => void
}

export interface IFormProps {
	children: (props: { control: Control<any> }) => React.ReactElement
	onReset?: () => void
	onSubmit?: (_?: TGeneric) => Promise<TGeneric>
	isSubmitting?: boolean
	hideActions?: boolean
	hideReset?: boolean
	submitDisabled?: boolean
	size?: 'small' | 'medium' | 'full'
	submitLabel?: string
	resetLabel?: string
	avatar?: {
		src: string
		alt: string
	}
	isLoading?: boolean
	setSubmitting?: (_: boolean) => void
	endAdornment?: React.ReactNode | React.ReactElement | (() => React.ReactNode | React.ReactElement) | TGeneric
	control: Control<TGeneric> | TGeneric
	testId?: string
}

export interface AddressInterface {
	address: string
	country: string
	country_name: string
	state: string
	state_name: string
	town: string
	municipality: string
	location: string
}

export interface PlaceInterface {
	types: string[]
	name: string
	displayName: {
		text: string
	}
	formattedAddress: string
	shortFormattedAddress: string
	addressComponents: string[]
	location: {
		latitude: string
		longitude: string
	}
}

export interface Language {
	label: Record<string, string>
	code: string
	fallbackLocale: string
	rtl: boolean
	flag: string
}

export interface Currency {
	code: string
	symbol: string
	name: {
		common: string
		ar: string
		de: string
		en: string
		es: string
		fr: string
		hi: string
		ja: string
		ko: string
		pt: string
		ru: string
		tr: string
		zh: string
	}
	flag: string
	order: number
}

export interface Country {
	currency: string
	callingCode: string
	region: string
	subregion: string
	slug: string
	name: {
		common: string
		ar: string
		de: string
		en: string
		es: string
		fr: string
		hi: string
		ja: string
		ko: string
		pt: string
		ru: string
		tr: string
		zh: string
	}
	countryCode: string | CountryCode | TGeneric
	visaCode: string
	states: string[]
}
