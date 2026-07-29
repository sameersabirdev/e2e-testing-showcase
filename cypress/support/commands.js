/**
 * Custom commands.
 *
 * loginViaUi is used by the login specs themselves. loginBySession is used by
 * every *other* spec: it authenticates once, caches the browser session, and
 * restores it on subsequent tests instead of clicking through the login form
 * every time. On a suite this size that difference is small; on a real suite of
 * hundreds of tests it saves minutes per run.
 */

Cypress.Commands.add("loginViaUi", (username, password) => {
  cy.visit("/");
  cy.get("[data-test='username']").clear().type(username);
  cy.get("[data-test='password']").clear().type(password, { log: false });
  cy.get("[data-test='login-button']").click();
  cy.url().should("include", "/inventory.html");
});

Cypress.Commands.add("loginBySession", (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.visit("/");
      cy.get("[data-test='username']").clear().type(username);
      cy.get("[data-test='password']").clear().type(password, { log: false });
      cy.get("[data-test='login-button']").click();
      cy.url().should("include", "/inventory.html");
    },
    {
      validate() {
        // Confirm the cached session is still valid before reusing it.
        cy.visit("/inventory.html");
        cy.url().should("include", "/inventory.html");
      },
      cacheAcrossSpecs: true,
    }
  );
});
