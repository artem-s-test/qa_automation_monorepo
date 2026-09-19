import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'

test('токен зберігається в local storage після входу', async ({ page, context }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.login('goit@gmail.com', 'Foodies2025!')

  const token = await page.evaluate(() => localStorage.getItem('accessToken'))
  expect(token).not.toBeNull()
  
  const cookies = await context.cookies()
})

test.skip('вхід перенаправляє на головну сторінку', async ({ page }) => {
  await page.goto('/auth/login');

  await page.locator('input#email').fill('goit@gmail.com');
  await page.locator('input#password').fill('Foodies2025!');
  await page.locator('button[type="submit"]').click();

  // const currentUrl = page.url(); // повертає адресу миттєво, не чекаючи редіректу
  // expect(currentUrl).toBe('http://localhost:5173/'); // звіряє значення один раз, без повторних спроб
  await expect(page).toHaveURL('http://localhost:5173/')
});