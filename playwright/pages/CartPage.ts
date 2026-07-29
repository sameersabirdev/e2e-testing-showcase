import { type Page, type Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.itemNames = page.locator(".inventory_item_name");
    this.checkoutButton = page.getByTestId("checkout");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectContains(productName: string): Promise<void> {
    await expect(this.itemNames.filter({ hasText: productName })).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
