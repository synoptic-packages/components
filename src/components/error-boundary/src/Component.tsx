import { Component } from 'react'
import { __DEV__ } from '../../../constants'

export type ErrorBoundaryProps = {
	onError?: any
	errorMessage?: any
	children?: any
	testId?: string
}

export type ErrorBoundaryStateProps = {
	error: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStateProps> {
	state = {
		error: false,
	}

	static getDerivedStateFromError() {
		return { error: true }
	}

	componentDidCatch(error: any, errorInfo: any) {
		if (__DEV__) {
			console.error(`ErrorBoundary caught an error:`, error, errorInfo)
		}

		if (typeof this.props?.onError === 'function') {
			return this.props.onError(error, errorInfo)
		}
	}

	render() {
		if (this.state.error) {
			return (
				<div data-test-id={this.props.testId ?? `id-wallet-error-boundary`}>
					{this.props?.errorMessage ?? `Error rendering view`}
				</div>
			)
		} else {
			return <div data-test-id={this.props.testId ?? `id-wallet-error-boundary`}>{this.props.children}</div>
		}
	}
}
