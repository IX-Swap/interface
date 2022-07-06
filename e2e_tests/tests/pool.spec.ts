import { test } from '../fixtures/metamaskFixture'

test.beforeEach(async ({connectWalletScreen, metamaskPage, topNavigationBar}) => {
  await connectWalletScreen.connectMetaMask();
  await metamaskPage.changeNetworkToKovan();
  await connectWalletScreen.clickToPlaygroundWarningIUnderstandButton();
  await topNavigationBar.clickLiquidityPoolsButton();
})

test.describe('Check Liquidity pool functions', () => {

  const ethAmountForLiquidityPool = '0.00001';
  const ethTokenTitle = 'Ether';
  const ixsTokenTitle = 'Ixs Token';

  test.describe('Check Creating pool functions', () => {
    test.afterEach(async ({page,  liquidityPoolsPage, metamaskPage}) => {
      await liquidityPoolsPage.removeCreatedLiqudityPool(page, metamaskPage);
    })

    test('Test the ability to create a pool (Token - Token pair)', async ({ page, liquidityPoolsPage, webPage, metamaskPage }) => {
      await liquidityPoolsPage.clickAddLiquidityButton();
      await liquidityPoolsPage.clickChooseFirstTokenDropdown();
      await liquidityPoolsPage.clickTokenItem(ethTokenTitle);
      await liquidityPoolsPage.fillFirstAmountOfTokensField(ethAmountForLiquidityPool);
      await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
      await liquidityPoolsPage.clickTokenItem(ixsTokenTitle);
      await liquidityPoolsPage.clickSupplyButton();

      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButton);

      // Assertion
      await liquidityPoolsPage.isWaitingForConfirmationPopUpTextShown();

      await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);

      // Assertion
      await liquidityPoolsPage.isTransactionSubmittedPopUpTextShown();

      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();

      // Assertion
      await liquidityPoolsPage.isCreatedIsxEthPoolShown();
    })
  })

  test.describe('Check Removing pool functions', () => {
    test.beforeEach(async ({page, metamaskPage, liquidityPoolsPage}) => {
      await liquidityPoolsPage.createLiqudityPoolWithDefinedAmountOfEth(page, metamaskPage, ethAmountForLiquidityPool, ethTokenTitle, ixsTokenTitle);
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

      // Assertion
      await liquidityPoolsPage.isEthAmountThatWillBeReceivedShown(ethAmountForLiquidityPool);

      const confirmMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmRemovePoolButton);

      // Assertion
      await liquidityPoolsPage.isWaitingForConfirmationPopUpTextShown();

      await confirmMetamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);

      // Assertion
      await liquidityPoolsPage.isTransactionSubmittedPopUpTextShown();

      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
    })
  })

  test.describe('Check Editing pool functions', () => {
    test.beforeEach(async ({page, metamaskPage, liquidityPoolsPage}) => {
      await liquidityPoolsPage.createLiqudityPoolWithDefinedAmountOfEth(page, metamaskPage, ethAmountForLiquidityPool, ethTokenTitle, ixsTokenTitle);
    })

    test.afterEach(async ({page,  liquidityPoolsPage, metamaskPage}) => {
      await liquidityPoolsPage.removeCreatedLiqudityPool(page, metamaskPage);
    })

    test('Test the ability to "Add" a new amount in a pool that is already been created.', async ({ page, liquidityPoolsPage, webPage, metamaskPage }) => {
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
      await liquidityPoolsPage.clickAddNewAmountToliqudityPoolButton();
      await liquidityPoolsPage.fillSecondAmountOfTokensField(ethAmountForLiquidityPool);
      await liquidityPoolsPage.clickSupplyButton();

      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButton);

      // Assertion
      await liquidityPoolsPage.isWaitingForConfirmationPopUpTextShown();

      await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);

      // Assertion
      await liquidityPoolsPage.isTransactionSubmittedPopUpTextShown();

      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
    })
  })

  test.describe('Check Negative pool cases', () => {

    test('Test the ability to create a pool (Negative TC)', async ({ page, liquidityPoolsPage, webPage, metamaskPage }) => {
      await liquidityPoolsPage.clickAddLiquidityButton();
      await liquidityPoolsPage.clickChooseFirstTokenDropdown();
      await liquidityPoolsPage.clickTokenItem(ethTokenTitle);
      await liquidityPoolsPage.fillFirstAmountOfTokensField(ethAmountForLiquidityPool);
      await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
      await liquidityPoolsPage.clickTokenItem(ixsTokenTitle);
      await liquidityPoolsPage.clickSupplyButton();

      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButton);
      await metamaskPopUp.click(metamaskPage.rejectButton);

      // Assertion
      await liquidityPoolsPage.isConfirmSupplyButtonVisible();
    })
  })
})

