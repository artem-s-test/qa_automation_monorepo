import { test as base, type Page } from '@playwright/test'
import { LoginPage } from './pages/loginPage'
import { DEFAULT_USER } from './data/test-user'

type Fixtures = {
  authenticatedPage: Page
}
type WorkerFixtures = {
  workerStorageState: string
}

export const test = base.extend<Fixtures, WorkerFixtures>({
  workerStorageState: [async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const loginPage = new LoginPage(page)

    await loginPage.open()
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password)

    const statePath = 'storageState.json'
    await context.storageState({ path: statePath })
    await context.close()

    await use(statePath)
  }, { scope: 'worker' }],
  authenticatedPage: async ({ browser, workerStorageState }, use) => {
    const context = await browser.newContext({
      storageState: workerStorageState
    })
    const page = await context.newPage()
    await use(page)
    console.log('Тест із authenticatedPage завершено')
  },

})