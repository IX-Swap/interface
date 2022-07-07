import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'

test.beforeEach(async ({kovanNetwork, topNavigationBar, liquidityPoolsPage}) => {
  await topNavigationBar.clickLiquidityPoolsButton();
  await liquidityPoolsPage.removeCreatedLiqudityPoolIfItPresent();
})

test.describe('Check Liquidity pool functions', () => {
  const ethAmountForLiquidityPool = '0.00001';
  const ethTokenTitle = 'Ether';
  const ixsTokenTitle = 'Ixs Token';
  let secondTokenValue;

  test.describe('Check Creating pool functions', () => {
    test.afterEach(async ({page, liquidityPoolsPage}) => {
      await liquidityPoolsPage.removeCreatedLiqudityPool();
    })

    test('Test the ability to create a pool (Token - Token pair)', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
      await test.step('Open Liquidity pool creation page', async () => {
        await liquidityPoolsPage.clickAddLiquidityButton();
      });

      await test.step('Fill Liquidity pool value', async () => {
        await liquidityPoolsPage.clickChooseFirstTokenDropdown();
        await liquidityPoolsPage.clickTokenItem(ethTokenTitle);
        await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
        await liquidityPoolsPage.clickTokenItem(ixsTokenTitle);
        await liquidityPoolsPage.fillFirstAmountOfTokensField(ethAmountForLiquidityPool);
      });

      await test.step('Get field second Token value', async () => {
        secondTokenValue = await liquidityPoolsPage.getSecondTokenValueInThePool();

        await liquidityPoolsPage.clickSupplyButton();
      });

      await test.step('Confirm Liquidity pool creation', async () => {
        const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButtonSelector);

        await expect(liquidityPoolsPage.waitingForConfirmationPopUpText).toBeVisible();

        await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);

        await expect(liquidityPoolsPage.transactionSubmittedPopUpText).toBeVisible();
      });

      await test.step('Check that Liquidity pool created', async () => {
        await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();

        await expect(liquidityPoolsPage.createdIsxEthPool).toBeVisible();
      });

      await test.step('Check that Liquidity pool value is equal to previously defined', async () => {
        await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();

        await expect(liquidityPoolsPage.secondTokenValueInLiquidityPool).toHaveText(secondTokenValue);
      });
    })
  })

  test.describe('Check Removing pool functions', () => {
    test.beforeEach(async ({page, liquidityPoolsPage}) => {
      await liquidityPoolsPage.createLiqudityPoolWithDefinedAmountOfEth(page, ethAmountForLiquidityPool, ethTokenTitle, ixsTokenTitle);
    })

    test('Test the ability to "Remove Liquidity" from a pool that is already been created', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
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

      await expect(liquidityPoolsPage.waitingForConfirmationPopUpText).toBeVisible();

      await confirmMetamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);

      await expect(liquidityPoolsPage.transactionSubmittedPopUpText).toBeVisible();
    })
  })

  test.describe('Check Editing pool functions', () => {
    test.beforeEach(async ({page, liquidityPoolsPage}) => {
      await liquidityPoolsPage.createLiqudityPoolWithDefinedAmountOfEth(page, ethAmountForLiquidityPool, ethTokenTitle, ixsTokenTitle);
    })

    test.afterEach(async ({liquidityPoolsPage}) => {
      await liquidityPoolsPage.removeCreatedLiqudityPool();
    })

    test('Test the ability to "Add" a new amount in a pool that is already been created.', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
      await liquidityPoolsPage.clickAddNewAmountToliqudityPoolButton();
      await liquidityPoolsPage.fillSecondAmountOfTokensField(ethAmountForLiquidityPool);
      await liquidityPoolsPage.clickSupplyButton();

      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButtonSelector);

      await expect(liquidityPoolsPage.waitingForConfirmationPopUpText).toBeVisible();

      await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);

      await expect(liquidityPoolsPage.transactionSubmittedPopUpText).toBeVisible();
    })
  })

  test.describe('Check Negative pool cases', () => {

    test('Test the ability to create a pool (Negative TC)', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
      await liquidityPoolsPage.clickAddLiquidityButton();
      await liquidityPoolsPage.clickChooseFirstTokenDropdown();
      await liquidityPoolsPage.clickTokenItem(ethTokenTitle);
      await liquidityPoolsPage.fillFirstAmountOfTokensField(ethAmountForLiquidityPool);
      await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
      await liquidityPoolsPage.clickTokenItem(ixsTokenTitle);
      await liquidityPoolsPage.clickSupplyButton();

      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButtonSelector);
      await metamaskPopUp.click(metamaskPage.rejectButton);

      await expect(liquidityPoolsPage.confirmSupplyButton).toBeVisible();
    })
  })
})

