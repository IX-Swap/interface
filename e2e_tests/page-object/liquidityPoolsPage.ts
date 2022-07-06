import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';
import { expect } from '@playwright/test'

export class LiquidityPoolsPage extends WebPage {
  readonly addLiquidityButton: Locator;
  readonly firstAmountOfTokensField: Locator;
  readonly secondAmountOfTokensField: Locator;
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
  readonly addNewAmountToliqudityPoolButton: Locator;
  readonly transactionSubmittedPopUpText: Locator;
  readonly waitingForConfirmationPopUpText: Locator;
  readonly createdIsxEthPool: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.addLiquidityButton = page.locator('[data-testid="add-liquidity"]');
    this.firstAmountOfTokensField = page.locator('#add-liquidity-input-tokena >> [type="text"]');
    this.secondAmountOfTokensField = page.locator('#add-liquidity-input-tokenb >> [type="text"]');
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
    this.addNewAmountToliqudityPoolButton = page.locator('[data-testid="add-to-liquidity"]');
    this.transactionSubmittedPopUpText = page.locator('text=Transaction Submitted');
    this.waitingForConfirmationPopUpText = page.locator('text=Waiting For Confirmation');
    this.createdIsxEthPool = page.locator('//span[text()="My Liquidity"]//following::div[text()="IXS/ETH"]');
  }

  // Assertions
  async isTransactionSubmittedPopUpTextShown() {
    await expect(this.transactionSubmittedPopUpText).toBeVisible();
  }

  async isWaitingForConfirmationPopUpTextShown() {
    await expect(this.waitingForConfirmationPopUpText).toBeVisible();
  }

  async isConfirmSupplyButtonVisible() {
    await expect(this.page.locator(this.confirmSupplyButton)).toBeVisible();
  }

  async isEthAmountThatWillBeReceivedShown(amount) {
    await expect(this.page.locator(`text=${amount} >> nth=1`)).toBeVisible();
  }

  async isCreatedIsxEthPoolShown() {
    await expect(this.createdIsxEthPool).toBeVisible();
  }

  // Actions
  async clickTokenItem(token) {
    await this.page.locator(`//div[text()='${token}']`).click();
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

  async clickSupplyButton() {
    await this.supplyButton.click();
  }

  async clickTransactionSubmittedPopUpCloseButton() {
    await this.transactionSubmittedPopUpCloseButton.click();
  }

  async fillFirstAmountOfTokensField(value) {
    await this.firstAmountOfTokensField.fill(value);
  }

  async fillSecondAmountOfTokensField(value) {
    await this.secondAmountOfTokensField.fill(value);
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

  async clickAddNewAmountToliqudityPoolButton() {
    await this.addNewAmountToliqudityPoolButton.click();
  }

  async removeCreatedLiqudityPool(page, pageObject) {
    await this.clickIsxEthPoolDetailsDropdown();
    await this.clickRemoveLiquidityButton();
    await this.clickMaxRemovePercentageButton();

    const approveMetamaskPopUp = await this.openNewPageByClick(page, this.approveRemovePoolButton);
    await approveMetamaskPopUp.click(pageObject.signButton);

    await this.clickRemovePoolButton();

    const confirmMetamaskPopUp = await this.openNewPageByClick(page, this.confirmRemovePoolButton);
    await confirmMetamaskPopUp.click(pageObject.connectMetamaskPopUpButton);

    await this.clickTransactionSubmittedPopUpCloseButton();
  }

  async createLiqudityPoolWithDefinedAmountOfEth(page, pageObject, ethAmount, firstToken, secondToken) {
    await this.clickAddLiquidityButton();
    await this.clickChooseFirstTokenDropdown();
    await this.clickTokenItem(firstToken);
    await this.fillFirstAmountOfTokensField(ethAmount);
    await this.clickChooseSecondTokenDropdown() ;
    await this.clickTokenItem(secondToken);

    await this.clickSupplyButton();

    const metamaskPopUp = await this.openNewPageByClick(page, this.confirmSupplyButton);
    await metamaskPopUp.click(pageObject.connectMetamaskPopUpButton);

    await this.clickTransactionSubmittedPopUpCloseButton();
  }
}
