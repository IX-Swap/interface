import { test, expect } from '@playwright/test'

import { ixswap, metamask, metamask2 } from '../lib/helpers/credentials'
import { click, typeText, navigate, waitForText, waitNewPage } from '../lib/helpers/helpers'
import { getEthBalance } from '../lib/helpers/web3-helpers'
import { SwapIX } from '../lib/page-objects/ixswap-objects'
import { Metamask } from '../lib/page-objects/metamask-objects'
import { amounts } from '../lib/helpers/text-helpers'

import { launchPersistent } from '../lib/launch-settings'
import { auth } from '../lib/selectors/metamask'
import { swap, pool } from '../lib/selectors/ixswap'

// ...
let context: any
let page: any
let wallet: any
let metamaskObj: any

test.beforeEach(async () => {
  await navigate(ixswap.URL, page)
})
test.beforeAll(async () => {
  context = await launchPersistent()
  metamaskObj = new Metamask(context)
  page = await metamaskObj.fullConnection(context, metamask.SECRET_WORDS, metamask.contractAddresses.eth, false)
  wallet = new SwapIX(page)

  await navigate(ixswap.URL, page)
  await wallet.createPool(amounts.base)
  await click(pool.button.SUPPLY, page)
  const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
  await metamaskObj.confirmOperation(secondPage)
  await waitForText(`Add ${amounts.base} ETH and`, page)
})
test.afterAll(async () => {
  await context.close()
})

test.describe('Set value more that current balance', () => {
  test('Check that the POOL can`t be created when not enough funds', async () => {
    await wallet.createPool(amounts.moreThaCurrent)
    const poolConf = await page.isDisabled(pool.button.SUPPLY)
    expect(poolConf).toBe(true)
  })

  test('Check that the SWAP can`t be created when not enough funds', async () => {
    await wallet.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.moreThaCurrent, page)
    const swapConf = await page.isDisabled(swap.button.SWAP)
    expect(swapConf).toBe(true)
  })

  test('Check that crypto can`t be add to the pool when not enough funds', async () => {
    await wallet.addToCurrentLiquidityPool(amounts.moreThaCurrent, false)
    const poolConf = await page.isDisabled(pool.button.SUPPLY)
    expect(poolConf).toBe(true)
  })
})

test.describe('Cancel poll transaction', () => {
  test.afterAll(async () => {
    await navigate(ixswap.URL, page)
    await wallet.removePool()
    let secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED + '[2]', secondPage)
    await click(pool.button.REMOVE, page)
    secondPage = await waitNewPage(page, context, pool.button.CONFIRM_REMOVE)
    await metamaskObj.confirmOperation(secondPage)
    await waitForText(`Remove 0.0`, page)
  })
  test('Pool creation', async () => {
    const before = await getEthBalance()
    await wallet.createPool(amounts.base)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await click(auth.buttons.CANCEL, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })

  test('Add to current pool', async () => {
    const before = await getEthBalance()
    await wallet.addToCurrentLiquidityPool(amounts.base, false)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await click(auth.buttons.CANCEL, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })

  test('Remove pool,first confirmation', async () => {
    const before = await getEthBalance()
    await wallet.removePool()
    const secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })

  test('Remove pool,second confirmation', async () => {
    const before = await getEthBalance()
    await wallet.removePool()
    let secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED + '[2]', secondPage)
    await click(pool.button.REMOVE, page)
    secondPage = await waitNewPage(page, context, pool.button.CONFIRM_REMOVE)
    await click(auth.buttons.CANCEL, secondPage)
    const after = await getEthBalance()
    expect(before).toEqual(after)
  })
})
test.describe('Check the behave when balance = 0', () => {
  test.beforeAll(async () => {
    context = await launchPersistent()
    metamaskObj = new Metamask(context)
    page = await metamaskObj.fullConnection(context, metamask2.SECRET_WORDS, metamask2.contractAddresses.eth, false)
    wallet = new SwapIX(page)
  })
  test('Check that the SWAP is not available', async () => {
    await wallet.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.base, page)
    const swapConf = await page.isDisabled(swap.button.SWAP)
    expect(swapConf).toBe(true)
  })
  test('Check that "Create pool" is not available', async () => {
    await wallet.createPool(amounts.base)
    const swapConf = await page.isDisabled(pool.button.SUPPLY)
    expect(swapConf).toBe(true)
  })
})
