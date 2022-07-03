import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';
import {MetamaskPage} from "./metamaskPage";

export class LiquidityPoolsPage extends WebPage {
  readonly metamaskPage: MetamaskPage;
  readonly addLiquidityButton: Locator;
  readonly firstAmountOfTokensField: Locator;
  readonly chooseFirstTokenDropdown: Locator;
  readonly chooseSecondTokenDropdown: Locator;
  readonly ethTokenItem: Locator;
  readonly ixsTokenItem: Locator;
  readonly supplyButton: Locator;
  readonly confirmSupplyButton: string;
  readonly transactionSubmittedPopUpCloseButton: Locator;
  readonly isxEthPoolDetailsDropdown: Locator;
  readonly removeLiquidityButton: Locator;
  readonly maxRemovePercentageButton: Locator;
  readonly approveRemovePoolButton: string;
  readonly confirmRemovePoolButton: string;

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
    this.isxEthPoolDetailsDropdown = page.locator('text=IXS/ETHM >> [data-testid="openTable"]');
    this.removeLiquidityButton = page.locator('[data-testid="remove-liquidity"]');
    this.maxRemovePercentageButton = page.locator('[data-testid="percentage_100"]');
    this.approveRemovePoolButton = ('[data-testid="approve-currency-a-remove"]');
    this.confirmRemovePoolButton = ('[data-testid="confirm-remove"]');
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
    await this.firstAmountOfTokensField.fill(value);
  }

  async clickIsxEthPoolDetailsDropdown() {
    await this.isxEthPoolDetailsDropdown.click();
  }

  async clickRemoveLiquidityButton() {
    await this.removeLiquidityButton.click();
  }

  async clickMaxRemovePercentageButton() {
    await this.maxRemovePercentageButton.click();
  }

  async removeCreatedLiqudityPool(page) {
    await this.clickIsxEthPoolDetailsDropdown();
    await this.clickRemoveLiquidityButton();
    await this.clickMaxRemovePercentageButton();
    const metamaskPopUp = await this.openNewPageByClick(page, this.approveRemovePoolButton);
    await metamaskPopUp.click(this.metamaskPage.connectMetamaskPopUpButton);
    const metamaskPopUp2 = await this.openNewPageByClick(page, this.confirmRemovePoolButton);
    await metamaskPopUp2.click(this.metamaskPage.connectMetamaskPopUpButton);
    await this.clickTransactionSubmittedPopUpCloseButton();
  }
}
