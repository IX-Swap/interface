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
    this.enterAnAmountButton = page.locator(`[data-testid="swap-button"] >> text='Enter an amount'`);
    this.swapButton = page.locator(`[data-testid="swap-button"]`);
    this.confirmSwapButton = (`[data-testid="confirm-swap"]`);
    this.rejectTransactionPopUp = page.locator(`[data-testid="TransactionPopup"] >> text='Error Occurred'`);
    this.transactionSubmittedPopUpText = page.locator(`text=${this.transactionSubmittedText}`);
  }

  transactionSubmittedText = 'Transaction Submitted';

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
    await this.page.waitForTimeout(10000);
  }

  async rejectSwapViaMetamask() {
    const confirmMetamaskPopUp = await this.openNewPageByClick(this.page, this.confirmSwapButton);
    await confirmMetamaskPopUp.click(this.metamaskPage.rejectButton);
  }

  async getRandomTokenId(array) {
    return Math.floor(Math.random() * array.length)
  }

  async getRandomTokenIdWithExclusion(array, indexToExclude) {
      let rand = null;

      while(rand === null || rand === indexToExclude){
        rand = Math.round(Math.random() * (array.length - 1));
      }

      return rand
  }

  async clickAuthorizeSecurityToken(token) {
    await this.page.click(`button >> text=Authorize ${token}`);
  }
}
