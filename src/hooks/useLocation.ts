import type { Location } from 'react-router'
import { useLocation as useRouterLocation } from 'react-router'

export const useLocation = (): Location => {
	try {
		return useRouterLocation()
	} catch {
		return {
			pathname: '/',
			search: '',
			hash: '',
			state: null,
			key: 'default',
		} as Location
	}
}
