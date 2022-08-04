import { test } from '../fixtures/metamaskFixture'
import { expect } from '@playwright/test'
import { Web3Helpers } from '../helpers/web3/web3'
import { ixsTokenData, secTokenData, wsecTokenData, ethTokenData } from '../helpers/web3/web3Data'

test.beforeEach(async ({ kovanNetwork, topNavigationBar }) => {
  await topNavigationBar.clickSwapTradeButton();
})

test.describe('Check Swap section functions', () => {
  const web3Helper = new Web3Helpers;

  const amountForSwapString = '0.0001';
  const listOfSecurityTokens = [secTokenData, wsecTokenData];

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
      const ixsTokenBalanceBefore = await web3Helper.getTokenBalance(ixsTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');

      await swapTradePage.clickFirstTokenDropdown();
      await swapTradePage.clickTokenItem(ethTokenData.title);
      await swapTradePage.clickSecondTokenDropdown();
      await swapTradePage.clickTokenItem(ixsTokenData.title);
      await swapTradePage.fillFirstTokenAmountInput(amountForSwapString);
      await swapTradePage.clickSwapButton();
      await swapTradePage.confirmSwapViaMetamask();

      await expect(swapTradePage.transactionSubmittedPopUpText).toBeVisible();
      await page.waitForTimeout(7000);

      const ixsTokenBalanceAfter = await web3Helper.getTokenBalance(ixsTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');

      await expect(ixsTokenBalanceBefore).not.toEqual(ixsTokenBalanceAfter);
    })

    test('Test the ability to "Swap" (Token - Security Token pair)', async ({ swapTradePage, page }) => {
      const wsecTokenBalanceBefore = await web3Helper.getTokenBalance(wsecTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');

      await swapTradePage.clickFirstTokenDropdown();
      await swapTradePage.clickTokenItem(ethTokenData.title);
      await swapTradePage.clickSecondTokenDropdown();
      await swapTradePage.clickTokenItem(wsecTokenData.title);
      await swapTradePage.fillFirstTokenAmountInput(amountForSwapString);
      await swapTradePage.clickAuthorizeSecurityToken(wsecTokenData.name);
      await swapTradePage.clickSwapButton();
      await swapTradePage.confirmSwapViaMetamask();

      await expect(swapTradePage.transactionSubmittedPopUpText).toBeVisible();
      await page.waitForTimeout(7000);

      const wsecTokenBalanceAfter = await web3Helper.getTokenBalance(wsecTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');

      await expect(wsecTokenBalanceBefore).not.toEqual(wsecTokenBalanceAfter);
    })

    test('Test the ability to "Swap" (Security Token - Security Token pair)', async ({ swapTradePage, page }) => {
      const firstTokenId = await swapTradePage.getRandomTokenId(listOfSecurityTokens);
      const firstTokenData = listOfSecurityTokens[firstTokenId];

      const secondTokenId = await swapTradePage.getRandomTokenIdWithExclusion(listOfSecurityTokens, firstTokenData);
      const secondTokenData = listOfSecurityTokens[secondTokenId];

      const firstTokenBalanceBefore = await web3Helper.getTokenBalance(firstTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');
      const secondTokenBalanceBefore = await web3Helper.getTokenBalance(secondTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');

      await swapTradePage.clickFirstTokenDropdown();
      await swapTradePage.clickTokenItem(firstTokenData.title);
      await swapTradePage.clickSecondTokenDropdown();
      await swapTradePage.clickTokenItem(secondTokenData.title);
      await swapTradePage.fillFirstTokenAmountInput(amountForSwapString);
      await swapTradePage.clickAuthorizeSecurityToken(wsecTokenData.name);
      await swapTradePage.clickAuthorizeSecurityToken(secTokenData.name);
      await swapTradePage.clickSwapButton();
      await swapTradePage.confirmSwapViaMetamask();

      await expect(swapTradePage.transactionSubmittedPopUpText).toBeVisible();
      await page.waitForTimeout(7000);

      const firstTokenBalanceAfter = await web3Helper.getTokenBalance(firstTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');
      const secondTokenBalanceAfter = await web3Helper.getTokenBalance(secondTokenData.contractAddress, '0x586Fd788b37FE3847bCf940562297b19c2Cc6CE0');

      await expect(firstTokenBalanceBefore).not.toEqual(firstTokenBalanceAfter);
      await expect(secondTokenBalanceBefore).not.toEqual(secondTokenBalanceAfter);
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
