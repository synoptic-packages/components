import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import {
	ColumnsPanelTrigger,
	ExportCsv,
	ExportPrint,
	FilterPanelTrigger,
	QuickFilter,
	QuickFilterClear,
	QuickFilterControl,
	QuickFilterTrigger,
	Toolbar,
	ToolbarButton,
	type GridDensity,
	type GridToolbarProps,
	type ToolbarPropsOverrides,
} from '@mui/x-data-grid'
import * as React from 'react'
import { useRef, useState, type JSXElementConstructor } from 'react'
import { Text } from '../../text'

import { useConfig } from '../../../context/provider-config'
import type { TGeneric } from '../../../types/generics'
import { Icon } from '../../icon'
import type { TableToolbarAction } from './types'

declare module '@mui/x-data-grid' {
	interface ToolbarPropsOverrides {
		settings: Settings
		onSettingsChange: React.Dispatch<React.SetStateAction<Settings>>
		creatable?: boolean
		toolbarActions?: TableToolbarAction[]
	}
}

type OwnerState = {
	expanded: boolean
}

interface Settings {
	density?: GridDensity
	showCellBorders?: boolean
	showColumnBorders?: boolean
}

type ToolbarProps = {
	settings: Settings
	onSettingsChange: React.Dispatch<React.SetStateAction<Settings>>
	creatable?: boolean
	name: string
	title?: string
	toolbarActions?: TableToolbarAction[]
}

const StyledQuickFilter = styled(QuickFilter)({
	display: 'grid',
	alignItems: 'center',
})

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
	gridArea: '1 / 1',
	width: 'min-content',
	height: 'min-content',
	zIndex: 1,
	opacity: ownerState.expanded ? 0 : 1,
	pointerEvents: ownerState.expanded ? 'none' : 'auto',
	transition: theme.transitions.create(['opacity']),
})) as TGeneric

const StyledTextField = styled(TextField)<{
	ownerState: OwnerState
}>(({ theme, ownerState }) => ({
	gridArea: '1 / 1',
	overflowX: 'clip',
	width: ownerState.expanded ? 260 : 'var(--trigger-width)',
	opacity: ownerState.expanded ? 1 : 0,
	transition: theme.transitions.create(['width', 'opacity']),
}))

const DENSITY_OPTIONS: { label: string; value: GridDensity }[] = [
	{ label: 'Compact density', value: 'compact' },
	{ label: 'Standard density', value: 'standard' },
	{ label: 'Comfortable density', value: 'comfortable' },
]

