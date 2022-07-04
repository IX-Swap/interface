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
  readonly removePoolButton: Locator;
  readonly confirmRemovePoolButton: string;
  readonly quarterRemovePercentageButton: Locator;
  readonly halfRemovePercentageButton: Locator;
  readonly halfAndQuarterRemovePercentageButton: Locator;

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
    this.quarterRemovePercentageButton = page.locator('[data-testid="percentage_25"]');
    this.halfRemovePercentageButton = page.locator('[data-testid="percentage_50"]');
    this.halfAndQuarterRemovePercentageButton = page.locator('[data-testid="percentage_75"]');
    this.maxRemovePercentageButton = page.locator('[data-testid="percentage_100"]');
    this.approveRemovePoolButton = ('[data-testid="approve-currency-a-remove"]');
    this.removePoolButton = page.locator('[data-testid="approve-currency-b-remove"]');
    this.confirmRemovePoolButton = ('[data-testid="confirm-remove"]');
  }

  async clickQuarterRemovePercentageButton() {
    await this.quarterRemovePercentageButton.click();
  }

  async clickHalfRemovePercentageButton() {
    await this.halfRemovePercentageButton.click();
  }

  async clickHalfAndQuarterRemovePercentageButton() {
    await this.halfAndQuarterRemovePercentageButton.click();
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

  async clickRemovePoolButton() {
    await this.removePoolButton.click();
  }
/* openNewPageByClick isn't working from pageObject
  async removeCreatedLiqudityPool(page) {
    await this.clickIsxEthPoolDetailsDropdown();
    await this.clickRemoveLiquidityButton();
    await this.clickMaxRemovePercentageButton();
    const approveMetamaskPopUp = await this.openNewPageByClick(page, this.approveRemovePoolButton);
    await approveMetamaskPopUp.click(this.metamaskPage.signButton);
    await this.clickRemovePoolButton();
    const confirmMetamaskPopUp = await this.openNewPageByClick(page, this.confirmRemovePoolButton);
    await confirmMetamaskPopUp.click(this.metamaskPage.connectMetamaskPopUpButton);
    await this.clickTransactionSubmittedPopUpCloseButton();
  }
 */
}
