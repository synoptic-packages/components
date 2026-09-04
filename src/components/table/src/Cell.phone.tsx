import { phoneNumberGetInternationalString } from '../../../lib'
import Box from '@mui/material/Box'
import React from 'react'
import type { TGeneric } from '../../../types/generics'
import { Flag } from '../../flag'

interface IComponentProps {
	phoneNumber:
		| {
				countryCode: string
				national: string
				international: string
		  }
		| TGeneric
}

export const Component: React.FC<IComponentProps> = ({ phoneNumber }) => {
	const formattedPhoneNumber = phoneNumberGetInternationalString(phoneNumber)

	return (
		<Box display={`flex`} alignItems={`center`} minWidth={0}>
			<Box
				component={`span`}
				sx={{
					lineHeight: 1,
					mr: 1,
					flexShrink: 0,
				}}>
				{phoneNumber?.countryCode ? (
					<Flag code={phoneNumber?.countryCode?.toLocaleLowerCase()} size={28} />
				) : (
					<Box
						component={`span`}
						sx={{
							width: 28,
							height: 28,
							borderRadius: `50%`,
							backgroundColor: `bg.main`,
						}}
					/>
				)}
			</Box>
			<Box
				component={`span`}
				sx={{
					overflow: `hidden`,
					textOverflow: `ellipsis`,
					whiteSpace: `nowrap`,
					minWidth: 0,
				}}
				title={formattedPhoneNumber?.national || formattedPhoneNumber?.international}>
				{formattedPhoneNumber?.national || formattedPhoneNumber?.international}
			</Box>
		</Box>
	)
}
