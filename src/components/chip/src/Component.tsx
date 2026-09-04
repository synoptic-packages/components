import Chip, { type ChipProps } from '@mui/material/Chip'
import { useMemo } from 'react'
import { Icon } from '../../icon'

export interface IComponentProps extends ChipProps {
	label: React.ReactNode
	testId?: string
}

const useChipIconColor = (variant: ChipProps['variant'], color: ChipProps['color']) => {
	return useMemo(() => {
		if (variant === `outlined`) {
			return color === `default` ? `text` : color
		}

		const darkColorChips = [`primary`, `secondary`, `error`, `info`]
		const isChipDark = darkColorChips.includes(color as string)

		if (isChipDark) {
			return `white`
		}

		if (color === `accent`) {
			return `dark`
		}

		return `text`
	}, [variant, color])
}

const useChipIconSize = (size: ChipProps['size']) => {
	return useMemo(() => {
		if (size === `small`) return 10
		return 14
	}, [size])
}

export const Component: React.FC<IComponentProps> = ({
	label,
	variant = `outlined`,
	color = `default`,
	size = `medium`,
	testId,
	...props
}) => {
	const iconColor = useChipIconColor(variant, color)
	const iconSize = useChipIconSize(size)

	return (
		<Chip
			data-test-id={testId ?? `id-wallet-chip`}
			label={label}
			variant={variant}
			color={color}
			size={size}
			icon={<Icon name={`SyCircleFilled`} size={iconSize} color={iconColor} />}
			sx={{ paddingLeft: `6px`, paddingRight: `8px` }}
			{...props}
		/>
	)
}

export const ComponentBadge: React.FC<IComponentProps> = ({ label, variant, size = `small`, testId, ...props }) => {
	const iconColor = useChipIconColor(variant, props.color)
	const iconSize = useChipIconSize(size)

	return (
		<Chip
			data-test-id={testId ?? `id-wallet-chip`}
			label={label}
			variant={variant}
			size={size}
			icon={<Icon name={`SyCircleFilled`} size={iconSize} color={iconColor} />}
			sx={{ paddingLeft: `6px` }}
			{...props}
		/>
	)
}
