// @ts-check
import { test, expect } from '@playwright/test';

test('цикл for', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
        console.log(`Перевірка товару номер ${i + 1}`);
    }
});

test('цикл for...of: перебір масиву товарів', async ({ page }) => {
  const productNames = ['Phone', 'Laptop', 'Tablet', 'Watch'];

  for (const product of productNames) {
    console.log(`Тестуємо додавання в кошик: ${product}`);
  }
});

test('перевірка знижки для кожного тарифу', async ({ page }) => {
 const planPrices = [199, 299, 499, 1000];

 for (const price of planPrices) {
   const discountedPrice = price * 0.9;
   console.log(`Тариф ${price} грн зі знижкою коштує ${discountedPrice} грн`);
 }
});

test('перевірка знижки для кожного тарифу: помилка на межі', async ({ page }) => {
   const planPrices = [199, 299, 499];
   const count = planPrices.length

   for (let i = 0; i < count; i++) {
     const discountedPrice = planPrices[i] * 0.9;
     console.log(`Тариф ${planPrices[i]} грн зі знижкою коштує ${discountedPrice} грн`);
   }
});