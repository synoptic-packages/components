import * as React from 'react'
import { memo, useMemo, useState } from 'react'
import type { FormHookProps } from '../../../types/generics'
import { FormContext, initialFormState } from '../context'

export interface ProviderFormsProps {
	children: React.ReactNode
	/**
	 * Optional host that renders the active form (the app registers its own
	 * form registry here). Receives the open form state + closeForm.
	 */
	renderForm?: (props: {
		visible: boolean
		name: string
		id?: string
		title?: string
		values?: unknown
		asModal?: boolean
		closeForm: () => void
		form: FormHookProps
	}) => React.ReactNode
}

export const ProviderForms: React.FC<ProviderFormsProps> = memo(function ProviderForms({
	children,
	renderForm,
}) {
	const [form, setForm] = useState<FormHookProps>(initialFormState)

	function openForm(_form: FormHookProps) {
		if (!_form?.name) {
			_form.closeForm = () => {
				_form.closeForm?.()
			}
			return
		}

		setForm({
			..._form,
			asModal: _form?.asModal ?? false,
			visible: true,
		})
	}

	function closeForm() {
		setForm(initialFormState)
	}

	const contextValue = useMemo(() => ({ form, openForm, closeForm }), [form])

	return (
		<FormContext.Provider value={contextValue}>
			{children}
			{renderForm?.({
				visible: form.visible ?? false,
				name: form.name ?? '',
				id: form.id,
				title: form.title,
				values: form.values,
				asModal: form.asModal,
				closeForm,
				form,
			})}
		</FormContext.Provider>
	)
})
