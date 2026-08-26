import { test as base, type Page } from '@playwright/test'
import path from 'node:path'

type Fixtures = {
  authenticatedPage: Page
}
export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: path.join(__dirname, 'playwright/.auth/user.json')
    })
    const page = await context.newPage()
    await page.goto('/')
    await use(page)
    console.log('Тест із authenticatedPage завершено')
  },
})