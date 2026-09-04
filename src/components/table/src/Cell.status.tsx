import React from 'react'
import { Badge } from '../../chip'

type StatusType =
	| 'low'
	| 'medium'
	| 'high'
	| 'critical'
	| 'pending'
	| 'success'
	| 'failed'
	| 'platinum'
	| 'gold'
	| 'bronze'
	| 'draft'
	| 'warning'
	| 'info'

interface IComponentProps {
	status: StatusType
	/**
	 * What the badge READS, when the domain's own word is not one of the status vocabulary above.
	 *
	 * The vocabulary is a severity/tone scale — it decides the colour — and for most tables it is also
	 * the right word. It is not always: a fare band is `Live`, `Awaiting review` or `Off`, and printing
	 * `SUCCESS` / `PENDING` / `DRAFT` at an operator instead would be the component's internal scale
	 * leaking onto the screen. Defaults to the status, so every existing call site is unchanged.
	 */
	label?: string
}

const color: Record<StatusType, string> = {
	low: 'success',
	medium: 'warning',
	high: 'error',
	critical: 'error',
	pending: 'default',
	success: 'success',
	failed: 'error',
	platinum: 'default',
	gold: 'warning',
	bronze: 'secondary',
	draft: 'default',
	warning: 'warning',
	info: 'info',
}

export const Component: React.FC<IComponentProps> = ({ status, label }) => {
	return (
		<Badge
			label={label ?? status.toUpperCase()}
			color={color[status?.toLowerCase() as never]}
			size={`small`}
			sx={{ maxWidth: 110, px: 1 }}
		/>
	)
}
