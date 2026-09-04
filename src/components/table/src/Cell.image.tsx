import Box from '@mui/material/Box'
import React from 'react'
import { Icon } from '../../icon'
import { Image } from '../../image'

interface IComponentProps {
	src?: string
	title: string
}

export const Component: React.FC<IComponentProps> = ({ title, src }) => (
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
		{src ? (
			<Image
				src={src}
				alt={title}
				width={38}
				height={38}
				style={{
					width: 38,
					height: 38,
					borderRadius: 4,
					marginRight: 1.5,
					flexShrink: 0,
					overflow: `hidden`,
				}}
			/>
		) : (
			<Icon name={`ArrowDownFromLine`} size={38} />
		)}
	</Box>
)
