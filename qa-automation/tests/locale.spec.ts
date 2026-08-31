import { test, expect } from '@playwright/test';

test('мова браузера відповідає locale project', async ({ page }, testInfo) => {
  console.log(`Файл locale.spec.ts виконується у воркері №${testInfo.workerIndex}`);
  await page.goto('/');
  const language = await page.evaluate(() => navigator.language);

  const { locale } = test.info().project.use;
  expect(language).toBe(locale || 'en-US');
});