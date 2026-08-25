import { expect } from '@playwright/test'
import { test } from '../fixtures'
import path from 'path'
import { AddRecipePage } from '../pages/addRecipePage'
import { RecipeCategory } from '../types/enums'

test.describe('Додавання рецепта', () => {
  let addRecipePage: AddRecipePage

  test.beforeEach(async ({ authenticatedPage }) => {
    addRecipePage = new AddRecipePage(authenticatedPage)

    await expect(authenticatedPage).toHaveURL('/')
    
    await addRecipePage.open()
  })

  test('успішне створення рецепта з усіма полями', async ({ authenticatedPage }) => {
    await addRecipePage.uploadPhoto(path.join(__dirname, '..', 'data', 'test-photo.png'))
    await addRecipePage.fillTitle(`Test recipe ${Date.now()}`)
    await addRecipePage.fillDescription('A tasty recipe created by an automated test')
    await addRecipePage.fillTime('30')
    await addRecipePage.fillCalories('250')
    await addRecipePage.selectCategory(RecipeCategory.Dessert)
    await addRecipePage.addIngredient('Squid', '200g')
    await addRecipePage.fillInstructions('Mix everything together and cook for 30 minutes')

    await expect(addRecipePage.ingredientRows).toHaveCount(1)
    await expect(addRecipePage.ingredientRows.first()).toContainText('Squid')
    await expect(addRecipePage.ingredientRows.first()).toContainText('200g')

    await addRecipePage.submit()

    await expect(addRecipePage.successToast).toBeVisible()
    await expect(authenticatedPage).toHaveURL(url => url.pathname.startsWith('/recipes/'))
  })
})
