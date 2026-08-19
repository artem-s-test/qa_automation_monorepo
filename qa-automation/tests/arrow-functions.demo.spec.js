// @ts-check
import { test, expect } from "@playwright/test";

test("arrow functions demo", async ({ page }) => {
  const clickButton = async (selector) => {
    console.log(`Клік на ${selector}`);
  };
  clickButton("button");
  const doubleNum = (n) => n * 2;
  console.log(doubleNum(5));
});

test("arrow functions vs function declaration", async ({ page }) => {
  function double(n) {
    return n * 2;
  }
  // new double()
  const doubleArrow = (n) => n * 2;
});

test("page evaluate demo", async ({ page }) => {
  await page.goto("/");
  const buttonCount = await page.evaluate(() => {
    return document.querySelectorAll("button").length;
  });
  console.log(buttonCount)


await expect(page
    .locator('article').first()).toBeVisible()
const recipeTitles = await page
    .locator('article')
    .evaluateAll(cards => cards.map(card => card.textContent.trim()));
    console.log(recipeTitles)
});
