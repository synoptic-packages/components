/**
 * A dependency-free `useSelector`/`useDispatch`-compatible pair so the components that historically
 * read the wallet app's redux store can render inside this package's own Provider without a real
 * redux store being present. Consumers that mount `<Provider store={theirStore}>` supply their own
 * typed `RootState`; when no store is given these fall back to a static shim state.
 */
import { useShimStore, type ShimState } from './store'

export const useSelector = <TSelected, TState = ShimState>(
	selector: (_state: TState) => TSelected,
	_equalityFn?: (a: TSelected, b: TSelected) => boolean
): TSelected => {
	const state = useShimStore() as TState
	return selector(state)
}

export const useDispatch = (): ((_action: unknown) => void) => {
	return () => {
		/* no-op when no real store is wired */
	}
}

export type { ShimState }
