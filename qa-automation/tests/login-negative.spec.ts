import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

const invalidLogins = [
  { email: "wrong@example.com", password: "Foodies2025!" },
  { email: "goit@gmail.com", password: "wrongpass" },
];

test.describe("Валідація форми логіну", () => {
  for (const { email, password } of invalidLogins) {
    test(`логін не проходить: ${email}`, async ({ page }, testInfo) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.emailInput.fill(email);
      await loginPage.password.fill(password);
      await loginPage.loginButton.click();

      await expect(page).toHaveURL("/auth/login");
      console.log(`Файл login-negative.spec.ts виконується у воркері №${testInfo.workerIndex}`);
    });
  }
});
