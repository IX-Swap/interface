import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'

test.beforeEach(async ({page, connectWalletScreen, metamaskPage, context}) => {
  await connectWalletScreen.connectMetaMask();
  await page.pause();
  await metamaskPage.changeNetworkToKovan(context);
  await connectWalletScreen.clickToPlaygroundWarningIUnderstandButton();
})

test.describe('Check pool functions', () => {
  test('Test the ability to create a pool (Token - Token pair)', async ({ page, context, topNavigationBar, liquidityPoolsPage, webPage }) => {
    await topNavigationBar.clickLiquidityPoolsButton();

    await liquidityPoolsPage.clickAddLiquidityButton();

    // Click #add-liquidity-input-tokena button:has-text("Choose token")
    await page.locator('#add-liquidity-input-tokena button:has-text("Choose token")').click();

    // Click text=ETH >> nth=3
    await page.locator('text=ETH').nth(3).click();

    // Fill #add-liquidity-input-tokena
    await page.locator('#add-liquidity-input-tokena >> [type="text"]').fill('0.0001');

    // Click #add-liquidity-input-tokena button:has-text("Choose token")
    await page.locator('#add-liquidity-input-tokenb button:has-text("Choose token")').click();

    // Click text=IXS >> nth=0
    await page.locator('text=IXS').first().click();

    // Click [data-testid="supply"]
    await page.locator('[data-testid="supply"]').click();

    // Open new page
    const metamaskPopUp = await webPage.openNewPageByClick(page, '[data-testid="create-or-supply"]');

    // Click text=Подтвердить
    await metamaskPopUp.locator('text=Подтвердить').click();

    // Click text=Transaction Submitted
    await page.locator('text=Transaction Submitted').click();

    // Click [data-testid="return-close"]
    await page.locator('[data-testid="return-close"]').click();

  })

  test.skip('Test the ability to "Add" a new amount in a pool that is already been created.', async ({ page,}) => {
  })

  test.skip('Test the ability to "Remove Liquidity"(partial) from a pool that is already been created', async ({ page,}) => {
  })

  test.skip('Test the ability to "Remove Liquidity"(MAX) from a pool that is already been created', async ({ page,}) => {
  })

  test.skip('Test the ability to create a pool (Negative TC)', async ({ page,}) => {
  })
})

