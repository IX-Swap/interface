import { test as base } from '../lib/fixture'
import { expect } from '@playwright/test'
import { ixswap, metamask, metamask2 } from '../lib/helpers/credentials'
import {
  click,
  waitForText,
  typeText,
  waitNewPage,
  makeScreenOnError,
  navigate,
  shouldExist,
} from '../lib/helpers/helpers'
import { amounts, notifications } from '../lib/helpers/text-helpers'

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
test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    await makeScreenOnError(testInfo.title, 'error', page)
    await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
  }
  await page.close()
})
test.describe('Set value more that current balance', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
    before = await getEthBalance()
    await navigate(ixswap.URL, page)
  })

  test('Check that the POOL can`t be created when not enough funds', async ({ page, ixSwap }) => {
    await ixSwap.createPool(amounts.moreThaCurrent)
    const poolConf = await page.isDisabled(pool.button.SUPPLY)
    expect(poolConf).toBe(true)
  })
  test('The test instead beforeAll hook--> Create pool', async ({ page, ixSwap, metaMask, context }) => {
    await ixSwap.createPool(amounts.base)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.base} ETH and`, page)
  })
  test('Check that crypto can`t be add to the pool when not enough funds', async ({ page, ixSwap }) => {
    await ixSwap.addToCurrentLiquidityPool(amounts.moreThaCurrent, false)
    const poolConf = await page.isDisabled(pool.button.SUPPLY)
    expect(poolConf).toBe(true)
  })
})

test.describe('Cancel poll transaction', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
    before = await getEthBalance()
    await navigate(ixswap.URL, page)
  })

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await makeScreenOnError(testInfo.title, 'error', page)
    }
  })
  test('Pool creation', async ({ page, context, ixSwap }) => {
    await ixSwap.createPool(amounts.base)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await click(auth.buttons.CANCEL, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })

  test('Add to current pool', async ({ page, context, ixSwap }) => {
    await ixSwap.addToCurrentLiquidityPool(amounts.base, false)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await click(auth.buttons.CANCEL, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })

  test('Remove pool,first confirmation', async ({ page, context, ixSwap }) => {
    await ixSwap.removePool()
    const secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })

  test('Remove pool,second confirmation', async ({ page, context, ixSwap }) => {
    await ixSwap.removePool()
    let secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED + '[2]', secondPage)
    await click(pool.button.REMOVE, page)
    secondPage = await waitNewPage(page, context, pool.button.CONFIRM_REMOVE)
    await click(auth.buttons.CANCEL, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })

  test('test as AfterAll hook--> Remove pool ', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.removePool()
    const secondPage = await ixSwap.removePoolFull({ page, context })
    await metaMask.confirmOperation(secondPage)
    await waitForText(notifications.REMOVE_POOL, page)
  })
})

test.describe('Check the behave when balance = 0', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask2.SECRET_WORDS, metamask2.contractAddresses.eth)
    await navigate(ixswap.URL, page)
  })

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await makeScreenOnError(testInfo.title, 'error', page)
    }
  })

  test('Check that "Create pool" is not available', async ({ page, ixSwap }) => {
    await ixSwap.createPool(amounts.base)
    const swapConf = await page.isDisabled(pool.button.SUPPLY)
    expect(swapConf).toBe(true)
  })
})
