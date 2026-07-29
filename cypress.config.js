const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",

    // Deterministic runs: retry a flaky test twice in CI before failing the build,
    // but never in interactive mode, so local failures surface immediately.
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Artifacts that make a CI failure diagnosable without re-running locally.
    video: true,
    screenshotOnRunFailure: true,

    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
    },

    setupNodeEvents(on, config) {
      // Hook point for plugins (e.g. accessibility, visual regression, DB seeding).
      return config;
    },
  },
});
