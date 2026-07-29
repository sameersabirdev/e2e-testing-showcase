const inventoryPage = require("../pages/InventoryPage");
const cartPage = require("../pages/CartPage");
const checkoutPage = require("../pages/CheckoutPage");

describe("Checkout", () => {
  let checkout;

  before(() => {
    cy.fixture("checkout").then((data) => {
      checkout = data;
    });
  });

  beforeEach(() => {
    cy.loginBySession("standard_user", "secret_sauce");
  });

  it("completes an end-to-end purchase", () => {
    inventoryPage.addProduct(checkout.products.backpack);
    inventoryPage.addProduct(checkout.products.bikeLight);
    inventoryPage.goToCart();

    cartPage.assertItemCount(2);
    cartPage.checkout();

    checkoutPage.fillCustomerInfo(checkout.validCustomer).continue();

    // Business-logic check: the total must equal subtotal plus tax.
    checkoutPage.assertTotalsAreConsistent();

    checkoutPage.finish();
    checkoutPage.assertOrderComplete();
  });

  it("blocks checkout when the postal code is missing", () => {
    inventoryPage.addProduct(checkout.products.backpack);
    inventoryPage.goToCart();
    cartPage.checkout();

    checkoutPage
      .fillCustomerInfo({
        firstName: checkout.validCustomer.firstName,
        lastName: checkout.validCustomer.lastName,
      })
      .continue();

    checkoutPage.assertErrorContains("Postal Code is required");
  });
});
