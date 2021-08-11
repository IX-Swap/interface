import { test as base } from '../lib/fixture'
import { auth } from '../lib/selectors/metamask'

import { expect } from '@playwright/test'
import { ixswap, metamask } from '../lib/helpers/credentials'
import {
  click,
  navigate,
  waitForText,
  waitNewPage,
  makeScreenOnError,
  getValue,
  screenshotMatching,
  typeText,
} from '../lib/helpers/helpers'
import { amounts, notifications } from '../lib/helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../lib/helpers/web3-helpers'
import { SwapIX } from '../lib/page-objects/ixswap-objects'
import { Metamask } from '../lib/page-objects/metamask-objects'
import { swap, pool } from '../lib/selectors/ixswap'

const test = base.extend<{ metaMask: Metamask; ixSwap: SwapIX }>({
  metaMask: async ({ page }, use) => {
    const metaMask = new Metamask(page)
    await use(metaMask)
  },
  ixSwap: async ({ page }, use) => {
    const ixSwap = new SwapIX(page)
    await use(ixSwap)
  },
})

let before

test.beforeEach(async ({ context, page, metaMask }) => {
  await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
  before = await getEthBalance()
})

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status === 'failed') {
    await makeScreenOnError(testInfo.title, 'error', page)
    await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
    await page.close()
  }
})

test.describe('Check pool functions', () => {
  test('Check that the pool can be created', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.createPool(amounts.base)
    await metaMask.signAgreement(context)
    // await context.pages()[1].click(auth.buttons.SIGN)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.base} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(before)).toBeGreaterThan(Number(after))
    // 'Check that the IXS-LT added to the balance'
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBeGreaterThan(0)
  })

  test('Check that crypto can be add to the pool', async ({ page, context, metaMask, ixSwap }) => {
    await navigate(ixswap.URL, page)
    await ixSwap.addToCurrentLiquidityPool(amounts.addToPool, false)
    // await metaMask.signAgreement(context)
    await click(pool.button.SUPPLY, page)
    // await metaMask.signAgreement(context)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.addToPool} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(after)).toBeLessThan(Number(before))
  })

  test('Check that the pool can be removed', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.removePool()
    const secondPage = await ixSwap.removePoolFull({ page, context })
    await metaMask.confirmOperation(secondPage)
    await waitForText(notifications.REMOVE_POOL, page)
    await page.waitForTimeout(5000)
    const after = await getEthBalance()
    expect(Number(after)).toBeGreaterThan(Number(before))
    // 'Check that the IXS-LT removed from the balance'
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBe(0)
  })
})

test.describe('Check swap functions', () => {
  test.afterEach(async ({ page, context }, testInfo) => {
    if (testInfo.status === 'failed') {
      await makeScreenOnError(testInfo.title, 'error', page)
      await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
    }
  })
  test('Check that the ETH can be exchanged for DAI', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.setTypeOfCurrency()
    await ixSwap.currencyExchange(amounts.base)
    const secondPage = await waitNewPage(page, context, swap.button.CONFIRM_SWAP)
    await metaMask.confirmOperation(secondPage)
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText(`Swap ${amounts.base} ETH for`, page)
    const after = await getEthBalance()
    expect((Number(before) - Number(after)).toFixed(7)).toBe('0.0002308')
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
})
