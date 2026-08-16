import { test, expect } from '@playwright/test'
import path from 'path'
import { LoginPage } from '../pages/loginPage'
import { AddRecipePage } from '../pages/addRecipePage'
import { DEFAULT_USER } from '../data/test-user'

test.describe('Додавання рецепта', () => {
  let addRecipePage: AddRecipePage

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    addRecipePage = new AddRecipePage(page)

    await loginPage.open()
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password)
    await expect(page).toHaveURL('/')
    
    await addRecipePage.open()
  })

  test('успішне створення рецепта з усіма полями', async ({ page }) => {
    await addRecipePage.uploadPhoto(path.join(__dirname, '..', 'data', 'test-photo.png'))
    await addRecipePage.fillTitle(`Test recipe ${Date.now()}`)
    await addRecipePage.fillDescription('A tasty recipe created by an automated test')
    await addRecipePage.fillTime('30')
    await addRecipePage.fillCalories('250')
    await addRecipePage.selectCategory('Dessert')
    await addRecipePage.addIngredient('Squid', '200g')
    await addRecipePage.fillInstructions('Mix everything together and cook for 30 minutes')

    await expect(addRecipePage.ingredientRows).toHaveCount(1)
    await expect(addRecipePage.ingredientRows.first()).toContainText('Squid')
    await expect(addRecipePage.ingredientRows.first()).toContainText('200g')

    await addRecipePage.submit()

    await expect(page.getByText('Recipe created successfully!')).toBeVisible()
    await expect(page).toHaveURL(url => url.pathname.startsWith('/recipes/'))
  })
})
