const { test, beforeEach, expect, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

    test("Displays the login form", async ({ page }) => {
      const headingLocator = page.getByRole("heading", { name: "Login" });
      const buttonLocator = page.getByRole("button", { name: "login" });
      await expect(headingLocator).toBeVisible();
      await expect(buttonLocator).toBeVisible();
    });

  test("Allows user to log in successfully", async ({ page }) => {
    await page.getByTestId("username").fill("test-user");
    await page.getByTestId("password").fill("test123");
    await page.getByRole("button", { name: "login" }).click();

    const blogHeader = page.locator('[data-testid="blogs-header"]');
    const userHasLoggedIn = page.locator('[data-testid="user-has-logged-in"]');
    await expect(blogHeader).toBeVisible();
    await expect(userHasLoggedIn).toBeVisible();
  });

  // TODO: Improve test for notification visibility
  // Had a hard time testing the Notification component that outputs a message when login is unsuccessful
  test("User fails to log in", async ({ page }) => {
    await page.getByTestId("username").fill("test-user");
    await page.getByTestId("password").fill("123test");
    await page.getByRole("button", { name: "login" }).click();

    const loginHeader = page.locator('[data-testid="login-header"]');
    await expect(loginHeader).toBeVisible();
  });
});
