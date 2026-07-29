const loginPage = require("../pages/LoginPage");
const inventoryPage = require("../pages/InventoryPage");

describe("Authentication", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it("logs in a standard user and lands on the inventory", () => {
    loginPage.login(users.standard.username, users.standard.password);
    inventoryPage.assertLoaded();
  });

  it("rejects a locked-out user with the correct message", () => {
    loginPage.login(users.lockedOut.username, users.lockedOut.password);
    loginPage.assertErrorContains("locked out");
  });

  it("rejects invalid credentials", () => {
    loginPage.login(users.invalid.username, users.invalid.password);
    loginPage.assertErrorContains("do not match any user");
  });

  it("requires a username", () => {
    loginPage.login(" ", users.standard.password);
    // Space then cleared leaves the field empty on submit.
    cy.get("[data-test='username']").clear();
    cy.get("[data-test='login-button']").click();
    loginPage.assertErrorContains("Username is required");
  });

  it("requires a password", () => {
    cy.get("[data-test='username']").type(users.standard.username);
    cy.get("[data-test='login-button']").click();
    loginPage.assertErrorContains("Password is required");
  });
});
