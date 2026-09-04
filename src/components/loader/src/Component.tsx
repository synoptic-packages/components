import { Box } from '@mui/material'
import * as React from 'react'
import './loader.scss'

export const Component: React.FC = () => {
	return <Box component={`span`} className={`bounce-loader`} />
}
