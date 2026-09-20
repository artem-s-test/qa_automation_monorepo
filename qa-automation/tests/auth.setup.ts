import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { DEFAULT_USER } from '../data/test-user'
import path from 'node:path'

const authFile = path.join(__dirname, '../playwright/.auth/user.json')

setup('авторизація', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password)

  await page.context().storageState({ path: authFile })
})