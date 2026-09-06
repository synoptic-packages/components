import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import path from 'node:path'

interface StoryEntry {
	id: string
	title: string
	name: string
	type: 'story' | 'docs'
}

interface StoriesIndex {
	entries: Record<string, StoryEntry>
}

const index = JSON.parse(
	readFileSync(path.join(process.cwd(), 'storybook-static', 'index.json'), 'utf8')
) as StoriesIndex
const stories = Object.values(index.entries).filter((entry) => entry.type === 'story')
const docs = Object.values(index.entries).filter((entry) => entry.type === 'docs')

test.describe('component stories render without errors', () => {
	for (const story of stories) {
		test(`${story.title} › ${story.name}`, async ({ page, baseURL }) => {
			const errors: string[] = []
			page.on('pageerror', (error) => errors.push(String(error).slice(0, 300)))
			await page.goto(`${baseURL}/iframe.html?id=${story.id}&viewMode=story`)
			await expect(page.locator('#storybook-root')).toBeAttached({ timeout: 15000 })
			// Stories render async — wait for any DOM node (image-only stories
			// have no text, so text-based assertions undercount).
			await expect
				.poll(async () => page.locator('#storybook-root').evaluate((el) => el.childElementCount), {
					timeout: 30000,
				})
				.toBeGreaterThan(0)
			expect(errors).toEqual([])
		})
	}
})

test.describe('docs pages load', () => {
	for (const doc of docs) {
		test(`${doc.title}`, async ({ page, baseURL }) => {
			const response = await page.goto(`${baseURL}/iframe.html?id=${doc.id}&viewMode=docs`)
			expect(response?.ok()).toBe(true)
		})
	}
})
