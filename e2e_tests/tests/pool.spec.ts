import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'

test.beforeEach(async ({page, connectWalletScreen, metamaskPage, context}) => {
  await connectWalletScreen.connectMetaMask();
  await page.pause();
  await metamaskPage.changeNetworkToKovan(context);
  await connectWalletScreen.clickToPlaygroundWarningIUnderstandButton();
})

test.describe('Check pool functions', () => {
  test('Test the ability to create a pool (Token - Token pair)', async ({ page, topNavigationBar, liquidityPoolsPage, webPage, metamaskPage }) => {
    await topNavigationBar.clickLiquidityPoolsButton();
    await liquidityPoolsPage.clickAddLiquidityButton();
    await liquidityPoolsPage.clickChooseFirstTokenDropdown();
    await liquidityPoolsPage.clickEthTokenItem();
    await liquidityPoolsPage.fillFirstAmountOfTokensField('0.0001');
    await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
    await liquidityPoolsPage.clickIxsTokenItem();
    await liquidityPoolsPage.clickSupplyButton();
    const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButton);
    await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
    await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
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

