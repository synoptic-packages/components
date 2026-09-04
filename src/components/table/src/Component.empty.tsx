import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import { type GridColDef, GridOverlay } from '@mui/x-data-grid'
import type React from 'react'
import { Text } from '../../text'

export const SkeletonLoadingOverlay: React.FC<{ columns: GridColDef[]; rowsCount: number }> = ({ columns }) => {
	return (
		<GridOverlay>
			<Box
				sx={{
					width: '100%',
					padding: 2,
					display: 'grid',
					gridTemplateColumns: columns.map((col) => (col.width ?? 150) + 'px').join(' '),
					gap: 1,
				}}>
				{Array.from({ length: 10 }).map((_, rowIndex) =>
					columns.map((_, i) => (
						<Skeleton
							key={`${rowIndex}-${i}`}
							variant={`rectangular`}
							height={42}
							sx={{
								borderRadius: 1,
							}}
						/>
					))
				)}
			</Box>
		</GridOverlay>
	)
}

export const GridNoRowsOverlay: React.FC<{ emptyLabel?: string }> = ({ emptyLabel = `No rows to display` }) => (
	<GridOverlay>
		<Box
			sx={{
				mt: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
			}}>
			<Text>{emptyLabel}</Text>
		</Box>
	</GridOverlay>
)

export const GridNoResultsOverlay = () => (
	<GridOverlay>
		<Box
			sx={{
				mt: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
			}}>
			<Text>No matching results found</Text>
		</Box>
	</GridOverlay>
)
