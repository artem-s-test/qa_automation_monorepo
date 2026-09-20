import { Page, Locator } from '@playwright/test'

export class LoginPage {
  emailInput: Locator
  password: Locator
  loginButton: Locator
  page: Page

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.password = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]')
  }

  async open() {
    await this.page.goto('/auth/login')
  }
  
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email)
    await this.password.fill(password)
    await this.loginButton.click()
    await this.page.waitForURL('/')
  }
}