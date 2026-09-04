import { Camera as CameraIcon, Check as CheckIcon, Undo as UndoIcon } from 'lucide-react'

import { Box, DialogTitle } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useConfig } from '../../../context/provider-config'
import type { TGeneric } from '../../../types/generics'
import { Icon } from '../../icon'
import { BounceLoader } from '../../loader'
import { Text } from '../../text'

export interface CameraProps {
	isOpen?: boolean
	title?: string
	description?: string
	imageRef?: TGeneric
}

export interface CameraContextType {
	camera: CameraProps
	cameraClose: (_event: object, _reason: string) => void
}

const videoConstraints = {
	width: 300,
	height: 400,
	facingMode: 'user',
}

export const Component: React.FC<CameraContextType> = ({ camera, cameraClose }) => {
	const { setSnackbar } = useConfig()
	const webcamRef = useRef<Webcam>(null)
	const [image, setImage] = useState<string | null>(null)
	const [uploading, setUploading] = useState(false)

	const capture = () => {
		const screenshot = webcamRef.current?.getScreenshot()
		if (screenshot) setImage(screenshot)
	}

	const upload = async () => {
		try {
			if (!image) return

			setUploading(true)

			// await severUpload({ File: { base64: image }, imageRef: camera?.imageRef })
			setUploading(false)
			cameraClose({}, '')
		} catch {
			setSnackbar?.({
				open: true,
				message: 'Error uploading file',
				severity: 'error',
			})
		} finally {
			setUploading(false)
		}
	}

	useEffect(() => {
		return () => {
			setImage(null)
			setUploading(false)
		}
	}, [])

	return (
		<Dialog
			disableEscapeKeyDown={true}
			open={!!camera?.isOpen}
			maxWidth={`sm`}
			onClose={cameraClose}
			scroll={`paper`}>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				{camera?.title}
				<Box
					onClick={() => cameraClose({}, '')}
					sx={{
						bgcolor: 'bg.main',
						width: 32,
						height: 32,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
					}}>
					<Icon name={`SyClose`} size={20} />
				</Box>
			</DialogTitle>
			<DialogContent sx={{ px: 0, width: 300, minHeight: 400 }}>
				{!image && (
					<Box>
						<Webcam
							ref={webcamRef}
							audio={false}
							screenshotFormat={`image/jpeg`}
							videoConstraints={videoConstraints}
							className={`rounded-xl w-full max-w-md`}
						/>
						<Text variant={`body1`} fontWeight={600} textAlign={`center`} mt={1}>
							{camera?.description}
						</Text>
						<Text variant={`body2`} fontWeight={300} textAlign={`center`}>
							We recommend using a white background, an external camera and a good light source.
						</Text>
					</Box>
				)}

				{image && <img src={image} alt={`Captured`} className={`rounded-xl shadow-md w-full max-w-md`} />}

				<Box display={`flex`} flexDirection={`row`} width={`100%`} mt={2}>
					{!image && (
						<Box
							display={`flex`}
							flexDirection={`row`}
							width={`100%`}
							alignItems={`center`}
							justifyContent={`center`}>
							<Box
								onClick={capture}
								sx={{
									bgcolor: 'primary.main',
									width: 52,
									height: 52,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: '50%',
								}}>
								<CameraIcon color={`white`} width={38} height={38} />
							</Box>
						</Box>
					)}

					{image && (
						<div className={`flex justify-between gap-4 items-center w-full`}>
							<Box
								onClick={() => {
									setImage(null)
									setUploading(false)
								}}
								component={`button`}
								type={`button`}
								display={`flex`}
								flexDirection={`row`}
								alignItems={`center`}
								justifyContent={`flex-start`}>
								<Box
									sx={{
										mr: 1,
										bgcolor: 'error.main',
										width: 52,
										height: 52,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: '50%',
									}}>
									<UndoIcon color={`white`} />
								</Box>
								<Text variant={`body2`} fontWeight={600}>
									Retake
								</Text>
							</Box>

							<Box
								onClick={upload}
								disabled={uploading}
								component={`button`}
								type={`button`}
								display={`flex`}
								flexDirection={`row`}
								alignItems={`center`}
								justifyContent={`flex-start`}>
								<Box
									sx={{
										mr: 1,
										bgcolor: 'success.main',
										width: 52,
										height: 52,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: '50%',
									}}>
									{uploading ? (
										<BounceLoader />
									) : (
										<CheckIcon color={`white`} width={36} height={36} />
									)}
								</Box>
								<Text variant={`body2`} fontWeight={600}>
									{uploading ? 'Uploading...' : 'Upload'}
								</Text>
							</Box>
						</div>
					)}
				</Box>
			</DialogContent>
		</Dialog>
	)
}
