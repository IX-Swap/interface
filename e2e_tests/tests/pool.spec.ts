import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'

test.beforeEach(async ({ kovanNetwork, topNavigationBar, liquidityPoolsPage}) => {
  await topNavigationBar.clickLiquidityPoolsButton();
  await liquidityPoolsPage.removeCreatedLiqudityPoolIfItPresent();
})

test.describe('Check Liquidity pool functions', () => {
  const ethAmountForLiquidityPoolString = '0.0001';
  const ethAmountForLiquidityPoolFloat = 0.0001;
  const ethTokenTitle = 'Ether';
  const ixsTokenTitle = 'Ixs Token';
  let secondTokenValue;

  test.describe('Check Creating pool functions', () => {
    test.afterEach(async ({ liquidityPoolsPage}) => {
      await liquidityPoolsPage.removeCreatedLiqudityPool();
    })

    test('Test the ability to create a pool (Token - Token pair)', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
      await test.step('Open Liquidity pool creation page', async () => {
        await liquidityPoolsPage.clickAddLiquidityButton();
      });

      await test.step('Fill Liquidity pool data', async () => {
        await liquidityPoolsPage.clickChooseFirstTokenDropdown();
        await liquidityPoolsPage.clickTokenItem(ethTokenTitle);
        await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
        await liquidityPoolsPage.clickTokenItem(ixsTokenTitle);
        await liquidityPoolsPage.fillFirstAmountOfTokensField(ethAmountForLiquidityPoolString);
      });

      await test.step('Get second Token field value', async () => {
        secondTokenValue = await liquidityPoolsPage.getSecondTokenValueOfThePool();
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
        await expect(liquidityPoolsPage.firstTokenValueInLiquidityPool).toHaveText(secondTokenValue);
      });
    })
  })

  test.describe('Check Removing pool functions', () => {
    test.beforeEach(async ({page, liquidityPoolsPage}) => {
      await liquidityPoolsPage.createLiqudityPoolWithDefinedAmountOfEth(page, ethAmountForLiquidityPoolString, ethTokenTitle, ixsTokenTitle);
    })

    test('Test the ability to "Remove Liquidity"(MAX) from a pool that is already been created', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
      await liquidityPoolsPage.clickRemoveLiquidityButton();
      await liquidityPoolsPage.clickQuarterRemovePercentageButton();
      await liquidityPoolsPage.clickHalfRemovePercentageButton();
      await liquidityPoolsPage.clickHalfAndQuarterRemovePercentageButton();
      await liquidityPoolsPage.clickMaxRemovePercentageButton();
      await liquidityPoolsPage.approvePoolRemovingViaMetamask();
      await liquidityPoolsPage.clickRemovePoolButton();

      // Assertion
      await liquidityPoolsPage.isEthAmountThatWillBeReceivedShown(ethAmountForLiquidityPoolString);

      const confirmMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmRemovePoolButton);
      await expect(liquidityPoolsPage.waitingForConfirmationPopUpText).toBeVisible();

      await confirmMetamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
      await expect(liquidityPoolsPage.transactionSubmittedPopUpText).toBeVisible();

      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();

      // Assertion
      await liquidityPoolsPage.checkThatDeletedLiquidityPoolIsNotVisible();
    })

    test('Test the ability to "Remove Liquidity"(partial) from a pool that is already been created', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
      await liquidityPoolsPage.clickRemoveLiquidityButton();
      await liquidityPoolsPage.clickHalfRemovePercentageButton();
      await liquidityPoolsPage.approvePoolRemovingViaMetamask();
      await liquidityPoolsPage.clickRemovePoolButton();

      // Assertion
      await liquidityPoolsPage.isEthAmountThatWillBeReceivedShown(ethAmountForLiquidityPoolString);

      const confirmMetamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmRemovePoolButton);
      await expect(liquidityPoolsPage.waitingForConfirmationPopUpText).toBeVisible();

      await confirmMetamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
      await expect(liquidityPoolsPage.transactionSubmittedPopUpText).toBeVisible();

      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();

      // Assertion
      await expect(await liquidityPoolsPage.getSecondTokenValueOfTheCreatedPool()).toBeLessThan(ethAmountForLiquidityPoolFloat);
    })
  })

  test.describe('Check Editing pool functions', () => {
    test.beforeEach(async ({page, liquidityPoolsPage}) => {
      await liquidityPoolsPage.createLiqudityPoolWithDefinedAmountOfEth(page, ethAmountForLiquidityPoolString, ethTokenTitle, ixsTokenTitle);
    })

    test.afterEach(async ({liquidityPoolsPage}) => {
      await liquidityPoolsPage.removeCreatedLiqudityPool();
    })

    test('Test the ability to "Add" a new amount in a pool that is already been created.', async ({page, liquidityPoolsPage, webPage, metamaskPage}) => {
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();
      await liquidityPoolsPage.clickAddNewAmountToLiqudityPoolButton();
      await liquidityPoolsPage.fillSecondAmountOfTokensField(ethAmountForLiquidityPoolString);
      await liquidityPoolsPage.clickSupplyButton();

      const metamaskPopUp = await webPage.openNewPageByClick(page, liquidityPoolsPage.confirmSupplyButtonSelector);
      await expect(liquidityPoolsPage.waitingForConfirmationPopUpText).toBeVisible();

      await metamaskPopUp.click(metamaskPage.connectMetamaskPopUpButton);
      await expect(liquidityPoolsPage.transactionSubmittedPopUpText).toBeVisible();

      await liquidityPoolsPage.clickTransactionSubmittedPopUpCloseButton();
      await liquidityPoolsPage.clickIsxEthPoolDetailsDropdown();

      // Assertion
      await expect(await liquidityPoolsPage.getSecondTokenValueOfTheCreatedPool()).toBeGreaterThan(ethAmountForLiquidityPoolFloat);
    })
  })

  test.describe('Check Negative pool cases', () => {
    test('Test the ability to create a pool (Negative TC)', async ({liquidityPoolsPage}) => {
      await liquidityPoolsPage.clickAddLiquidityButton();
      await liquidityPoolsPage.clickChooseFirstTokenDropdown();
      await liquidityPoolsPage.clickTokenItem(ethTokenTitle);
      await liquidityPoolsPage.fillFirstAmountOfTokensField(ethAmountForLiquidityPoolString);
      await liquidityPoolsPage.clickChooseSecondTokenDropdown() ;
      await liquidityPoolsPage.clickTokenItem(ixsTokenTitle);
      await liquidityPoolsPage.clickSupplyButton();

      await liquidityPoolsPage.rejectPoolCreationViaMetamaskPopUp();
      await expect(liquidityPoolsPage.confirmSupplyButton).toBeVisible();
    })
  })
})

