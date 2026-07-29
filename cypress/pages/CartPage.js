/**
 * Page Object for the shopping cart.
 */
class CartPage {
  elements = {
    cartItems: () => cy.get(".cart_item"),
    itemNames: () => cy.get(".inventory_item_name"),
    checkoutButton: () => cy.get("[data-test='checkout']"),
    continueShoppingButton: () => cy.get("[data-test='continue-shopping']"),
  };

  assertItemCount(count) {
    this.elements.cartItems().should("have.length", count);
    return this;
  }

  assertContains(productName) {
    this.elements.itemNames().should("contain.text", productName);
    return this;
  }

  checkout() {
    this.elements.checkoutButton().click();
    return this;
  }
}

module.exports = new CartPage();
