const inventoryPage = require("../pages/InventoryPage");
const cartPage = require("../pages/CartPage");

describe("Shopping cart", () => {
  beforeEach(() => {
    cy.loginBySession("standard_user", "secret_sauce");
  });

  it("carries multiple added items through to the cart", () => {
    inventoryPage.addProduct("Sauce Labs Backpack");
    inventoryPage.addProduct("Sauce Labs Bike Light");
    inventoryPage.assertCartCount(2);

    inventoryPage.goToCart();

    cartPage.assertItemCount(2);
    cartPage.assertContains("Sauce Labs Backpack");
    cartPage.assertContains("Sauce Labs Bike Light");
  });

  it("keeps the cart populated after continuing to shop", () => {
    inventoryPage.addProduct("Sauce Labs Bolt T-Shirt");
    inventoryPage.goToCart();
    cartPage.elements.continueShoppingButton().click();

    // Badge should persist across the navigation.
    inventoryPage.assertCartCount(1);
  });
});
