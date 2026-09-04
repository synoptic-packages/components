import clsx from 'clsx'
import { getAssetBaseUrl } from '../../../lib/env'
import type { FC } from 'react'
import { useConfig } from '../../../context/provider-config'
import { Image } from '../../image'

interface Props {
	size?: number
	className?: string
	variant?: 'light' | 'dark'
}

export const Component: FC<Props> = ({ className, size = 54, variant }) => {
	const { isDark } = useConfig()
	const effectiveVariant = variant ?? (isDark ? 'light' : 'dark')
	const url =
		effectiveVariant === 'light'
			? `${getAssetBaseUrl()}icon-light.svg`
			: `${getAssetBaseUrl()}icon.svg`

	return (
		<Image src={url} className={clsx('flex-shrink-0', className)} alt={`Brand Icon`} width={size} height={size} />
	)
}
