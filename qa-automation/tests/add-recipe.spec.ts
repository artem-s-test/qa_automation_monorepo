import { expect } from "@playwright/test";
import { test } from "../fixtures";
import path from "path";
import { RecipeCategory } from "../types/enums";

test.describe("Додавання рецепта", () => {
  test("успішне створення рецепта з усіма полями", async ({
    addRecipePage,
  }, testInfo ) => {
    console.log(`Файл add-recipe.spec.ts виконується у воркері №${testInfo.workerIndex}`);
    await addRecipePage.uploadPhoto(
      path.join(__dirname, "..", "data", "test-photo.png"),
    );
    await addRecipePage.fillTitle(`Test recipe ${Date.now()}`);
    await addRecipePage.fillDescription(
      "A tasty recipe created by an automated test",
    );
    await addRecipePage.fillTime("30");
    await addRecipePage.fillCalories("250");
    await addRecipePage.selectCategory(RecipeCategory.Dessert);
    await addRecipePage.addIngredient("Squid", "200g");
    await addRecipePage.fillInstructions(
      "Mix everything together and cook for 30 minutes",
    );

    await expect(addRecipePage.ingredientRows).toHaveCount(1);
    await expect(addRecipePage.ingredientRows.first()).toContainText("Squid");
    await expect(addRecipePage.ingredientRows.first()).toContainText("200g");

    await addRecipePage.submit();

    await expect(addRecipePage.successToast).toBeVisible();
    await expect(addRecipePage.page).toHaveURL((url) =>
      url.pathname.startsWith("/recipes/"),
    );
  });

  test("форма додавання рецепта відкривається за прямим посиланням", async ({
    addRecipePage,
  }, testInfo) => {
    console.log(`Файл add-recipe.spec.ts виконується у воркері №${testInfo.workerIndex}`);

    await expect(addRecipePage.page.locator("form")).toBeVisible();
  });

  test("форма додавання рецепта містить поля для заповнення", async ({
    addRecipePage,
  }, testInfo) => {
    console.log(`Файл add-recipe.spec.ts виконується у воркері №${testInfo.workerIndex}`);

    await expect(addRecipePage.page.locator("input, textarea")).not.toHaveCount(0);
  });
});
