import { Box, Button } from '@mui/material'
import { useLanguage } from '../../../hooks/useLanguage'
import React from 'react'
import { useTranslation } from '../../../hooks/useTranslation'
import { Text } from '../../text'

export const LanguageDemo: React.FC = () => {
	const { t } = useTranslation()
	const { currentLanguage, changeLanguage } = useLanguage()

	const testLanguages = ['en', 'pt', 'es', 'fr', 'de', 'ja', 'zh']

	return (
		<Box sx={{ padding: 3, maxWidth: 600 }}>
			<Text variant={`h4`} gutterBottom>
				Translation Demo
			</Text>

			<Box sx={{ marginY: 2, padding: 2, bgcolor: `action.hover`, borderRadius: 1 }}>
				<Text variant={`h5`} color={`primary`}>
					{t('helloWorld')}
				</Text>
				<Text variant={`caption`} color={`text.secondary`}>
					Current Language: {currentLanguage}
				</Text>
			</Box>

			<Text variant={`body2`} gutterBottom>
				Try switching languages:
			</Text>

			<Box sx={{ display: `flex`, flexWrap: `wrap`, gap: 1, marginTop: 1 }}>
				{testLanguages.map((lang) => (
					<Button
						key={lang}
						variant={currentLanguage === lang ? `contained` : `outlined`}
						size={`small`}
						onClick={() => changeLanguage(lang)}>
						{lang.toUpperCase()}
					</Button>
				))}
			</Box>

			<Box sx={{ marginTop: 3, padding: 2, bgcolor: `background.paper`, border: 1, borderColor: `divider` }}>
				<Text variant={`caption`} fontFamily={`monospace`}>
					Code example:
				</Text>
				<Text variant={`body2`} fontFamily={`monospace`} sx={{ whiteSpace: `pre-wrap`, marginTop: 1 }}>
					{`const { t } = useTranslation()\nreturn <h1>{t('helloWorld')}</h1>`}
				</Text>
			</Box>
		</Box>
	)
}

LanguageDemo.displayName = `LanguageDemo`
