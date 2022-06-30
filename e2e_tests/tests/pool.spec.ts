import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'

test.beforeEach(async ({page, connectWalletScreen, metamaskPage, context}) => {
  await connectWalletScreen.connectMetaMask();
  await page.pause();
  await metamaskPage.changeNetworkToKovan(context);
  await connectWalletScreen.clickToPlaygroundWarningIUnderstandButton();
})

test.describe('Check pool functions', () => {
  test('Check that the pool can be created', async ({ page, topNavigationBar, liquidityPoolsPage }) => {
    await topNavigationBar.clickLiquidityPoolsButton();
    await liquidityPoolsPage.clickAddLiquidityButton();
  })

  test.skip('Check that crypto can be add to the pool', async ({ page,}) => {
  })

  test.skip('Check that the pool can be removed', async ({ page,}) => {
  })
})

