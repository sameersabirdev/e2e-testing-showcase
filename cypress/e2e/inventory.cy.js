const inventoryPage = require("../pages/InventoryPage");

describe("Product inventory", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    // Reuse a cached session instead of re-logging-in through the UI each test.
    cy.loginBySession("standard_user", "secret_sauce");
    cy.visit("/inventory.html");
  });

  it("displays the full product catalogue", () => {
    inventoryPage.assertLoaded();
    inventoryPage.elements.inventoryItems().should("have.length", 6);
  });

  it("sorts products by price, low to high", () => {
    inventoryPage.sortBy("lohi");
    inventoryPage.elements.itemPrices().then(($prices) => {
      const prices = [...$prices].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it("sorts products by name, Z to A", () => {
    inventoryPage.sortBy("za");
    inventoryPage.elements.inventoryItems().then(($items) => {
      const names = [...$items].map((el) =>
        el.querySelector(".inventory_item_name").innerText
      );
      const sorted = [...names].sort().reverse();
      expect(names).to.deep.equal(sorted);
    });
  });

  it("adds an item and reflects it in the cart badge", () => {
    inventoryPage.addProduct("Sauce Labs Backpack");
    inventoryPage.assertCartCount(1);
  });

  it("removes an item and clears the cart badge", () => {
    inventoryPage.addProduct("Sauce Labs Backpack");
    inventoryPage.assertCartCount(1);
    inventoryPage.removeButton("Sauce Labs Backpack").click();
    inventoryPage.assertCartCount(0);
  });
});
