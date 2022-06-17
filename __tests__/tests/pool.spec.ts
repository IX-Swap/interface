import { test as base } from '../fixtures/fixture'
import { auth } from '../page-objects/selectors/metamask'

import { expect } from '@playwright/test'
import { ixswap, metamask } from '../testData/credentials'
import {
  click,
  navigate,
  waitForText,
  waitNewPage,
  makeScreenOnError,
  screenshotMatching,
  typeText,
} from '../helpers/helpers'
import { amounts, notifications } from '../helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../helpers/web3-helpers'
import { SwapIX } from '../page-objects/ixswap-objects'
import { Metamask } from '../page-objects/metamask-objects'
import { swap, pool } from '../page-objects/selectors/ixswap'

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
  if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    await makeScreenOnError(testInfo.title, 'error', page)
    await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
  }
  await page.close()
})

test.describe('Check pool functions', () => {
  test('Check that the pool can be created', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.createPool(amounts.base)
    await metaMask.signAgreement(context)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.base}`, page)
    const after = await getEthBalance()
    expect(Number(before)).toBeGreaterThan(Number(after))
    // 'Check that the IXS-LT added to the balance'
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBeGreaterThan(0)
  })

  test('Check that crypto can be add to the pool', async ({ page, context, metaMask, ixSwap }) => {
    await navigate(ixswap.URL, page)
    await ixSwap.addToCurrentLiquidityPool(amounts.addToPool, false)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.addToPool}`, page)
    const after = await getEthBalance()
    expect(Number(after)).toBeLessThan(Number(before))
  })

  test('Check that the pool can be removed', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.removePool()
    const secondPage = await ixSwap.removePoolFull({ page, context })
    await metaMask.confirmOperation(secondPage)
    await waitForText(notifications.REMOVE_POOL, page)
    await page.waitForTimeout(10000)
    const after = await getEthBalance()
    expect(Number(after)).toBeGreaterThan(Number(before))
    // 'Check that the IXS-LT removed from the balance'
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBe(0)
  })
})

test.describe('Run tests in expert mode', () => {
  test.beforeEach(async ({ context, page, metaMask, ixSwap }) => {
    await ixSwap.setExpertMode(page)
    before = await getEthBalance()
  })

  test('Check that the pool can be created', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.createPool(amounts.base)
    const secondPage = await waitNewPage(page, context, pool.button.SUPPLY)
    // await click(auth.buttons.SIGN, secondPage)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.base}`, page)
    const after = await getEthBalance()
    expect(Number(before)).toBeGreaterThan(Number(after))
  })

  test('Check that crypto can be add to the pool', async ({ page, context, metaMask, ixSwap }) => {
    await navigate(ixswap.URL, page)
    await ixSwap.addToCurrentLiquidityPool(amounts.addToPool, false)
    const secondPage = await waitNewPage(page, context, pool.button.SUPPLY)
    await metaMask.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.addToPool}`, page)
    const after = await getEthBalance()
    expect(Number(after)).toBeLessThan(Number(before))
  })

  test('Check that the pool can be removed', async ({ page, context, metaMask, ixSwap }) => {
    await ixSwap.removePool()
    let secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED + '[2]', secondPage)
    await click(pool.button.REMOVE, page)
    secondPage = await waitNewPage(page, context, pool.button.CONFIRM_REMOVE)
    await metaMask.confirmOperation(secondPage)
    await waitForText(notifications.REMOVE_POOL, page)
    await page.waitForTimeout(7000)
    const after = await getEthBalance()
    expect(Number(after)).toBeGreaterThan(Number(before))
  })

  test('Check that the IXS-LT removed from the balance', async () => {
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBe(0)
  })
})
