import { test, expect } from '@playwright/test'
import { click, typeText, navigate, waitForText } from '../lib/helpers/helpers'
import { Metamask } from '../lib/page-objects/metamask'
import { SwapIX } from '../lib/page-objects/ixswap'

import { launchPersistent } from '../lib/launch-settings'
import { auth } from '../lib/selectors/metamask'
let context
let page
let wallet

test.beforeAll(async () => {
  ;[page, context] = await launchPersistent()
  wallet = new SwapIX(page)
})
test.afterAll(async () => {
  await context.close()
})
test.describe('Check that the ETH can be exchanged for DAI', () => {
  test('Check that the ETH can be exchanged for DAI', async ({}) => {
    await wallet.setTypeOfCurrency()
    await page.waitForTimeout(2000)
    await wallet.currencyExchange('0.00001')
    await page.waitForTimeout(2000)
    await click(auth.buttons.I_AGREE, await context.pages()[1])
    await waitForText('Swap 0.00001 ETH for', page)
  })
})
