interface IComponentProps {
	src: string
	width?: number
	height?: number
	quality?: number
	layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill'
	priority?: boolean
	darkInvert?: boolean
	alt?: string
	className?: string
	targetWidth?: number
	targetHeight?: number
	[key: string]: any
}

export const Component: React.FC<IComponentProps> = ({ alt, darkInvert: _darkInvert, ...rest }) => {
	const defaultBlurDataURL =
		'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAQAAQACAAAAAA0BAQAEAAAAAAABAgMAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

	const { targetWidth, targetHeight, width: originalWidth, height: originalHeight, ...otherRest } = rest

	let newWidth = originalWidth
	let newHeight = originalHeight

	if (targetWidth !== undefined && originalWidth !== undefined && originalHeight !== undefined) {
		newWidth = targetWidth
		newHeight = Math.round((targetWidth / originalWidth) * originalHeight)
	} else if (targetHeight !== undefined && originalWidth !== undefined && originalHeight !== undefined) {
		newHeight = targetHeight
		newWidth = Math.round((targetHeight / originalHeight) * originalWidth)
	}

	return (
		<img
			data-test-id={`id-wallet-image`}
			alt={alt ?? ''}
			width={newWidth}
			height={newHeight}
			{...otherRest}
			style={otherRest.style}
			src={rest.src || defaultBlurDataURL}
		/>
	)
}
