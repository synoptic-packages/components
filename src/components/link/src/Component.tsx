import { Box, Link as MuiLink, type SxProps } from '@mui/material'
import React, { type ReactNode } from 'react'
import { Link as RRDLink } from 'react-router'
import { initialDialog, useConfig } from '../../../context/provider-config'

interface IComponentProps {
	text?: ReactNode
	to?: string
	href?: string
	target?: string
	rel?: string
	external?: boolean
	bold?: boolean
	underline?: boolean
	sx?: SxProps
	onClick?: (e: any) => any
	children?: ReactNode
	testId?: string
}

export const Component: React.FC<IComponentProps> = ({
	onClick,
	text,
	to,
	href,
	target = '_self',
	rel = 'noreferrer',
	external,
	bold,
	underline,
	sx,
	children = null,
	testId,
}) => {
	to = to || href || `/`
	const { setDialog } = useConfig()

	const isExternalLink = (url: string): boolean => {
		try {
			return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') || external === true
		} catch {
			return false
		}
	}

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (isExternalLink(to)) {
			e.preventDefault()

			setDialog?.({
				...initialDialog,
				open: true,
				title: `Please take note`,
				description: `By clicking Accept, you acknowledge that you are leaving this website and will be redirected to an external link. Please review the privacy policy provided, as it outlines how your personal information is collected, used, and protected. We are not responsible for the privacy practices or policies on the external website.`,
				confirmTitle: `Accept`,
				variant: `warning`,
				onConfirm: () => {
					window.open(to, target, rel)
				},
			})
		} else if (onClick) {
			onClick(e)
		}
	}

	if (isExternalLink(to)) {
		return (
			<Box
				component={`a`}
				data-test-id={testId ?? `id-wallet-link`}
				href={to}
				onClick={handleClick}
				target={target}
				rel={rel}
				sx={{
					display: `inline-block`,
					textDecoration: underline ? `underline` : `none`,
					fontWeight: bold ? 600 : 400,
					cursor: `pointer`,
				}}>
				<MuiLink
					component={`span`}
					align={`center`}
					sx={{
						textDecoration: underline ? `underline` : `none`,
						fontWeight: bold ? 600 : 400,
						...sx,
					}}>
					{children ?? text}
				</MuiLink>
			</Box>
		)
	}

	return (
		<RRDLink
			data-test-id={testId ?? `id-wallet-link`}
			onClick={handleClick}
			to={to}
			target={target}
			rel={rel}
			style={{
				display: `inline-block`,
				textDecoration: underline ? `underline` : `none`,
				fontWeight: bold ? 600 : 400,
			}}>
			<MuiLink
				component={`span`}
				align={`center`}
				sx={{
					textDecoration: underline ? `underline` : `none`,
					fontWeight: bold ? 600 : 400,
					...sx,
				}}>
				{children ?? text}
			</MuiLink>
		</RRDLink>
	)
}
