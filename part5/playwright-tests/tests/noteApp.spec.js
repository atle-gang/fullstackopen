const { test, beforeEach, expect, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Test User",
        username: "test-user",
        password: "test123",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Displays the login form", async ({ page }) => {
    const headingLocator = page.getByRole("heading", { name: "Login" });
    const buttonLocator = page.getByRole("button", { name: "login" });
    await expect(headingLocator).toBeVisible();
    await expect(buttonLocator).toBeVisible();
  });

  describe("Login", () => {
    test("Allows user to log in successfully", async ({ page }) => {
      await page.getByTestId("username").fill("test-user");
      await page.getByTestId("password").fill("test123");
      await page.getByRole("button", { name: "login" }).click();

      const blogHeader = page.locator('[data-testid="blogs-header"]');
      const userHasLoggedIn = page.locator(
        '[data-testid="user-has-logged-in"]'
      );
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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("test-user");
      await page.getByTestId("password").fill("test123");
      await page.getByRole("button", { name: "login" }).click();

      // Click 'new button' to open blog form
      await page.getByRole("button", { name: "new blog" }).click();
      // Fill in the form
      await page.getByTestId("title").fill("Title Test");
      await page.getByTestId("author").fill("Author Test");
      await page.getByTestId("url").fill("URL Test");

      // Click 'create' button
      await page.getByRole("button", { name: "create" }).click();
    });

    test("User creates a new blog", async ({ page }) => {
      await expect(
        page.getByText("Title Test by Author Test has been added")
      ).toBeVisible();
    });

    test("User can like a blog", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("User can see the blog's remove button", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();
      const removeBtn = page.getByRole("button", { name: "remove"});
      await expect(removeBtn).toBeVisible();
    }) 
  });
});
