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

test('вхід перенаправляє на головну сторінку', async ({ page }) => {
  await page.goto('/auth/login');

  await page.locator('input#email').fill('goit@gmail.com');
  await page.locator('input#password').fill('Foodies2025!');
  await page.locator('button[type="submit"]').click();

  // const currentUrl = page.url(); // повертає адресу миттєво, не чекаючи редіректу
  // expect(currentUrl).toBe('http://localhost:5173/'); // звіряє значення один раз, без повторних спроб
  await expect(page).toHaveURL('http://localhost:5173/', { timeout: 20000})
});