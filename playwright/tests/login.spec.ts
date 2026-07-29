import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users, messages } from "../fixtures/test-data";

test.describe("Authentication", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("logs in a standard user and lands on the inventory", async ({
    page,
  }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
  });

  test("rejects a locked-out user with the correct message", async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError(messages.lockedOut);
  });

  test("rejects invalid credentials", async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.expectError(messages.invalidCredentials);
  });

  test("requires a username", async () => {
    await loginPage.login("", users.standard.password);
    await loginPage.expectError(messages.missingUsername);
  });

  test("requires a password", async () => {
    await loginPage.login(users.standard.username, "");
    await loginPage.expectError(messages.missingPassword);
  });
});
