import { test } from '../fixtures/metamaskFixture'
/*
import { auth } from '../page-object/selectors/metamask'
import { expect } from '@playwright/test'
import { ixswap, metamask } from '../testData/credentials'
import {
  click,
  navigate,
  waitForText,
  waitNewPage,
  makeScreenOnError,
  getValue,
  screenshotMatching,
  typeText,
  shouldExist,
} from '../helpers/helpers'
import { amounts, notifications, urls } from '../helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../helpers/web3-helpers'
import { SwapIX } from '../page-object/ixswap-objects'
import { Metamask } from '../page-object/metamask-objects'
import { swap, pool } from '../page-object/selectors/ixswap'

let before

test.beforeEach(async ({ context, page, metaMask }) => {
  await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
  before = await getEthBalance()
})

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    await makeScreenOnError(testInfo.title, 'error', page)
    await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
  }
  await page.close()
})

test.describe.skip('Check swap functions', () => {
  test('Check that the ETH can be exchanged for DAI', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.setTypeOfCurrency()
    await ixSwap.currencyExchange(amounts.swap)
    const secondPage = await waitNewPage(page, context, swap.button.CONFIRM_SWAP)
    await metaMask.confirmOperation(secondPage)
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText(`Swap ${amounts.swap} ETH for`, page)
    const after = await getEthBalance()
    expect((Number(before) - Number(after)).toFixed(7)).toBe('0.0001257')
  })
  test('Check that the ETH added with MAX button', async ({ page }) => {
    await click(swap.button.MAX, page)
    const value = await getValue(pool.field.TOKEN_AMOUNT, page)
    const after = await getEthBalance()
    expect((Number(after) - Number(value)).toFixed(5)).toBe('0.01000')
  })

  test('Check Manage token list section', async ({ page }, testInfo) => {
    await click(swap.button.CHOOSE_TOKEN, page)
    await click(swap.button.MANAGE_LIST_TOKEN, page)
    await screenshotMatching(testInfo.title, expect, page)
  })

  test('Check token search on the Swap page', async ({ page }) => {
    await click(swap.button.OUT_CURRENCY, page)
    await typeText(swap.field.SEARCH_INPUT, 'DAI', page)
    const tokenTitle = await page.isVisible('[title="Dai Stablecoin"]')
    expect(tokenTitle).toBe(true)
  })

  test('Check redirection to etherscan', async ({ page, context }) => {
    await click(swap.button.MY_ACCOUNT, page)
    const secondPage = await waitNewPage(page, context, swap.button.VIEW_ON_EXPLORER)
    expect(secondPage.url()).toContain(urls.kovanEtherscan)
  })

  test('Check Account information on the page', async ({ page, context }) => {
    await click(swap.button.MY_ACCOUNT, page)
    await waitForText(notifications.TRANSACTIONS, page)
  })
})

test.describe.skip('Set value more that current balance', () => {
  test.beforeEach(async ({ page }) => {
    before = await getEthBalance()
    await navigate(ixswap.URL, page)
  })

  test('Check that the SWAP can`t be created when not enough funds', async ({ page, ixSwap }) => {
    await ixSwap.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.moreThaCurrent, page)
    const swapConf = await page.isDisabled(swap.button.SWAP)
    expect(swapConf).toBe(true)
  })
})

test.describe.skip('Run tests in expert mode', () => {
  test.beforeEach(async ({ page, ixSwap }) => {
    await ixSwap.setExpertMode(page)
    before = await getEthBalance()
  })

  test('Check that the DAI added to the output ', async ({ page, ixSwap }) => {
    const outPutField = await ixSwap.setTypeOfCurrency(page)
    expect(outPutField).toContain('DAI')
    await screenshotMatching('swapPage', expect, page)
  })

  test('Check that the crypto currency exchange successful', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.swap, page)
    const secondPage = await waitNewPage(page, context, swap.button.SWAP)
    const swapConf = await page.isHidden(swap.button.CONFIRM_SWAP)
    expect(swapConf).toBe(true)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Swap ${amounts.swap} ETH for`, page)
  })
})
 */
