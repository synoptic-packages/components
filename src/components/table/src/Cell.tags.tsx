import { Badge, Box, Chip } from '@mui/material'
import React from 'react'

interface IComponentProps {
	tags: string[]
	max?: number
}

export const Component: React.FC<IComponentProps> = ({ tags, max = 3 }) => {
	const visible = tags.filter((tag) => !!tag).slice(0, max)
	const overflow = tags.length - visible.length

	const renderChip = (label: string, key: number) => (
		<Chip key={key} label={label} size={`small`} variant={`outlined`} sx={{ maxWidth: 100 }} />
	)

	if (visible.length === 0) return null

	const chips = visible.map((label, index) => renderChip(label, index))
	const lastIndex = chips.length - 1
	const lastChip = chips[lastIndex]

	return (
		<Box display={`flex`} alignItems={`center`} minWidth={0} height={48} gap={0.5} flexWrap={`nowrap`}>
			{chips.slice(0, lastIndex)}
			{overflow > 0 ? (
				<Badge badgeContent={overflow} color={`success`}>
					{lastChip}
				</Badge>
			) : (
				lastChip
			)}
		</Box>
	)
}
