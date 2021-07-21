import { test, expect } from '@playwright/test'

import { ixswap, metamask, metamask2 } from '../lib/helpers/credentials'
import { click, typeText, navigate, waitForText } from '../lib/helpers/helpers'
import { amounts } from '../lib/helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../lib/helpers/web3-helpers'
import { SwapIX } from '../lib/page-objects/ixswap-objects'
import { Metamask } from '../lib/page-objects/metamask-objects'

import { launchPersistent } from '../lib/launch-settings'
import { auth } from '../lib/selectors/metamask'
import { swap, pool } from '../lib/selectors/ixswap'

import { waitUntil } from 'async-wait-until'

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
    await waitUntil(() => context.pages()[1] != undefined, { timeout: 10000 })
    await metamaskObj.confirmOperation(context.pages()[1])
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText(`Swap ${amounts.base} ETH for`, page)
    const after = await getEthBalance()
    const res = Number(before) - Number(after)
    expect(res.toFixed(7)).toBe('0.0001408')
  })

  test('Check that the pool can be created', async () => {
    await wallet.createPool(amounts.base)
    await click(pool.button.SUPPLY, page)
    await click(pool.button.CREATE_OR_SUPPLY, page)
    const [secondPage] = await Promise.all([context.waitForEvent('page'), page.click(pool.button.CREATE_OR_SUPPLY)])
    await metamaskObj.confirmOperation(secondPage)
  })

  test('Check that crypto can be add to the pool', async () => {
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await wallet.addToCurrentLiquidityPool(amounts.base, page)
    await click(pool.button.SUPPLY, page)
    await click(pool.button.CREATE_OR_SUPPLY, page)
    await waitUntil(() => context.pages()[1] != undefined)
    await metamaskObj.confirmOperation(context.pages()[1])
    await waitForText(`Add ${amounts.base} ETH and`, page)
  })

  test('Check that the pool can be removed', async () => {
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await wallet.removePool()
    await waitUntil(() => context.pages()[1] != undefined)
    await click(auth.buttons.GET_STARTED + '[2]', context.pages()[1])
    await click(pool.button.REMOVE, page)
    await click(pool.button.CONFIRM_REMOVE, page)
    await waitUntil(() => context.pages()[1] != undefined)
    await metamaskObj.confirmOperation(context.pages()[1])
  })
})

test.describe('Run tests in expert mode', () => {
  test.beforeAll(async () => {
    await navigate(ixswap.URL, page)
    await wallet.setExpertMode(page)
  })
  test('Check that the DAI added to the output ', async () => {
    const outPutField = await wallet.setTypeOfCurrency()
    expect(outPutField).toContain('DAI')
  })

  test('Check that the crypto currency exchange successful', async ({}) => {
    await typeText(swap.field.CURRENCY_INPUT, amounts.base, page)
    const [secondPage] = await Promise.all([context.waitForEvent('page'), page.click(swap.button.SWAP)])
    const swapConf = await page.isHidden(swap.button.CONFIRM_SWAP)
    expect(swapConf).toBe(true)
    await metamaskObj.confirmOperation(secondPage)
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText(`Swap ${amounts.base} ETH for`, page)
  })

  test.describe('Check the pool functions', () => {
    test('Check that the pool can be created', async () => {
      await wallet.createPool(amounts.base)
      await click(pool.button.SUPPLY, page)
      await waitUntil(() => context.pages()[1] != undefined)
      await metamaskObj.confirmOperation(context.pages()[1])
    })

    test('Check that crypto can be add to the pool', async () => {
      await wallet.addToCurrentLiquidityPool(amounts.base, false)
      await click(pool.button.SUPPLY, page)
      await waitUntil(() => context.pages()[1] != undefined)
      await metamaskObj.confirmOperation(context.pages()[1])
    })

    test('Check that the pool can be removed', async () => {
      await wallet.removePool()
      await waitUntil(() => context.pages()[1] != undefined)
      await click(auth.buttons.GET_STARTED + '[2]', context.pages()[1])
      await click(pool.button.REMOVE, page)
      await click(pool.button.CONFIRM_REMOVE, page)
      await waitUntil(() => context.pages()[1] != undefined)
      await metamaskObj.confirmOperation(context.pages()[1])
    })
  })
})
