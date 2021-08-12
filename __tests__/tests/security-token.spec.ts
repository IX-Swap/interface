import { test as base } from '../lib/fixture'

import { expect } from '@playwright/test'
import { ixswap, forDeposit, metamask, metamask3 } from '../lib/helpers/credentials'
import { click, navigate, makeScreenOnError, shouldNotExist, waitNewPage } from '../lib/helpers/helpers'
import { sendCrypto } from '../lib/helpers/web3-helpers'

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

test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status === 'failed') {
    await makeScreenOnError(testInfo.title, 'error', page)
    await makeScreenOnError(`Metamask${testInfo.title}`, 'metamaskPage', context.pages()[1])
  }
})

test.describe('Functionality testing', () => {
  test.beforeEach(async ({ context, page, metaMask }) => {
    await metaMask.fullConnection(context, page, metamask.SECRET_WORDS, metamask.contractAddresses.eth)
    await navigate(ixswap.URL, page)
    await click(securityToken.button.OPEN_SECURITY, page)
  })
  test('Create deposit', async ({ page, context, ixSwap }) => {
    // await click(securityToken.button.TOKEN_ROW, page)
    // const metamaskPage = await waitNewPage(page, context, securityToken.button.ACCREDITATION)
    // await click(auth.buttons.SIGN, metamaskPage)
    // await ixSwap.createDeposit({ page })
    // await sendCrypto({
    //   addressFrom: metamask.contractAddresses.eth,
    //   addressTo: forDeposit.sendToKostodian,
    //   privKey: metamask.privKey,
    //   amount: '2',
    //   cryptoType: 'ether',
    // })
  })

  test('Cancel created deposit', async ({ page, context, ixSwap }) => {
    await click(securityToken.button.TOKEN_ROW, page)
    const metamaskPage = await waitNewPage(page, context, securityToken.button.ACCREDITATION)
    await click(auth.buttons.SIGN, metamaskPage)
    await ixSwap.createDeposit({ page })
    await click(securityToken.button.CANCEL, page)
    await shouldNotExist(securityToken.DEPOSIT_POPUP, page)
    const texts = await page.innerText(securityToken.TABLE_ROW)
    expect(texts).toContain('Cancelled')
  })

  test('Test the ability to cancel deposit with "pending" status', async ({ page, context, ixSwap }) => {
    await click(securityToken.button.TOKEN_ROW, page)
    const metamaskPage = await waitNewPage(page, context, securityToken.button.ACCREDITATION)
    await click(auth.buttons.SIGN, metamaskPage)
    await ixSwap.createDeposit({ page })
    await ixSwap.cancelDeposit({ page })
  })

  // test('Test the ability to make withdraw', async ({ page, context, ixSwap }) => {
  //   await click(securityToken.button.TOKEN_ROW, page)
  //   const metamaskPage = await waitNewPage(page, context, securityToken.button.ACCREDITATION)
  //   await click(auth.buttons.SIGN, metamaskPage)
  //   await ixSwap.createWithdraw({ page })
  // })
})
