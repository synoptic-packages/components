import { Box, ListItemButton, ListItemIcon, ListItemText, ListItem as MuiListItem } from '@mui/material'
import React from 'react'
import type { ListItemProps } from './types'

export const Component: React.FC<ListItemProps> = ({
	border = false,
	inset = false,
	icon,
	primary,
	secondary,
	right,
	button = true,
	buttonProps,
	sx,
	testId,
	...props
}) => {
	const content = (
		<>
			{icon && <ListItemIcon>{icon}</ListItemIcon>}

			{(primary || secondary) && <ListItemText primary={primary} secondary={secondary} inset={inset && !icon} />}

			{right && (
				<Box
					sx={{
						ml: 'auto',
						display: 'flex',
						alignItems: 'center',
					}}>
					{right}
				</Box>
			)}
		</>
	)

	return (
		<MuiListItem
			data-test-id={testId ?? `id-wallet-list-item`}
			disablePadding={button}
			sx={{
				...(!button && { px: 2 }),
				...(border && {
					'&::after': {
						content: '""',
						position: 'absolute',
						bottom: 0,
						left: icon && inset ? 56 : 0,
						right: 0,
						height: '1px',
						backgroundColor: 'divider',
					},
					position: 'relative',
				}),
				...sx,
			}}
			{...props}>
			{button ? (
				<ListItemButton aria-label={typeof primary === 'string' ? primary : undefined} {...buttonProps}>
					{content}
				</ListItemButton>
			) : (
				content
			)}
		</MuiListItem>
	)
}
