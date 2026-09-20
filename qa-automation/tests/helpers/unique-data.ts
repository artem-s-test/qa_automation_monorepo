export const TEST_RECIPE_TITLE_PREFIX = 'Тестовий рецепт'

export function uniqueRecipeTitle(testInfo: { workerIndex: number }): string {
  return `${TEST_RECIPE_TITLE_PREFIX} ${testInfo.workerIndex}-${Date.now()}`
}