export function Component(
	props: ToolbarProps | JSXElementConstructor<GridToolbarProps & ToolbarPropsOverrides> | TGeneric | undefined
) {
	const { colors } = useConfig()
	const { settings, onSettingsChange, collection, creatable, toolbarActions } = props
	const customActions: TableToolbarAction[] = Array.isArray(toolbarActions) ? toolbarActions : []

	const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
	const [exportMenuOpen, setExportMenuOpen] = useState(false)
	const settingsMenuTriggerRef = useRef<HTMLButtonElement>(null)
	const exportMenuTriggerRef = useRef<HTMLButtonElement>(null)

	return (
		<Toolbar style={{ paddingBottom: 32, paddingTop: 16, paddingRight: 16, minHeight: 80 }}>
			<Box display={`flex`} alignItems={`center`} flexDirection={`row`} sx={{ flex: 1 }}>
				<Text variant={`h3`} fontWeight={400} sx={{ flex: 1, mx: 0.5, textAlign: 'left' }}>
					{props.title}
				</Text>
			</Box>
			{collection && creatable && (
				<Tooltip title={`Create`}>
					<ToolbarButton
						ref={settingsMenuTriggerRef}
						id={`settings-menu-trigger`}
						aria-controls={`settings-menu`}
						aria-haspopup={`true`}
						aria-expanded={settingsMenuOpen ? `true` : undefined}
						style={{ backgroundColor: colors?.bg, marginLeft: 6 }}
						onClick={() => {}}>
						<Icon name={`SyAdd`} size={21} />
					</ToolbarButton>
				</Tooltip>
			)}
			{customActions.map((action) => (
				<Tooltip key={action.key} title={action.label}>
					<span>
						<ToolbarButton
							// A toolbar action was addressable only by its tooltip text, so every acceptance test
							// that wanted one had to select by copy — which the constitution forbids and which
							// breaks on the first wording change. The id is derived from the caller's own
							// `action.key`, so it is deterministic and needs no change at any call site.
							data-test-id={`table-toolbar-action-${action.key}`}
							aria-label={action.label}
							disabled={action.disabled}
							style={{ backgroundColor: colors?.bg, marginLeft: 6 }}
							onClick={action.onClick}>
							<Icon name={action.icon} size={24} />
						</ToolbarButton>
					</span>
				</Tooltip>
			))}
			<Tooltip title={`Settings`}>
				<ToolbarButton
					ref={settingsMenuTriggerRef}
					id={`settings-menu-trigger`}
					aria-controls={`settings-menu`}
					aria-haspopup={`true`}
					aria-expanded={settingsMenuOpen ? `true` : undefined}
					style={{ backgroundColor: colors?.bg, marginLeft: 6 }}
					onClick={() => setSettingsMenuOpen(true)}>
					<Icon name={`Settings`} size={24} />
				</ToolbarButton>
			</Tooltip>

			<Tooltip title={`Filters`}>
				<FilterPanelTrigger
					render={(props) => (
						// @ts-ignore
						<ToolbarButton {...props} style={{ backgroundColor: colors?.bg, marginLeft: 6 }}>
							<Icon name={`Menu`} size={24} />
						</ToolbarButton>
					)}
				/>
			</Tooltip>

			<Tooltip title={`Columns`}>
				<ColumnsPanelTrigger render={<ToolbarButton style={{ backgroundColor: colors?.bg, marginLeft: 6 }} />}>
					<Icon name={`SlidersHorizontal`} size={24} />
				</ColumnsPanelTrigger>
			</Tooltip>

			<Tooltip title={`Export`}>
				<ToolbarButton
					ref={exportMenuTriggerRef}
					id={`export-menu-trigger`}
					aria-controls={`export-menu`}
					aria-haspopup={`true`}
					style={{ backgroundColor: colors?.bg, marginLeft: 6 }}
					aria-expanded={exportMenuOpen ? `true` : undefined}
					onClick={() => setExportMenuOpen(true)}>
					<Icon name={`ArrowBigDownDash`} size={24} />
				</ToolbarButton>
			</Tooltip>

			<Menu
				id={`--table-export-menu`}
				anchorEl={exportMenuTriggerRef.current}
				open={exportMenuOpen}
				onClose={() => setExportMenuOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				slotProps={{
					list: {
						'aria-labelledby': 'export-menu-trigger',
					},
				}}>
				<ExportPrint render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>
					Print
				</ExportPrint>
				<ExportCsv render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>
					Download as CSV
				</ExportCsv>
			</Menu>

			<Menu
				id={`settings-menu`}
				anchorEl={settingsMenuTriggerRef.current}
				open={settingsMenuOpen}
				onClose={() => setSettingsMenuOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				slotProps={{
					list: {
						'aria-labelledby': `settings-menu-trigger`,
					},
				}}>
				{DENSITY_OPTIONS.map((option) => (
					<MenuItem
						key={option.value}
						onClick={() =>
							onSettingsChange((currentSettings: TGeneric) => ({
								...currentSettings,
								density: option.value,
							}))
						}>
						<ListItemIcon>{settings.density === option.value && <Icon name={`Check`} />}</ListItemIcon>
						<ListItemText>{option.label}</ListItemText>
					</MenuItem>
				))}
				<Divider />
				<MenuItem
					onClick={() =>
						onSettingsChange((currentSettings: TGeneric) => ({
							...currentSettings,
							showColumnBorders: !currentSettings.showColumnBorders,
						}))
					}>
					<ListItemIcon>{settings.showColumnBorders && <Icon name={`SyCheck`} size={24} />}</ListItemIcon>
					<ListItemText>Show column borders</ListItemText>
				</MenuItem>
				<MenuItem
					onClick={() =>
						onSettingsChange((currentSettings: TGeneric) => ({
							...currentSettings,
							showCellBorders: !currentSettings.showCellBorders,
						}))
					}>
					<ListItemIcon>{settings.showCellBorders && <Icon name={`SyCheck`} size={24} />}</ListItemIcon>
					<ListItemText>Show cell borders</ListItemText>
				</MenuItem>
			</Menu>

			<StyledQuickFilter>
				<QuickFilterTrigger
					render={(triggerProps, state) => (
						<Tooltip title={`Search`} enterDelay={0}>
							<StyledToolbarButton
								{...triggerProps}
								style={{ backgroundColor: colors?.bg, marginLeft: 6 }}
								ownerState={{ expanded: state.expanded }}
								color={`default`}
								aria-disabled={state.expanded}>
								<Icon name={`Search`} size={24} />
							</StyledToolbarButton>
						</Tooltip>
					)}
				/>
				<QuickFilterControl
					render={({ ref, ...controlProps }, state) => (
						<StyledTextField
							{...controlProps}
							ownerState={{ expanded: state.expanded }}
							inputRef={ref}
							aria-label={`Search`}
							placeholder={`Search...`}
							size={`small`}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position={`start`}>
											<Icon name={`Search`} />
										</InputAdornment>
									),
									endAdornment: state.value ? (
										<InputAdornment position={`end`}>
											<QuickFilterClear
												edge={`end`}
												size={`small`}
												aria-label={`Clear search`}
												material={{ sx: { marginRight: -0.75 } }}>
												<Icon name={`X`} />
											</QuickFilterClear>
										</InputAdornment>
									) : null,
									...controlProps.slotProps?.input,
								},
								...controlProps.slotProps,
							}}
						/>
					)}
				/>
			</StyledQuickFilter>
		</Toolbar>
	)
}
