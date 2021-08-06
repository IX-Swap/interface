import { test as base } from '../lib/fixture'

import { expect } from '@playwright/test'
import { ixswap, metamask } from '../lib/helpers/credentials'
import {
  click,
  typeText,
  navigate,
  waitForText,
  waitNewPage,
  screenshotMatching,
  makeScreenOnError,
} from '../lib/helpers/helpers'
import { amounts } from '../lib/helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../lib/helpers/web3-helpers'
import { SwapIX } from '../lib/page-objects/ixswap-objects'
import { Metamask } from '../lib/page-objects/metamask-objects'

import { auth } from '../lib/selectors/metamask'
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

test.describe('Run tests in expert mode', () => {
  test.beforeEach(async ({ context, page, metaMask, ixSwap }) => {
    await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
    await ixSwap.setExpertMode(page)
    before = await getEthBalance()
  })

  test.afterEach(async ({ page, context }, testInfo) => {
    if (testInfo.status === 'failed') {
      await makeScreenOnError(testInfo.title, 'error', page)
      await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
    }
  })

  test('Check that the DAI added to the output ', async ({ page, ixSwap }) => {
    const outPutField = await ixSwap.setTypeOfCurrency(page)
    expect(outPutField).toContain('DAI')
    await screenshotMatching('swapPage', expect, page)
  })

  test('Check that the crypto currency exchange successful', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.base, page)
    const secondPage = await waitNewPage(page, context, swap.button.SWAP)
    const swapConf = await page.isHidden(swap.button.CONFIRM_SWAP)
    expect(swapConf).toBe(true)
    await metaMask.confirmOperation(secondPage)
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText(`Swap ${amounts.base} ETH for`, page)
  })

  test('Check that the pool can be created', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.createPool(amounts.base)
    const secondPage = await waitNewPage(page, context, pool.button.SUPPLY)
    await click(auth.buttons.SIGN, secondPage)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.base} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(before)).toBeGreaterThan(Number(after))
  })

  test('Check that crypto can be add to the pool', async ({ page, context, metaMask, ixSwap }) => {
    await navigate(ixswap.URL, page)
    before = await getEthBalance()
    await ixSwap.addToCurrentLiquidityPool(amounts.addToPool, false)
    const secondPage = await waitNewPage(page, context, pool.button.SUPPLY)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.addToPool} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(after)).toBeLessThan(Number(before))
  })

  test('Check that the pool can be removed', async ({ page, context, metaMask, ixSwap }) => {
    before = await getEthBalance()
    await ixSwap.removePool()
    let secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED + '[2]', secondPage)
    await click(pool.button.REMOVE, page)
    secondPage = await waitNewPage(page, context, pool.button.CONFIRM_REMOVE)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Remove 0.0`, page)
    // await page.waitForTimeout(5000)
    const after = await getEthBalance()
    expect(Number(after)).toBeGreaterThan(Number(before))
  })

  test('Check that the IXS-LT removed from the balance', async () => {
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBe(0)
  })
})
