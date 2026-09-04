export interface SizingInterface {
	themeSpacing: number
	bodyFontSize: number
	bodyFontSizeSmall: number
	borderWidth: number
	borderRadius: number
	inputHeight: number
	inputHeightSmall: number
	buttonHeight: number
	headerHeight: number
	drawerWidth: number
	xs: number
	sm: number
	md: number
	lg: number
	xl: number
}

const sizing: SizingInterface = {
	themeSpacing: 8,
	bodyFontSize: 14,
	bodyFontSizeSmall: 12,
	borderWidth: 1.5,
	borderRadius: 5,
	inputHeight: 54,
	inputHeightSmall: 40,
	buttonHeight: 40,
	headerHeight: 64,
	drawerWidth: 360,
	xs: 350,
	sm: 500,
	md: 900,
	lg: 1200,
	xl: 1536,
}

export default sizing
