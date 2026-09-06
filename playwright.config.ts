import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.STORYBOOK_E2E_PORT ?? '6007'
const BASE_URL = `http://127.0.0.1:${PORT}`

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 1,
	workers: process.env.CI ? 2 : 2,
	timeout: 90_000,
	expect: { timeout: 15_000 },
	outputDir: 'test-results',
	reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
	use: {
		baseURL: BASE_URL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	webServer: {
		command: `yarn http-server storybook-static -p ${PORT} --silent`,
		url: `${BASE_URL}/index.json`,
		reuseExistingServer: !process.env.CI,
		timeout: 60000,
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
})
