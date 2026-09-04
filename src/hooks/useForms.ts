import { useContext } from 'react'
import { FormContext } from '../context/provider-forms/context'

export const useForms = () => {
	const context = useContext(FormContext)
	if (context === undefined) {
		throw new Error('useForms must be used within a ProviderForms')
	}
	return context
}
