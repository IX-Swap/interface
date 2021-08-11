import { test as base } from '../lib/fixture'

import { expect } from '@playwright/test'
import { ixswap, metamask2, metamask, metamask3 } from '../lib/helpers/credentials'
import { click, navigate, makeScreenOnError, typeText, waitNewPage } from '../lib/helpers/helpers'
import { amounts } from '../lib/helpers/text-helpers'

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

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status === 'failed') {
    await makeScreenOnError(testInfo.title, 'error', page)
    await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
  }
})

test.describe('Functionality testing', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask2.SECRET_WORDS, metamask.contractAddresses.eth)
    await navigate(ixswap.URL, page)
    await click(securityToken.button.OPEN_SECURITY, page)
    // await context.pages()[1].click(auth.buttons.SIGN)
  })
  test('Create deposit', async ({ page, context, ixSwap }) => {
    await click(securityToken.button.TOKEN_ROW, page)
    const metamaskPage = await waitNewPage(page, context, securityToken.button.ACCREDITATION)
    await click(auth.buttons.SIGN, metamaskPage)
    await ixSwap.createDeposit({ page })
  })

  test.only('Create deposit(click on Cancel)', async ({ page, context, ixSwap }) => {
    await click(securityToken.button.TOKEN_ROW, page)
    const metamaskPage = await waitNewPage(page, context, securityToken.button.ACCREDITATION)
    await click(auth.buttons.SIGN, metamaskPage)
    await ixSwap.createDeposit({ page })
  })
})
