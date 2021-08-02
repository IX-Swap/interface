import { test as base } from '../lib/fixture'

import { expect } from '@playwright/test'
import { ixswap, metamask2, metamask, metamask3 } from '../lib/helpers/credentials'
import { click, navigate, makeScreenOnError, typeText, waitNewPage } from '../lib/helpers/helpers'
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

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    await makeScreenOnError(testInfo.title, 'error', page)
  }
})

test.describe('Functionality testing', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
    await navigate(ixswap.URL, page)
    await click(securityToken.button.OPEN_SECURITY, page)
  })
  test('Create deposit', async ({ page, context }) => {
    await click(securityToken.button.TOKEN_ROW, page)
    //accreditation
    const metamaskPage = await waitNewPage(page, context, securityToken.button.ACCREDITATION)
    await click('[data-testid="request-signature__sign"]', metamaskPage)
    await click(securityToken.button.DEPOSIT, page)

    await typeText(pool.field.TOKEN_AMOUNT, '10000', page)
    await click('text="Create deposit request"', page)
  })
})

test.describe('Check without accreditation', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask2.SECRET_WORDS, metamask2.contractAddresses.eth)
    await navigate(ixswap.URL, page)
  })
  test('The "Needs accreditation" notification appears', async ({ page }) => {
    await click(swap.button.OUT_CURRENCY, page)
    const notification = await page.isVisible('text="Needs accreditation"')
    expect(notification).toBe(true)
  })
})
