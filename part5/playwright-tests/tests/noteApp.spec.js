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
});
