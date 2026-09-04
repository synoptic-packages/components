import { Box } from '@mui/material'
import type { Meta } from '@storybook/react-vite'
import { useConfig } from '../../../context/provider-config'
import { Button } from '../../button'
import { Text } from '../../text'

const SnackbarDemo = () => {
	const { setSnackbar } = useConfig()

	const showSnackbar = (severity: 'success' | 'warning' | 'error' | 'info') => {
		setSnackbar?.({
			open: true,
			message: `This is a ${severity} snackbar notification!`,
			severity,
			vertical: 'bottom',
			horizontal: 'left',
		})
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
			<Button variant={`contained`} color={`success`} onClick={() => showSnackbar('success')}>
				Show Success Snackbar
			</Button>
			<Button variant={`contained`} color={`info`} onClick={() => showSnackbar('info')}>
				Show Info Snackbar
			</Button>
			<Button variant={`contained`} color={`warning`} onClick={() => showSnackbar('warning')}>
				Show Warning Snackbar
			</Button>
			<Button variant={`contained`} color={`error`} onClick={() => showSnackbar('error')}>
				Show Error Snackbar
			</Button>
		</Box>
	)
}

const meta = {
	title: 'Components/Snackbar',
	component: SnackbarDemo,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Snackbar notifications using the setSnackbar function from provider-config context. These are global toast-style notifications that appear temporarily to provide feedback to users.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SnackbarDemo>

export default meta

export const Default = {
	render: () => <SnackbarDemo />,
	parameters: {
		docs: {
			description: {
				story: 'Click the buttons to trigger different severity snackbars. Each snackbar will appear at the bottom-left corner of the screen.',
			},
		},
	},
}

const SnackbarPositionsDemo = () => {
	const { setSnackbar } = useConfig()

	const showSnackbar = (
		vertical: 'top' | 'bottom',
		horizontal: 'left' | 'center' | 'right',
		severity: 'success' | 'info' = 'info'
	) => {
		setSnackbar?.({
			open: true,
			message: `Snackbar at ${vertical}-${horizontal}`,
			severity,
			vertical,
			horizontal,
		})
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '350px' }}>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Button variant={`outlined`} size={`small`} onClick={() => showSnackbar('top', 'left')}>
					Top Left
				</Button>
				<Button variant={`outlined`} size={`small`} onClick={() => showSnackbar('top', 'center')}>
					Top Center
				</Button>
				<Button variant={`outlined`} size={`small`} onClick={() => showSnackbar('top', 'right')}>
					Top Right
				</Button>
			</Box>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Button variant={`outlined`} size={`small`} onClick={() => showSnackbar('bottom', 'left', 'success')}>
					Bottom Left
				</Button>
				<Button variant={`outlined`} size={`small`} onClick={() => showSnackbar('bottom', 'center', 'success')}>
					Bottom Center
				</Button>
				<Button variant={`outlined`} size={`small`} onClick={() => showSnackbar('bottom', 'right', 'success')}>
					Bottom Right
				</Button>
			</Box>
		</Box>
	)
}

export const Positions = {
	render: () => <SnackbarPositionsDemo />,
	parameters: {
		docs: {
			description: {
				story: 'Snackbars can be positioned at any corner or center of the screen using the vertical and horizontal properties.',
			},
		},
	},
}

const SnackbarMessagesDemo = () => {
	const { setSnackbar } = useConfig()

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px' }}>
			<Button
				variant={`contained`}
				color={`success`}
				onClick={() =>
					setSnackbar?.({
						open: true,
						message: 'Your changes have been saved successfully!',
						severity: 'success',
					})
				}>
				Success Message
			</Button>
			<Button
				variant={`contained`}
				color={`error`}
				onClick={() =>
					setSnackbar?.({
						open: true,
						message: 'Failed to save changes. Please try again.',
						severity: 'error',
					})
				}>
				Error Message
			</Button>
			<Button
				variant={`contained`}
				color={`warning`}
				onClick={() =>
					setSnackbar?.({
						open: true,
						message: 'You have unsaved changes. Please save before leaving.',
						severity: 'warning',
					})
				}>
				Warning Message
			</Button>
			<Button
				variant={`contained`}
				color={`info`}
				onClick={() =>
					setSnackbar?.({
						open: true,
						message: 'This is an informational message with more details about the action taken.',
						severity: 'info',
					})
				}>
				Long Info Message
			</Button>
		</Box>
	)
}

export const RealWorldExamples = {
	render: () => <SnackbarMessagesDemo />,
	parameters: {
		docs: {
			description: {
				story: 'Real-world examples of snackbar messages with practical use cases like save confirmations, errors, warnings, and informational messages.',
			},
		},
	},
}

const UsageExample = () => {
	return (
		<Box sx={{ p: 3, maxWidth: '600px' }}>
			<Text variant={'h5'} sx={{ mb: 2 }}>
				Usage in Your Components
			</Text>
			<Box
				component={'pre'}
				sx={{
					backgroundColor: '#f5f5f5',
					padding: 2,
					borderRadius: 2,
					overflow: 'auto',
					fontFamily: 'monospace',
					fontSize: '0.875rem',
					m: 0,
				}}>
				{`import { useConfig } from '@/context/provider-config'

const MyComponent = () => {
  const { setSnackbar } = useConfig()

  const handleSave = async () => {
    try {
      // Your save logic here
      await saveData()

      setSnackbar({
        open: true,
        message: 'Data saved successfully!',
        severity: 'success',
        vertical: 'bottom',
        horizontal: 'left'
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save data',
        severity: 'error'
      })
    }
  }

  return <button onClick={handleSave}>Save</button>
}`}
			</Box>
		</Box>
	)
}

export const UsageDocumentation = {
	render: () => <UsageExample />,
	parameters: {
		docs: {
			description: {
				story: 'Code example showing how to use the setSnackbar function in your components.',
			},
		},
	},
}
