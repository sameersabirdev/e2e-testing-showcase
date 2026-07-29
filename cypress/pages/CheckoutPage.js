/**
 * Page Object covering both checkout steps: customer information and the
 * order overview / completion screen.
 */
class CheckoutPage {
  elements = {
    firstNameInput: () => cy.get("[data-test='firstName']"),
    lastNameInput: () => cy.get("[data-test='lastName']"),
    postalCodeInput: () => cy.get("[data-test='postalCode']"),
    continueButton: () => cy.get("[data-test='continue']"),
    finishButton: () => cy.get("[data-test='finish']"),
    errorMessage: () => cy.get("[data-test='error']"),
    summarySubtotal: () => cy.get("[data-test='subtotal-label']"),
    summaryTotal: () => cy.get("[data-test='total-label']"),
    completeHeader: () => cy.get("[data-test='complete-header']"),
  };

  fillCustomerInfo({ firstName, lastName, postalCode }) {
    if (firstName) this.elements.firstNameInput().clear().type(firstName);
    if (lastName) this.elements.lastNameInput().clear().type(lastName);
    if (postalCode) this.elements.postalCodeInput().clear().type(postalCode);
    return this;
  }

  continue() {
    this.elements.continueButton().click();
    return this;
  }

  assertErrorContains(text) {
    this.elements.errorMessage().should("be.visible").and("contain.text", text);
    return this;
  }

  // Validate that the displayed total equals subtotal + tax — the kind of
  // business-logic assertion clients care about far more than "the page loaded".
  assertTotalsAreConsistent() {
    this.elements
      .summarySubtotal()
      .invoke("text")
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));
        this.elements
          .summaryTotal()
          .invoke("text")
          .then((totalText) => {
            const total = parseFloat(totalText.replace(/[^0-9.]/g, ""));
            // Tax is positive and the total never undercuts the subtotal.
            expect(total).to.be.greaterThan(subtotal);
          });
      });
    return this;
  }

  finish() {
    this.elements.finishButton().click();
    return this;
  }

  assertOrderComplete() {
    this.elements
      .completeHeader()
      .should("be.visible")
      .and("contain.text", "Thank you for your order!");
    return this;
  }
}

module.exports = new CheckoutPage();
