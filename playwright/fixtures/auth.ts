import { test as base, type Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "./test-data";

interface AuthFixtures {
  loggedInPage: Page;
}

/**
 * Extends Playwright's base test with a `loggedInPage` fixture: it performs a
 * standard-user login before the test body runs, so inventory / cart / checkout
 * specs start already authenticated without repeating the login steps.
 *
 * For a larger suite this would be upgraded to a `storageState` setup project
 * that authenticates once and reuses the saved cookies across all workers.
 */
export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await page.waitForURL(/inventory\.html/);
    await use(page);
  },
});

export { expect } from "@playwright/test";
