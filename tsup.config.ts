import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

// Everything the package declares as a peer/dev dependency is external — the
// library never bundles React, MUI, the editor libs, or the @synotech siblings;
// consumers bring their own copies.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const external = [
	...Object.keys(pkg.peerDependencies || {}),
	...Object.keys(pkg.devDependencies || {}),
	// module subpaths (e.g. react/jsx-runtime, @mui/material/styles)
	/^(@mui\/[^/]+|react|react-dom|@tiptap\/[^/]+|@lexical\/[^/]+)\//,
]

export default defineConfig({
	entry: ['src/index.ts', 'src/theme/index.ts'],
	outDir: 'dist',
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
	sourcemap: true,
	target: 'es2020',
	external,
	// .css/.scss side-effect imports become no-ops (styles are the host app's
	// responsibility); .json imports are bundled as modules.
	loader: {
		'.css': 'empty',
		'.scss': 'empty',
		'.json': 'json',
	},
})
