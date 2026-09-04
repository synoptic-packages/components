import { Paper, Stack } from '@mui/material'
import React from 'react'
import type { PasswordStrength } from '../../../lib'
import { Icon } from '../../icon'
import { Text } from '../../text'

const requirementConfig: Array<{ key: keyof PasswordStrength['checks']; label: string }> = [
	{ key: 'hasMinLength', label: 'At least 8 characters' },
	{ key: 'hasUppercase', label: 'At least 1 uppercase letter' },
	{ key: 'hasLowercase', label: 'At least 1 lowercase letter' },
	{ key: 'hasNumber', label: 'At least 1 number' },
	{ key: 'hasSpecialChar', label: 'At least 1 special character' },
]

interface IPasswordRequirementsProps {
	passwordStrength: PasswordStrength
}

export const PasswordRequirements: React.FC<IPasswordRequirementsProps> = ({ passwordStrength }) => {
	const { checks } = passwordStrength
	return (
		<Paper
			variant={`outlined`}
			square={false}
			sx={{
				mt: 2,
				px: 2,
				py: 1.5,
				boxShadow: 3,
				borderWidth: 0,
				borderRadius: 2,
				bgcolor: (theme) => theme.palette.bg.light,
			}}>
			<Text variant={`subtitle2`} sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
				Your password must contain:
			</Text>
			<Stack component={`ul`} spacing={0.5} sx={{ listStyle: 'none', pl: 0, m: 0 }}>
				{requirementConfig.map(({ key, label }) => {
					const isMet = checks[key]
					return (
						<Stack
							component={`li`}
							key={key}
							direction={`row`}
							spacing={1}
							alignItems={`center`}
							sx={{ color: isMet ? 'success.main' : 'muted' }}>
							{isMet ? (
								<Icon name={`Check`} size={16} color={`success`} />
							) : (
								<Icon name={`Circle`} size={16} color={`muted`} />
							)}
							<Text
								variant={`body2`}
								sx={{
									fontWeight: isMet ? 600 : 500,
									color: isMet ? 'success.main' : 'muted',
								}}>
								{label}
							</Text>
						</Stack>
					)
				})}
			</Stack>
		</Paper>
	)
}
