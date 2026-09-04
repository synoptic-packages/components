import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Text } from '../../text'
import React from 'react'
import { useNavigate } from '../../../hooks/useNavigate'
import type { IMenu } from '../../../types/generics'
import { Box } from '../../box'
import { Icon } from '../../icon'

export const Component: React.FC<IMenu> = ({ items, showBackButton, onBackButtonClick, testId }) => {
	const navigate = useNavigate()

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			if (a.sort === undefined && b.sort === undefined) return 0
			if (a.sort === undefined) return 1
			if (b.sort === undefined) return -1
			return a.sort - b.sort
		})
	}, [items])

	return (
		<Box width={`100%`} data-test-id={testId ?? `id-wallet-menu`} sx={{ bgcolor: 'background.paper' }}>
			<nav aria-label={`main mailbox folders`}>
				<List>
					{showBackButton && (
						<React.Fragment>
							<ListItem>
								<ListItemButton onClick={onBackButtonClick} sx={{ minHeight: 40 }}>
									<ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
										<Icon name={`ArrowLeft`} size={20} />
									</ListItemIcon>
									<ListItemText primary={`Back to main menu`} sx={{ m: 0 }} />
								</ListItemButton>
							</ListItem>
							<Divider sx={{ my: 1 }} />
						</React.Fragment>
					)}
					{sortedItems.map(
						(
							{ icon, label, path, divider, disabled, active, onClick, hidden, testId: itemTestId },
							index
						) => {
							if (hidden) {
								return null
							}
							const isActive = !disabled && active
							return (
								<React.Fragment key={index}>
									{divider?.includes(`top`) && <Divider sx={{ my: 1.5 }} />}
									<ListItem disablePadding>
										<ListItemButton
											// No fallback default: every entry of one sidebar would share it, so it could
											// never address a single row. An entry a flow must click passes its own id.
											data-test-id={itemTestId}
											disabled={disabled}
											onClick={() => {
												if (onClick && typeof onClick === 'function' && !disabled) {
													onClick({ icon, label, divider, disabled, active })
												} else {
													navigate(path || `/`)
												}
											}}
											sx={{
												minHeight: 46,
												bgcolor: isActive ? 'primary.main' : 'transparent',
												'&:hover': {
													bgcolor: isActive ? 'primary.dark' : 'action.hover',
												},
											}}>
											{icon ? (
												<ListItemIcon
													sx={{
														minWidth: 0,
														mr: 2,
														opacity: disabled ? 0.5 : 0.8,
														color: isActive ? 'white' : `text.primary`,
													}}>
													<Icon name={icon} size={24} color={isActive ? `white` : `text`} />
												</ListItemIcon>
											) : null}
											<ListItemText
												primary={
													<Text
														fontSize={15}
														color={isActive ? `white` : `text.primary`}
														fontWeight={isActive ? 600 : 500}>
														{label}
													</Text>
												}
												sx={{
													m: 0,
													color: isActive ? 'white' : 'text.primary',
												}}
											/>
										</ListItemButton>
									</ListItem>
									{divider?.includes(`bottom`) && <Divider sx={{ my: 1.5 }} />}
								</React.Fragment>
							)
						}
					)}
				</List>
			</nav>
		</Box>
	)
}
