import { createContext, useContext } from 'react'
import type { TGeneric } from '../../types/generics'

export interface CameraProps {
	isOpen?: boolean
	title?: string
	description?: string
	imageRef?: TGeneric
}

export interface CameraContextType {
	camera: CameraProps
	cameraOpen: (_args?: CameraProps) => void
	cameraClose: () => void
}

export const cameraDefault = {
	isOpen: false,
	title: 'Camera',
	imageRef: undefined,
	description: 'Take a photo with your camera',
} as CameraProps

export const CameraContext = createContext<Partial<CameraContextType>>({
	camera: cameraDefault,
	cameraOpen: (_args?: CameraProps) => {},
	cameraClose: () => {},
})

export const useCamera = () => useContext(CameraContext)
