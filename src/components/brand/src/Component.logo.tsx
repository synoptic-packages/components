import { Box } from '@mui/material'
import clsx from 'clsx'
import { getAssetBaseUrl } from '../../../lib/env'
import { useConfig } from '../../../context/provider-config'
import { Image } from '../../image'

interface Props {
	className?: string
	size?: 'small' | 'medium' | 'large'
	variant?: 'light' | 'dark'
}

export function Component({ className, size = 'small', variant }: Props) {
	const { isDark } = useConfig()
	const effectiveVariant = variant ?? (isDark ? 'light' : 'dark')
	const url =
		effectiveVariant === 'light'
			? `${getAssetBaseUrl()}logo-light.svg`
			: `${getAssetBaseUrl()}logo.svg`

	const getDimensions = (size: string) => {
		if (size === 'small') return { width: 140, height: 44 }
		if (size === 'large') return { width: 220, height: 54 }
		return { width: 160, height: 50 }
	}

	const { width, height } = getDimensions(size)

	return (
		<Box
			className={clsx('relative text-left flex-shrink-0', className)}
			sx={{
				width: `${width}px`,
				height: `${height}px`,
				maxWidth: `${width}px`,
				maxHeight: `${height}px`,
			}}>
			<Image
				src={url}
				alt={`Brand Logo`}
				className={`w-full h-full object-contain`}
				width={width}
				height={height}
			/>
		</Box>
	)
}
