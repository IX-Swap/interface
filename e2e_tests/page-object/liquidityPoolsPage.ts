import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class LiquidityPoolsPage extends WebPage {
  readonly addLiquidityButton: Locator;
  readonly firstAmountOfTokensField: Locator;
  readonly chooseFirstTokenDropdown: Locator;
  readonly chooseSecondTokenDropdown: Locator;
  readonly ethTokenItem: Locator;
  readonly ixsTokenItem: Locator;
  readonly supplyButton: Locator;
  readonly confirmSupplyButton: string;
  readonly transactionSubmittedPopUpCloseButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.addLiquidityButton = page.locator('[data-testid="add-liquidity"]');
    this.firstAmountOfTokensField = page.locator('#add-liquidity-input-tokena >> [type="text"]');
    this.chooseFirstTokenDropdown = page.locator('#add-liquidity-input-tokena button:has-text("Choose token")');
    this.chooseSecondTokenDropdown = page.locator('#add-liquidity-input-tokenb button:has-text("Choose token")');
    this.ethTokenItem = page.locator('[title="Ether"]');
    this.ixsTokenItem = page.locator('[title="Ixs Token"]');
    this.supplyButton = page.locator('[data-testid="supply"]');
    this.confirmSupplyButton = ('[data-testid="create-or-supply"]');
    this.transactionSubmittedPopUpCloseButton = page.locator('[data-testid="return-close"]');
  }

  async clickAddLiquidityButton() {
    await this.addLiquidityButton.click();
  }

  async clickChooseFirstTokenDropdown() {
    await this.chooseFirstTokenDropdown.click();
  }

  async clickChooseSecondTokenDropdown() {
    await this.chooseSecondTokenDropdown.click();
  }

  async clickEthTokenItem() {
    await this.ethTokenItem.click();
  }

  async clickIxsTokenItem() {
    await this.ixsTokenItem.click();
  }

  async clickSupplyButton() {
    await this.supplyButton.click();
  }

  async clickTransactionSubmittedPopUpCloseButton() {
    await this.transactionSubmittedPopUpCloseButton.click();
  }

  async fillFirstAmountOfTokensField(value) {
    await this.firstAmountOfTokensField.fill(value)
  }

  async removeCreatedLiqudityPool() {
    // Click text=IXS/ETHM >> [data-testid="openTable"]
    await page2.locator('text=IXS/ETHM >> [data-testid="openTable"]').click();
    // Click [data-testid="remove-liquidity"]
    await page2.locator('[data-testid="remove-liquidity"]').click();
    // assert.equal(page2.url(), 'http://localhost:3000/#/remove/0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2/ETH');
    // Click [data-testid="percentage_100"]
    await page2.locator('[data-testid="percentage_100"]').click();
    // Click [data-testid="approve-currency-a-remove"]
    await page2.locator('[data-testid="approve-currency-a-remove"]').click();
    // Open new page
    const page3 = await context.newPage();
    await page3.goto('chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html');
    // Go to chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction
    await page3.goto('chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction');
    // Go to chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction/4156744718616053/signature-request
    await page3.goto('chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction/4156744718616053/signature-request');
    // Click text=Подписать
    await Promise.all([
      page3.waitForNavigation(/*{ url: 'chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#' }*/),
      page3.locator('text=Подписать').click()
    ]);
    // Close page
    await page3.close();
    // Click [data-testid="approve-currency-b-remove"]
    await page2.locator('[data-testid="approve-currency-b-remove"]').click();
    // Click [data-testid="confirm-remove"]
    await page2.locator('[data-testid="confirm-remove"]').click();
    // Open new page
    const page4 = await context.newPage();
    await page4.goto('chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html');
    // Go to chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction
    await page4.goto('chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction');
    // Go to chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction/4156744718616075/token-method
    await page4.goto('chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#confirm-transaction/4156744718616075/token-method');
    // Click [data-testid="page-container-footer-next"]
    await Promise.all([
      page4.waitForNavigation(/*{ url: 'chrome-extension://pmbfdjmegeilncmapoaopcnafeiafnfk/notification.html#' }*/),
      page4.locator('[data-testid="page-container-footer-next"]').click()
    ]);
    // Close page
    await page4.close();
    // Click [data-testid="return-close"]
    await page2.locator('[data-testid="return-close"]').click();
    // assert.equal(page2.url(), 'http://localhost:3000/#/pool');
  }
}
