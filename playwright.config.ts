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
  workers: process.env.CI ? 2 : undefined,

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

    actionTimeout: 10_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
