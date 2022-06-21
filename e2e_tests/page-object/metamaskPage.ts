import {WebPage} from "./webPage";
import {Locator, Page, BrowserContext, expect} from '@playwright/test';

export class MetamaskPage extends WebPage{
  readonly context: BrowserContext;
  readonly nextButton: Locator;
  readonly iAmNewButton: Locator;
  readonly passwordFieldTest: Locator;
  readonly confirmPasswordField: Locator;
  readonly termsCheckbox: Locator;
  readonly confirmButton: Locator;
  readonly passwordField: Locator;
  readonly secretWord: Locator;
  readonly createNewWalletCheckbox: Locator;
  readonly closeInfoPopUp: Locator;
  readonly cancelOperationButton: Locator;
  readonly declineButton: string;
  readonly nextMetamaskPopUpButton: string;
  readonly connectMetamaskPopUpButton: string;
  readonly signMetamaskRequestPopUpButton: string;
  readonly copyMetamaskAccountAddressButton: Locator;
  readonly optionMenuButton: Locator;
  readonly accountDetailsMenuButton: Locator;
  readonly endOfFlowEmoji: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page);
    this.context = context;
    this.confirmButton = page.locator('button');
    this.nextButton = page.locator('(//button)[1]');
    this.iAmNewButton = this.nextButton;
    this.passwordFieldTest = page.locator('#create-password');
    this.confirmPasswordField = page.locator('#confirm-password');
    this.termsCheckbox = page.locator('[role="checkbox"]');
    this.passwordField = page.locator('#password');
    this.secretWord = page.locator('[class="import-srp__srp"] input[type="password"]');
    this.createNewWalletCheckbox = page.locator('#create-new-vault__terms-checkbox');
    this.closeInfoPopUp = page.locator('[data-testid="popover-close"]');
    this.cancelOperationButton = page.locator('[class="button btn--rounded btn-secondary"]');
    this.declineButton = ('[class="button btn--rounded btn-secondary"]');
    this.nextMetamaskPopUpButton = ('[class="button btn--rounded btn-primary"]');
    this.connectMetamaskPopUpButton = ('[data-testid="page-container-footer-next"]');
    this.signMetamaskRequestPopUpButton = ('[data-testid="request-signature__sign"]');
    this.copyMetamaskAccountAddressButton = page.locator('[class="qr-code__address"]');
    this.optionMenuButton = page.locator('[data-testid="account-options-menu-button"]');
    this.accountDetailsMenuButton = page.locator('[data-testid="account-options-menu__account-details"]');
    this.endOfFlowEmoji = page.locator('[class="end-of-flow__emoji"]')
  }

  async enterRecoveryPhrase(recoveryPhrase: string) {
    const arrayOfWords = recoveryPhrase.split(" ");
    const listOfFields = await this.secretWord.elementHandles();

    for (let i=0; i<listOfFields.length; i++) {
      await listOfFields[i].fill(arrayOfWords[i]);
    }
  }

  async fullyLoginToMetamask(recoveryPhrase: string, password: string) {
    // proceed to recovery phrase
    await this.confirmButton.click();
    await this.iAmNewButton.click();
    await this.nextButton.click();

    // enter recovery phrase and password
    await this.enterRecoveryPhrase(recoveryPhrase);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.createNewWalletCheckbox.click();
    await this.confirmButton.click();
    await expect(this.endOfFlowEmoji).toBeVisible();
    await this.page.waitForTimeout(3000);

    // open wallet and close info pop-up
    await this.confirmButton.click();
    await this.closeInfoPopUp.click();
  }

  async openAccountDetails() {
    await this.optionMenuButton.click();
    await this.accountDetailsMenuButton.click();
  }
}
