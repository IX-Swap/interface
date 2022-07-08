import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class TopNavigationBar extends WebPage {
  readonly farmingLink: Locator;
  readonly liquidityPoolsPage: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.farmingLink = page.locator('#farming-nav-link')
    this.liquidityPoolsPage = page.locator('')
  }
}
