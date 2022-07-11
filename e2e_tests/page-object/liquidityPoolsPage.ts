import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class liquidityPoolsPage extends WebPage {
  readonly passKycAsIndividualButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.passKycAsIndividualButton = page.locator('[href="#/kyc/individual"]');

  }
}
