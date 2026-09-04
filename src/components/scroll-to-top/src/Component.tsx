import { useEffect } from 'react'
import { useLocation } from '../../../hooks/useLocation'

export const Component: React.FC = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		const mainContent = document.getElementById('--infomentor-gm-main-content')

		if (mainContent) {
			mainContent.scrollTo({ top: 0, behavior: 'smooth' })
			return
		}

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [pathname])

	return null
}
