import { Page, Locator } from '@playwright/test'

export class LoginPage {
  #emailInput: string
  #password: string
  #loginButton: Locator
  page: Page

  constructor(page: Page) {
    this.page = page;
    this.#emailInput = '#email';
    this.#password = '#password';
    this.#loginButton = page.locator('button[type="submit"]')
  }

  #fillField(selector: string, value: string){
    return this.page.fill(selector, value)
  }
  async login(email: string, password: string): Promise<void> {
    await this.#fillField(this.#emailInput, email)
    await this.#fillField(this.#password, password)
    await this.#loginButton.click()
  }
}