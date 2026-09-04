import { Divider } from '@mui/material'
import { Text } from '../../text'
import * as React from 'react'
import { NavLink } from 'react-router'
import { __HEADER_HEIGHT__ } from '../../../constants'
import { Box } from '../../box'
import { Icon } from '../../icon'
import type { IHeaderLinkProps } from './types'

export const HeaderLink: React.FC<IHeaderLinkProps> = ({
	icon,
	label,
	path = `/`,
	active,
	divider = [],
	showHeaderIcon = false,
}) => {
	return (
		<NavLink
			to={path}
			style={{
				textDecoration: 'none',
				color: 'inherit',
			}}>
			{({ isActive }) => {
				const isLinkActive = active !== undefined ? active : isActive
				return (
					<Box
						display={`flex`}
						flexDirection={`row`}
						justifyContent={`center`}
						alignItems={`center`}
						sx={{
							height: __HEADER_HEIGHT__,
							paddingX: { xs: 1, md: 1.5 },
							paddingY: 0,
							cursor: 'pointer',
							transition: 'all 0.2s ease-in-out',
							borderBottom: `3px solid`,
							borderColor: isLinkActive ? 'primary.main' : 'transparent',
							'&:hover': {
								bgcolor: 'action.hover',
							},
						}}>
						{divider?.includes(`left`) && (
							<Divider
								orientation={`vertical`}
								sx={{
									display: { xs: `none`, md: `inline-block` },
									width: `1px`,
									mx: 2,
									height: __HEADER_HEIGHT__ * 0.5,
								}}
							/>
						)}
						{showHeaderIcon && icon && (
							<Box sx={{ display: `flex`, alignItems: `center`, mr: label ? 1 : 0 }}>
								<Icon name={icon} size={20} />
							</Box>
						)}
						{label && (
							<Text
								fontWeight={isLinkActive ? 600 : 400}
								sx={{
									textDecoration: 'none',
									color: isLinkActive ? 'primary.main' : 'inherit',
								}}>
								{label}
							</Text>
						)}
						{divider?.includes(`right`) && (
							<Divider
								orientation={`vertical`}
								sx={{
									display: { xs: `none`, md: `inline-block` },
									width: `1px`,
									mx: 2,
									height: __HEADER_HEIGHT__ * 0.5,
								}}
							/>
						)}
					</Box>
				)
			}}
		</NavLink>
	)
}
