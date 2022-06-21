import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';

export class KycScreen extends WebPage {
  readonly passKycAsIndividualButton: Locator;
  readonly nameField: Locator;
  readonly lastNameField: Locator;
  readonly emailAddressField: Locator;
  readonly submitFormButton: Locator;
  readonly invalidEmailError: Locator;

  invalidEmailErrorText = 'Invalid email';

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.passKycAsIndividualButton = page.locator('[href="#/kyc/individual"]');
    this.nameField = page.locator('(//input)[1]');
    this.lastNameField = page.locator('(//input)[2]');
    this.emailAddressField = page.locator('(//input)[9]');
    this.submitFormButton = page.locator('button[type="submit"]');
    this.invalidEmailError = page.locator(`text="${this.invalidEmailErrorText}"`)
  }
}
