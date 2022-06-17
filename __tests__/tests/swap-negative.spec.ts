import { test as base } from '../fixtures/fixture'
import { getBalanceOtherCurrency, getEthBalance } from '../helpers/web3-helpers'
import { auth } from '../page-objects/selectors/metamask'

import { expect } from '@playwright/test'
import { ixswap, metamask, metamask2 } from '../testData/credentials'
import {
  click,
  navigate,
  makeScreenOnError,
  typeText,
  shouldExist,
  waitNewPage,
  screenshotMatching,
} from '../helpers/helpers'
import { amounts } from '../helpers/text-helpers'

import { SwapIX } from '../page-objects/ixswap-objects'
import { Metamask } from '../page-objects/metamask-objects'
import { swap, pool } from '../page-objects/selectors/ixswap'

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

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
    await makeScreenOnError(testInfo.title, 'error', page)
    await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
  }
  await page.close()
})

test.describe('Check swap functions', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
    await navigate(ixswap.URL, page)
  })

  test('Check that the SWAP can`t be created when not enough funds', async ({ page, ixSwap }) => {
    await ixSwap.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.moreThaCurrent, page)
    const swapConf = await page.isDisabled(swap.button.SWAP)
    expect(swapConf).toBe(true)
  })

  test('Check token search on the Swap page(invalid crypto)', async ({ page }) => {
    await click(swap.button.OUT_CURRENCY, page)
    await typeText(swap.field.SEARCH_INPUT, '1D2AI1', page)
    await shouldExist('text="No results found."', page)
  })

  test.only('Reject swap operation', async ({ page, ixSwap, context }, testInfo) => {
    const before = await getEthBalance()
    await ixSwap.setTypeOfCurrency()
    await ixSwap.currencyExchange(amounts.swap)
    const secondPage = await waitNewPage(page, context, swap.button.CONFIRM_SWAP)
    await click(auth.buttons.CANCEL, secondPage)
    await page.waitForSelector(swap.button.CLOSE_POPUP)
    const elementHandle = await page.$(swap.TRANSACTION_POPUP)
    await screenshotMatching(testInfo.title, expect, elementHandle)
    const after = await getEthBalance()
    expect(Number(before)).toEqual(Number(after))
  })
})
test.describe('Check the behave when balance = 0', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask2.SECRET_WORDS, metamask2.contractAddresses.eth)
    await navigate(ixswap.URL, page)
  })

  test('Check that the SWAP is not available', async ({ page, ixSwap }) => {
    await ixSwap.setTypeOfCurrency()
    await typeText(swap.field.CURRENCY_INPUT, amounts.base, page)
    const swapConf = await page.isDisabled(swap.button.SWAP)
    expect(swapConf).toBe(true)
  })

  test('The "Needs accreditation" notification appears', async ({ page }) => {
    await click(swap.button.OUT_CURRENCY, page)
    const notification = await page.isVisible('text="Needs accreditation"')
    expect(notification).toBe(true)
  })
})
