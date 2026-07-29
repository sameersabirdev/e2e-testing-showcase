import { type Page, type Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId("inventory-container");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.itemPrices = page.locator(".inventory_item_price");
  }

  private slug(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, "-");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addProduct(productName: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${this.slug(productName)}`).click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.page.getByTestId(`remove-${this.slug(productName)}`).click();
  }

  async expectCartCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allInnerTexts();
    return texts.map((t) => parseFloat(t.replace("$", "")));
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
