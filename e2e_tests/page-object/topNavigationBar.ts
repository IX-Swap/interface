import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class TopNavigationBar extends WebPage {
  readonly farmingButton: Locator;
  readonly liquidityPoolsButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.farmingButton = page.locator('#farming-nav-link')
    this.liquidityPoolsButton = page.locator('[data-testid="liquidityPoolsButton"]')
  }

  async clickLiquidityPoolsButton() {
    await this.liquidityPoolsButton.click();
  }
}
