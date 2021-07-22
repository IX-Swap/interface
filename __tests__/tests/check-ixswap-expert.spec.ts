import { test, expect } from '@playwright/test'

import { ixswap, metamask, metamask2 } from '../lib/helpers/credentials'
import { click, typeText, navigate, waitForText, waitNewPage } from '../lib/helpers/helpers'
import { amounts } from '../lib/helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../lib/helpers/web3-helpers'
import { SwapIX } from '../lib/page-objects/ixswap-objects'
import { Metamask } from '../lib/page-objects/metamask-objects'

import { launchPersistent } from '../lib/launch-settings'
import { auth } from '../lib/selectors/metamask'
import { swap, pool } from '../lib/selectors/ixswap'

// ...
let context: any
let page: any
let wallet: any
let metamaskObj: any

test.beforeAll(async () => {
  context = await launchPersistent()
  metamaskObj = new Metamask(context)
  page = await metamaskObj.fullConnection(context, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
  wallet = new SwapIX(page)
  await wallet.setExpertMode(page)
})

test.beforeEach(async () => {
  await navigate(ixswap.URL, page)
})

test.afterAll(async () => {
  await context.close()
})

test.describe('Run tests in expert mode', () => {
  test('Check that the DAI added to the output ', async () => {
    const outPutField = await wallet.setTypeOfCurrency()
    expect(outPutField).toContain('DAI')
  })

  test('Check that the crypto currency exchange successful', async () => {
    await wallet.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.base, page)
    const secondPage = await waitNewPage(page, context, swap.button.SWAP)
    const swapConf = await page.isHidden(swap.button.CONFIRM_SWAP)
    expect(swapConf).toBe(true)
    await metamaskObj.confirmOperation(secondPage)
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText(`Swap ${amounts.base} ETH for`, page)
  })

  test('Check that the pool can be created', async () => {
    const before = await getEthBalance()
    await wallet.createPool(amounts.base)
    const secondPage = await waitNewPage(page, context, pool.button.SUPPLY)
    await metamaskObj.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.base} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(before)).toBeGreaterThan(Number(after))
  })

  test('Check that crypto can be add to the pool', async () => {
    await navigate(ixswap.URL, page)
    const before = await getEthBalance()
    await wallet.addToCurrentLiquidityPool(amounts.addToPool, false)
    const secondPage = await waitNewPage(page, context, pool.button.SUPPLY)
    await metamaskObj.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.addToPool} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(after)).toBeLessThan(Number(before))
  })

  test('Check that the pool can be removed', async () => {
    const before = await getEthBalance()
    await wallet.removePool()
    let secondPage = await waitNewPage(page, context, pool.button.APPROVE_REMOVE_LIQUIDITY)
    await click(auth.buttons.GET_STARTED + '[2]', secondPage)
    await click(pool.button.REMOVE, page)
    secondPage = await waitNewPage(page, context, pool.button.CONFIRM_REMOVE)
    await metamaskObj.confirmOperation(secondPage)
    await waitForText(`Remove 0.0`, page)
    const after = await getEthBalance()
    expect(Number(after)).toBeGreaterThan(Number(before))
  })

  test('Check that the IXS-LT removed from the balance', async () => {
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBe(0)
  })
})
