import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';
import {MetamaskPage} from "./metamaskPage";
import {timeouts} from "../helpers/timeouts";

export class ConnectWalletScreen extends WebPage {
  readonly connectWalletButton: Locator;
  readonly connectViaMetamaskButton: Locator;
  readonly metamaskPage: MetamaskPage;
  readonly connectedStatusButton: Locator;
  readonly helpPopUpButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
    this.connectViaMetamaskButton = page.locator('[id="connect-METAMASK"]');
    this.connectedStatusButton = page.locator('[id="web3-status-connected"]');
    this.helpPopUpButton = page.locator('[data-testid="launcher"]')
  }

  async connectMetaMask() {
    await this.connectWalletButton.click();
    const metamaskPopUpPage = await this.openNewPageBy(this.connectViaMetamaskButton.click());

    await metamaskPopUpPage.click(this.metamaskPage.nextMetamaskPopUpButton);
    await metamaskPopUpPage.waitForTimeout(timeouts.tinyTimeout);
    const metamaskSignPopUpPage = await this.openNewPageBy(metamaskPopUpPage.click(this.metamaskPage.connectMetamaskPopUpButton));
    await metamaskSignPopUpPage.click(this.metamaskPage.signMetamaskRequestPopUpButton);
  }
}
