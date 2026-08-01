// @ts-check
import { test, expect } from "@playwright/test";

test("синтаксис async/await", async ({ page }) => {
   async function loadUser() {
    const response = await fetch("http://localhost:4040/api/users/1");
    const user = await response.json();
    console.log(user);
  }
  loadUser()
});

test('користувач бачить головну сторінку після входу', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login')
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await page.getByRole('button', {name: "Login"}).click()

    await expect(page.locator('a[href="/profile"]')).toBeVisible()
});
