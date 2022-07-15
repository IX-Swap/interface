import { baseCreds } from '../../lib/helpers/creds'
import { text } from '../../lib/helpers/text'

import { click, navigate, screenshotMatching, waitForResponseInclude, waitNewPage } from '../../lib/helpers/helpers'
import { test, expect } from '../../lib/fixtures/metamask'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Trading (IXPRIME-152)', () => {
  test.beforeEach(async ({ page, invest, auth }) => {
    await navigate(baseCreds.URL, page)
    await auth.loginWithout2fa(baseCreds.ADMIN, baseCreds.PASSWORD)
    await click(invest.INVEST_TAB, page)
  })

  test('Check connection to the metamask', async ({ page, otcTrading, invest, metamaskObg }) => {
    const newPage = await otcTrading.connectWallet()
    await metamaskObg.confirmWalletConnection(newPage)
    const metamask = await newPage.waitForSelector(metamaskObg.METAMASK_INVESTAX_ICON)
    await screenshotMatching('Connect to metamask', metamask, newPage)
  })

  test('Should be switched to the Mumbai test net', async ({ page, otcTrading, context, metamaskObg }) => {
    const newPage = await otcTrading.connectWallet()
    await metamaskObg.confirmWalletConnection(newPage)
    const newPage1 = await waitNewPage(context, page, otcTrading.TO_MUMBAI_TESTNET)
    const metamask = await newPage1.waitForSelector('[class="definition-list"]')
    await screenshotMatching('Switched to metamask', metamask, newPage1)
  })

  test('Buy order should be created', async ({ page, otcTrading, metamaskObg }) => {
    const newPage = await otcTrading.connectWallet()
    await metamaskObg.confirmWalletConnection(newPage)
    await metamaskObg.addNewNetwork(newPage, text.mumbaiSettings)
    await newPage.close()
    await otcTrading.createOrder('0.01', '100000')
    await expect(otcTrading.CANCEL_ORDER).toBeVisible()

    await test.step('Cancel order', async () => {
      await otcTrading.CANCEL_ORDER.click()
      await waitForResponseInclude(page, 'otc/order/cancel')
      await expect(otcTrading.CANCEL_ORDER, 'The order is not canceled').toBeHidden()
    })
  })

  test('Sell order should be created', async ({ page, otcTrading, invest, metamaskObg }) => {
    const newPage = await otcTrading.connectWallet()
    await metamaskObg.confirmWalletConnection(newPage)
    await metamaskObg.addNewNetwork(newPage, text.mumbaiSettings)
    await newPage.close()
    await otcTrading.SELL_BUTTON.click()
    await otcTrading.createOrder('100000', '1')
    await expect(otcTrading.CANCEL_ORDER).toBeVisible()

    await test.step('Cancel order', async () => {
      await otcTrading.CANCEL_ORDER.click()
      await waitForResponseInclude(page, 'otc/order/cancel')
      await expect(otcTrading.CANCEL_ORDER, 'The order is not canceled').toBeHidden()
    })
  })
})
