export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '#email';
    this.password = '#password';
    this.loginButton = 'button[type="submit"]'
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginButton)
  }
}