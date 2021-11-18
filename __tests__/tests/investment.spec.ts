import { baseCreds } from '../lib/helpers/creds'
import { test } from '../lib/fixtures/fixtures'
import { click, navigate, shouldExist } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'

test.beforeEach(async ({ page, auth }) => {
  await navigate(baseCreds.URL, page)
  await auth.loginWithout2fa(baseCreds.EMAIL_APPROVED, baseCreds.PASSWORD)
})
test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Primary', () => {
  test('Download subscription docs', async ({ investment, context }) => {
    const pages = await investment.downloadDocument(context)
    expect(pages).toBe(2)
  })

  test('Custody address should be created', async ({ investment }) => {
    await investment.createCustodyAddress()
  })

  test('Check that the DSO landing exist', async ({ investment }) => {
    await investment.checkThatInvestmentLandingAvailable()
  })

  test('Should be redirected to invest from landing', async ({
    investment,
    page,
    invest
  }) => {
    await investment.checkThatInvestmentLandingAvailable()
    await click(invest.buttons.INVEST_LANDING, page)
    await shouldExist(invest.buttons.DOWNLOAD_DOC, page)
  })

  test('The investment should be created', async ({ investment }) => {
    await investment.createNewInvestment()
  })
})

test.describe('Secondary market', () => {
  test('The buy order should be created', async ({ investment }) => {
    const orderCreated = await investment.secondMarketBuy()
    expect(orderCreated).toBe(true)
  })

  test('The buy order should be cancelled', async ({ investment }) => {
    const orderCancelled = await investment.secondMarketCancelOrder()
    expect(orderCancelled).toBe(true)
  })

  test('The sell order should be created', async ({ investment }) => {
    const orderCreated = await investment.secondMarketSell()
    expect(orderCreated).toBe(true)
  })

  test('The sell order should be cancelled', async ({ investment }) => {
    const orderCancelled = await investment.secondMarketCancelSellOrder()
    expect(orderCancelled).toBe(true)
  })
})
