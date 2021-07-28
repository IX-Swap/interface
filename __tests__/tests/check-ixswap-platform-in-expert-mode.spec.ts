import { test, expect } from '@playwright/test'

import { ixswap } from '../lib/helpers/credentials'
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
let metamask: any

test.beforeAll(async () => {
  context = await launchPersistent()
  metamask = new Metamask(context)
  page = await metamask.fullConnection(context)
  wallet = new SwapIX(page)
  await wallet.setExpertMode(page)
})
test.afterAll(async () => {
  await context.close()
})
test.describe('Check that the ETH can be exchanged for DAI', () => {
  test.only('Check that the DAI added to the output ', async ({}) => {
    const outPutField = await wallet.setTypeOfCurrency()
    expect(outPutField).toContain('DAI')
  })
  test.only('Check that the second confirmation is not appears', async ({}) => {
    await typeText(swap.field.CURRENCY_INPUT, '0.00001', page)
    await click(swap.button.SWAP, page)
    const swapConf = await page.isHidden(swap.button.CONFIRM_SWAP)
    expect(swapConf).toBeTruthy
    await waitUntil(() => context.pages()[1] != undefined)
    await metamask.confirmOperation(context.pages()[1])
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await waitForText('Swap 0.00001 ETH for', page)
  })

  test('Check that the pool can be created', async ({}) => {
    await wallet.createPool('0.00001')
    await metamask.confirmOperation(context.pages()[1])
  })

  test('Check that crypto can be add to the pool', async ({}) => {
    await click(pool.button.POOL_SECTION, page)
    await click(pool.button.OPEN_TABLE, page)
    await click('[data-testid="add-to-liquidity"]', page)
    await typeText(pool.field.TOKEN_AMOUNT, '0.00001', page)
    await click('text="Choose token"', page)
    await click(swap.button.DAI_CRYPTO, page)
    await click('[data-testid="supply"]', page)
    await click('[data-testid="create-or-supply"]', page)

    await metamask.confirmOperation(context.pages()[1])
  })

  test('Check that the pool can be removed', async ({}) => {
    await click(swap.button.CLOSE_ADD_CURRENCY_POPOVER, page)
    await wallet.removePool()
    await waitUntil(() => context.pages()[1] != undefined)
    await click(auth.buttons.GET_STARTED + '[2]', context.pages()[1])
    await click(pool.button.REMOVE, page)
    await click(pool.button.CONFIRM_REMOVE, page)
    await metamask.confirmOperation(context.pages()[1])
  })
})
