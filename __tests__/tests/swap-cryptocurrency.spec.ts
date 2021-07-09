import { test, expect } from '@playwright/test'
import { click, typeText, navigate } from './lib/helpers/helpers'
import { Metamask } from './lib/page-objects/metamask'
import { SwapIX } from './lib/page-objects/ixswap'

import { launchPersistent } from './lib/launch-settings'
import { auth } from './lib/selectors/metamask'
let context
let page
let metamaskAuth
let metamaskPage
let wallet

test.beforeAll(async () => {
  context = await launchPersistent()
  page = await context.newPage()
  await navigate('http://localhost:3000/#/swap', page)
  await (await context.pages())[0].close()
  metamaskPage = (await context.pages())[1]
  metamaskAuth = new Metamask(metamaskPage)
  await metamaskAuth.loginToMetamask()
  await page.reload()
  await metamaskPage.close()

  wallet = new SwapIX(page)
  await wallet.connectToWallet()
  await page.waitForTimeout(5000)
  await metamaskAuth.confirmConnection((await context.pages())[1])
})
test.afterAll(async () => {
  await context.close()
})

test('Check that the ETH can be exchanged for DAI', async ({}) => {
  await wallet.setTypeOfCurrency()
  await page.waitForTimeout(5000)
  await wallet.currencyExchange('0.0001')
  await page.waitForTimeout(5000)
  await click(auth.buttons.I_AGREE, await context.pages()[1])
})
