import { SvgIcon } from '@mui/material'
import * as SynotechIcons from '@synotech/icons'
import clsx from 'clsx'
import { icons } from 'lucide-react'
import React, { useMemo } from 'react'
import { useConfig } from '../../../context/provider-config'
import { colorsDark, colorsLight } from '../../../theme/colors'
import type { Color, TGeneric } from '../../../types/generics'

type LucideIconName = keyof typeof icons
type SynotechIconsName = keyof typeof SynotechIcons

export type IconName = SynotechIconsName | LucideIconName

interface IconProps {
	name: IconName | string
	color?: Color | string
	colorLight?: Color | string
	colorDark?: Color | string
	size?: number
	width?: number
	height?: number
	className?: string
	style?: React.CSSProperties
}

const ComponentIcons: React.FC<IconProps> = ({
	name,
	color,
	colorLight,
	colorDark,
	size = 32,
	className = '',
	style,
}) => {
	const { colors, isDark } = useConfig()
	let ImportedComponent: React.ComponentType | null = null

	try {
		ImportedComponent = SynotechIcons[name as never] as TGeneric | React.ComponentType | null
	} catch (error) {
		console.error(`Error loading component ${name}:`, error)
	}

	if (!ImportedComponent) {
		return null
	}

	const effectiveColor = color || (isDark ? colorDark : colorLight)

	let resolvedColor

	try {
		resolvedColor = Object.prototype.hasOwnProperty.call(colors, effectiveColor as string)
			? colors?.[effectiveColor as keyof typeof colors]
			: effectiveColor
	} catch {
		resolvedColor = effectiveColor
	}

	return (
		<SvgIcon
			component={ImportedComponent}
			inheritViewBox
			className={clsx('fintech-os-svg-icon', 'currentColor', className)}
			sx={{
				height: `${size}px`,
				width: `${size}px`,
				fontSize: `${size}px`,
				color: resolvedColor,
				fill: resolvedColor,
			}}
			style={{
				...style,
			}}
		/>
	)
}

const ComponentBase: React.FC<IconProps> = ({
	name,
	color,
	colorLight,
	colorDark,
	size = 24,
	width,
	height,
	style,
}) => {
	const { isDark } = useConfig()
	const colors = isDark ? colorsDark : colorsLight
	const iconSize = useMemo(() => size || width || height || 24, [size, width, height])

	const effectiveColor = color || (isDark ? colorDark : colorLight)

	const resolvedColor = useMemo(
		() =>
			Object.prototype.hasOwnProperty.call(colors, effectiveColor as string)
				? colors[effectiveColor as keyof typeof colors]
				: (effectiveColor as TGeneric),
		[colors, effectiveColor]
	)

	if (name?.startsWith('Sy')) {
		return (
			<ComponentIcons
				name={name}
				color={resolvedColor}
				colorLight={colorLight}
				colorDark={colorDark}
				width={width}
				height={height}
				size={iconSize}
				style={{
					color: resolvedColor,
					...style,
				}}
			/>
		)
	}

	const LucideIcon = icons[name as keyof typeof icons]

	if (LucideIcon) {
		return <LucideIcon color={resolvedColor} size={iconSize} strokeWidth={1.2} />
	}

	return null
}

export const Component = React.memo(ComponentBase)
