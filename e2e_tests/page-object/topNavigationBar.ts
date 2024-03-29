import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class TopNavigationBar extends WebPage {
  readonly farmingButton: Locator;
  readonly liquidityPoolsButton: Locator;
  readonly swapTradeButton: Locator;
  readonly securityTokensButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.farmingButton = page.locator('#farming-nav-link');
    this.liquidityPoolsButton = page.locator('[id="pool-nav-link"]');
    this.swapTradeButton = page.locator('[data-testid="swap-nav-link"]');
    this.securityTokensButton = page.locator('[data-testid="securityTokensButton"]')
  }

  //Actions
  async clickLiquidityPoolsButton() {
    await this.liquidityPoolsButton.click();
  }

  async clickSwapTradeButton() {
    await this.swapTradeButton.click();
  }

  async clickSecurityTokensButton() {
    await this.securityTokensButton.click();
  }
}
