import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { CameraContext, cameraDefault, type CameraProps } from '..'
import { DialogCamera } from '../../../components/dialog-camera'
import { SkeletonFormSmall } from '../../../components/skeleton'

interface UseCameraDefaultProps {
	children?: any
}

const CameraProvider: React.FC<UseCameraDefaultProps> = React.memo(function FormProvider({ children }) {
	const [camera, setCamera] = useState<CameraProps>(cameraDefault)

	const cameraOpen = useCallback((options?: Partial<CameraProps>) => {
		const { title, imageRef, description } = options || {}
		setCamera({
			isOpen: true,
			title: title || 'Camera',
			imageRef,
			description: description || 'Take a photo with your camera',
		} as CameraProps)
	}, [])

	const cameraClose = useCallback((_: object, reason: string) => {
		if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
		setCamera(cameraDefault)
	}, [])

	const value: any = useMemo(
		() => ({
			camera,
			cameraOpen,
			cameraClose,
		}),
		[camera, cameraOpen, cameraClose]
	)

	return (
		<CameraContext.Provider value={value}>
			{children}
			<React.Suspense fallback={<SkeletonFormSmall />}>
				<DialogCamera camera={camera} cameraClose={cameraClose} />
			</React.Suspense>
		</CameraContext.Provider>
	)
})

export default CameraProvider
