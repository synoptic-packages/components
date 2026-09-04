import {
	Accordion as MuiAccordion,
	AccordionDetails as MuiAccordionDetails,
	AccordionSummary as MuiAccordionSummary,
	type AccordionProps as MuiAccordionProps,
} from '@mui/material'
import React from 'react'
import { Icon } from '../../icon'
import { Text } from '../../text'

export interface AccordionItem {
	id: string
	title: string
	content: React.ReactNode
	disabled?: boolean
}

export interface AccordionProps extends Omit<MuiAccordionProps, 'children' | 'defaultExpanded'> {
	items: AccordionItem[]
	multiple?: boolean
	initialExpanded?: string | string[]
}

export const Component: React.FC<AccordionProps> = ({
	items,
	multiple = false,
	initialExpanded,
	sx,
	...accordionProps
}) => {
	const [expanded, setExpanded] = React.useState<string | string[]>(() => {
		if (initialExpanded) {
			return initialExpanded
		}
		return multiple ? [] : ''
	})

	const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
		if (multiple) {
			const expandedArray = Array.isArray(expanded) ? expanded : []
			if (isExpanded) {
				setExpanded([...expandedArray, panel])
			} else {
				setExpanded(expandedArray.filter((item) => item !== panel))
			}
		} else {
			setExpanded(isExpanded ? panel : '')
		}
	}

	const isExpanded = (panelId: string): boolean => {
		if (multiple) {
			return Array.isArray(expanded) ? expanded.includes(panelId) : false
		}
		return expanded === panelId
	}

	return (
		<>
			{items.map((item) => (
				<MuiAccordion
					key={item.id}
					expanded={isExpanded(item.id)}
					onChange={handleChange(item.id)}
					disabled={item.disabled}
					sx={sx}
					{...accordionProps}>
					<MuiAccordionSummary
						expandIcon={<Icon name={`ChevronDown`} size={24} />}
						aria-controls={`${item.id}-content`}
						id={`${item.id}-header`}>
						<Text variant={`medium`}>{item.title}</Text>
					</MuiAccordionSummary>
					<MuiAccordionDetails>
						{typeof item.content === 'string' ? (
							<Text variant={`normal`}>{item.content}</Text>
						) : (
							item.content
						)}
					</MuiAccordionDetails>
				</MuiAccordion>
			))}
		</>
	)
}

export default Component
