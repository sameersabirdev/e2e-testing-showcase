Cypress.Commands.add("loginViaUi", (username, password) => {
  cy.visit("/");
  cy.get("[data-test='username']").clear().type(username);
  cy.get("[data-test='password']").clear().type(password, { log: false });
  cy.get("[data-test='login-button']").click();
  cy.url().should("include", "/inventory.html");
});

Cypress.Commands.add("loginBySession", (username, password) => {
  cy.visit("/");
  cy.get("[data-test='username']").clear().type(username);
  cy.get("[data-test='password']").clear().type(password, { log: false });
  cy.get("[data-test='login-button']").click();
  cy.url().should("include", "/inventory.html");
});
