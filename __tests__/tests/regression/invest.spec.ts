import { baseCreds } from '../../lib/helpers/creds'
import { test } from '../../lib/fixtures/fixtures'
import {
  click,
  emailCreate,
  isDisabledList,
  LOADER,
  navigate,
  screenshotMatching,
  shouldExist,
  typeText,
  waitForResponseInclude,
  waitForText,
  waitNewPage
} from '../../lib/helpers/helpers'
import { expect } from '@playwright/test'
import { text } from '../../lib/helpers/text'
import { invest } from '../../lib/selectors/invest'
import { Authorizer } from '../../lib/page-objects/authorizer'

import { approveIdentity, createCorporateIdentity, createIdentity } from '../../lib/api/create-identities'
import * as corporateBody from '../../lib/api/corporate-identity'
import { accountsTab } from '../../lib/selectors/accounts'
import { adminEl } from '../../lib/selectors/admin'
import { kyc } from '../../lib/selectors/kyc-form'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('', () => {
  test.use({ storageState: './__tests__/lib/storages/dsoStorageState.json' })
  test.beforeEach(async ({ page }) => {
    await navigate(baseCreds.URL, page)
  })

  test.describe('Primary', () => {
    test('Download subscription docs', async ({ investment, context, admin }) => {
      await investment.goToAvailableDso()
      await admin.USER_VIEW_CARD.first().click()
      await investment.INVEST_BUTTON.click()
      const pages = await investment.downloadDocument(context)
      expect(pages).toBe(2)
    })
    test('Test the ability to click on "Deposit" button (IXPRIME-229)', async ({ investment, page }) => {
      await investment.goToPrimarySection()
      await click('text=DEPOSIT', page)
      await expect(page).toHaveURL(/app\/accounts\/cash-deposits$/g)
    })

    test('Test the ability to change currency (IXPRIME-228)', async ({ investment, page }) => {
      await investment.goToPrimarySection()
      await page.waitForSelector(LOADER, { state: 'detached' })
      await investment.ARROW_DROPDOWN_ICON.first().click({ force: true })
      await click(adminEl.dropDown.CURRENCY_USD, page)
      await shouldExist(adminEl.dropDown.CURRENCY_USD, page)
    })

    test('Check that the DSO landing exist (IXPRIME-252)', async ({ investment, page }) => {
      await investment.goToPrimarySection()
      await investment.checkThatInvestmentLandingAvailable()
    })

    test('Should be redirected to invest from landing', async ({ investment, page }) => {
      await investment.goToPrimarySection()
      await investment.checkThatInvestmentLandingAvailable()
      await click(invest.buttons.INVEST_LANDING, page)
      await shouldExist(invest.buttons.DOWNLOAD_DOC, page)
    })

    test('The investment should be created (IXPRIME-257)', async ({ investment, page }) => {
      await investment.goToAvailableDso()
      await click(invest.buttons.INVEST, page)
      await investment.createNewInvestment()
      await click(invest.buttons.SUBMIT_INVEST, page)
    })

    test("Test the ability to Cancel Invest to NFT's token (IXPRIME-397)", async ({ page, investment, admin }) => {
      await investment.goToAvailableDso(text.NFT_DSO_NAME)
      await admin.USER_VIEW_CARD.click()
      await click(invest.buttons.INVEST_LANDING, page)
      await investment.investToNFT()
      await click(accountsTab.buttons.CANCEL, page)
      await expect(page).toHaveURL(/app\/invest\/offerings\/\S+\/view/g)
    })
  })
  test.describe('My Investments', () => {
    test.beforeEach(async ({ investment }) => {
      await investment.goToPrimarySection()
      await investment.checkCommitmentsPage()
    })
    test('Test the ability to go to My Investments (IXPRIME-230)', async ({ page }) => {
      await expect(page).toHaveURL(`${baseCreds.URL}app/invest/commitments`)
    })

    test('The Investment view should contain (IXPRIME-202)', async ({ investment, page }) => {
      const locator = await investment.checkRedirectionToCommitment()
      await expect(locator).toContainText(text.commitmentsView)
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

  test('Click on View button in Secondary Market table (IXPRIME-214)', async ({ investment }) => {
    await investment.USER_VIEW_CARD.first().click()
    await expect(investment.PERSONAL_INFORMATION).toBeTruthy()
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

  test.beforeEach(async ({ auth, page }) => {
    await navigate(baseCreds.URL, page)
    await auth.loginWithout2fa(forEachEmail, baseCreds.PASSWORD)
  })
  test.describe('', async () => {
    test.beforeEach(async ({ investment }) => {
      await investment.goToAvailableDso(text.NFT_DSO_NAME)
      await investment.viewDSO()
    })
    test("Invest to NFT's token if User has no cash (IXPRIME-469)", async ({ page }) => {
      const fields = await isDisabledList(
        [invest.fields.NUMBER_UNITS, invest.fields.PRICEPER_UNIT, invest.fields.TOTAL_AMOUNT],
        page
      )
      expect(fields, 'Fields are not disabled').toStrictEqual([true, true, true])
      const button = await isDisabledList([invest.buttons.SUBMIT_INVEST], page)
      expect(button, 'The Invest button is not disabled').toStrictEqual([true])
    })

    test('Download subscription docs (IXPRIME-394)', async ({ investment, context }) => {
      const pages = await investment.downloadDocument(context)
      expect(pages).toBe(2)
    })

    test("Test the ability to Cancel Invest to NFT's token (IXPRIME-397)", async ({ page, investment }) => {
      await investment.investToNFT()
      await investment.makeDeposit(forEachEmail)
      await click(accountsTab.buttons.CANCEL, page)
      await expect(page).toHaveURL(/app\/invest\/offerings\/\S+\/view/g)
    })

    test('Test the ability to "Copy to the clipboard" button (IXPRIME-391)', async ({ investment, page }) => {
      await click(invest.buttons.CLICKABLE_ETH_ADDRESS, page)
      const otpValue = await investment.getValueFromOTP()
      expect(otpValue).toBe(text.NFT_CONTRACT_ADDRESS) //example
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

    test('Test the ability to Invest to NFT`s token(negative)  (IXPRIME-399)', async ({ page }) => {
      const button = await isDisabledList([invest.buttons.SUBMIT_INVEST], page)
      expect(button, 'The Invest button is not disabled').toStrictEqual([true])
    })

    test("Test the ability to Invest to NFT's token (IXPRIME-390)", async ({ investment, page }) => {
      await investment.investToNFT()
      await click(invest.buttons.SUBMIT_INVEST, page)
      await expect(page).toHaveURL(/app\/invest\/offerings\/\S+\/view/g)
      await waitForText(page, 'Success.')
    })
  })

  test('The DSO shouldn`t be available to invest a second time (IXPRIME-470)', async ({ investment, page }) => {
    await investment.goToAvailableDso(text.NFT_DSO_NAME)
    await click(invest.buttons.VIEW_INVEST, page)
    const investButton = page.locator(invest.buttons.INVEST_LANDING)
    await expect(investButton, 'The Invest button is not disabled').toBeDisabled()
  })

  test('Check the ability to Invest from Commitments page (IXPRIME-175)', async ({ investment, page }, testInfo) => {
    await investment.makeDeposit(forEachEmail)
    await investment.goToAvailableDso(text.dsoForCommitment)
    await investment.viewDSO()
    await investment.createNewCommitment()
    await click(invest.buttons.SUBMIT_COMMIT, page)
    await waitForResponseInclude(page, '/commit')
    await navigate(baseCreds.URL + 'app/accounts/commitments', page)
    await click(invest.buttons.SUBMIT_INVEST, page)
    const dialog = await page.waitForSelector(kyc.DIALOG_VIEW)
    await screenshotMatching(testInfo.title, dialog, page)
  })
})
