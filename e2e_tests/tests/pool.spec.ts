import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'

test.beforeEach(async ({page, connectWalletScreen}) => {
  await page.pause();
  await connectWalletScreen.connectMetaMask();
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

test.describe('Run tests in expert mode', () => {

  })

  test.skip('Check that the pool can be created', async ({ page,}) => {

  })

  test.skip('Check that crypto can be add to the pool', async ({ page,}) => {

  })

  test.skip('Check that the pool can be removed', async ({ page, }) => {

  })

  test.skip('Check that the IXS-LT removed from the balance', async () => {

  })

