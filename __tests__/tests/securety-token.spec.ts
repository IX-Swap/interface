import { test as base } from '../lib/fixture'

import { expect } from '@playwright/test'
import { ixswap, metamask2 } from '../lib/helpers/credentials'
import {
  click,
  navigate,
  waitForText,
  waitNewPage,
  makeScreenOnError,
  getValue,
  typeText,
} from '../lib/helpers/helpers'
import { amounts } from '../lib/helpers/text-helpers'

import { getBalanceOtherCurrency, getEthBalance } from '../lib/helpers/web3-helpers'
import { SwapIX } from '../lib/page-objects/ixswap-objects'
import { Metamask } from '../lib/page-objects/metamask-objects'

import { auth } from '../lib/selectors/metamask'
import { pool, settings, securityToken, swap } from '../lib/selectors/ixswap'

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
  await metaMask.fullConnection(context, page, metamask2.SECRET_WORDS, metamask2.contractAddresses.eth)
  before = await getEthBalance()
  await navigate(ixswap.URL, page)
})

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    await makeScreenOnError(testInfo.title, 'error', page)
  }
})

test.describe('Check without accreditation', () => {
  test('The the needs accreditation notification appears', async ({ page }) => {
    await click(swap.button.OUT_CURRENCY, page)
    const notification = await page.isVisible('text="Needs accreditation"')
    expect(notification).toBe(true)
  })
  test('Check token search on the Swap page', async ({ page }) => {
    await click(swap.button.OUT_CURRENCY, page)
    await typeText(swap.field.SEARCH_INPUT, 'KEKWU', page)
    const tokenTitle = await page.isVisible('[title="KEKWU"]')
    expect(tokenTitle).toBe(true)
  })
})
