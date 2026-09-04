# @synotech/components

Shared React + MUI component library for the Synotech ecosystem.

Lifted from the Synoptic wallet console (`synoptic-wallet/ui`) so future
projects can install the design system as a package instead of copying it.

## Install

```bash
yarn add @synotech/components @mui/material @emotion/react @emotion/styled react-hook-form
```

## Usage

```tsx
import { Provider, Button, FieldText, getDesignTokens } from '@synotech/components'
```

Wrap your app in `<Provider brand={{ brand_color, brand_color_accent }}>`
to get the MUI theme, snackbar/dialog host, layout and form contexts.

## Included

- 64 reusable components: button, text, box, icon, flag, form, table, tabs,
  dialog, and the `field-*` family (~26 form fields bound to react-hook-form)
- Full MUI design system: `getDesignTokens(mode, direction)` theme builder,
  semantic color tokens, fonts, sizing
- Providers: `Provider` (theme + snackbar/dialog + config context),
  `ProviderForms`, `LayoutProvider`, camera context
- Vendored helpers that the wallet app previously imported from its private
  `@wallet/provider` package

Not in the root barrel (deep-import only): `field-markdown`, `field-textarearich`
(ESM-only editor deps), `map`, `field-places`, `dialog-camera`.

## Build

```bash
yarn install
yarn typecheck
yarn build   # dist/ with cjs + esm + dts
```
