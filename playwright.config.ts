import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration.
 *
 * The same user journeys covered by the Cypress suite are re-implemented here
 * and run across three engines — Chromium, Firefox and WebKit — to catch
 * browser-specific rendering and behaviour differences.
 */
export default defineConfig({
  testDir: "./playwright/tests",
  fullyParallel: true,

  // Fail the CI build if test.only is accidentally committed.
  forbidOnly: !!process.env.CI,

  // Retry flaky tests in CI only; surface failures immediately in local runs.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["list"],
  ],

  use: {
    baseURL: "https://www.saucedemo.com",

    // Capture just enough to diagnose a failure, not so much it bloats CI.
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    testIdAttribute: "data-test",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: "setup",
      testDir: "./playwright",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
