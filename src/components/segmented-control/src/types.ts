import type { ToggleButtonGroupProps } from '@mui/material'
import type { ReactNode } from 'react'
import type { TGeneric } from '../../../types/generics'

export interface SegmentedControlOption {
	label: string
	value: string
	startIcon?: ReactNode
}

export type SegmentedControlProps = Omit<ToggleButtonGroupProps, 'value' | 'onChange'> & {
	options: SegmentedControlOption[]
	selected: number
	setSelected: TGeneric
	width?: string | number
	onChange?: (_data: { index: number; segment: SegmentedControlOption }) => void
}

export type PeriodSpanType = 'day' | 'week' | 'month' | 'year'

export interface TimePeriodSpanProps {
	periodSpan: PeriodSpanType
	onPeriodChange: (period: PeriodSpanType) => void
}
