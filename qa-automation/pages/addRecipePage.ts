import { Page, Locator } from '@playwright/test'

export class AddRecipePage {
  page: Page

  readonly photoInput: Locator
  readonly titleInput: Locator
  readonly descriptionInput: Locator
  readonly timeInput: Locator
  readonly caloriesInput: Locator
  readonly categoryDropdown: Locator
  readonly ingredientDropdown: Locator
  readonly ingredientAmountInput: Locator
  readonly addIngredientButton: Locator
  readonly ingredientRows: Locator
  readonly instructionsInput: Locator
  readonly publishButton: Locator
  readonly errorMessages: Locator

  constructor(page: Page) {
    this.page = page

    this.photoInput = page.locator('#photoInput')
    this.titleInput = page.getByTestId('recipe-title-input')
    this.descriptionInput = page.getByTestId('recipe-description-input')
    this.timeInput = page.getByTestId('cooking-time-input')
    this.caloriesInput = page.getByTestId('calories-input')
    this.categoryDropdown = page.getByTestId('category-dropdown')
    this.ingredientDropdown = page.getByTestId('ingredients-dropdown')
    this.ingredientAmountInput = page.getByTestId('ingredients-amount-input')
    this.addIngredientButton = page.getByRole('button', { name: 'Add new Ingredient' })
    this.ingredientRows = page.locator('tbody tr')
    this.instructionsInput = page.getByTestId('instructions-input')
    this.publishButton = page.getByRole('button', { name: /Publish Recipe|Loading/ })
    this.errorMessages = page.getByTestId('error-message')
  }

  async open(): Promise<void> {
    await this.page.goto('/add-recipe')
  }

  async uploadPhoto(filePath: string): Promise<void> {
    await this.photoInput.setInputFiles(filePath)
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title)
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description)
  }

  async fillTime(time: string): Promise<void> {
    await this.timeInput.fill(time)
  }

  async fillCalories(calories: string): Promise<void> {
    await this.caloriesInput.fill(calories)
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.categoryDropdown.click()
    await this.page.getByRole('option', { name: categoryName, exact: true }).click()
  }

  async addIngredient(ingredientName: string, amount: string): Promise<void> {
    await this.ingredientDropdown.click()
    await this.page.getByRole('option', { name: ingredientName, exact: true }).click()
    await this.ingredientAmountInput.fill(amount)
    await this.addIngredientButton.click()
  }

  async removeIngredient(index: number): Promise<void> {
    await this.ingredientRows.nth(index).locator('button').click()
  }

  async fillInstructions(instructions: string): Promise<void> {
    await this.instructionsInput.fill(instructions)
  }

  async submit(): Promise<void> {
    await this.publishButton.click()
  }

  async fillRecipeForm({
    title,
    description,
    time,
    calories,
    category,
    ingredientName,
    ingredientAmount,
    instructions,
    photoPath,
  }: {
    title: string
    description: string
    time: string
    calories?: string
    category: string
    ingredientName: string
    ingredientAmount: string
    instructions: string
    photoPath?: string
  }): Promise<void> {
    if (photoPath) {
      await this.uploadPhoto(photoPath)
    }
    await this.fillTitle(title)
    await this.fillDescription(description)
    await this.fillTime(time)
    if (calories) {
      await this.fillCalories(calories)
    }
    await this.selectCategory(category)
    await this.addIngredient(ingredientName, ingredientAmount)
    await this.fillInstructions(instructions)
  }

  getErrorMessagesTexts(): Promise<string[]> {
    return this.errorMessages.allTextContents()
  }
}
