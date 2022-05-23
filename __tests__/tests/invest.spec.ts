import { baseCreds } from '../lib/helpers/creds'
import { test } from '../lib/fixtures/fixtures'
import {
  click,
  emailCreate,
  isDisabledList,
  navigate,
  shouldExist,
  typeText,
  waitNewPage
} from '../lib/helpers/helpers'
import { expect } from '@playwright/test'
import { text } from '../lib/helpers/text'
import { invest } from '../lib/selectors/invest'
import { Authorizer } from '../lib/page-objects/authorizer'

import { approveIdentity, createCorporateIdentity, createIdentity } from '../lib/api/create-identities'
import * as corporateBody from '../lib/api/corporate-identity'
import { accountsTab } from '../lib/selectors/accounts'
import { authForms } from '../lib/selectors/auth'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('', () => {
  test.use({ storageState: './__tests__/lib/storages/dsoStorageState.json' })
  test.beforeEach(async ({ page }) => {
    await navigate(baseCreds.URL, page)
  })

  test.describe('Primary', () => {
    test('Download subscription docs', async ({ investment, context }) => {
      await investment.goToAvailableDso()
      const pages = await investment.downloadDocument(context)
      expect(pages).toBe(2)
    })

    test.skip('(Bug)Custody address should be created', async ({ investment }) => {
      await investment.createCustodyAddress()
    })

    test('Check that the DSO landing exist', async ({ investment }) => {
      await investment.checkThatInvestmentLandingAvailable()
    })

    test('Should be redirected to invest from landing', async ({ investment, page }) => {
      await investment.checkThatInvestmentLandingAvailable()
      await click(invest.buttons.INVEST_LANDING, page)
      await shouldExist(invest.buttons.DOWNLOAD_DOC, page)
    })

    test('The investment should be created', async ({ investment, page }) => {
      await investment.createNewInvestment()
    })
  })
  test.describe('My Investments', () => {
    test.beforeEach(async ({ investment }) => {
      await investment.checkCommitmentsPage()
    })
    test('The Investments table should exist', async ({ page }) => {
      await expect(page).toHaveURL(`${baseCreds.URL}app/invest/commitments`)
    })

    test('The Investment view should contain', async ({ investment, page }) => {
      const locator = await investment.checkRedirectionToCommitment()
      await expect(locator).toContainText(text.commitmentsView)
    })
    test.skip('The Investment view should redirect to the DSO view page', async ({ investment, page }) => {
      await investment.checkRedirectionToCommitment()
      await click(invest.OFFERS, page)
      await expect(page).toHaveURL(/app\/invest\/commitments\/\S+\/view/g)
    })
  })
})

// test.describe('Secondary market', () => {
//   test.beforeEach(async ({ auth, investment }) => {
//     await auth.loginWithout2fa(baseCreds.INVESTOR_HEX, baseCreds.PASSWORD)
//     await investment.toSecondaryMarket(text.requests.IXPS_SGD_PAIR)
//   })
//   test('The buy order should be created', async ({ investment }) => {
//     const orderCreated = await investment.secondMarketBuy('10', '10')
//     expect(orderCreated).toBe(true)
//   })

//   test('The buy order should be cancelled', async ({ investment }) => {
//     const orderCancelled = await investment.secondMarketCancelOrder()
//     expect(orderCancelled).toBe(true)
//   })

//   test('The sell order should be created', async ({ investment, page }) => {
//     await investment.secondMarketSell('10', '10')
//     await expect(page.locator(invest.TOAST_NOTIFICATIONS)).toContainText('Order created')
//   })

//   test('The sell order should be cancelled', async ({ investment }) => {
//     const orderCancelled = await investment.secondMarketCancelOrder()
//     expect(orderCancelled).toBe(true)
//   })

//   test('Validation for "Min trade amount" should work', async ({ investment, page }) => {
//     await investment.secondMarketSell('1', '1')
//     await expect(page.locator(invest.TOAST_NOTIFICATIONS)).toContainText('Order is too small')
//   })

//   test('Validation for "Max trade amount" should work', async ({ investment, page }) => {
//     await investment.secondMarketSell('1', '1001')
//     await expect(page.locator(invest.TOAST_NOTIFICATIONS)).toContainText('Order is too big')
//   })
// })

