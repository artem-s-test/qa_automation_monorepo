export class LoginPage {
  #emailInput
  #password
  #loginButton
  constructor(page) {
    this.page = page;
    this.#emailInput = '#email';
    this.#password = '#password';
    this.#loginButton = page.locator('button[type="submit"]')
  }

  #fillField(selector, value){
    return this.page.fill(selector, value)
  }
  async login(email, password) {
    await this.#fillField(this.#emailInput, email)
    await this.#fillField(this.#password, password)
    await this.#loginButton.click()
  }
}