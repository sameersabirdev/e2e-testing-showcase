import { test } from "../fixtures/auth";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { products, checkoutCustomer } from "../fixtures/test-data";

test.describe("Cart and checkout", () => {
  test("carries multiple items through to the cart", async ({
    loggedInPage,
  }) => {
    const inventory = new InventoryPage(loggedInPage);
    const cart = new CartPage(loggedInPage);

    await inventory.addProduct(products.backpack);
    await inventory.addProduct(products.bikeLight);
    await inventory.expectCartCount(2);

    await inventory.goToCart();
    await cart.expectItemCount(2);
    await cart.expectContains(products.backpack);
    await cart.expectContains(products.bikeLight);
  });

  test("completes an end-to-end purchase", async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    const cart = new CartPage(loggedInPage);
    const checkout = new CheckoutPage(loggedInPage);

    await inventory.addProduct(products.backpack);
    await inventory.addProduct(products.bikeLight);
    await inventory.goToCart();
    await cart.checkout();

    await checkout.fillCustomerInfo(checkoutCustomer);
    await checkout.continue();
    await checkout.expectTotalsConsistent();

    await checkout.finish();
    await checkout.expectOrderComplete();
  });

  test("blocks checkout when the postal code is missing", async ({
    loggedInPage,
  }) => {
    const inventory = new InventoryPage(loggedInPage);
    const cart = new CartPage(loggedInPage);
    const checkout = new CheckoutPage(loggedInPage);

    await inventory.addProduct(products.backpack);
    await inventory.goToCart();
    await cart.checkout();

    await checkout.fillCustomerInfo({
      firstName: checkoutCustomer.firstName,
      lastName: checkoutCustomer.lastName,
    });
    await checkout.continue();
    await checkout.expectError("Postal Code is required");
  });
});
