import { useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

type UseWindowReturnValue = {
	isMobile: boolean
	isTablet: boolean
	isDesktop: boolean
	isLargeDesktop: boolean
	windowWidth: number
	windowHeight: number
	isPortrait: boolean
	isLandscape: boolean
}

export const useWindow = (): UseWindowReturnValue => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
	const isDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg'))
	const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg'))

	const [windowSize, setWindowSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	})

	useEffect(() => {
		if (typeof window === 'undefined') return

		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const isPortrait = windowSize.height > windowSize.width
	const isLandscape = windowSize.width > windowSize.height

	return {
		isMobile,
		isTablet,
		isDesktop,
		isLargeDesktop,
		windowWidth: windowSize.width,
		windowHeight: windowSize.height,
		isPortrait,
		isLandscape,
	}
}
