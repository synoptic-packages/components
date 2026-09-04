import { Stack } from '@mui/material'
import React from 'react'
import type { TGeneric } from '../../../types/generics'
import { Box } from '../../box'
import { Link } from '../../link'
import { Text } from '../../text'

interface Props {
	menuItems?: Array<{ label: string; href: string; external?: boolean }>
	title?: string
	description?: string
	backgroundColor?: string
}

export const Component: React.FC<Props> = ({ menuItems, title, description }) => {
	title = title || `© Copyright. All rights reserved.`

	return (
		<Box
			component={`footer`}
			className={`--footer-minimal`}
			testId={`id-wallet-footer`}
			sx={{ backgroundColor: (theme: TGeneric) => theme.palette.background.paper }}>
			<Box height={16} />
			{title && (
				<Text variant={`h6`} fontWeight={400} color={`textPrimary`} align={`center`}>
					{title}
				</Text>
			)}
			<Box textAlign={`center`}>
				<Stack
					my={1}
					spacing={{ xs: 1 }}
					direction={`row`}
					justifyContent={`center`}
					useFlexGap
					flexWrap={`wrap`}>
					{menuItems?.map((item, index) => (
						<React.Fragment key={index + 1}>
							<Link
								href={item.href}
								external={item.external}
								bold={true}
								sx={{
									whiteSpace: 'nowrap',
								}}>
								{item.label}
							</Link>
							{index < menuItems.length - 1 && <Text color={`text.secondary`}>|</Text>}
						</React.Fragment>
					))}
				</Stack>
			</Box>
			{description && (
				<Text variant={`body2`} color={`textSecondary`} align={`center`}>
					{description}
				</Text>
			)}
			<Box height={16} />
			<Box
				display={`flex`}
				flexDirection={`row`}
				justifyContent={`center`}
				alignItems={`center`}
				height={8}
				minHeight={8}>
				<Box
					display={`flex`}
					flexGrow={1}
					height={8}
					sx={{ backgroundColor: (theme: TGeneric) => theme.palette.primary.main }}
				/>
				<Box
					display={`flex`}
					flexGrow={1}
					height={8}
					sx={{ backgroundColor: (theme: TGeneric) => theme.palette.secondary.main }}
				/>
				<Box
					display={`flex`}
					flexGrow={1}
					height={8}
					sx={{ backgroundColor: (theme: TGeneric) => theme.palette.info.main }}
				/>
			</Box>
		</Box>
	)
}
