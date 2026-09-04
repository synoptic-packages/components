import React from 'react'
import { Component as FormModal } from './Component.modal'

export interface HeaderAction {
	label: string
	onPress: () => void
	disabled?: boolean
	loading?: boolean
	accessibilityLabel?: string
}

interface IComponentProps {
	asModal?: boolean
	closeForm?: () => void
	title?: string
	name: string
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	headerAction?: HeaderAction
	children: React.ReactNode
}

export const Component: React.FC<IComponentProps> = ({
	asModal,
	closeForm,
	name = 'stack-modal',
	title = 'Form',
	headerAction,
	children,
}) => {
	if (asModal) {
		return (
			<FormModal open={true} onClose={closeForm} title={title} name={name} headerAction={headerAction}>
				{children}
			</FormModal>
		)
	}

	return <React.Fragment>{children}</React.Fragment>
}

Component.displayName = 'FormWrapper'
