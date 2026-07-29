/**
 * Page Object for the SauceDemo login screen.
 *
 * Selectors live here and nowhere else, so a markup change on the login page
 * is a one-line fix instead of a find-and-replace across every spec.
 */
class LoginPage {
  elements = {
    usernameInput: () => cy.get("[data-test='username']"),
    passwordInput: () => cy.get("[data-test='password']"),
    loginButton: () => cy.get("[data-test='login-button']"),
    errorMessage: () => cy.get("[data-test='error']"),
  };

  visit() {
    cy.visit("/");
    return this;
  }

  login(username, password) {
    this.elements.usernameInput().clear().type(username);
    // Mask the password in the Cypress command log — good hygiene for shared runs.
    this.elements.passwordInput().clear().type(password, { log: false });
    this.elements.loginButton().click();
    return this;
  }

  assertErrorContains(text) {
    this.elements.errorMessage().should("be.visible").and("contain.text", text);
    return this;
  }
}

module.exports = new LoginPage();
