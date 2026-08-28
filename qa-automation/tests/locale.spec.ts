import { test, expect } from '@playwright/test';

test('мова браузера відповідає locale project', async ({ page }) => {
  await page.goto('/');
  const language = await page.evaluate(() => navigator.language);

  const { locale } = test.info().project.use;
  expect(language).toBe(locale);
});