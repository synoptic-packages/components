import { Typography, type TypographyProps } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import React, { forwardRef } from 'react'

export interface IComponentProps extends Omit<TypographyProps, `color`> {
	fontSize?: number | string
	fontWeight?: number | string
	fontFamily?: string
	fontStyle?: `normal` | `italic` | `oblique`
	lineHeight?: number | string
	letterSpacing?: number | string
	textAlign?: `left` | `center` | `right` | `justify` | `inherit`
	textTransform?: `none` | `capitalize` | `uppercase` | `lowercase`
	textDecoration?: string
	color?: string
	component?: React.ElementType
	testId?: string
}

export const Component = forwardRef<HTMLElement, IComponentProps>(
	(
		{
			fontSize,
			fontWeight,
			fontFamily,
			fontStyle,
			lineHeight,
			letterSpacing,
			textAlign,
			textTransform,
			textDecoration,
			color,
			testId,
			sx,
			children,
			...rest
		},
		ref
	) => {
		const mergedSx: SxProps<Theme> = {
			...(fontSize !== undefined && { fontSize }),
			...(fontWeight !== undefined && { fontWeight }),
			...(fontFamily !== undefined && { fontFamily }),
			...(fontStyle !== undefined && { fontStyle }),
			...(lineHeight !== undefined && { lineHeight }),
			...(letterSpacing !== undefined && { letterSpacing }),
			...(textAlign !== undefined && { textAlign }),
			...(textTransform !== undefined && { textTransform }),
			...(textDecoration !== undefined && { textDecoration }),
			...(color !== undefined && { color }),
			...(Array.isArray(sx) ? Object.assign({}, ...sx) : (sx as object)),
		}

		// `testId` is opt-in and carries NO shared default. Text is the one primitive rendered hundreds
		// of times per screen, so stamping every instance with `id-wallet-text` would add a selector
		// that can never disambiguate anything while making the DOM harder to read. A value-bearing
		// line a flow must assert on (a driver's name, a status label) passes its own id.
		return (
			<Typography ref={ref} sx={mergedSx} {...(testId ? { 'data-test-id': testId } : {})} {...rest}>
				{children}
			</Typography>
		)
	}
)

Component.displayName = `Text`
