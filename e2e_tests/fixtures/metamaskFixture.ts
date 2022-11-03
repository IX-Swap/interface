import { chromium, test as base } from '@playwright/test'
import { ConnectWalletScreen } from '../page-object/connectWalletScreen'
import { MetamaskPage } from '../page-object/metamaskPage'
import { WebPage } from '../page-object/webPage'
import { TopNavigationBar } from '../page-object/topNavigationBar'
import { LiquidityPoolsPage } from '../page-object/liquidityPoolsPage'
import { SwapTradePage } from '../page-object/swapTradePage'
import { KycPage } from '../page-object/kycPage'
import { AdminPage } from '../page-object/adminPage'
import { SecurityTokensPage } from '../page-object/securityTokensPage'

type ixsFixtures = {
  connectWalletScreen: ConnectWalletScreen;
  metamaskPage: MetamaskPage;
  topNavigationBar: TopNavigationBar;
  webPage: WebPage;
  liquidityPoolsPage: LiquidityPoolsPage;
  kovanNetwork: ConnectWalletScreen;
  swapTradePage: SwapTradePage;
  kycPage: KycPage;
  adminPage: AdminPage;
  recoveryPhrase: string;
  securityTokensPage: SecurityTokensPage;
};

export const test = base.extend<ixsFixtures>({
  recoveryPhrase: process.env.METAMASK_RECOVERY,

  context: async ({ browser }, use) => {
    const pathToExtension = require('path').join(__dirname, '..', 'extensions/metamask')
    const userDataDir = ''

    const browserContext = await chromium.launchPersistentContext(userDataDir, {
      // video disabled to improve the performance, can be enabled for debugging
      // recordVideo: { dir: 'test-results/videos/' },
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
      ]
    })

    await Promise.all([
      browserContext.waitForEvent('page')
    ])

    await use(browserContext)
    await browserContext.close()
  },

  // Overwriting of page for using it in the same browser with metamask
  page: async ({ context, baseURL }, use) => {
    const metamaskContextPage = await context.newPage()

    await metamaskContextPage.goto(baseURL)
    await use(metamaskContextPage)
  },

  metamaskPage: [async ({ context, recoveryPhrase }, use) => {
    const pageWithMetamask = await context.pages()[1]
    const metamaskPage = new MetamaskPage(pageWithMetamask)

    await metamaskPage.makeSureMetamaskLoaded()
    await metamaskPage.fullyLoginToMetamask(recoveryPhrase, process.env.METAMASK_PASSWORD)
    await use(metamaskPage)
  }, { auto: true }],

  connectWalletScreen: async ({ page, context }, use) => {
    await use(new ConnectWalletScreen(page, context))
  },

  topNavigationBar: async ({ page, context }, use) => {
    await use(new TopNavigationBar(page, context))
  },

  webPage: async ({ page, context }, use) => {
    await use(new WebPage(page, context))
  },

  liquidityPoolsPage: async ({ page, context }, use) => {
    await use(new LiquidityPoolsPage(page, context))
  },

  swapTradePage: async ({ page, context }, use) => {
    await use(new SwapTradePage(page, context))
  },

  kycPage: async ({ page, context }, use) => {
    await use(new KycPage(page, context))
  },

  adminPage: async ({ page, context }, use) => {
    await use(new AdminPage(page, context))
  },

  securityTokensPage: async ({ page, context }, use) => {
    await use(new SecurityTokensPage(page, context))
  },

  kovanNetwork: async ({ connectWalletScreen, metamaskPage }, use) => {
    await connectWalletScreen.connectMetaMask()
    await metamaskPage.changeNetworkToKovan()

    await use(connectWalletScreen)
  }
})
