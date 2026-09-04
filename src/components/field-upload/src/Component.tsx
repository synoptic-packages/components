import { Box, IconButton, LinearProgress, Link } from '@mui/material'
import { Text } from '../../text'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useController, type Control } from 'react-hook-form'
import type { TGeneric, ValidationRules } from '../../../types/generics'
import { Icon } from '../../icon'
import type { IconName } from '../../icon/src/Component'

export interface IComponentProps {
	name: string
	control: Control<TGeneric> | TGeneric
	rules?: ValidationRules
	icon?: IconName
	references?: Record<string, TGeneric>
	label?: React.ReactNode | string | TGeneric
	acceptedTypes?: string[]
	maxSizeMB?: number
	onUpload?: (file: File, references: Record<string, TGeneric>) => Promise<TGeneric>
	autoUpload?: boolean
	existingFile?: {
		id: number
		file: string
		document_type: string
	} | null
	onDelete?: (fileId: number) => Promise<void>
	testId?: string
}

interface IFileData {
	file: File
	dataURL?: string
	name: string
	size: number
	type: string
}

export const Component: React.FC<IComponentProps> = ({
	name,
	control,
	rules,
	label,
	references,
	acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'],
	maxSizeMB = 2,
	onUpload,
	autoUpload = true,
	existingFile,
	onDelete,
	testId,
}) => {
	const {
		field: { onChange },
	} = useController({ name, control, rules })

	const [fileData, setFileData] = useState<IFileData | null>(null)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [isUploading, setIsUploading] = useState(false)
	const [uploadError, setUploadError] = useState<string | null>(null)
	const [uploadSuccess, setUploadSuccess] = useState(false)
	const [dragActive, setDragActive] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const maxSizeBytes = maxSizeMB * 1024 * 1024

	useEffect(() => {
		if (existingFile && !fileData) {
			setUploadSuccess(true)
			const fileName = existingFile.file.split('/').pop() || 'Uploaded file'
			setFileData({
				file: new File([], fileName),
				name: fileName,
				size: 0,
				type: 'application/pdf',
			})
		}
	}, [existingFile, fileData])

	const uploadFile = useCallback(
		async (file: File) => {
			if (!onUpload || !references) {
				setUploadProgress(100)
				setIsUploading(false)
				setUploadSuccess(true)
				return
			}

			try {
				setIsUploading(true)
				setUploadError(null)
				setUploadProgress(0)

				const progressInterval = setInterval(() => {
					setUploadProgress((prev) => {
						if (prev >= 90) {
							clearInterval(progressInterval)
							return 90
						}
						return prev + 10
					})
				}, 200)

				const response = await onUpload(file, references)

				clearInterval(progressInterval)
				setUploadProgress(100)
				setUploadSuccess(true)
				setIsUploading(false)

				return response
			} catch (error) {
				setUploadError(error instanceof Error ? error.message : 'Upload failed')
				setIsUploading(false)
				setUploadProgress(0)
				throw error
			}
		},
		[onUpload, references]
	)

	const handleFile = useCallback(
		async (file: File) => {
			if (!acceptedTypes.includes(file.type)) {
				return
			}

			if (file.size > maxSizeBytes) {
				return
			}

			const newFileData: IFileData = {
				file,
				name: file.name,
				size: file.size,
				type: file.type,
			}

			setFileData(newFileData)
			onChange(file)

			if (autoUpload) {
				await uploadFile(file)
			}
		},
		[onChange, acceptedTypes, maxSizeBytes, autoUpload, uploadFile]
	)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			handleFile(file)
		}
	}

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)

		const file = e.dataTransfer.files?.[0]
		if (file) {
			handleFile(file)
		}
	}

	const resetComponent = () => {
		setFileData(null)
		onChange(null)
		setIsUploading(false)
		setUploadProgress(0)
		setUploadError(null)
		setUploadSuccess(false)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleDelete = async () => {
		if (existingFile?.id && onDelete) {
			try {
				await onDelete(existingFile.id)
				resetComponent()
			} catch (_error) {
				setUploadError('Failed to delete file')
			}
		} else {
			resetComponent()
		}
	}

	const handleReplaceFile = () => {
		fileInputRef.current?.click()
	}

	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const formatFileSize = (bytes: number): string => {
		return (bytes / 1024).toFixed(0)
	}

	const getCurrentSize = (totalSize: number, progress: number): string => {
		return ((totalSize / 1024) * (progress / 100)).toFixed(0)
	}

	return (
		<Box
			className={`upload__file-wrapper`}
			sx={{
				borderRadius: 1,
				height: '100%',
				width: '100%',
			}}>
			<Box
				component={`input`}
				ref={fileInputRef}
				type={`file`}
				accept={acceptedTypes.join(',')}
				onChange={handleFileChange}
				aria-label={`File upload input`}
				sx={{ display: 'none' }}
			/>

			{fileData ? (
				<Box
					width={`100%`}
					display={`flex`}
					flexDirection={`column`}
					className={`--upload-file-item`}
					sx={{
						borderRadius: 1,
						borderWidth: 1,
						borderStyle: `solid`,
						borderColor: `divider`,
						bgcolor: `background.paper`,
						padding: 2,
					}}>
					<Box display={`flex`} justifyContent={`space-between`} alignItems={`flex-start`} mb={1}>
						<Box flex={1}>
							<Text variant={`body2`} fontWeight={600} sx={{ mb: 0.5 }}>
								{fileData.name}
							</Text>
							{isUploading ? (
								<Text variant={`caption`} color={`text.secondary`}>
									{getCurrentSize(fileData.size, uploadProgress)} of {formatFileSize(fileData.size)}{' '}
									Kb
								</Text>
							) : (
								<Text variant={`caption`} color={`text.secondary`}>
									{fileData.size > 0 ? `${(fileData.size / 1024).toFixed(0)}KB` : ''}
								</Text>
							)}
						</Box>
						<IconButton
							onClick={handleDelete}
							size={`small`}
							sx={{
								ml: 1,
								'&:hover': {
									color: `error.main`,
								},
							}}>
							{uploadSuccess && !isUploading ? <Icon name={`Trash`} size={21} /> : <Icon name={`X`} />}
						</IconButton>
					</Box>

					{isUploading && (
						<>
							<LinearProgress
								variant={`determinate`}
								value={uploadProgress}
								sx={{
									height: 8,
									borderRadius: 1,
									bgcolor: `action.hover`,
									'& .MuiLinearProgress-bar': {
										borderRadius: 1,
										bgcolor: uploadError
											? `error.main`
											: uploadSuccess
												? `success.main`
												: `primary.main`,
									},
								}}
							/>

							<Text
								variant={`caption`}
								color={uploadError ? `error` : uploadSuccess ? `success.main` : `text.secondary`}
								sx={{ mt: 1 }}>
								{uploadError ? uploadError : 'Adding file...'}
							</Text>
						</>
					)}

					{uploadSuccess && !isUploading && (
						<Box display={`flex`} alignItems={`center`} gap={1} mt={1}>
							<Icon name={`Check`} color={`success`} />
							<Text variant={`caption`} color={`success.main`} fontWeight={500}>
								File added
							</Text>
						</Box>
					)}

					{uploadSuccess && !isUploading && (
						<Link
							component={`button`}
							type={`button`}
							variant={`caption`}
							color={`primary`}
							onClick={handleReplaceFile}
							sx={{
								mt: 1,
								textAlign: `left`,
								cursor: `pointer`,
								textDecoration: `none`,
								'&:hover': {
									textDecoration: `underline`,
								},
							}}>
							Replace file
						</Link>
					)}
				</Box>
			) : (
				<Box
					data-test-id={testId ?? `id-wallet-field-upload`}
					onClick={handleClick}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					alignItems={`center`}
					justifyContent={`center`}
					display={`flex`}
					flexDirection={`column`}
					height={`100%`}
					minHeight={`120px`}
					sx={{
						borderRadius: 1,
						borderWidth: 1,
						borderStyle: `dashed`,
						borderColor: dragActive ? `primary.main` : `disabled.main`,
						bgcolor: dragActive ? `action.hover` : `bg.main`,
						cursor: 'pointer',
						aspectRatio: 'auto',
						transition: 'all 0.2s ease',
					}}>
					<Box height={4} />
					<Icon name={`Upload`} size={28} />
					<Box height={8} />
					<Text fontWeight={`bold`} textAlign={`center`}>
						{label || `Click or Drop file here`}
					</Text>
					<Text color={`disabled.main`} textAlign={`center`} variant={`caption`}>
						{`JPEG, PNG or PDF | Maximum size: ${maxSizeMB}MB`}
					</Text>
				</Box>
			)}
		</Box>
	)
}

Component.displayName = 'FieldUpload'
