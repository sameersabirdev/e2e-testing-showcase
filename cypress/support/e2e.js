import "./commands";

// SauceDemo's "problem_user" and "performance_glitch_user" intentionally throw
// client-side errors to simulate a buggy app. We don't want those to fail an
// otherwise-passing assertion, so we ignore uncaught exceptions globally.
// In a real project this would be scoped narrowly rather than applied blanket.
Cypress.on("uncaught:exception", () => false);
