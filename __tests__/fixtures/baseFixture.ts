import {test as base} from '@playwright/test';
import {ConnectWalletScreen} from "../page-object/connectWalletScreen";


type ixsFixtures = {
  connectWalletScreen: ConnectWalletScreen;
  kycScreen: KycScreen;
};

export const test = base.extend<ixsFixtures>({
  page: async ({ page, baseURL }, use) => {
    await page.goto(baseURL);
    await use(page);
  },

  connectWalletScreen: async ({ page, context }, use) => {
    await use(new ConnectWalletScreen(page, context));
  }
});
