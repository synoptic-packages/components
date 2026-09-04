import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import React from 'react'

interface IComponentProps {
	avatarSrc?: string
	name: string
	designation?: string
	avatarSize?: number
	nameFontSize?: number
}

export const Component: React.FC<IComponentProps> = ({
	avatarSrc,
	name,
	designation,
	avatarSize = 28,
	nameFontSize = 14,
}) => (
	<Box
		display={`flex`}
		alignItems={`center`}
		minWidth={0}
		sx={{
			height: 48,
			p: 0,
			m: 0,
			overflow: `hidden`,
		}}>
		<Avatar
			src={avatarSrc}
			alt={name}
			sx={{
				width: avatarSize,
				height: avatarSize,
				mr: 1.5,
				flexShrink: 0,
				fontSize: 14,
			}}
		/>
		<Box
			display={`flex`}
			flexDirection={`column`}
			justifyContent={`center`}
			minWidth={0}
			flex={1}
			sx={{
				overflow: `hidden`,
			}}>
			<Box
				component={`span`}
				sx={{
					fontSize: nameFontSize,
					fontWeight: 500,
					overflow: `hidden`,
					textOverflow: `ellipsis`,
					whiteSpace: `nowrap`,
					minWidth: 0,
					lineHeight: 1.1,
				}}
				title={name}>
				{name}
			</Box>
			{designation && (
				<Box
					component={`span`}
					sx={{
						fontSize: 12,
						overflow: `hidden`,
						textOverflow: `ellipsis`,
						whiteSpace: `nowrap`,
						minWidth: 0,
						lineHeight: 1.1,
					}}
					title={designation}>
					{designation}
				</Box>
			)}
		</Box>
	</Box>
)
