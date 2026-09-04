import { lowerCase, upperCase } from '../../../lib'
import { Box, Dialog, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'
import { getLanguageLabel, languages, locales, locales_meta } from '../../../lib/i18n'
import type { TGeneric } from '../../../types/generics'
import { IconButton } from '../../button-icon'
import { Flag } from '../../flag'
import { Text } from '../../text'

export interface ILocaleSwitcherProps {
	onLocaleChange?: (locale: string) => void
	showNativeNames?: boolean
}

export const Component: React.FC<ILocaleSwitcherProps> = ({ onLocaleChange, showNativeNames = false }) => {
	const { i18n } = useTranslation()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const locale = i18n.language || 'en'

	const handleLocaleChange = (newLocale: string) => {
		i18n.changeLanguage(newLocale)
		if (onLocaleChange) {
			onLocaleChange(newLocale)
		}
		setIsOpen(false)
	}

	const getDisplayName = (code: string) => {
		if (showNativeNames) {
			return locales_meta[code]?.name || code
		}
		return getLanguageLabel(code, locale)
	}

	return (
		<React.Fragment>
			<Box
				display={`inline-flex`}
				flexDirection={`row`}
				alignItems={`center`}
				justifyContent={`center`}
				width={70}>
				<Text
					sx={{
						marginRight: `2px`,
						textAlign: `right`,
						marginLeft: `2px`,
						fontSize: `10px`,
						whiteSpace: `nowrap`,
					}}>
					{upperCase(locale)}
				</Text>
				<IconButton
					edge={`end`}
					sx={{ ml: 1, width: 40, height: 40, bgcolor: `bg.main` }}
					color={`inherit`}
					onClick={() => setIsOpen(!isOpen)}>
					<Flag code={lowerCase(locales_meta[locale]?.flag) || locale} size={28} />
				</IconButton>
			</Box>
			<Dialog
				open={isOpen}
				PaperProps={{
					component: 'div',
					sx: {
						margin: 0,
						padding: 0,
					},
				}}>
				<DialogContent
					sx={{
						margin: 0,
						padding: 0,
						maxWidth: 350,
						minHeight: 450,
						paddingY: 1,
					}}>
					<Box sx={{ width: `80%`, minWidth: 320, margin: `auto`, padding: 3 }}>
						<Box
							sx={{
								display: `grid`,
								gridTemplateColumns: `repeat(2, 1fr)`,
								gap: 1,
							}}>
							{locales.map((localeItem: TGeneric) => {
								const languageData = languages.find((lang) => lang.code === localeItem)
								const isRTL = languageData?.rtl || false

								return (
									<Box
										key={localeItem}
										component={`button`}
										onClick={() => handleLocaleChange(localeItem)}
										sx={{
											height: 48,
											width: `100%`,
											paddingLeft: 2,
											cursor: `pointer`,
											display: `flex`,
											justifyContent: `flex-start`,
											alignItems: `center`,
											border: `1px solid`,
											borderColor: `divider`,
											borderRadius: 1,
											bgcolor: locale === localeItem ? `action.selected` : `bg.light`,
											direction: isRTL ? `rtl` : `ltr`,
											'&:hover': {
												bgcolor: `action.hover`,
											},
										}}>
										<Box
											sx={{
												display: `inline-block`,
												marginRight: isRTL ? 0 : 1,
												marginLeft: isRTL ? 1 : 0,
											}}>
											<Flag code={locales_meta[localeItem]?.flag} size={24} />
										</Box>
										<Text variant={`body2`}>{getDisplayName(localeItem)}</Text>
									</Box>
								)
							})}
						</Box>
						<Box
							component={`button`}
							onClick={() => setIsOpen(false)}
							sx={{
								borderRadius: 1,
								width: `100%`,
								height: 56,
								display: `flex`,
								alignItems: `center`,
								justifyContent: `center`,
								marginTop: 1,
								fontWeight: 600,
								bgcolor: `action.hover`,
								border: `1px solid`,
								borderColor: `divider`,
								cursor: `pointer`,
								'&:hover': {
									bgcolor: `action.selected`,
								},
							}}>
							<Text variant={`body1`} fontWeight={600}>
								Cancel
							</Text>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	)
}

Component.displayName = `LocaleSwitcher`
