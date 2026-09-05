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

	// Only mount the camera dialog when it's actually open. Rendering
	// <DialogCamera> (and its react-webcam dep) for every consumer made the
	// library unusable in Storybook — react-webcam needs a real camera/secure
	// context and throws otherwise, leaving the preview stuck on "preparing".
	return (
		<CameraContext.Provider value={value}>
			{children}
			{camera.isOpen && (
				<React.Suspense fallback={<SkeletonFormSmall />}>
					<DialogCamera camera={camera} cameraClose={cameraClose} />
				</React.Suspense>
			)}
		</CameraContext.Provider>
	)
})

export default CameraProvider
