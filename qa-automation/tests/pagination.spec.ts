import { test, expect } from '@playwright/test'
import { CreatedRecipeData, RecipesListResponseBody } from '../types/recipes'

function buildMockRecipe(index: number): CreatedRecipeData {
  return {
    id: `mock-recipe-${index}`,
    title: `Мокований рецепт ${index}`,
    description: 'Згенеровано для перевірки пагінації, без звернення до реального бекенду.',
    category: 'Dinner',
    area: 'Ukraine',
    time: '30 minutes',
    calories: 200,
    instructions: 'Тестові інструкції для мокованого рецепта.',
    ingredients: [{ id: '640c2dd963a319ea671e383b', measure: '100 g' }],
  }
}

// будуємо масив із 12 унікальних мокованих рецептів для першої сторінки
const mockRecipes: CreatedRecipeData[] = []
for (let i = 1; i <= 12; i++) {
  mockRecipes.push(buildMockRecipe(i))
}

const mockRecipesListResponse: RecipesListResponseBody = {
  status: 'success',
  message: 'Recipes fetched successfully',
  data: {
    data: mockRecipes,
    page: 1,
    perPage: 12,
    totalItems: 13,
    totalPages: 2,
    hasNextPage: true,
    hasPreviousPage: false,
  },
}

test('пагінація показує рівно дві сторінки при 13 рецептах по 12 на сторінці', async ({ page }) => {
  await page.route('**/api/recipes?**', async (route) => {
    await route.fulfill({ json: mockRecipesListResponse })
  })

  await page.goto('/')

  await expect(page.locator('article')).toHaveCount(12)
  await expect(page.getByRole('button', { name: '1', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '2', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '3', exact: true })).toHaveCount(0)
})