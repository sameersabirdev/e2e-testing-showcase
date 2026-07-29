import { test as base, type Page } from "@playwright/test";

interface AuthFixtures {
  loggedInPage: Page;
}

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    await page.goto("/inventory.html");
    await page.waitForURL(/inventory\.html/);
    await use(page);
  },
});

export { expect } from "@playwright/test";
