import Box from '@mui/material/Box'
import { DataGrid, GridRow, type GridColDef, type GridDensity } from '@mui/x-data-grid'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { TableToolbar } from '..'
import type { TGeneric } from '../../../types/generics'
import type { IconName } from '../../icon/src/Component'
import { GridNoResultsOverlay, GridNoRowsOverlay, SkeletonLoadingOverlay } from './Component.empty'
import type { TableActionConfig, TableRowActions, TableToolbarAction } from './types'

interface CustomToolbarProps {
	icon?: IconName
	title?: string
	name: string
	creatable?: boolean
	settings: Settings
	onSettingsChange: (_settings: Settings) => void
	toolbarActions?: TableToolbarAction[]
}

declare module '@mui/x-data-grid' {
	interface GridToolbarProps extends CustomToolbarProps {}
}

interface Settings {
	density?: GridDensity
	showCellBorders?: boolean
	showColumnBorders?: boolean
}

const SETTINGS_STORAGE_KEY = 'mui-data-grid-settings'

const SETTINGS_DEFAULT: Settings = {
	density: 'standard',
	showCellBorders: true,
	showColumnBorders: true,
}

const getInitialSettings = (): Settings => {
	try {
		const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
		return storedSettings ? JSON.parse(storedSettings) : SETTINGS_DEFAULT
	} catch {
		return SETTINGS_DEFAULT
	}
}

interface Props {
	name: string
	creatable?: boolean
	columns: GridColDef[]
	filterModel?: TGeneric
	actions?: (row: TGeneric, defaultActions: TableRowActions) => TableActionConfig[] | undefined
	toolbarActions?: TableToolbarAction[]
	title: string
	emptyLabel?: string
	hideToolbarWhenEmpty?: boolean
	hidePaginationWhenEmpty?: boolean
	_data?: TGeneric[]
	_isLoading?: boolean
	testId?: string
}

export const Component: React.FC<Props> = ({
	name,
	creatable,
	columns: userColumns,
	title,
	filterModel,
	actions,
	toolbarActions,
	emptyLabel = `No rows to display`,
	hideToolbarWhenEmpty = false,
	hidePaginationWhenEmpty = false,
	_data,
	_isLoading,
	testId,
}) => {
	const [rows, setRows] = useState<TGeneric[]>(_data || [])
	const [settings, setSettings] = useState<Settings>(getInitialSettings())

	const listLimit = 10
	const columns = userColumns.length > 0 ? userColumns : [{ field: `id` }]
	const shouldShowPagination = hidePaginationWhenEmpty ? rows.length >= listLimit : true
	const shouldShowToolbar = hideToolbarWhenEmpty ? rows.length > 0 : true

	useEffect(() => {
		if (_data !== undefined) {
			setRows(Array.isArray(_data) ? _data : [])
		}
	}, [_data])

	useEffect(() => {
		try {
			localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
		} catch {
			void 0
		}
	}, [settings])

	const getData = useCallback(async () => {
		if (_data !== undefined || _isLoading !== undefined) {
			return
		}
	}, [_data, _isLoading])

	useEffect(() => {
		void getData()
	}, [getData])

	const handleDelete = (id: string) => {
		setRows((rows: TGeneric[]) => rows.filter((row: TGeneric) => row.id !== id))
	}

	const preparedRows = Array.isArray(rows)
		? rows.map((row: TGeneric) => {
				const defaultActions: TableRowActions = {
					handleDelete: () => handleDelete(row.id),
					handleEdit: () => {},
					handleView: () => {},
				}
				const customActions = actions ? actions(row, defaultActions) : undefined
				return {
					...row,
					actionHandlers: defaultActions,
					customActions,
				}
			})
		: []

	return (
		// The testId goes on the wrapper, not the DataGrid: MUI X does not forward unknown props to its
		// root element, so `data-test-id` never reached the DOM and every Table in the console was
		// unaddressable — a control that cannot be selected is a component defect, fixed here once.
		<Box sx={{ width: `100%` }} data-test-id={testId ?? `id-wallet-table`}>
			<Box display={`flex`} flexDirection={`column`} width={`100%`} height={`100%`}>
				<DataGrid
					rows={preparedRows}
					sx={{
						borderWidth: 1,
						overflowX: `scroll`,
						bgcolor: `bg.light`,
						// Vertical alignment for EVERY cell, once, here.
						//
						// A DataGrid cell is a block, so a plain string sits on the text baseline while any cell
						// rendered through `renderCell` — a chip, a two-line label, a tag row — sits wherever its own
						// box puts it. The result is a row whose columns do not line up, and the workaround each
						// consumer reaches for is `height: '100%'` plus a flex wrapper inside every custom cell. That
						// is the same fix written N times, and it only ever covers the cells someone remembered.
						//
						// Setting it on the grid covers plain and custom cells alike and lets call sites drop the
						// per-cell wrappers entirely.
						'& .MuiDataGrid-cell': { display: `flex`, alignItems: `center` },
					}}
					columns={columns}
					loading={_isLoading}
					getRowId={(row) => row?.id}
					pageSizeOptions={[5, 10, 25, 50, 100]}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: listLimit,
							},
						},
						filter: {
							filterModel: filterModel || { items: [] },
						},
					}}
					checkboxSelection={rows.length > 0}
					disableRowSelectionOnClick={true}
					showToolbar={shouldShowToolbar}
					hideFooter={!shouldShowPagination}
					showCellVerticalBorder={settings.showCellBorders}
					showColumnVerticalBorder={settings.showColumnBorders}
					slotProps={{
						toolbar: {
							title,
							name,
							creatable: creatable,
							settings,
							onSettingsChange: setSettings,
							toolbarActions,
						},
					}}
					slots={{
						// A ROW must be addressable by `data-test-id`, like every other control in this system.
						// Without it the grid gave a flow nothing to select a specific row by: a spec could
						// prove "some row exists" but never "THIS deposit's row disappeared after approval",
						// which is the assertion a money-review spec is made of. Derived from the row's own id
						// so a caller needs no extra prop, and prefixed with the table's own id so two grids on
						// one screen cannot collide. `slotProps.row` cannot do this — it is a static partial,
						// not a per-row callback.
						row: (rowProps) => (
							<GridRow {...rowProps} data-test-id={`${testId ?? name}-row-${rowProps.rowId}`} />
						),
						toolbar: TableToolbar,
						noRowsOverlay: () => <GridNoRowsOverlay emptyLabel={emptyLabel} />,
						noResultsOverlay: GridNoResultsOverlay,
						noColumnsOverlay: () => <GridNoRowsOverlay emptyLabel={emptyLabel} />,
						loadingOverlay: () => <SkeletonLoadingOverlay columns={columns} rowsCount={listLimit} />,
					}}
				/>
			</Box>
		</Box>
	)
}
