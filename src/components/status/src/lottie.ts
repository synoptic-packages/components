import LottieImport from 'lottie-react'

/**
 * `lottie-react` ships CommonJS, and under Vite's dev interop its default export arrives as the module
 * NAMESPACE object rather than the component. Rendering `<Lottie />` then throws
 * "Element type is invalid … but got: object" and React unmounts the whole tree — a blank page.
 *
 * That is exactly what happened to every empty and error state in this console. `StatusError` and
 * `StatusSuccess` are the shared "no data" and "load failed" surfaces used across the app, so a page
 * with rows rendered fine and the same page with none went white. It stayed hidden because the
 * operator rosters under test always had rows, so the branch that renders these components had never
 * actually run — the first surface to hit an empty result found it (the yaya dispatch board, whose
 * whole point is that an idle market shows nothing).
 *
 * `splash/src/Component.tsx` already carried this exact workaround inline. It is shared here so the
 * next component that needs a Lottie does not have to rediscover the failure.
 */
export const Lottie = (
	typeof LottieImport === `function` ? LottieImport : (LottieImport as any).default
) as typeof LottieImport
