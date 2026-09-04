// @synotech/components — shared React + MUI component library.
//
// Reusable primitives, theme, and providers lifted from the Synoptic wallet
// console (synoptic-wallet/ui) so future projects can install them as a
// package instead of copying the design system.

// Design system + theme
export * from './theme'

// Providers / contexts (theme + config, forms, layout, camera)
export * from './context/provider-config'
export * from './context/provider-forms'
export * from './context/context-layout'
export * from './context/context-camera'

// Shared types (via lib) + constants + hooks
export * from './constants'

// Vendored helpers (formerly @wallet/provider utils)
export * from './lib'

// Components
export * from './components'
