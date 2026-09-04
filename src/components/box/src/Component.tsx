import { type BoxProps, Box as MuiBox } from '@mui/material'
import React from 'react'
import type { TGeneric } from '../../../types/generics'

type RowProps = BoxProps &
	TGeneric & {
		backgroundColor?: string | any
		testId?: string
	}

// `testId` overrides the shared default on one instance, the same contract every other shared
// component carries (e2e/TESTID_CONVENTION.md). Without it a page composing several layout Boxes had
// no way to address any of them — a component defect, fixed here rather than worked around with a
// raw MUI Box in page code.
export const Component: React.FC<RowProps> = ({ children, backgroundColor, testId, ...props }) => {
	return (
		<MuiBox data-test-id={testId ?? `id-wallet-box`} sx={{ backgroundColor }} {...props}>
			{children}
		</MuiBox>
	)
}
