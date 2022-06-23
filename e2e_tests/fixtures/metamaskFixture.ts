import {test as base, chromium} from '@playwright/test';
import {ConnectWalletScreen} from "../page-object/connectWalletScreen";
import {KycScreen} from "../page-object/kycScreen"
import {MetamaskPage} from "../page-object/metamaskPage";
import {WebPage} from "../page-object/webPage";
import {TopNavigationBar} from "../page-object/topNavigationBar";
import {LiquidityPoolsPage} from "../page-object/liquidityPoolsPage";

type ixsFixtures = {
  connectWalletScreen: ConnectWalletScreen;
  kycScreen: KycScreen;
  metamaskPage: MetamaskPage;
  topNavigationBar: TopNavigationBar;
  webPage: WebPage;
  liquidityPoolsPage: LiquidityPoolsPage;
};

export const test = base.extend<ixsFixtures>({
  context: async ({ browser }, use) => {
    const pathToExtension = require('path').join(__dirname, '..', 'extensions/metamask');
    const userDataDir = '';

    const browserContext = await chromium.launchPersistentContext(userDataDir,{
      recordVideo: { dir: 'test-results/videos/' },
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
      ]
    });

    await Promise.all([
      browserContext.waitForEvent('page'),
    ]);

    await use(browserContext);
    await browserContext.close();
  },

  // Overwriting of page for using it in the same browser with metamask
  page: async ({ context, baseURL }, use) => {
    const metamaskContextPage = await context.newPage();

    await metamaskContextPage.goto(baseURL);
    await use(metamaskContextPage);
  },

  metamaskPage: [async ({ context }, use) => {
    const pageWithMetamask = await context.pages()[1];
    const metamaskPage = new MetamaskPage(pageWithMetamask);

    await metamaskPage.makeSureMetamaskLoaded();
    await metamaskPage.fullyLoginToMetamask(process.env.METAMASK_RECOVERY, process.env.METAMASK_PASSWORD);
    await use(metamaskPage);
  }, { auto: true }],

  connectWalletScreen: async ({ page, context }, use) => {
    await use(new ConnectWalletScreen(page, context));
  },

  topNavigationBar: async ({ page, context }, use) => {
    await use(new TopNavigationBar(page, context));
  },

  webPage: async ({ page, context }, use) => {
    await use(new WebPage(page, context));
  },

  kycScreen: async ({ page, context }, use) => {
    await use(new KycScreen(page));
  },

  liquidityPoolsPage: async ({ page, context }, use) => {
    await use(new LiquidityPoolsPage(page));
  },
});
