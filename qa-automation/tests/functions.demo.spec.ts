import { test, expect } from "@playwright/test";
import { generateRandomEmail, calculateDiscountedPrice } from "../helpers";

const isHeadless: boolean = true
const testTags: string[] = ['smoke', 'regression']
testTags.push(5)
test("функції", async ({ page }) => {
  const finalPrice: number = calculateDiscountedPrice(299, 10);
  console.log(finalPrice);
});

test("реєстрація нового користувача", async ({ page }) => {
  const email: string = generateRandomEmail("user");
  console.log("Реєструю нового користувача: ", email);
});

test("перевірка ціни тарифу зі знижкою", async ({ page }) => {
  const finalPrice: number = calculateDiscountedPrice(499, 10);
  expect(finalPrice).toBe(449.1);
});
