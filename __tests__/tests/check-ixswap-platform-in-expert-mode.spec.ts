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
  await wallet.setExpertMode(page)
})
test.afterAll(async () => {
  await context.close()
})
test.describe('Check that the ETH can be exchanged for DAI', () => {
  test('Check that the DAI added to the output ', async ({}) => {
    const outPutField = await wallet.setTypeOfCurrency()
    expect(outPutField).toContain('DAI')
  })
  test('Check that the second confirmation is not appears', async ({}) => {
    await typeText(swap.field.CURRENCY_INPUT, '0.00001', page)
    await click(swap.button.SWAP, page)
    const swapConf = await page.isHidden(swap.button.CONFIRM_SWAP)
    expect(swapConf).toBeTruthy
  })
  test('Check that the crypto currency exchange successful', async ({}) => {
    await waitUntil(() => context.pages()[1] != undefined)
    await metamaskObj.confirmOperation(context.pages()[1])
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText('Swap 0.00001 ETH for', page)
  })

  test.describe('Check the pool functions', () => {
    test('Check that the pool can be created', async ({}) => {
      await wallet.createPool('0.00001')
      await waitUntil(() => context.pages()[1] != undefined)
      await metamaskObj.confirmOperation(context.pages()[1])
    })

    test('Check that crypto can be add to the pool', async ({}) => {
      await wallet.addToCurrentLiquidityPool('0.00001', false)
      await waitUntil(() => context.pages()[1] != undefined)
      await metamaskObj.confirmOperation(context.pages()[1])
    })

    test('Check that the pool can be removed', async ({}) => {
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
