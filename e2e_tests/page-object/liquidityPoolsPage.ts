import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class LiquidityPoolsPage extends WebPage {
  readonly addLiquidityButton: Locator;
  readonly firstAmountOfTokensField: Locator;
  readonly secondAmountOfTokensField: Locator;
  readonly chooseFirstTokenDropdown: Locator;
  readonly chooseSecondTokenDropdown: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.addLiquidityButton = page.locator('[data-testid="add-liquidity"]');
    this.firstAmountOfTokensField = page.locator('[data-testid="add-liquidity"]');
    this.secondAmountOfTokensField = page.locator('[data-testid="add-liquidity"]');
    this.chooseFirstTokenDropdown = page.locator('[data-testid="add-liquidity"]');
    this.chooseSecondTokenDropdown = page.locator('[data-testid="add-liquidity"]');
  }

  async clickAddLiquidityButton() {
    await this.addLiquidityButton.click();
  }
}
