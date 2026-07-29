/**
 * Page Object for the product inventory listing.
 */
class InventoryPage {
  elements = {
    inventoryContainer: () => cy.get("[data-test='inventory-container']"),
    inventoryItems: () => cy.get(".inventory_item"),
    cartBadge: () => cy.get("[data-test='shopping-cart-badge']"),
    cartLink: () => cy.get("[data-test='shopping-cart-link']"),
    sortDropdown: () => cy.get("[data-test='product-sort-container']"),
    itemPrices: () => cy.get(".inventory_item_price"),
  };

  // Derive the add/remove button test-id from the product name, mirroring
  // SauceDemo's own dasherised convention (e.g. "Sauce Labs Backpack" ->
  // "add-to-cart-sauce-labs-backpack").
  addToCartButton(productName) {
    const slug = productName.toLowerCase().replace(/\s+/g, "-");
    return cy.get(`[data-test='add-to-cart-${slug}']`);
  }

  removeButton(productName) {
    const slug = productName.toLowerCase().replace(/\s+/g, "-");
    return cy.get(`[data-test='remove-${slug}']`);
  }

  assertLoaded() {
    this.elements.inventoryContainer().should("be.visible");
    cy.url().should("include", "/inventory.html");
    return this;
  }

  addProduct(productName) {
    this.addToCartButton(productName).click();
    return this;
  }

  assertCartCount(count) {
    if (count === 0) {
      this.elements.cartBadge().should("not.exist");
    } else {
      this.elements.cartBadge().should("have.text", String(count));
    }
    return this;
  }

  sortBy(value) {
    this.elements.sortDropdown().select(value);
    return this;
  }

  goToCart() {
    this.elements.cartLink().click();
    return this;
  }
}

module.exports = new InventoryPage();
