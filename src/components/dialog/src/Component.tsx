import { Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import * as React from 'react'
import { memo } from 'react'
import { initialDialog, useConfig } from '../../../context/provider-config'
import { Button } from '../../button'
import { Icon } from '../../icon'
import type { IconName } from '../../icon/src/Component'

export interface IDialogInterface {
	open: boolean
	title?: string
	description?: string
	setDialog: any
	onConfirm: any
	confirmTitle: string
	variant?: 'success' | 'warning' | 'error' | 'info'
	hideCancel?: boolean
	testId?: string
}

const getDialogIconMapping = (variant: 'success' | 'warning' | 'error' | 'info'): IconName => {
	const iconMap = {
		success: `SyCheck`,
		warning: `SyWarning`,
		error: `SyError`,
		info: `SyInfoSolid`,
		accent: `SyInfoSolid`,
	}

	return iconMap[variant] as IconName
}

const dialogWidth: number = 320
const Component: React.FC<IDialogInterface> = ({
	open,
	setDialog,
	title,
	description,
	onConfirm,
	confirmTitle,
	variant = 'info',
	hideCancel,
	testId,
}) => {
	const { isDark } = useConfig()
	const iconName = getDialogIconMapping(variant)
	// The dialog's own two buttons carry ids derived from the dialog's, exactly as the shared `Form`
	// stamps `<base>-submit`/`<base>-reset`. Without them a confirm was reachable only by its label,
	// which is banned — a shared-component defect fixed here rather than worked around in a page.
	const dialogTestId = testId ?? `id-wallet-dialog`

	const handleClose = () => {
		setDialog(initialDialog)
	}

	const handleConfirm = async () => {
		try {
			if (typeof onConfirm === 'function') {
				await onConfirm()
			}
		} catch (error) {
			console.error(error)
		} finally {
			setDialog(initialDialog)
		}
	}

	return (
		<Dialog
			open={open}
			data-test-id={dialogTestId}
			onClose={handleClose}
			maxWidth={`xs`}
			sx={{ padding: 0 }}
			PaperProps={{
				padding: 0,
			}}>
			<Box
				sx={{
					width: dialogWidth,
					margin: `0 auto`,
					height: 70,
					textAlign: `center`,
					paddingTop: 2,
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Box sx={{ minHeight: 32 }} className={`--infomentor-dialog-spacer`} />
				<Icon
					name={iconName}
					color={
						variant === 'warning'
							? 'warning.main'
							: variant === 'error'
								? 'error.main'
								: variant === 'success'
									? 'success.main'
									: 'info.main'
					}
					size={70}
				/>
			</Box>
			<Box height={16} />
			<DialogTitle textAlign={`center`} fontWeight={900} margin={0}>
				{title}
			</DialogTitle>
			<DialogContent>
				<Box sx={{ width: dialogWidth, margin: `0 auto`, mb: 2, minHeight: 50 }}>
					<DialogContentText textAlign={`center`}>{description}</DialogContentText>
				</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: `center`, padding: 2, width: '100%' }}>
				<Grid container spacing={2} sx={{ width: '100%' }}>
					{!hideCancel && (
						<Grid size={6}>
							<Button
								variant={`outlined`}
								color={
									isDark
										? variant === 'warning'
											? `warning`
											: variant === 'error'
												? `error`
												: `accent`
										: `primary`
								}
								fullWidth={true}
								sx={{ width: `100%` }}
								size={`large`}
								testId={`${dialogTestId}-cancel`}
								onClick={handleClose}>
								Cancel
							</Button>
						</Grid>
					)}
					<Grid size={hideCancel ? 12 : 6}>
						<Button
							variant={`contained`}
							color={
								isDark
									? variant === 'warning'
										? `warning`
										: variant === 'error'
											? `error`
											: `accent`
									: `primary`
							}
							size={`large`}
							fullWidth={true}
							testId={`${dialogTestId}-confirm`}
							onClick={handleConfirm}
							sx={{
								width: `100%`,
							}}>
							{confirmTitle}
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</Dialog>
	)
}

export default memo(Component)
