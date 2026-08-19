// @ts-check
import { test, expect } from '@playwright/test';

test('click seach', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', {name: "Search"}).dblclick()
    await page.getByRole('article').first().click({button: 'right'})
    await page.getByRole('article').first().click({modifiers: ['Control']})
    await page.getByRole('article').first().click({position: {
        x: 100,
        y: 100
    }})
});

test('login page', async ({ page }) => {
    await page.goto('/auth/login')
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
});

test('enter search request', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.getByPlaceholder('Search recipes').fill('avocado')
    await page.getByPlaceholder('Search recipes').press('Enter')
});

test('checkbox demo', async ({ page }) => {
    await page.goto('/auth/register')
    await page.locator('#terms').check()
});

test('add receipe', async ({ page }) => {
    await page.goto('/auth/login')
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await page.getByRole('button', {name: "Login"}).click()
    await page.locator('a[href="/add-recipe"]').click()
    await page.locator('#photoInput').setInputFiles([])
    await page.pause()
});