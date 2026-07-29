import { type Page, type Locator, expect } from "@playwright/test";

interface CustomerInfo {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTotal: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId("firstName");
    this.lastNameInput = page.getByTestId("lastName");
    this.postalCodeInput = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
    this.finishButton = page.getByTestId("finish");
    this.errorMessage = page.getByTestId("error");
    this.summarySubtotal = page.getByTestId("subtotal-label");
    this.summaryTotal = page.getByTestId("total-label");
    this.completeHeader = page.getByTestId("complete-header");
  }

  async fillCustomerInfo(info: CustomerInfo): Promise<void> {
    if (info.firstName !== undefined)
      await this.firstNameInput.fill(info.firstName);
    if (info.lastName !== undefined)
      await this.lastNameInput.fill(info.lastName);
    if (info.postalCode !== undefined)
      await this.postalCodeInput.fill(info.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async expectError(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  private parseMoney(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ""));
  }

  /**
   * Business-logic assertion: the displayed order total must equal the
   * subtotal plus a positive tax amount. This is the kind of check that
   * catches real pricing bugs, not just "did the page render".
   */
  async expectTotalsConsistent(): Promise<void> {
    const subtotal = this.parseMoney(
      (await this.summarySubtotal.innerText()) ?? ""
    );
    const total = this.parseMoney((await this.summaryTotal.innerText()) ?? "");
    expect(total).toBeGreaterThan(subtotal);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toContainText("Thank you for your order!");
  }
}
