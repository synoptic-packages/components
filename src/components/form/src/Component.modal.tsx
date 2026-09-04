import { Box, DialogContent, DialogTitle, Modal, Paper } from '@mui/material'
import { Text } from '../../text'
import * as React from 'react'
import { useMemo } from 'react'
import { useConfig } from '../../../context/provider-config'
import { __HEADER_HEIGHT__, __HEADER_Z_INDEX__ } from '../../../constants'
import { Button } from '../../button'
import { Icon } from '../../icon'
import type { HeaderAction } from './Component.wrapper'

interface IComponentProps {
	open: boolean
	onClose?: () => void
	title: string
	name: string
	headerAction?: HeaderAction
	children: React.ReactNode
}

export const Component: React.FC<IComponentProps> = ({ open, onClose, title, name, headerAction, children }) => {
	const { isMobile } = useConfig()
	const padding = useMemo(() => (isMobile ? 0 : 2), [isMobile])

	return (
		<Modal
			open={open}
			onClose={onClose}
			className={`${name}-form-dialog`}
			sx={{
				display: 'flex',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				paddingTop: `${__HEADER_HEIGHT__ + (isMobile ? 1 : padding * 8)}px`,
				px: padding,
				pb: padding,
				borderRadius: isMobile ? 0 : 2,
			}}>
			<Box
				className={`${name}-form-container w-full`}
				sx={{
					bgcolor: `bg.main`,
					height: `calc(100% - ${__HEADER_HEIGHT__}px)`,
					width: `calc(100% - ${32}px)`,
					margin: 0,
					padding: 0,
					borderBottomLeftRadius: isMobile ? 0 : 2,
					borderBottomRightRadius: isMobile ? 0 : 2,
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					overflowY: `hidden`,
				}}>
				<DialogTitle
					className={`${name}-form-title mb-0`}
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						py: 2,
						mb: 0,
						borderTopLeftRadius: isMobile ? 0 : 16,
						borderTopRightRadius: isMobile ? 0 : 16,
						position: 'sticky',
						top: 0,
						zIndex: __HEADER_Z_INDEX__,
						bgcolor: `background.paper`,
						borderBottom: `0px solid`,
						borderColor: `divider`,
					}}>
					<Box
						className={`${name}-form-title-content`}
						display={`flex`}
						flexDirection={`row`}
						alignItems={`center`}
						justifyContent={`space-between`}
						paddingLeft={2}
						width={`100%`}>
						<Box display={`flex`} flexDirection={`row`} alignItems={`center`} flex={1}>
							{onClose && (
								<Box
									type={`button`}
									component={`button`}
									onClick={onClose}
									sx={{
										width: 34,
										height: 34,
										minHeight: 34,
										minWidth: 34,
										maxHeight: 34,
										maxWidth: 34,
										mr: 2,
										p: 0,
										border: 'none',
										bgcolor: `background.default`,
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: '50%',
										overflow: `hidden`,
										flexShrink: 0,
									}}>
									<Icon name={`SyClose`} size={18} />
								</Box>
							)}
							<Text
								variant={`h4`}
								component={`div`}
								className={`${name}-form-title-text`}
								sx={{ flexGrow: 1, fontWeight: 700 }}>
								{title}
							</Text>
						</Box>
						{headerAction && (
							<Box mr={2}>
								<Button
									type={`button`}
									variant={`contained`}
									size={`small`}
									onClick={headerAction.onPress}
									disabled={headerAction.disabled}
									loading={headerAction.loading}
									aria-label={headerAction.accessibilityLabel ?? headerAction.label}>
									{headerAction.label}
								</Button>
							</Box>
						)}
					</Box>
				</DialogTitle>
				<DialogContent
					className={`${name}-form-content`}
					sx={{
						margin: 0,
						padding: 0,
						bgcolor: `bg.main`,
						overflowY: 'auto',
						maxHeight: '100%',
						py: 3,
					}}>
					<Box className={`${name}-form-spacer-top`} sx={{ h: 2 }} />
					<Paper
						className={`${name}-form-paper`}
						sx={{ p: padding, pt: 3, borderRadius: 0, bgcolor: `bg.main`, minHeight: 300 }}>
						{children}
					</Paper>
					<Box className={`${name}-form-spacer-bottom`} sx={{ minHeight: 300 }} />
				</DialogContent>
			</Box>
		</Modal>
	)
}

Component.displayName = 'FormModal'
