import { type AlertColor, type SnackbarOrigin } from '@mui/material'
import { createContext, useContext, type Dispatch } from 'react'
import type { IDialogInterface } from '../../components/dialog/src/Component'
import type { ThemeColors } from '../../theme/colors'

export interface ISnackbarInterface extends Partial<SnackbarOrigin> {
	open?: boolean
	message: string
	severity: AlertColor
}

export interface ProviderContextType {
	setSnackbar: (snackbar: ISnackbarInterface) => void
	setDialog: (_args: IDialogInterface) => void
	isMobile?: boolean
	isSmall?: boolean
	isLarge?: boolean
	isDark: boolean
	loading: boolean
	colors: ThemeColors
	setLoading: Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<Partial<ProviderContextType>>({
	setSnackbar: undefined,
	setDialog: undefined,
	isMobile: undefined,
	isSmall: undefined,
	isLarge: undefined,
	loading: false,
	setLoading: undefined,
	isDark: false,
})

export const initialDialog: IDialogInterface = {
	open: false,
	title: '',
	description: 'center',
	onConfirm: () => {},
	setDialog: () => {},
	confirmTitle: `info`,
	variant: `info`,
}

export const initialSnackbar: ISnackbarInterface = {
	open: false,
	vertical: 'bottom',
	horizontal: 'left',
	message: '',
	severity: `info`,
}

export const useConfig = () => useContext(AppContext)

export { Provider } from './src/Component'
