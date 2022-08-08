import { WebPage } from './webPage'
import { BrowserContext, expect, Locator, Page } from '@playwright/test'
import { MetamaskPage } from './metamaskPage'

export class SwapTradePage extends WebPage {
  readonly metamaskPage: MetamaskPage;
  readonly firstTokenDropdown: Locator;
  readonly secondTokenDropdown: Locator;
  readonly firstTokenAmountInput: Locator;
  readonly secondTokenAmountInput: Locator;
  readonly swapTittle: Locator;
  readonly gearButton: Locator;
  readonly currencyReplaceArrow: Locator;
  readonly currentRateField: Locator;
  readonly enterAnAmountButton: Locator;
  readonly swapButton: Locator;
  readonly confirmSwapButton: string;
  readonly rejectTransactionPopUp: Locator;
  readonly transactionSubmittedPopUpText: Locator;

  transactionSubmittedText = 'Transaction Submitted';
  rejectTransactionPopUpText = 'Error Occurred';
  enterAnAmountButtonText = 'Enter an amount';

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.firstTokenDropdown = page.locator(`[data-testid="chooseTokenDropdown"] >> nth=0`);
    this.secondTokenDropdown = page.locator(`[data-testid="chooseTokenDropdown"] >> nth=1`);
    this.firstTokenAmountInput = page.locator(`[data-testid="token-amount-input"] >> nth=0`);
    this.secondTokenAmountInput = page.locator(`[data-testid="token-amount-input"] >> nth=1`);
    this.swapTittle = page.locator(`[data-testid="swapTitle"]`);
    this.gearButton = page.locator(`[data-testid="open-settings-button"]`);
    this.currencyReplaceArrow = page.locator(`[data-testid="currencyReplace"]`);
    this.currentRateField = page.locator(`[data-testid="currentRate"]`);
    this.enterAnAmountButton = page.locator(`[data-testid="swap-button"] >> text=${this.enterAnAmountButtonText}`);
    this.swapButton = page.locator(`[data-testid="swap-button"]`);
    this.confirmSwapButton = (`[data-testid="confirm-swap"]`);
    this.rejectTransactionPopUp = page.locator(`[data-testid="TransactionPopup"] >> text=${this.rejectTransactionPopUpText}`);
    this.transactionSubmittedPopUpText = page.locator(`text=${this.transactionSubmittedText}`);
  }

  //Assertions
  async checkSwapTittleIsVisible() {
    await expect(this.swapTittle).toBeVisible();
  }

  async checkGearButtonIsVisible() {
    await expect(this.gearButton).toBeVisible();
  }

  async checkFirstTokenAmountInputIsVisible() {
    await expect(this.firstTokenAmountInput).toBeVisible();
  }

  async checkSecondTokenAmountInputIsVisible() {
    await expect(this.secondTokenAmountInput).toBeVisible();
  }

  async checkCurrencyReplaceArrowIsVisible() {
    await expect(this.currencyReplaceArrow).toBeVisible();
  }

  async checkCurrentRateFieldIsVisible() {
    await expect(this.currentRateField).toBeVisible();
  }

  async checkEnterAnAmountButtonIsDisabled() {
    await expect(this.enterAnAmountButton).toBeVisible();
    await expect(this.enterAnAmountButton).toBeDisabled();
  }

  //Actions
  async clickFirstTokenDropdown() {
    await this.firstTokenDropdown.click();
  }

  async clickSecondTokenDropdown() {
    await this.secondTokenDropdown.click();
  }

  async fillFirstTokenAmountInput(value) {
    await this.firstTokenAmountInput.fill(value);
  }

  async fillSecondTokenAmountInput(value) {
    await this.secondTokenAmountInput.fill(value);
  }

  async clickSwapButton() {
    await this.swapButton.click();
  }

  async confirmSwapViaMetamask() {
    const confirmMetamaskPopUp = await this.openNewPageByClick(this.page, this.confirmSwapButton);
    await confirmMetamaskPopUp.click(this.metamaskPage.confirmMetamaskPopUpButton);
    await this.page.waitForTimeout(12000);
  }

  async rejectSwapViaMetamask() {
    const confirmMetamaskPopUp = await this.openNewPageByClick(this.page, this.confirmSwapButton);
    await confirmMetamaskPopUp.click(this.metamaskPage.rejectButton);
  }

  async clickAuthorizeSecurityToken(token) {
    await this.page.waitForTimeout(2000);
    await this.page.click(`button >> text=Authorize ${token}`);
  }
}
