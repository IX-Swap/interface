import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'
import { Web3Helpers } from '../helpers/web3/web3'
import { ixsTokenData, secTokenData, wsecTokenData, ethTokenData } from '../helpers/web3/web3Data'
import { metamaskWallet } from '../helpers/web3/metamaskData'

test.beforeEach(async ({ kovanNetwork, topNavigationBar }) => {
  await topNavigationBar.clickSwapTradeButton();
})

test.describe('Check Swap section functions', () => {
  const web3Helper = new Web3Helpers;

  const amountForSwapString = '0.0001';

  test.describe('Check UI swap section cases', () => {
    test('Check UI for the "Swap" section', async ({ swapTradePage }) => {
      await swapTradePage.checkSwapTittleIsVisible();
      await swapTradePage.checkGearButtonIsVisible();
      await swapTradePage.checkFirstTokenAmountInputIsVisible();
      await swapTradePage.checkSecondTokenAmountInputIsVisible();
      await swapTradePage.checkCurrencyReplaceArrowIsVisible();
      await swapTradePage.checkCurrentRateFieldIsVisible();
      await swapTradePage.checkEnterAnAmountButtonIsDisabled();
    })

    test('Test the ability to "Swap" (Token - Token pair)', async ({ swapTradePage, page }) => {
      const ixsTokenBalanceBefore = await web3Helper.getTokenBalance(ixsTokenData.contractAddress, metamaskWallet.ethAddress);

      await swapTradePage.clickFirstTokenDropdown();
      await swapTradePage.clickTokenItem(ethTokenData.title);
      await swapTradePage.clickSecondTokenDropdown();
      await swapTradePage.clickTokenItem(ixsTokenData.title);
      await swapTradePage.fillFirstTokenAmountInput(amountForSwapString);
      await swapTradePage.clickSwapButton();
      await swapTradePage.confirmSwapViaMetamask();

      await expect(swapTradePage.transactionSubmittedPopUpText).toBeVisible();

      const ixsTokenBalanceAfter = await web3Helper.getTokenBalance(ixsTokenData.contractAddress, metamaskWallet.ethAddress);
      await expect(parseFloat(ixsTokenBalanceBefore)).toBeLessThan(parseFloat(ixsTokenBalanceAfter));
    })

    test('Test the ability to "Swap" (Token - Security Token pair)', async ({ swapTradePage, page }) => {
      const wsecTokenBalanceBefore = await web3Helper.getTokenBalance(wsecTokenData.contractAddress, metamaskWallet.ethAddress);

      await swapTradePage.clickFirstTokenDropdown();
      await swapTradePage.clickTokenItem(ethTokenData.title);
      await swapTradePage.clickSecondTokenDropdown();
      await swapTradePage.clickTokenItem(wsecTokenData.title);
      await swapTradePage.fillFirstTokenAmountInput(amountForSwapString);
      await swapTradePage.clickAuthorizeSecurityToken(wsecTokenData.name);
      await swapTradePage.clickSwapButton();
      await swapTradePage.confirmSwapViaMetamask();

      await expect(swapTradePage.transactionSubmittedPopUpText).toBeVisible();

      const wsecTokenBalanceAfter = await web3Helper.getTokenBalance(wsecTokenData.contractAddress, metamaskWallet.ethAddress);
      await expect(parseFloat(wsecTokenBalanceBefore)).toBeLessThan(parseFloat(wsecTokenBalanceAfter));
    })

    test('Test the ability to "Swap" (Security Token - Security Token pair)', async ({ swapTradePage, page }) => {
      const firstTokenBalanceBefore = await web3Helper.getTokenBalance(secTokenData.contractAddress, metamaskWallet.ethAddress);
      const secondTokenBalanceBefore = await web3Helper.getTokenBalance(wsecTokenData.contractAddress, metamaskWallet.ethAddress);

      await swapTradePage.clickFirstTokenDropdown();
      await swapTradePage.clickTokenItem(secTokenData.title);
      await swapTradePage.clickSecondTokenDropdown();
      await swapTradePage.clickTokenItem(wsecTokenData.title);
      await swapTradePage.fillFirstTokenAmountInput(amountForSwapString);
      await swapTradePage.clickAuthorizeSecurityToken(secTokenData.name);
      await swapTradePage.clickAuthorizeSecurityToken(wsecTokenData.name);
      await swapTradePage.clickSwapButton();
      await swapTradePage.confirmSwapViaMetamask();

      await expect(swapTradePage.transactionSubmittedPopUpText).toBeVisible();

      const firstTokenBalanceAfter = await web3Helper.getTokenBalance(secTokenData.contractAddress, metamaskWallet.ethAddress);
      const secondTokenBalanceAfter = await web3Helper.getTokenBalance(wsecTokenData.contractAddress, metamaskWallet.ethAddress);

      await expect(parseFloat(firstTokenBalanceBefore)).toBeGreaterThan(parseFloat(firstTokenBalanceAfter));
      await expect(parseFloat(secondTokenBalanceBefore)).toBeLessThan(parseFloat(secondTokenBalanceAfter));
    })

    test('Test the ability to "Swap" (Negative TC)', async ({ swapTradePage }) => {
      await swapTradePage.clickFirstTokenDropdown();
      await swapTradePage.clickTokenItem(ethTokenData.title);
      await swapTradePage.clickSecondTokenDropdown();
      await swapTradePage.clickTokenItem(ixsTokenData.title);
      await swapTradePage.fillFirstTokenAmountInput(amountForSwapString);
      await swapTradePage.clickSwapButton();

      await swapTradePage.rejectSwapViaMetamask();
      await expect(swapTradePage.rejectTransactionPopUp).toBeVisible();
    })
  })
})
