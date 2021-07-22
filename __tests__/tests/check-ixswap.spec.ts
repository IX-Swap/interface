import { test, expect } from '@playwright/test'

import { ixswap, metamask } from '../lib/helpers/credentials'
import { click, navigate, waitForText, waitNewPage } from '../lib/helpers/helpers'
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

test.beforeEach(async () => {
  await navigate(ixswap.URL, page)
})

test.beforeAll(async () => {
  context = await launchPersistent()
  metamaskObj = new Metamask(context)
  page = await metamaskObj.fullConnection(context, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
  wallet = new SwapIX(page)
})
test.afterAll(async () => {
  await context.close()
})

test.describe('Check swap and pool functions', () => {
  test('Check that the ETH can be exchanged for DAI', async () => {
    const before = await getEthBalance()
    await wallet.setTypeOfCurrency()
    await wallet.currencyExchange(amounts.base)
    const secondPage = await waitNewPage(page, context, swap.button.CONFIRM_SWAP)
    await metamaskObj.confirmOperation(secondPage)
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText(`Swap ${amounts.base} ETH for`, page)
    const after = await getEthBalance()
    expect((Number(before) - Number(after)).toFixed(7)).toBe('0.0002308')
  })

  test('Check that the pool can be created', async () => {
    const before = await getEthBalance()
    await wallet.createPool(amounts.base)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await metamaskObj.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.base} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(before)).toBeGreaterThan(Number(after))
  })

  test('Check that the IXS-LT added to the balance', async () => {
    const ixsBalance = await getBalanceOtherCurrency(metamask.contractAddresses.ixsLt)
    expect(Number(ixsBalance)).toBeGreaterThan(0)
  })

  test('Check that crypto can be add to the pool', async () => {
    const before = await getEthBalance()
    await navigate(ixswap.URL, page)

    // await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await wallet.addToCurrentLiquidityPool(amounts.addToPool, false)
    await click(pool.button.SUPPLY, page)
    const secondPage = await waitNewPage(page, context, pool.button.CREATE_OR_SUPPLY)
    await metamaskObj.confirmOperation(secondPage)
    await waitForText(`Add ${amounts.addToPool} ETH and`, page)
    const after = await getEthBalance()
    expect(Number(after)).toBeLessThan(Number(before))
  })

  test('Check that the pool can be removed', async () => {
    const before = await getEthBalance()
    await wallet.removePool()
    const secondPage = await wallet.removePoolFull({ page, context })
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
