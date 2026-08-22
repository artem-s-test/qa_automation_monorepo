import { test, expect } from "@playwright/test";
import { API_BASE_URL } from "../../data/config";

test.use({ baseURL: API_BASE_URL });

let accessToken: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post("auth/login", {
    data: {
      email: "goit@gmail.com",
      password: "Foodies2025!",
    },
  });
  expect(response.ok()).toBeTruthy();
  const loginData = await response.json();
  accessToken = loginData.data.accessToken;
});

test("GET /recipes returns list", async ({ request }) => {
  const response = await request.get("recipes");
  // expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const headers = response.headers()
  expect(headers['content-type']).toContain('application/json')
  const getRecipesBody = await response.json();
  expect(getRecipesBody.message).toEqual("Successfully found recipes!");
  const recipeBody = getRecipesBody.data.data;
  expect(Array.isArray(recipeBody)).toBeTruthy();
  console.log(await response.json());
  expect(recipeBody.length).toBeGreaterThan(0);
  recipeBody.forEach((recipe) => {
    expect(recipe).toHaveProperty("title");
  });
  expect(getRecipesBody.data.page).toEqual(1);
});

test("POST /auth/login returns token", async ({ request }) => {
  const response = await request.post("auth/login", {
    data: {
      email: "goit@gmail.com",
      password: "Foodies2025!",
    },
  });
  expect(response.ok()).toBeTruthy();
  const respData = await response.json();
  expect(respData.data.accessToken).toBeTruthy();
});

test("POST /auth/login returns error if password is improper", async ({ request }) => {
  const response = await request.post("auth/login", {
    data: {
      email: "goit@gmail.com",
      password: "wrong342423",
    },
  });
  console.log(JSON.stringify((await response.json())));
  expect(response.status()).toEqual(401);
});

test("POST /recipes creates new recipe", async ({ request }) => {
  const newRecipeData = {
    title: "Борщ",
    description:
      "Класичний український суп на основі буряка з овочами та м'ясом.",
    category: "Dinner",
    area: "Ukraine",
    time: "60 minutes",
    calories: 320,
    instructions:
      "1. Наріжте овочі. 2. Обсмажте буряк і моркву. 3. Варіть у бульйоні 40 хвилин.",
    ingredients: [{ id: "640c2dd963a319ea671e383b", measure: "300 g" }],
  };

  const postRecipeResponse = await request.post("recipes", {
    data: newRecipeData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  expect(postRecipeResponse.status()).toBe(201);
  const postRecipeData = await postRecipeResponse.json();
  expect(postRecipeData.message).toBe("Successfully created a recipe!");

  const createdRecipe = postRecipeData.data;
  expect(createdRecipe.id).toBeTruthy();
  expect(createdRecipe.title).toBe(newRecipeData.title);
  expect(createdRecipe.description).toBe(newRecipeData.description);
  expect(createdRecipe.category).toBe(newRecipeData.category);
  expect(createdRecipe.area).toBe(newRecipeData.area);
  expect(createdRecipe.time).toBe(newRecipeData.time);
  expect(createdRecipe.calories).toBe(newRecipeData.calories);
  expect(createdRecipe.instructions).toBe(newRecipeData.instructions);
  expect(createdRecipe.ingredients).toHaveLength(1);
  expect(createdRecipe.ingredients[0].id).toBe(newRecipeData.ingredients[0].id);
  expect(createdRecipe.ingredients[0].measure).toBe(
    newRecipeData.ingredients[0].measure,
  );

  const getRecipeResponse = await request.get(`recipes/${createdRecipe.id}`);
  const getRecipeBody = await getRecipeResponse.json();
  const recipeData = getRecipeBody.data;
  expect(recipeData.id).toBeTruthy();
  expect(recipeData.title).toBe(newRecipeData.title);
  expect(recipeData.description).toBe(newRecipeData.description);
  expect(recipeData.category).toBe(newRecipeData.category);
  expect(recipeData.area).toBe(newRecipeData.area);
  expect(recipeData.time).toBe(newRecipeData.time);
  expect(recipeData.calories).toBe(newRecipeData.calories);
  expect(recipeData.instructions).toBe(newRecipeData.instructions);
  expect(recipeData.ingredients).toHaveLength(1);
  expect(recipeData.ingredients[0].id).toBe(newRecipeData.ingredients[0].id);
  expect(recipeData.ingredients[0].measure).toBe(
    newRecipeData.ingredients[0].measure,
  );
});
