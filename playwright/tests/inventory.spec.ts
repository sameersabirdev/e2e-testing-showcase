import { test, expect } from "../fixtures/auth";
import { InventoryPage } from "../pages/InventoryPage";
import { products } from "../fixtures/test-data";

test.describe("Product inventory", () => {
  test("displays the full product catalogue", async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.expectLoaded();
    await expect(inventory.inventoryItems).toHaveCount(6);
  });

  test("sorts products by price, low to high", async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.sortBy("lohi");
    const prices = await inventory.getPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test("adds an item and reflects it in the cart badge", async ({
    loggedInPage,
  }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addProduct(products.backpack);
    await inventory.expectCartCount(1);
  });

  test("removes an item and clears the cart badge", async ({
    loggedInPage,
  }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addProduct(products.backpack);
    await inventory.expectCartCount(1);
    await inventory.removeProduct(products.backpack);
    await inventory.expectCartCount(0);
  });
});
