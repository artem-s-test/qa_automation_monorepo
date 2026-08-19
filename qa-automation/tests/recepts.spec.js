// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Пошук рецептів", () => {
    test.beforeAll(async () => {
    // один раз перед усіма тестами групи
    // наприклад, підготовка даних через API
    console.log('before all')
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
    await page.locator("#email").fill("goit@gmail.com");
    await page.locator("#password").fill("Foodies2025!");
    await expect(page.locator("#email")).toHaveValue("goit@gmail.com");
    await expect(page.locator("#password")).toHaveValue("Foodies2025!");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Invalid credentials")).not.toBeVisible();
    await expect(page).toHaveURL("/");
    await expect(page).not.toHaveURL("/auth/login");
  });
  test.afterEach(async ({ page }, testInfo) => {
    // діагностика: статус і адреса сторінки після тесту
    console.log(`Тест "${testInfo.title}": ${testInfo.status}`);
    console.log(`Сторінка: ${page.url()}`);
  });
    test.afterAll(async () => {
    // один раз після всіх тестів групи
    console.log('after all')
  });


  test("картки рецептів відображаються", async ({ page }) => {
    await expect(page.getByRole("article").first()).toBeVisible();
    const count = await page.getByRole("article").count();
    expect(count).toBeGreaterThan(0);
  });

  test("пошук рецепта за назвою", async ({ page }) => {
    await page.getByPlaceholder("Search recipes").fill("avocado");
    await page.getByPlaceholder("Search recipes").press("Enter");

    await expect(page.getByRole("article").first()).toBeVisible();
    await expect(page.getByRole("article").first()).toContainText("avocado");
  });
});
