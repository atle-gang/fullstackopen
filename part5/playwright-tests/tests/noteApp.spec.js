const { test, beforeEach, expect, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

    test("Login form is shown", async ({ page }) => {
      const headingLocator = page.getByRole("heading", { name: "Login" });
      const buttonLocator = page.getByRole("button", { name: "login" });
      await expect(headingLocator).toBeVisible();
      await expect(buttonLocator).toBeVisible();
    });

  test("User can successfully log in", async ({ page }) => {
    await page.getByTestId("username").fill("test-user");
    await page.getByTestId("password").fill("test123");
    await page.getByRole("button", { name: "login" }).click();

    const blogHeader = page.locator('[data-testid="blogs-header"]');
    const userHasLoggedIn = page.locator('[data-testid="user-has-logged-in"]');
    await expect(blogHeader).toBeVisible();
    await expect(userHasLoggedIn).toBeVisible();
  });
});
