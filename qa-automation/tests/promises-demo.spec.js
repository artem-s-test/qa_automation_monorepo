// @ts-check
import { test, expect } from "@playwright/test";
import { error } from "node:console";

test("JS Promises", async ({ page }) => {
    const delay = (ms) => new Promise((resolve) => {
        setTimeout(() => resolve('готово'), ms);
    });
    await delay(2000)
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
        .finally(()=> console.log('запит завершено'))
    console.log('Код продовжує виконуватись, не чекаючи проміс')
});

test("JS Promises - практика", async ({ page }) => {
    const fetchUser = () => new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, name: 'Alex' }), 1000);
    });
    await fetchUser().then((user)=>{
        console.log(user)
    }).catch((error) => console.log(error))
});