let locator
test.describe('Overview page', () => {
  test.beforeEach(async ({ investment, auth, page }) => {
    await navigate(baseCreds.URL, page)
    await auth.loginWithout2fa(baseCreds.VIEW_DSO_MORE_OPTIONS, baseCreds.PASSWORD)
    await investment.toTheOverviewPage()
    await page.waitForSelector(invest.PRIMARY_CARD)
    locator = await page.locator(invest.fields.SEARCH)
  })

  test('Search in the primary section should be work (IXPRIME-216)', async ({ investment, page }) => {
    await investment.checkSearch(locator.first(), text.dsoName, text.requests.search)
    await shouldExist(invest.PRIMARY_CARD, page)
  })

  test('Search in the secondary section should be work (IXPRIME-215)', async ({ investment, page }) => {
    await investment.checkSearch(locator.last(), text.secondaryName, text.requests.search)
    await expect(await page.locator(invest.TABLE)).toContainText(text.secondaryName)
  })

  test('The "Invest" button should redirect to the "Make Commitment" page (IXPRIME-208)', async ({ page }) => {
    await click(invest.buttons.INVEST, page)
    await expect(page).toHaveURL(/app\/invest\/offerings\/\S+\/view\/make-investment$/g)
  })

  test('The "TRADE" button should redirect to the "Secondary Market" page (IXPRIME-225)', async ({ page }) => {
    await click('//table >> text="TRADE"', page) //data-testid needs to deploy to staging
    await expect(page).toHaveURL(/app\/otc-market\/market\/\S+$/g)
  })

  test('The "My Holdings" button should redirect to the "Holdings" page (IXPRIME-211)', async ({ page }) => {
    await click('text="My Holdings"', page) //data-testid needs to deploy to staging
    await expect(page).toHaveURL(/app\/otc-market\/holdings\?tab=0$/g)
  })

  test('The "My Investments" button should redirect to the "My Investments" page (IXPRIME-201)', async ({ page }) => {
    await click(invest.ACCOUNTS_COMMITMENTS, page)
    await expect(page).toHaveURL(/app\/invest\/commitments$/g)
  })
})

test.describe('Invest to NFT', async () => {
  let forEachEmail: any
  let corporatesType = 'corporates'

  test.beforeAll(async () => {
    forEachEmail = emailCreate()
    const identityResponce = await createCorporateIdentity(forEachEmail, corporatesType, corporateBody)
    await approveIdentity(identityResponce.submitId, corporatesType)
    await Authorizer.createBlockchainAddressByApi(forEachEmail)
  })

  test.beforeEach(async ({ auth, page, investment }) => {
    await navigate(baseCreds.URL, page)
    await auth.loginWithout2fa(forEachEmail, baseCreds.PASSWORD)
    await investment.goToAvailableDso(text.NFT_DSO_NAME)
    const fields = await isDisabledList(
      [invest.fields.NUMBER_UNITS, invest.fields.PRICEPER_UNIT, invest.fields.TOTAL_AMOUNT],
      page
    )
    expect(fields, 'Fields are not disabled').toStrictEqual([true, true, true])
  })

  test("Test the ability to Invest to NFT's token if User has no cash (IXPRIME-469)", async ({ investment, page }) => {
    await investment.investToNFT()
    await click(invest.buttons.SUBMIT_INVEST, page)
  })

  test('Download subscription docs (IXPRIME-394)', async ({ investment, context }) => {
    const pages = await investment.downloadDocument(context)
    expect(pages).toBe(2)
  })

  test('The invest button should be disabled (IXPRIME-399)', async ({ page }) => {
    const button = await isDisabledList([invest.buttons.SUBMIT_INVEST], page)
    expect(button, 'The Invest button is not disabled').toStrictEqual([true])
  })

  test("Test the ability to Cancel Invest to NFT's token (IXPRIME-397)", async ({ page }) => {
    await click(accountsTab.buttons.CANCEL, page)
    await expect(page).toHaveURL(/app\/invest\/offerings\/\S+\/view/g)
  })

  test.only('Test the ability to "Copy to the clipboard" button (IXPRIME-391)', async ({ investment, page }) => {
    await click(invest.buttons.CLICKABLE_ETH_ADDRESS, page)
    const otpValue = await investment.getValueFromOTP()
    expect(otpValue).toBe('0xCD21c24DFDa445BAE7A25e6769A1A42c5C19a510') //example
  })

  test('Test the ability to Add Your Metamask Wallet (IXPRIME-398)', async ({ page, context }) => {
    const secondPage = await waitNewPage(context, page, accountsTab.buttons.ADD_ADDRESS)
    await expect(secondPage).toHaveURL(/app\/accounts\/withdrawal-addresses\/create/g)
    await shouldExist(accountsTab.fields.BLOCKCHAIN_ADDRESS, secondPage)
  })

  test('Test the ability to Add to Metamask (IXPRIME-465)', async ({ page }) => {
    await click(invest.buttons.METAMASK_ICON, page)
    await click(invest.buttons.CONNECT_TO_METAMASK, page)
    await expect(page).toHaveURL('https://metamask.io/')
  })

  test('The campaign DSO should not be available to invest a second time (IXPRIME-470)', async ({
    investment,
    page
  }) => {
    await investment.makeDeposit(forEachEmail)
    await investment.investToNFT()
    const button = await isDisabledList([invest.buttons.SUBMIT_INVEST], page)
    expect(button, 'The Invest button is not disabled').toStrictEqual([true])
  })
})
