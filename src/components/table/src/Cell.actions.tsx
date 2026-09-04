import {
	Box,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Popover,
} from '@mui/material'
import React from 'react'
import { useConfig } from '../../../context/provider-config'
import type { TGeneric } from '../../../types/generics'
import { IconButton } from '../../button-icon'
import { Icon } from '../../icon'
import { Text } from '../../text'
import type { TableActionConfig, TableRowActions } from './types'

interface IComponentProps {
	row?: TGeneric
	collection: string
}

export const Component: React.FC<IComponentProps> = ({ row, collection }) => {
	const { setSnackbar } = useConfig()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [isDeleting, setIsDeleting] = React.useState(false)

	const componentClassName = `sy-table-row-${row?.id}`
	const label = `${collection?.charAt(0).toUpperCase() + collection?.slice(1)}`
	const actionHandlers = (row?.actionHandlers ?? undefined) as TableRowActions | undefined

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget.closest(`.${componentClassName}`) as HTMLElement)
	}

	const handleClose = (): void => {
		setAnchorEl(null)
	}

	async function handleDelete() {
		if (isDeleting || !collection) return
		setIsDeleting(true)
		try {
			void 0
		} catch {
			setSnackbar?.({
				open: true,
				message: `Error deleting ${label} row`,
				severity: 'error',
			})
		} finally {
			setIsDeleting(false)
			setAnchorEl(null)

			if (typeof actionHandlers?.handleDelete === `function`) {
				actionHandlers.handleDelete(row?.id)
			}
		}
	}

	const defaultActions: TableActionConfig[] = [
		{
			key: `view`,
			label: `View details`,
			icon: `Info`,
			onClick: () => {
				if (typeof actionHandlers?.handleView === `function`) {
					actionHandlers.handleView(row?.id)
				}
				handleClose()
			},
		},
		{
			key: `edit`,
			label: `Edit row`,
			icon: `Edit`,
			onClick: () => {
				if (typeof actionHandlers?.handleEdit === `function`) {
					actionHandlers.handleEdit(row?.id)
				}
				handleClose()
			},
		},
		{
			key: `delete`,
			label: `Delete row`,
			icon: `Trash`,
			onClick: handleDelete,
		},
	]

	const providedCustomActions = Array.isArray(row?.customActions)
		? (row?.customActions as TableActionConfig[])
		: undefined
	const shouldUseCustomActions = row?.customActions !== undefined
	const actionsToRender = shouldUseCustomActions ? (providedCustomActions ?? []) : defaultActions

	const handleActionSelect = async (action: TableActionConfig) => {
		if (!row) return
		if (!action.onClick && action.key === `delete`) {
			await handleDelete()
			return
		}
		if (typeof action.onClick === `function`) {
			await action.onClick({
				row,
				close: handleClose,
			})
			return
		}
		handleClose()
	}

	const open = Boolean(anchorEl)
	const id = open ? `actions-popover` : undefined

	return (
		<React.Fragment>
			<Box
				display={`flex`}
				alignItems={`center`}
				justifyContent={`center`}
				sx={{ height: 48 }}
				className={componentClassName}>
				{/* Selection is `data-test-id`-only, so the row action menu has to be reachable by one.
				    It had none at all: neither this trigger nor the items inside, which made every row
				    action in the console selectable only by text or coordinates — the two things the
				    convention forbids. Fixed centrally here rather than worked around per page. */}
				<IconButton onClick={handleClick} data-test-id={`table-row-actions`} aria-label={`Row actions`}>
					<Icon name={`EllipsisVertical`} size={21} />
				</IconButton>
			</Box>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				slotProps={{
					paper: {
						sx: {
							overflowY: `auto`,
							maxHeight: `300px`,
							minWidth: 280,
							width: anchorEl ? anchorEl.offsetWidth + 200 : undefined,
						},
					},
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}>
				<List sx={{ width: `100%` }}>
					{actionsToRender.map((action: TGeneric, index) => {
						const isDeleteAction = action.key === `delete`
						const isSpinnerVisible = isDeleteAction && isDeleting
						const isDisabled = Boolean(action.disabled) || (isDeleteAction && isDeleting)

						return (
							<React.Fragment key={action.key}>
								<ListItem disablePadding>
									{/* Mirrors the toolbar's `table-toolbar-action-<key>` so both halves of
									    the table's action surface are addressed the same way. */}
									<ListItemButton
										data-test-id={`table-row-action-${action.key}`}
										onClick={() => handleActionSelect(action)}
										disabled={isDisabled}>
										<ListItemIcon>
											{isSpinnerVisible ? (
												<CircularProgress color={`primary`} size={18} />
											) : (
												<Icon name={action.icon} size={21} color={action.iconColor} />
											)}
										</ListItemIcon>
										<ListItemText
											primary={
												<Box
													display={`flex`}
													alignItems={`center`}
													justifyContent={`space-between`}>
													<Text
														fontWeight={600}
														fontSize={16}
														sx={{ color: action.textColor }}>
														{action.label}
													</Text>
													<Icon
														name={`ChevronRight`}
														size={16}
														color={`disabled`}
														style={{ marginLeft: `auto`, opacity: 0.6 }}
													/>
												</Box>
											}
										/>
									</ListItemButton>
								</ListItem>
								{index < actionsToRender.length - 1 && (
									<Divider variant={`inset`} component={`li`} sx={{ opacity: 0.6 }} />
								)}
							</React.Fragment>
						)
					})}
					{actionsToRender.length > 0 && <Divider variant={`inset`} component={`li`} sx={{ opacity: 0.6 }} />}
					<ListItem>
						<ListItemButton onClick={handleClose}>
							<ListItemIcon>
								<Icon name={`Ban`} size={21} color={`primary`} />
							</ListItemIcon>
							<ListItemText
								primary={
									<Box display={`flex`} alignItems={`center`} justifyContent={`space-between`}>
										<Text fontWeight={600} fontSize={16}>
											Close
										</Text>
										<Icon
											name={`ChevronRight`}
											size={16}
											color={`disabled`}
											style={{ marginLeft: `auto`, opacity: 0.6 }}
										/>
									</Box>
								}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Popover>
		</React.Fragment>
	)
}
