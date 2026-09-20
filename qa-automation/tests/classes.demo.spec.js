// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('classes demo', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await page.goto('/auth/login')
    await loginPage.login('goit@gmail.com', 'Foodies2025!')
    await expect(page.getByRole('article').first()).toBeVisible()
    // await loginPage.emailInput
});