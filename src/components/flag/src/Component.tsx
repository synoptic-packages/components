import { lowerCase } from '../../../lib'
import { Flag } from '@synotech/flags'
import type { CountryCode } from 'libphonenumber-js'

export interface IComponentProps {
	code: CountryCode | string
	size?: number
	style?: React.CSSProperties
}

export const Component: React.FC<IComponentProps> = ({ code, size = 24, style = {} }) => {
	if (!code) return null

	return <Flag data-test-id={`id-wallet-flag`} code={lowerCase(code)} width={size} height={size} style={style} />
}
