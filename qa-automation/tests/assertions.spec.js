// @ts-check
import { test, expect } from '@playwright/test';

test('login page', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeEnabled()
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await expect(page.locator('#email')).toHaveValue('goit@gmail.com')
    await expect(page.locator('#password')).toHaveValue('Foodies2025!')
    await page.getByRole('button', {name: "Login"}).click()
    await expect(page.getByText('Invalid credentials')).not.toBeVisible()
    await expect(page).toHaveURL('/')
    await expect(page).not.toHaveURL('/auth/login')

    await expect(page.getByRole('article').first()).toBeVisible()
    const count = await page.getByRole('article').count()
    expect(count).toBeGreaterThan(0)
    // toContainText
    // toHaveCount
});
