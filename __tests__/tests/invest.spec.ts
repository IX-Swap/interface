import { baseCreds } from '../lib/helpers/creds'
import { test } from '../lib/fixtures/fixtures'
import { click, navigate, shouldExist } from '../lib/helpers/helpers'
import { expect } from '@playwright/test'
import { text } from '../lib/helpers/text'
import { invest } from '../lib/selectors/invest'

test.beforeEach(async ({ page }) => {
  await navigate(baseCreds.URL, page)
})
test.afterEach(async ({ page }) => {
  await page.close()
})
test.describe('', () => {
  test.beforeEach(async ({ auth }) => {
    await auth.loginWithout2fa(baseCreds.EMAIL_APPROVED, baseCreds.PASSWORD)
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
      page
    }) => {
      await investment.checkThatInvestmentLandingAvailable()
      await click(invest.buttons.INVEST_LANDING, page)
      await shouldExist(invest.buttons.DOWNLOAD_DOC, page)
    })

    test('The investment should be created', async ({ investment, page }) => {
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

    test.skip('The sell order should be created', async ({ investment }) => {
      const orderCreated = await investment.secondMarketSell()
      expect(orderCreated).toBe(true)
    })

    test.skip('The sell order should be cancelled', async ({ investment }) => {
      const orderCancelled = await investment.secondMarketCancelSellOrder()
      expect(orderCancelled).toBe(true)
    })
  })
  test.describe('My Commitments', () => {
    test.beforeEach(async ({ investment }) => {
      await investment.checkCommitmentsPage()
    })
    test('The Commitments table should exist', async ({ page }) => {
      await expect(page).toHaveURL(`${baseCreds.URL}app/invest/commitments`)
    })

    test('The Commitment view should contain', async ({ investment }) => {
      const locator = await investment.checkRedirectionToCommitment()
      await expect(locator).toContainText(text.commitmentsView)
    })
    test('The Commitment view should redirect to the DSO view page', async ({
      investment,
      page
    }) => {
      await investment.checkRedirectionToCommitment()
      await click(invest.OFFERS, page)
      await expect(page).toHaveURL(/app\/invest\/offerings\/\S+\/view/g)
    })
  })
})
let locator
test.describe('Overview page', () => {
  test.beforeEach(async ({ investment, auth, page }) => {
    await auth.loginWithout2fa(
      baseCreds.VIEW_DSO_MORE_OPTIONS,
      baseCreds.PASSWORD
    )
    await investment.toTheOverviewPage()
    await page.waitForSelector(invest.PRIMARY_CARD)
    locator = await page.locator(invest.fields.SEARCH)
  })

  test('Search in the primary section should be work', async ({
    investment,
    page
  }) => {
    await investment.checkSearch(
      locator.first(),
      text.dsoName,
      text.requests.search
    )
    await shouldExist(invest.PRIMARY_CARD, page)
  })

  test('Search in the secondary section should be work', async ({
    investment,
    page
  }) => {
    await investment.checkSearch(
      locator.last(),
      text.secondaryName,
      text.requests.search
    )
    await expect(await page.locator(invest.TABLE)).toContainText(
      text.secondaryName
    )
  })
  test('The "Invest" button should redirect to the "Make Commitment" page', async ({
    page
  }) => {
    await click(invest.buttons.INVEST, page)
    await expect(page).toHaveURL(
      /app\/invest\/offerings\/\S+\/view\/make-investment$/g
    )
  })

  test('The "TRADE" button should redirect to the "Secondary Market" page', async ({
    page
  }) => {
    await click('//table >> text="TRADE"', page) //data-testid needs to deploy to staging
    await expect(page).toHaveURL(/app\/otc-market\/market\/\S+$/g)
  })

  test('The "My Holdings" button should redirect to the "Holdings" page', async ({
    page
  }) => {
    await click('text="My Holdings"', page) //data-testid needs to deploy to staging
    await expect(page).toHaveURL(/app\/otc-market\/holdings$/g)
  })

  test('The "My Commitments" button should redirect to the "My Commitments" page', async ({
    page
  }) => {
    await click(invest.ACCOUNTS_COMMITMENTS, page)

    await expect(page).toHaveURL(/app\/invest\/commitments$/g)
  })
})
