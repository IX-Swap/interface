import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'

test.beforeEach(async ({connectWalletScreen, metamaskPage, context}) => {
  await connectWalletScreen.connectMetaMask();
  await metamaskPage.changeNetworkToKovan(context);
  await connectWalletScreen.clickToPlaygroundWarningIUnderstandButton();
})

test.describe('Check Liquidity pool functions', () => {

  test.afterEach(async ({page, webPage, liquidityPoolsPage, metamaskPage}) => {
    // await page.pause();
    await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
    await liquidityPoolsPage.clickRemoveLiquidityButton();
    await liquidityPoolsPage.clickMaxRemovePercentageButton();
    const approveMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.approveRemovePoolButton);
    await approveMetamaskPopUp.click(metamaskPage.signButton);
    await liquidityPoolsPage.clickRemovePoolButton();
    const confirmMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmRemovePoolButton);
    await confirmMetamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
    await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
  })


  test('Test the ability to create a pool (Token - Token pair)', async ({ page, topNavigationBar, liquidityPoolsPage, webPage, metamaskPage }) => {
    await topNavigationBar.clickLiquidityPoolsButton();
    await liquidityPoolsPage.clickAddLiquidityButton();
    await liquidityPoolsPage.clickChooseFirstTokenDropdown();
    await liquidityPoolsPage.clickEthTokenItem();
    await liquidityPoolsPage.fillFirstAmountOfTokensField('0.00001');
    await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
    await liquidityPoolsPage.clickIxsTokenItem();
    await liquidityPoolsPage.clickSupplyButton();
    const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButton);
    await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
    await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
  })

  test.describe('Check Removing pool functions', () => {
    test.beforeEach(async ({page, metamaskPage, webPage, topNavigationBar, liquidityPoolsPage}) => {
      await topNavigationBar.clickLiquidityPoolsButton();
      await liquidityPoolsPage.clickAddLiquidityButton();
      await liquidityPoolsPage.clickChooseFirstTokenDropdown();
      await liquidityPoolsPage.clickEthTokenItem();
      await liquidityPoolsPage.fillFirstAmountOfTokensField('0.00001');
      await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
      await liquidityPoolsPage.clickIxsTokenItem();
      await liquidityPoolsPage.clickSupplyButton();
      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButton);
      await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
    })

    test('Test the ability to "Remove Liquidity" from a pool that is already been created', async ({ page, liquidityPoolsPage, webPage, metamaskPage }) => {
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
      await liquidityPoolsPage.clickRemoveLiquidityButton();
      await liquidityPoolsPage.clickQuarterRemovePercentageButton();
      await liquidityPoolsPage.clickHalfRemovePercentageButton();
      await liquidityPoolsPage.clickHalfAndQuarterRemovePercentageButton();
      await liquidityPoolsPage.clickMaxRemovePercentageButton();
      const approveMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.approveRemovePoolButton);
      await approveMetamaskPopUp.click(metamaskPage.signButton);
      await liquidityPoolsPage.clickRemovePoolButton();
      const confirmMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmRemovePoolButton);
      await confirmMetamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
    })
  })

  test.describe('Check Negative pool cases', () => {

    test.skip('Test the ability to create a pool (Negative TC)', async ({ page, }) => {

    })
  })

  test.describe('Check Editing pool functions', () => {
    test.beforeEach(async ({page, metamaskPage, webPage, topNavigationBar, liquidityPoolsPage}) => {
      await topNavigationBar.clickLiquidityPoolsButton();
      await liquidityPoolsPage.clickAddLiquidityButton();
      await liquidityPoolsPage.clickChooseFirstTokenDropdown();
      await liquidityPoolsPage.clickEthTokenItem();
      await liquidityPoolsPage.fillFirstAmountOfTokensField('0.00001');
      await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
      await liquidityPoolsPage.clickIxsTokenItem();
      await liquidityPoolsPage.clickSupplyButton();
      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButton);
      await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
    })

    test.afterEach(async ({page, webPage, liquidityPoolsPage, metamaskPage}) => {
      // await page.pause();
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
      await liquidityPoolsPage.clickRemoveLiquidityButton();
      await liquidityPoolsPage.clickMaxRemovePercentageButton();
      const approveMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.approveRemovePoolButton);
      await approveMetamaskPopUp.click(metamaskPage.signButton);
      await liquidityPoolsPage.clickRemovePoolButton();
      const confirmMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmRemovePoolButton);
      await confirmMetamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
    })

    test.skip('Test the ability to "Add" a new amount in a pool that is already been created.', async ({ page, liquidityPoolsPage }) => {
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();

    })
  })
})

