import { sleep } from '../../../lib'
import { Box, Container, Grid, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import { useFormState } from 'react-hook-form'
import { sizing } from '../../../constants'
import { useConfig } from '../../../context/provider-config'
import { useNavigate } from '../../../hooks/useNavigate'
import type { IFormProps } from '../../../types/generics'
import { Button } from '../../button'
import { SkeletonFormSmall } from '../../skeleton'

export const Component: React.FC<IFormProps> = ({
	size,
	children,
	control,
	onSubmit,
	onReset: resetForm,
	isLoading: isLoadingProp,
	isSubmitting: isSubmittingProp,
	submitLabel = `Submit`,
	resetLabel = `Reset`,
	hideActions = false,
	hideReset = false,
	submitDisabled = false,
	endAdornment,
	testId,
}) => {
	const navigate = useNavigate()
	const { isMobile } = useConfig()
	const { isSubmitting, isLoading } = useFormState({ control })

	const handleReset = () => {
		const canGoBack = window.history.length > 1
		if (isLoading || isLoadingProp) {
			if (canGoBack) {
				navigate(-1)
			}
			return
		}

		if (resetForm) {
			resetForm()
		} else {
			if (canGoBack) {
				navigate(-1)
			} else {
				control._reset()
			}
		}
	}

	const padding = useMemo(() => (isMobile ? 2 : 3), [isMobile])
	const formWidth = useMemo(() => {
		switch (size) {
			case 'small':
				return `420px !important`
			case 'medium':
				return `760px !important`
			case 'full':
				return `100% !important`
			default:
				return `900px !important`
		}
	}, [size])

	return (
		<Container
			sx={{
				maxWidth: formWidth,
				mx: `auto`,
				width: `100%`,
				p: padding,
				bgcolor: `background.paper`,
				borderRadius: sizing.borderRadius * 0.5,
			}}
			className={`--infomentor-form-container`}>
			<Stack
				component={`form`}
				data-test-id={testId ?? `id-wallet-form`}
				className={`--infomentor-form`}
				onSubmit={async (e) => {
					e?.preventDefault()
					await sleep(1000)
					await onSubmit?.()
				}}
				width={`100%`}>
				<Box className={`--infomentor-form-content`}>
					{isLoading || isLoadingProp ? (
						<SkeletonFormSmall />
					) : (
						<Grid container spacing={2} direction={`row`}>
							{children({ control })}
						</Grid>
					)}
					{!hideActions && (
						<React.Fragment>
							<Box height={16} />
							<Box
								display={`flex`}
								width={`100%`}
								flexDirection={size === `small` || isMobile ? `column` : `row`}
								gap={2}
								justifyContent={`space-between`}
								alignItems={`center`}>
								<Box
									display={`flex`}
									width={`100%`}
									flexDirection={`row`}
									justifyContent={`space-between`}
									alignItems={`center`}></Box>
								<Box
									display={`flex`}
									width={`100%`}
									gap={1}
									flexDirection={`row`}
									// flexDirection={size === `small` ? `column-reverse` : `row`}
									justifyContent={`space-between`}
									alignItems={`center`}>
									{!hideReset && (
										<Button
											sx={{
												mb: size === `small` || isMobile ? 2 : 0,
												ml: size === `small` ? 0 : 1,
											}}
											fullWidth={true}
											type={`button`}
											size={`large`}
											testId={`${testId ?? `id-wallet-form`}-reset`}
											onClick={handleReset}
											variant={`outlined`}>
											{resetLabel}
										</Button>
									)}
									<Button
										type={`submit`}
										size={`large`}
										testId={`${testId ?? `id-wallet-form`}-submit`}
										loading={isSubmitting || isSubmittingProp}
										disabled={
											isSubmitting ||
											isSubmittingProp ||
											isLoading ||
											isLoadingProp ||
											submitDisabled
										}
										sx={{
											mb: size === `small` || isMobile ? 2 : 0,
											ml: size === `small` ? 0 : 1,
										}}
										fullWidth={true}
										variant={`contained`}>
										{isSubmitting || isSubmittingProp ? `Submitting...` : submitLabel}
									</Button>
								</Box>
							</Box>
						</React.Fragment>
					)}
					{endAdornment && (
						<Box
							sx={{
								width: '100%',
								display: `flex`,
								alignItems: `center`,
								justifyContent: `center`,
							}}>
							{endAdornment}
						</Box>
					)}
				</Box>
			</Stack>
		</Container>
	)
}

Component.displayName = 'Form'
