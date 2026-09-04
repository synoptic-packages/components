import { createContext } from 'react'
import type { FormHookProps } from '../../types/generics'

export const initialFormState: FormHookProps = {
	asModal: false,
	name: undefined,
	id: undefined,
	visible: false,
}

export interface FormContextType {
	form: FormHookProps
	openForm: (form: FormHookProps) => void
	closeForm: () => void
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

FormContext.displayName = `FormContext`
