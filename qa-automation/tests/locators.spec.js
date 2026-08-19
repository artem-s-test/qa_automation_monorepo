// @ts-check
import { test, expect } from '@playwright/test';

test('локатори на практиці', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('article').locator('button')).toBeVisible()
});


test('login page', async ({ page }) => {
    await page.goto('/auth/login')
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await page.locator('button[type="submit"]').click()
});