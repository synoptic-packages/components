import { initials } from '../../../lib'
import { AppBar, Divider, Drawer, Paper, Popover, Toolbar } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import { __HEADER_HEIGHT__ } from '../../../constants'
import { useNavigate } from '../../../hooks/useNavigate'
import { useWindow } from '../../../hooks/useWindow'
import { Avatar } from '../../avatar'
import { Box } from '../../box'
import { BrandIcon, BrandLogo } from '../../brand'
import { IconButton } from '../../button-icon'
import { Icon } from '../../icon'
import type { IconName } from '../../icon/src/Component'
import { Link } from '../../link'
import { List, ListItem } from '../../list'
import { LocaleSwitcher } from '../../locale-switcher'
import { Text } from '../../text'
import { ThemeSwitcher } from '../../theme-switcher'
import { HeaderLink } from './Component.link'
import type { IHeaderProps } from './types'

export const Component: React.FC<IHeaderProps> = ({
	user,
	onLogout,
	onNavigate,
	menuItems = [],
	profileMenuExtras = [],
	onThemeToggle,
	onLocaleChange,
	showThemeSwitcher = false,
	showLocaleSwitcher = false,
}) => {
	const { isMobile, isTablet } = useWindow()
	const navigate = useNavigate()
	const isMobileView = isMobile || isTablet
	const [anchorProfileEl, setAnchorProfileEl] = useState<HTMLElement | null>(null)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const handleCloseProfile = (): void => {
		setAnchorProfileEl(null)
	}

	const handleOpenProfile = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorProfileEl(event.currentTarget.closest('.sy-profile-menu') as HTMLElement)
	}

	const handleLogout = async () => {
		if (onLogout) {
			await onLogout()
		}
		handleCloseProfile()
		setMobileMenuOpen(false)
		if (onNavigate) {
			onNavigate('/')
			return
		}
		navigate(`/`)
	}

	const handleNavigate = (path: string) => {
		if (onNavigate) {
			onNavigate(path)
		} else {
			navigate(path)
		}
		handleCloseProfile()
		setMobileMenuOpen(false)
	}

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	const openProfile = Boolean(anchorProfileEl)

	return (
		<AppBar
			position={`fixed`}
			data-test-id={`id-wallet-header`}
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 100,
				top: 0,
				left: 0,
				right: 0,
				height: __HEADER_HEIGHT__,
				boxShadow: `0 1px 2px 0 rgba(0, 0, 0, 0.03)`,
			}}>
			<Paper
				elevation={0}
				square={true}
				sx={{
					borderRadius: 0,
					boxShadow: `none`,
				}}>
				<Toolbar
					disableGutters={true}
					sx={{
						display: `flex`,
						justifyContent: `space-between`,
						paddingX: { xs: 1, md: 2 },
						height: __HEADER_HEIGHT__,
					}}>
					<Box display={`flex`} flexDirection={`row`} alignItems={`center`} gap={0}>
						<Link to={`/`} text={isMobileView ? <BrandIcon /> : <BrandLogo />} />

						{!isMobileView && menuItems.length > 0 && (
							<Box display={`flex`} flexDirection={`row`} alignItems={`center`} ml={2}>
								{menuItems.map((item, index) => (
									<HeaderLink
										key={index}
										label={item.label}
										path={item.path}
										icon={item.icon as IconName}
										showHeaderIcon={item.showHeaderIcon}
									/>
								))}
							</Box>
						)}
					</Box>
					{isMobileView ? (
						<IconButton
							onClick={toggleMobileMenu}
							sx={{
								width: 40,
								height: 40,
							}}>
							<Icon name={`Menu`} size={24} />
						</IconButton>
					) : (
						<Box
							display={`flex`}
							flexDirection={`row`}
							alignItems={`center`}
							justifyContent={`flex-end`}
							gap={2}
							flexGrow={1}>
							{showLocaleSwitcher && <LocaleSwitcher onLocaleChange={onLocaleChange} />}
							{showThemeSwitcher && <ThemeSwitcher onThemeToggle={onThemeToggle} />}
							<Box
								display={`flex`}
								flexDirection={`row`}
								alignItems={`center`}
								justifyContent={`flex-end`}>
								<Box
									height={__HEADER_HEIGHT__}
									display={`inline-flex`}
									alignItems={`center`}
									gap={1}
									className={`sy-profile-menu`}
									sx={{ cursor: 'pointer' }}
									onClick={handleOpenProfile}>
									<Avatar size={32} src={user?.avatar}>
										{initials(`${user?.first_name || ''} ${user?.last_name || ''}`) ||
											user?.first_name?.[0] ||
											user?.email?.[0] ||
											'U'}
									</Avatar>
									<Icon name={`ChevronDown`} size={18} />
								</Box>
							</Box>
						</Box>
					)}
				</Toolbar>
			</Paper>
			<Drawer
				anchor={`right`}
				open={mobileMenuOpen}
				onClose={toggleMobileMenu}
				sx={{
					'& .MuiDrawer-paper': {
						width: 280,
						paddingTop: `${__HEADER_HEIGHT__}px`,
					},
				}}>
				<Box sx={{ width: 280 }} role={`presentation`}>
					{user && (
						<Box sx={{ padding: 2, borderBottom: 1, borderColor: 'divider' }}>
							<Box display={`flex`} alignItems={`center`} gap={1}>
								<Avatar size={42} src={user?.avatar}>
									{initials(`${user?.first_name || ''} ${user?.last_name || ''}`) ||
										user?.first_name?.[0] ||
										user?.email?.[0] ||
										'U'}
								</Avatar>
								<Box>
									<Text variant={`subtitle1`} fontWeight={600} mb={0}>
										{`${user.first_name} ${user.last_name}`}
									</Text>
								</Box>
							</Box>
						</Box>
					)}
					<List>
						{menuItems.map((item, index) => (
							<ListItem
								key={index}
								icon={item.icon ? <Icon name={item.icon as IconName} size={24} /> : undefined}
								primary={item.label}
								buttonProps={{ onClick: () => handleNavigate(item.path) }}
							/>
						))}
					</List>
					<Box display={`flex`} flexDirection={`row`}>
						{showLocaleSwitcher && (
							<Box sx={{ padding: 2 }}>
								<LocaleSwitcher onLocaleChange={onLocaleChange} />
							</Box>
						)}
						{showThemeSwitcher && (
							<Box sx={{ padding: 2 }}>
								<ThemeSwitcher onThemeToggle={onThemeToggle} />
							</Box>
						)}
					</Box>
					{user && (
						<>
							<Divider sx={{ my: 1 }} />
							<List>
								<ListItem
									icon={<Icon name={`LogOut`} size={24} />}
									primary={`Logout`}
									buttonProps={{ onClick: handleLogout }}
								/>
							</List>
						</>
					)}
				</Box>
			</Drawer>

			<Popover
				open={openProfile}
				anchorEl={anchorProfileEl}
				onClose={handleCloseProfile}
				slotProps={{
					paper: {
						sx: {
							overflowY: `auto`,
							width: 260,
							maxHeight: `400px`,
							borderBottomLeftRadius: 4,
							borderBottomRightRadius: 4,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
						},
					},
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}>
				<List sx={{ width: '100%' }}>
					<ListItem
						icon={<Icon name={`Building2`} size={28} />}
						primary={`My Account`}
						right={
							<Icon
								name={`ChevronRight`}
								size={16}
								style={{
									opacity: 0.6,
								}}
							/>
						}
						buttonProps={{ onClick: () => handleNavigate(`/account/profile/account`) }}
					/>
					<Divider variant={`inset`} component={`li`} sx={{ opacity: 0.6 }} />
					<ListItem
						icon={<Icon name={`IdCard`} size={28} />}
						primary={`Personal information`}
						right={
							<Icon
								name={`ChevronRight`}
								size={16}
								style={{
									opacity: 0.6,
								}}
							/>
						}
						buttonProps={{ onClick: () => handleNavigate(`/account/profile/personal-information`) }}
					/>
					<Divider variant={`inset`} component={`li`} sx={{ opacity: 0.6 }} />
					<ListItem
						icon={<Icon name={`CreditCard`} size={28} />}
						primary={`Payment cards`}
						right={
							<Icon
								name={`ChevronRight`}
								size={16}
								style={{
									opacity: 0.6,
								}}
							/>
						}
						buttonProps={{ onClick: () => handleNavigate(`/account/profile/payment-methods`) }}
					/>
					<Divider variant={`inset`} component={`li`} sx={{ opacity: 0.6 }} />
					<ListItem
						icon={<Icon name={`CircleQuestionMark`} size={28} />}
						primary={`Support`}
						right={
							<Icon
								name={`ChevronRight`}
								size={16}
								style={{
									opacity: 0.6,
								}}
							/>
						}
						buttonProps={{ onClick: () => handleNavigate(`/account/profile/support`) }}
					/>
					{profileMenuExtras.map((extra) => (
						<React.Fragment key={extra.key}>
							<Divider variant={`inset`} component={`li`} sx={{ opacity: 0.6 }} />
							<ListItem
								icon={<Icon name={extra.icon} size={28} />}
								primary={extra.label}
								right={
									<Icon
										name={`ChevronRight`}
										size={16}
										style={{
											opacity: 0.6,
										}}
									/>
								}
								buttonProps={{ onClick: () => handleNavigate(extra.path) }}
							/>
						</React.Fragment>
					))}
					<Divider variant={`inset`} component={`li`} sx={{ opacity: 0.6 }} />
					<ListItem
						icon={<Icon name={`LogOut`} size={28} />}
						primary={`Logout`}
						right={
							<Icon
								name={`ChevronRight`}
								size={16}
								style={{
									opacity: 0.6,
								}}
							/>
						}
						buttonProps={{ onClick: handleLogout }}
					/>
				</List>
			</Popover>
		</AppBar>
	)
}

Component.displayName = `Header`
