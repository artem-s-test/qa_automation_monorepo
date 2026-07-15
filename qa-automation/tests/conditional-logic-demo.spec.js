const { test, expect } = require('@playwright/test');

test('if/else конструкція', async ({ page }) => {
  
    const USER_AGE = 20;

    if (USER_AGE === 18) {
        console.log('Вітаємо з повноліттям!');
    } 
    // else if (USER_AGE < 18) {
    //     console.log('Доступ обмежено за віком');
    // } else {
    //     console.log('Доступ дозволено');
    // }
});

test('оператори порівняння', async ({ page }) => {
    console.log(18 === 18);   // true
    console.log(18 === '18'); // false
});


test('перевірка за віком і згодою', async ({ page }) => {
  
    const USER_AGE = 18;
    const hasAgreedToTerms = true;
    const isEligible = USER_AGE >= 18 && hasAgreedToTerms

    if (isEligible) {
        console.log('Вітаємо з повноліттям!');
    } else {
        console.log('Доступ заборонено');
    }
});