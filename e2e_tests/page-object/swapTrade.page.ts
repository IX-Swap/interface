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
  }

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
}
