import { test, expect } from "@playwright/test";

test("page.route() перехоплює запит до того, як він піде на сервер", async ({
  page,
}) => {
  await page.route("**/api/recipes**", async (route) => {
    // обробник виконується до того, як запит іде на реальний сервер
    await route.continue();
  });

  await page.goto("/");
  await expect(page.locator("article").first()).toBeVisible();
});

test("порожній список рецептів", async ({ page }) => {
  await page.route("**/api/recipes?**", async (route) => {
    await route.fulfill({
      json: {
        status: 200,
        message: "No recipes found matching your criteria.",
        data: {
          data: [],
          page: 1,
          perPage: 12,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      },
    });
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Recipes" })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(0);
});

test("застосунок показує повідомлення про помилку при 500 від сервера", async ({
  page,
}) => {
  await page.route("**/api/recipes?**", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ message: "Internal Server Error" }),
    });
  });

  await page.goto("/");
  await expect(
    page.getByText("Error loading recipes: Unknown error"),
  ).toBeVisible();
});

test("лише GET-запити на /api/recipes підміняються мокованими даними", async ({
  page,
}) => {
  const mockedRecipes = [{ id: 1, title: "Мокований рецепт" }];

  await page.route("**/api/recipes?**", async (route) => {
    if (route.request().method() !== "GET") {
      await route.continue();
      return;
    }

    await route.fulfill({
      json: {
        status: 200,
        message: "Successfully found recipes!",
        data: {
          data: mockedRecipes,
          page: 1,
          perPage: 12,
          totalItems: mockedRecipes.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      },
    });
  });

  await page.goto("/");
  await expect(page.locator("article")).toHaveCount(1);
  await expect(page.getByText("Мокований рецепт")).toBeVisible();
});

test("запити аналітики скасовуються та не впливають на тест", async ({
  page,
}) => {
  await page.route("**/api/analytics**", (route) => route.abort());

  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Recipes" })).toBeVisible();
});
