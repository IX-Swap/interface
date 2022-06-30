import {WebPage} from "./webPage";
import {Locator, Page, BrowserContext, expect} from '@playwright/test';
import {MetamaskPage} from "./metamaskPage";
import {timeouts} from "../helpers/timeouts";

export class ConnectWalletScreen extends WebPage {
  readonly connectWalletButton: Locator;
  readonly connectViaMetamaskButton: Locator;
  readonly connectViaMetamaskButtonSelector: string = '[id="connect-METAMASK"]';
  readonly metamaskPage: MetamaskPage;
  readonly connectedStatusButton: Locator;
  readonly helpPopUpButton: Locator;
  readonly playgroundWarningIUnderstandButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
    this.connectViaMetamaskButton = page.locator(this.connectViaMetamaskButtonSelector);
    this.connectedStatusButton = page.locator('[id="web3-status-connected"]');
    this.helpPopUpButton = page.locator('[data-testid="launcher"]')
    this.playgroundWarningIUnderstandButton = page.locator('[data-testid="understood-button"]');
  }

  async connectAndSignMetamask(openedMetamaskPage: Page) {
    const numberOfPagesBeforeSign = await this.context.pages().length;

    await Promise.all([
      this.context.waitForEvent('page', {timeout: timeouts.shortTimeout})
        .then(async (page) => {
          await page.close();
          await this.page.reload();

          const newPage = await this.context.waitForEvent('page', {timeout: timeouts.shortTimeout});
          await this.metamaskPage.signMetamask(newPage);
        })
        .catch(async () => {
          await openedMetamaskPage.close();
          await this.page.reload();

          const newPage = await this.context.waitForEvent('page', {timeout: timeouts.shortTimeout});
          await this.metamaskPage.signMetamask(newPage);
        }),

      openedMetamaskPage.click(this.metamaskPage.connectMetamaskPopUpButton),
    ]);

    // const numberOfPagesAfterSign = await this.context.pages().length;
    // await expect(numberOfPagesAfterSign).toBe(numberOfPagesBeforeSign - 1);
  }

  async connectMetaMask() {
    await this.connectWalletButton.click();
    const metamaskPopUpPage = await this.openNewPageByClick(this.page, this.connectViaMetamaskButtonSelector);
    await metamaskPopUpPage.click(this.metamaskPage.nextMetamaskPopUpButton);

    await this.connectAndSignMetamask(metamaskPopUpPage);
    await expect(this.connectedStatusButton).toBeVisible();
  }
  async clickToPlaygroundWarningIUnderstandButton() {
    await this.playgroundWarningIUnderstandButton.click();
  }
}
