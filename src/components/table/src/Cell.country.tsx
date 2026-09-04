import Box from '@mui/material/Box'
import type { CountryCode } from 'libphonenumber-js'
import React from 'react'
import { useCountry } from '../../../lib'
import { Flag } from '../../flag'

interface IComponentProps {
	country: CountryCode
}

export const Component: React.FC<IComponentProps> = ({ country }) => {
	const { getCountryByCode } = useCountry()
	const countryObject = getCountryByCode(country)

	if (!countryObject) {
		return country
	}

	return (
		<Box display={`flex`} alignItems={`center`} minWidth={0}>
			<Box
				component={`span`}
				sx={{
					lineHeight: 1,
					mr: 1,
					flexShrink: 0,
				}}>
				{country ? (
					<Flag code={country?.toLocaleLowerCase()} size={28} />
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
				title={countryObject?.name?.common ?? country}>
				{countryObject?.name?.common ?? country}
			</Box>
		</Box>
	)
}
