import { LinearProgress as MuiLinearProgress } from '@mui/material'
import React, { useMemo } from 'react'
import { shallowEqual } from 'react-redux'
import { useSelector } from '../../../lib/redux'
import type { RootState } from '../../../lib/store'

interface GlobalProgressInterface {
	height?: number
}

export const Component: React.FC<GlobalProgressInterface> = React.memo(({ height = 3 }) => {
	const userScopeLoading = useSelector((state: RootState) => state.user.userScopeLoading, shallowEqual)

	const sx = useMemo(
		() => ({
			zIndex: 999999,
			height,
			position: `fixed`,
			left: 0,
			top: 0,
			right: 0,
		}),
		[height]
	)

	if (!userScopeLoading) return null

	return <MuiLinearProgress color={`secondary`} sx={sx} />
})
