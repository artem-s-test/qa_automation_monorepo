// @ts-check
import { test, expect } from '@playwright/test';

test('Змінні в JS', async ({ page }) => {
    // var oldStyle = 'перше значення var'
    // oldStyle = 'друге значення var'
    // console.log(oldStyle)

    // {
    //     var myVar = 'видно за межами блоку'
    //     let myLetVariable = 'видно лише в блоці'
    //     console.log(myLetVariable)
    // }

    // console.log(myVar)

    // const BASE_URL = 'test.com'

    // BASE_URL = 'google.com'
    // console.log(BASE_URL)
});

test('Типи даних', async ({page}) => {
    // const url = 'test.com'
    // const count = 10
    // console.log(typeof url)
    // console.log(typeof count)

    // const isVisible = true
    // console.log(typeof isVisible)

    let notAssigned;
    const emptyValue = null;
    const bigNumber = 9007199254740993n;
    const uniqueId = Symbol('id');
    const todoItem = { title: 'Купити каву', completed: false };

    console.log(typeof notAssigned);
    console.log(typeof emptyValue);
    console.log(typeof bigNumber);
    console.log(typeof uniqueId);
    console.log(typeof todoItem);
})


test('Приклад', async ({page}) => {
    const BASE_URL = 'https://demo.playwright.dev/todomvc'
    const NEW_TODO_INPUT = '.new-todo'
    let itemsCount = 0

    await page.goto(BASE_URL)
    await page.locator(NEW_TODO_INPUT).fill('Купити чаю')
    await page.keyboard.press('Enter')
    itemsCount = itemsCount + 1
    console.log('Кількість доданих елементів:', itemsCount)
})