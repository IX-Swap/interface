import { test, expect } from '@playwright/test'

import { ixswap, metamask } from '../lib/helpers/credentials'
import { click, typeText, navigate, waitForText } from '../lib/helpers/helpers'
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

test.beforeAll(async () => {
  context = await launchPersistent()
  metamaskObj = new Metamask(context)
  page = await metamaskObj.fullConnection(context, metamask.SECRET_WORDS, ixswap.contractAddresses.eth)
  wallet = new SwapIX(page)
})
test.afterAll(async () => {
  await context.close()
})
test.describe('Check IX Swap functionality', () => {
  test('Check that the ETH can be exchanged for DAI', async ({}) => {
    const before = await getEthBalance()
    await wallet.setTypeOfCurrency()
    await wallet.currencyExchange('0.00001')
    await waitUntil(() => context.pages()[1] != undefined, { timeout: 10000 })
    await metamaskObj.confirmOperation(context.pages()[1])
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText('Swap 0.00001 ETH for', page)
    await page.waitForTimeout(10000)
    const after = await getEthBalance()
    const res = Number(before) - Number(after)
    expect(res.toFixed(7)).toBe('0.0001408')
  })

  test('Check that the pool can be created', async ({}) => {
    await wallet.createPool('0.00001')
    await click(pool.button.CREATE_OR_SUPPLY, page)
    await waitUntil(() => context.pages()[1] != undefined, { timeout: 10000 })
    await metamaskObj.confirmOperation(context.pages()[1])
  })

  test('Check that crypto can be add to the pool', async ({}) => {
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await wallet.addToCurrentLiquidityPool('0.00001', page)
    await click(pool.button.CREATE_OR_SUPPLY, page)
    await waitUntil(() => context.pages()[1] != undefined)
    await metamaskObj.confirmOperation(context.pages()[1])
    await waitForText('Add 0.00001 ETH and', page)
  })

  test('Check that the pool can be removed', async ({}) => {
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
