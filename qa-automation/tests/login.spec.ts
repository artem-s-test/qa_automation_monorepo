import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'

test.skip('токен зберігається в local storage після входу', async ({ page, context }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.login('goit@gmail.com', 'Foodies2025!')

  const token = await page.evaluate(() => localStorage.getItem('accessToken'))
  expect(token).not.toBeNull()
  
  const cookies = await context.cookies()
})

test('вхід перенаправляє на головну сторінку', async ({ page }, testInfo) => {
  await testInfo.attach('Worker-info', {body: `${testInfo.workerIndex}`})
  await page.goto('/auth/login');
  // await page.context().tracing.start({
  //   screenshots: true,
  //   snapshots: true
  // })
  await page.locator('input#email').fill('goit@gmail.com');
  await page.locator('input#password').fill('Foodies2025!');
  await page.locator('button[type="submit"]').click();

  // const currentUrl = page.url(); // повертає адресу миттєво, не чекаючи редіректу
  // expect(currentUrl).toBe('/'); // звіряє значення один раз, без повторних спроб
  await expect(page).toHaveURL('/')
  // await page.context().tracing.stop({ path: 'trace.zip' });
});