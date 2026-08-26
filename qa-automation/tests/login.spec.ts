import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { DEFAULT_USER } from '../data/test-user'

test('токен зберігається в local storage після входу', async ({ page, context }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password)

  const token = await page.evaluate(() => localStorage.getItem('accessToken'))
  expect(token).not.toBeNull()
  
  const cookies = await context.cookies()
  console.log(cookies);
})