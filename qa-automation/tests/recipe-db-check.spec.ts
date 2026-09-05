import { expect } from '@playwright/test'
import { test } from '../fixtures'
import mysql from 'mysql2/promise'
import { createDbConnection } from '../db/db-client'
import { uniqueRecipeTitle } from './helpers/unique-data'
import { RecipeCategory } from '../types/enums'

interface RecipeRow extends mysql.RowDataPacket {
  title: string
  category: string
}

let connection: mysql.Connection

test.beforeAll(async () => {
  connection = await createDbConnection()
})

test.afterAll(async () => {
  await connection.end()
})

test('рецепт, створений через UI, зберігається в базі з правильною категорією', async ({ addRecipePage }, testInfo) => {
  const recipeTitle = uniqueRecipeTitle(testInfo)

  await addRecipePage.fillTitle(recipeTitle)
  await addRecipePage.fillDescription('Тестовий рецепт для перевірки прямого запису в базу даних.')
  await addRecipePage.fillTime('20')
  await addRecipePage.fillCalories('150')
  await addRecipePage.selectCategory(RecipeCategory.Dessert)
  await addRecipePage.addIngredient('Sugar', '50g')
  await addRecipePage.fillInstructions('Змішати й охолодити.')
  await addRecipePage.submit()

  await expect(addRecipePage.successToast).toBeVisible()

  const [rows] = await connection.execute<RecipeRow[]>(
    'SELECT title, category FROM recipes WHERE title = ?',
    [recipeTitle],
  )

  expect(rows).toHaveLength(1)
  expect(rows[0].category).toBe(RecipeCategory.Dessert)
})
